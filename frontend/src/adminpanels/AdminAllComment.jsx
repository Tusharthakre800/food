import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, ShoppingBag, Utensils, BarChart2, Search, MessageSquare, Trash2, ArrowLeft, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const AdminAllComment = () => {
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success("Admin logged out");
        navigate('/admin/dashboard');
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/admin/login');
                    return;
                }

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/admin/allvideocomments`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
                toast.error("Failed to load comments");
                if (error.response?.status === 401 || error.response?.status === 403) {
                    handleLogout();
                }
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [navigate]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this comment?")) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/admin/deletevideocomment/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setComments(comments.filter(comment => comment._id !== id));
            toast.success("Comment deleted successfully");
        } catch (error) {
            console.error("Error deleting comment:", error);
            toast.error("Failed to delete comment");
        }
    };
    

    const filteredComments = comments.filter(comment => 
        comment.content?.toLowerCase()?.includes(searchTerm.toLowerCase()) || 
        comment.userId?.fullname?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        comment.foodItem?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );
    

    return (
        <div className="min-h-screen bg-black text-white font-sans flex">
            {/* Sidebar */}
            {/* <aside className="w-64 bg-gray-900 border-r border-white/10 hidden md:flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-2xl font-bold text-primary">Food Reels Admin</h1>
                </div>
                
                <nav className="flex-1 p-4 space-y-2">
                    <div onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                        <BarChart2 size={20} />
                        <span>Dashboard</span>
                    </div>
                    <div onClick={() => navigate('/admin/users')} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                        <Users size={20} />
                        <span>Users</span>
                    </div>
                    <div onClick={() => navigate('/admin/partners')} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                        <Utensils size={20} />
                        <span>Partners</span>
                    </div>
                    <div onClick={() => navigate('/admin/orders')} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                        <ShoppingBag size={20} />
                        <span>Orders</span>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-white font-medium cursor-pointer">
                        <MessageSquare size={20} />
                        <span>Comments</span>
                    </div>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button 
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:bg-white/5 rounded-xl transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back</span>
                    </button>
                </div>
            </aside> */}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Header for Mobile */}
                <header className="md:hidden fixed top-0 left-0 right-0 p-4 bg-gray-900 border-b border-white/10 flex justify-between items-center z-50">
                    <h1 className="text-xl font-bold">Comments</h1>
                    <button onClick={() => navigate('/admin/dashboard')} className="p-2 bg-white/5 text-gray-400 rounded-lg">
                        <ArrowLeft size={20} />
                    </button>
                </header>

                <div className="p-8 pt-20 md:pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Comment Management</h2>
                            <p className="text-gray-400">Manage and view all video comments.</p>
                        </div>
                        
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search comments..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-900 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-primary"
                            />
                        </div>
                    </div>

                    {/* Comments List */}
                    {loading ? (
                         <div className="flex items-center justify-center h-64">
                            <div className="text-gray-400 animate-pulse">Loading comments...</div>
                        </div>
                    ) : filteredComments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <MessageSquare size={48} className="mb-4 opacity-50" />
                            <p>No comments found matching your search.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {filteredComments.map((comment) => (
                                <div key={comment._id} className="bg-gray-900/40 border border-white/10 rounded-xl p-4 hover:border-primary/30 transition-all group">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold text-primary border border-white/5">
                                                    {comment.userId?.fullname?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-semibold text-white flex flex-wrap items-center gap-2">
                                                        {comment.user?.fullname || 'Unknown User'}
                                                        <span className="text-xs font-normal text-gray-500 hidden sm:inline">•</span>
                                                        <span className="text-xs font-normal text-gray-500 flex items-center gap-1">
                                                            <Clock size={10} />
                                                            {new Date(comment.timestamp || Date.now()).toLocaleString()}
                                                        </span>
                                                    </h3>
                                                    {comment.foodItem && (
                                                         <p className="text-xs text-gray-400">
                                                            on <span className="text-primary/80 font-medium">{comment.foodItem.name}</span>
                                                         </p>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="pl-13 ml-12"> 
                                                <p className="text-gray-200 text-sm leading-relaxed">
                                                    {comment.content}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <button 
                                            onClick={() => handleDelete(comment._id)}
                                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                            title="Delete Comment"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminAllComment;
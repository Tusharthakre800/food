import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, ShoppingBag, Utensils, BarChart2, Search, Mail, Calendar, User as UserIcon, Shield, Clock, ArrowRight, ArrowLeft, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const AdminTotalFoodpartner = () => {
    const navigate = useNavigate();
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success("Admin logged out");
        navigate('/admin/dashboard');
    };

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/admin/login');
                    return;
                }

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/admin/allfoodpartners`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPartners(response.data);
            } catch (error) {
                console.error("Error fetching partners:", error);
                toast.error("Failed to load food partners");
                if (error.response?.status === 401 || error.response?.status === 403) {
                    handleLogout();
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPartners();
    }, [navigate]);

    const filteredPartners = partners.filter(partner => 
        partner.fullname.toLowerCase().includes(searchTerm.toLowerCase()) || 
        partner.email.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-white font-medium cursor-pointer">
                        <Utensils size={20} />
                        <span>Partners</span>
                    </div>
                    <div onClick={() => navigate('/admin/orders')} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                        <ShoppingBag size={20} />
                        <span>Orders</span>
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
                    <h1 className="text-xl font-bold">Partners</h1>
                    <button onClick={() => navigate('/admin/dashboard')} className="p-2 bg-white/5 text-gray-400 rounded-lg">
                        <ArrowRight size={20} />
                    </button>
                </header>

                <div className="p-8 pt-20 md:pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Partner Management</h2>
                            <p className="text-gray-400">Manage and view all registered food partners.</p>
                        </div>
                        
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search partners..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-900 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-primary"
                            />
                        </div>
                    </div>

                    {/* Partners Grid - Compact/Small Cards Layout */}
                    {loading ? (
                         <div className="flex items-center justify-center h-64">
                            <div className="text-gray-400 animate-pulse">Loading partners...</div>
                        </div>
                    ) : filteredPartners.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <Utensils size={48} className="mb-4 opacity-50" />
                            <p>No partners found matching your search.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                            {filteredPartners.map((partner) => (
                                <div key={partner._id} className="group bg-gray-900/40 border border-white/10 hover:border-primary/30 rounded-xl p-3 transition-all duration-200 hover:bg-white/5 hover:shadow-lg hover:shadow-primary/5">
                                    <div className="flex items-start gap-3">
                                        {/* Avatar - Small Square */}
                                        <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center text-sm font-bold text-white shadow-inner bg-gradient-to-br from-orange-900 to-orange-600">
                                            {partner.fullname.charAt(0).toUpperCase()}
                                        </div>

                                        {/* Info Compact */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <h3 className="text-sm font-semibold text-white truncate pr-2">
                                                    {partner.fullname}
                                                </h3>
                                                <Utensils size={12} className="text-orange-400 shrink-0" />
                                            </div>
                                            
                                            <p className="text-xs text-gray-500 truncate mb-2" title={partner.email}>
                                                {partner.email}
                                            </p>

                                            <div className="space-y-1 mb-3">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                    <Phone size={10} className="shrink-0 text-gray-500" />
                                                    <span className="truncate" title={partner.phone}>{partner.phone || 'N/A'}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                    <MapPin size={10} className="shrink-0 text-gray-500" />
                                                    <span className="truncate" title={partner.address}>{partner.address || 'N/A'}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                                <span className="text-[10px] text-gray-600 flex items-center gap-1">
                                                    <Clock size={10} />
                                                    {new Date(partner.timestamp || Date.now()).toLocaleDateString()}
                                                </span>
                                                
                                                <button className="text-[10px] font-medium text-primary hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {!loading && filteredPartners.length > 0 && (
                        <div className="mt-8 text-center text-gray-500 text-sm">
                            Showing {filteredPartners.length} total partners
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminTotalFoodpartner;
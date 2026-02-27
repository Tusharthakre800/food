import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ArrowLeft, MapPin, UtensilsCrossed, Star, Users, Plus, LogOut, Settings, Edit, Trash2 } from 'lucide-react';
import SkeletonPartnerProfile from '../skeleton/SkeletonPartnerProfile';
import EditFoodModal from '../components/EditFoodModal';

const PartnerProfile = () => {
    const navigate = useNavigate();
    const [partner, setPartner] = useState(null);
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/partner/login');
                    return;
                }

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/food/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPartner(response.data.profile);
                setFoodItems(response.data.foodItems || []);
            } catch (err) {
                console.error("Error fetching profile:", err);
                if (err.response?.status === 401) {
                    toast.error("Session expired. Please login again.");
                    navigate('/partner/login');
                } else {
                    const errorMessage = err.response?.data?.message || "Failed to load profile";
                    toast.error(errorMessage);
                    setError(errorMessage);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success("Logged out successfully");
        navigate('/partner/login');
    };

    const performDelete = async (id) => {
        const token = localStorage.getItem('token');
        const deletePromise = axios.delete(`${import.meta.env.VITE_BASE_URL}/api/food/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        toast.promise(deletePromise, {
            loading: 'Deleting...',
            success: 'Item deleted successfully',
            error: 'Failed to delete item'
        }, {
            duration: 4000
        }); 
        

        try {
            await deletePromise;
            setFoodItems(prev => prev.filter(item => item._id !== id));
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const handleDelete = (id, e) => {
        e.stopPropagation();
        toast((t) => (
            <div className="flex flex-col gap-2 items-center">
                <p className="font-medium text-sm">Delete this item?</p>
                <div className="flex gap-2">
                    <button 
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                            toast.dismiss(t.id);
                            performDelete(id);
                        }}
                        className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ), {
            duration: 4000,
            style: {
                background: '#18181b', // zinc-950
                color: '#fff',
                border: '1px solid #27272a', // zinc-800
            },
        });
    };

    const openEditModal = (item, e) => {
        e.stopPropagation();
        setSelectedItem(item);
        setIsEditModalOpen(true);
    };

    const handleUpdateSuccess = (updatedItem) => {
        setFoodItems(prev => prev.map(item => item._id === updatedItem._id ? updatedItem : item));
    };

    if (loading) {
        return <SkeletonPartnerProfile />;
    }

    if (error || !partner) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-black text-white flex-col gap-4">
                <p className="text-red-500">{error || "Partner not found"}</p>
                <button onClick={handleLogout} className="text-blue-400 hover:underline">Logout</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans pb-20">
             {/* Sticky Header / Nav */}
            <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-black/80 backdrop-blur-md border-b border-white/5">
                <div className="w-9"></div> {/* Spacer */}
                <h1 className="font-bold text-sm uppercase tracking-widest text-white/80">My Dashboard</h1>
                <button onClick={handleLogout} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all active:scale-95 text-red-400">
                    <LogOut size={20} />
                </button>
            </div>

            {/* Profile Info Section */}
            <div className="px-6 pt-6 flex flex-col items-center">
                {/* Avatar with Glow Effect */}
                <div className="relative group cursor-pointer">
                     <div className="w-28 h-28 rounded-full border-[3px] border-black bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-2xl z-10 relative overflow-hidden">
                        <span className="text-4xl font-bold text-white/90">
                            {partner.fullname?.charAt(0).toUpperCase() || "P"}
                        </span>
                    </div>
                    {/* Decorative blurred background behind avatar */}
                    <div className="absolute inset-0 bg-primary blur-2xl opacity-20 rounded-full group-hover:opacity-40 transition-opacity duration-500"></div>
                </div>

                <h2 className="mt-4 text-2xl font-bold text-center text-white tracking-tight">{partner.fullname || "Business Name"}</h2>
                
                <div className="flex items-center gap-2 mt-3 text-gray-400 text-xs font-medium bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/5">
                    <MapPin size={12} className="text-primary" />
                    <span className="truncate max-w-[200px]">{partner.address || "Location not set"}</span>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-8 mt-8 w-full justify-center px-4 py-4 bg-white/[0.02] rounded-2xl border border-white/5 mx-4">
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-xl font-bold text-white">{foodItems.length}</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Meals</span>
                    </div>
                    <div className="w-[1px] h-8 bg-white/10"></div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-xl font-bold text-white">15.2K</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Views</span>
                    </div>
                    <div className="w-[1px] h-8 bg-white/10"></div>
                     <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1">
                             <span className="text-xl font-bold text-white">4.9</span>
                             <Star size={12} className="fill-yellow-500 text-yellow-500" />
                        </div>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Rating</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 w-full max-w-sm">
                    <Link to="/create-food" className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 active:scale-[0.98] transition-all">
                        <Plus size={18} />
                        <span>Add New Meal</span>
                    </Link>
                </div>
            </div>

            {/* Menu Grid */}
            <div className="mt-10 px-2">
                <div className="flex items-center justify-between px-2 mb-4">
                    <h3 className="font-bold text-lg text-white">My Menu</h3>
                    <span className="text-xs text-gray-500">{foodItems.length} items</span>
                </div>
                
                <div className="grid grid-cols-3 gap-1">
                    {foodItems.map((item) => (
                        <div key={item._id} className="aspect-[3/4] bg-gray-900 rounded-md overflow-hidden relative group">
                            {item.video ? (
                                <video 
                                    src={item.video} 
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                    muted
                                    playsInline
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600">
                                    <UtensilsCrossed size={16} />
                                </div>
                            )}
                            
                             {/* Overlay for Name */}
                             <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                                 <p className="text-[10px] font-bold text-white truncate">{item.name}</p>
                             </div>

                             {/* Action Buttons */}
                             <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                                <button 
                                    onClick={(e) => openEditModal(item, e)}
                                    className="p-2 bg-black/60 text-white rounded-full hover:bg-primary hover:text-white transition-colors backdrop-blur-sm"
                                    title="Edit"
                                >
                                    <Edit size={14} />
                                </button>
                                <button 
                                    onClick={(e) => handleDelete(item._id, e)}
                                    className="p-2 bg-black/60 text-white rounded-full hover:bg-red-500 hover:text-white transition-colors backdrop-blur-sm"
                                    title="Delete"
                                >
                                    <Trash2 size={14} />
                                </button>
                             </div>
                        </div>
                    ))}
                    
                    {/* Empty State */}
                    {foodItems.length === 0 && (
                         <div className="col-span-3 flex flex-col items-center justify-center py-20 text-gray-500 gap-3">
                            <div className="bg-gray-900 p-4 rounded-full">
                                <UtensilsCrossed size={24} className="text-gray-600" />
                            </div>
                            <p className="text-sm font-medium">No meals uploaded yet.</p>
                         </div>
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            <EditFoodModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                foodItem={selectedItem} 
                onUpdate={handleUpdateSuccess} 
            />
        </div>
    );
}

export default PartnerProfile;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MapPin, UtensilsCrossed, Star, Users } from 'lucide-react';
import ProfleSkeleton from '../skeleton/ProfleSkeleton';

const Profile = () => {
    const { id } = useParams();
    const [partner, setPartner] = useState(null);
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/foodpartner/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPartner(response.data.foodpartner);
                setFoodItems(response.data.foodItems);
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProfile();
        }
    }, [id]);

    if (loading) {
        return <ProfleSkeleton />;
    }

    if (error || !partner) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-black text-white flex-col gap-4">
                <p className="text-red-500">{error || "Partner not found"}</p>
                <Link to="/home" className="text-blue-400 hover:underline">Go Back Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans pb-20">
             {/* Sticky Header / Nav */}
            <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-black/80 backdrop-blur-md border-b border-white/5">
                <Link to="/home" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all active:scale-95">
                    <ArrowLeft size={20} className="text-white" />
                </Link>
                <h1 className="font-bold text-sm uppercase tracking-widest text-white/80">Profile</h1>
                <div className="w-9"></div> {/* Spacer for alignment */}
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
                    <span className="truncate max-w-[200px]">{partner.address || "Location"}</span>
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
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Served</span>
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
            </div>

            {/* Menu Tabs / Divider */}
            <div className="mt-10 border-t border-white/10 sticky top-[72px] bg-black z-40">
                <div className="flex justify-center w-full">
                    <div className="border-t-2 border-primary py-4 px-10 cursor-pointer">
                        <UtensilsCrossed size={20} className="text-primary" />
                    </div>
                </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-3 gap-[2px]">
                {foodItems.map((item, index) => (
                    <div key={item._id || index} className="aspect-[9/16] bg-gray-900 relative group cursor-pointer overflow-hidden">
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
                        
                         {/* View Count Overlay (Mock) */}
                         <div className="absolute bottom-2 left-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                             <Users size={12} className="text-white drop-shadow-md" />
                             <span className="text-[10px] font-bold text-white drop-shadow-md">1.2k</span>
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
    );
};

export default Profile;

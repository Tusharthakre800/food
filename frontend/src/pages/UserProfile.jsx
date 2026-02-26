import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
    ArrowLeft, 
    Settings, 
    ShoppingBag, 
    Heart, 
    Bookmark, 
    MapPin, 
    LogOut, 
    ChevronRight, 
    User as UserIcon,
    Mail,
    Calendar,
    Bell,
    ShieldCheck,
    HelpCircle,
    Plus,
    Trash2,
    CheckCircle2,
    Home as HomeIcon,
    Briefcase,
    X,
    Camera,
    Loader2,
    Shield as PolicyIcon
} from 'lucide-react';
import toast from 'react-hot-toast';
import BottomBotton from '../bottombtn/BottomBotton';

import UserProfileskeleton from '../skeleton/UserProfileskeleton';

const UserProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [newAddress, setNewAddress] = useState({ label: 'Home', detail: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/user/login');
                    return;
                }

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/food/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data && response.data.user) {
                    setUser(response.data.user);
                    // Update localStorage with fresh data
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                // Fallback to localStorage if API fails
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser) {
                    setUser(storedUser);
                } else {
                    toast.error("Failed to load profile details");
                    navigate('/user/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleAddAddress = async (e) => {
        e.preventDefault();
        if (!newAddress.detail.trim()) {
            toast.error("Address detail is required");
            return;
        }

        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/food/user/address`,
                newAddress,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                setUser({ ...user, addresses: response.data.addresses });
                toast.success("Address added successfully");
                setShowAddressModal(false);
                setNewAddress({ label: 'Home', detail: '' });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add address");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteAddress = async (addressId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(
                `${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/food/user/address/${addressId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                setUser({ ...user, addresses: response.data.addresses });
                toast.success("Address deleted");
            }
        } catch (error) {
            toast.error("Failed to delete address");
        }
    };

    const handleSetDefault = async (addressId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/food/user/address/${addressId}/default`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                setUser({ ...user, addresses: response.data.addresses });
                toast.success("Default address updated");
            }
        } catch (error) {
            toast.error("Failed to update default address");
        }
    };

    const handleProfilePicUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            return;
        }

        const formData = new FormData();
        formData.append('profilePic', file);

        setIsUploading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/food/user/profile-pic`,
                formData,
                { 
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    } 
                }
            );

            if (response.status === 200) {
                setUser({ ...user, profilePic: response.data.profilePic });
                // Update localStorage
                const storedUser = JSON.parse(localStorage.getItem('user'));
                localStorage.setItem('user', JSON.stringify({ ...storedUser, profilePic: response.data.profilePic }));
                toast.success("Profile picture updated");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to upload image");
        } finally {
            setIsUploading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success("Logged out successfully");
        navigate('/user/login');
    };

    if (loading) {
        return <UserProfileskeleton />;
    }

    const menuItems = [
        { icon: <ShoppingBag size={20} />, label: "My Orders", path: "/order-list", color: "text-blue-400" },
        { icon: <Bookmark size={20} />, label: "Saved Items", path: "/saved", color: "text-yellow-400" },
        { icon: <PolicyIcon size={20} />, label: "Policy", path: "/policy", color: "text-yellow-400" },

    ];

    return (
        <div className="min-h-screen bg-black text-white pb-24 pt-15">
            {/* Header */}
            <div className="fixed h-16 bg-black top-0 left-0 right-0 z-10 p-4 flex items-center gap-4">
                <button 
                    onClick={() => navigate(-1)} 
                    className="p-2  transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="font-bold text-lg">My Profile</h1>
            </div>

            <div className="max-w-lg mx-auto p-6">
                {/* User Info Card */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative group mb-4">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-orange-500 p-1">
                            <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden border-4 border-black relative">
                                {user?.profilePic ? (
                                    <img 
                                        src={user.profilePic} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <UserIcon size={48} className="text-zinc-600" />
                                )}
                                
                                {isUploading && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <Loader2 size={24} className="text-primary animate-spin" />
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <label className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full border-4 border-black flex items-center justify-center cursor-pointer hover:scale-110 transition-transform active:scale-95">
                            <Camera size={14} className="text-white" />
                            <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={handleProfilePicUpload}
                                disabled={isUploading}
                            />
                        </label>
                    </div>
                    <h2 className="text-2xl font-bold">{user?.fullname || "User Name"}</h2>
                    <p className="text-zinc-400 flex items-center gap-1 text-sm mt-1">
                        <Mail size={14} />
                        {user?.email || "email@example.com"}
                    </p>
                    <div className="mt-4 flex gap-4">
                        <div className="bg-zinc-900/50 px-4 py-2 rounded-2xl border border-zinc-800 text-center">
                            <p className="text-xs text-zinc-500 uppercase font-bold tracking-tighter">Orders</p>
                            <p className="text-lg font-bold">{user?.orderCount || 0}</p>
                        </div>
                        <div className="bg-zinc-900/50 px-4 py-2 rounded-2xl border border-zinc-800 text-center">
                            <p className="text-xs text-zinc-500 uppercase font-bold tracking-tighter">Saved</p>
                            <p className="text-lg font-bold">{user?.savedCount || 0}</p>
                        </div>
                        <div className="bg-zinc-900/50 px-4 py-2 rounded-2xl border border-zinc-800 text-center">
                            <p className="text-xs text-zinc-500 uppercase font-bold tracking-tighter">Reviews</p>
                            <p className="text-lg font-bold">3.5</p>
                        </div>
                    </div>
                </div>

                {/* Saved Addresses Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <MapPin size={20} className="text-primary" />
                            Saved Addresses
                        </h3>
                        <button 
                            onClick={() => setShowAddressModal(true)}
                            className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-bold flex items-center gap-1 hover:bg-primary/20 transition-colors"
                        >
                            <Plus size={14} /> Add New
                        </button>
                    </div>

                    <div className="space-y-3">
                        {user?.addresses && user.addresses.length > 0 ? (
                            user.addresses.map((addr) => (
                                <div 
                                    key={addr._id}
                                    className={`p-4 rounded-2xl border transition-all ${
                                        addr.isDefault === 'yes' 
                                        ? 'bg-primary/5 border-primary/30 shadow-lg shadow-primary/5' 
                                        : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className={`p-1.5 rounded-lg ${
                                                addr.label === 'Home' ? 'bg-blue-500/10 text-blue-400' :
                                                addr.label === 'Work' ? 'bg-purple-500/10 text-purple-400' :
                                                'bg-zinc-700/50 text-zinc-400'
                                            }`}>
                                                {addr.label === 'Home' ? <HomeIcon size={16} /> : 
                                                 addr.label === 'Work' ? <Briefcase size={16} /> : 
                                                 <MapPin size={16} />}
                                            </div>
                                            <span className="font-bold text-sm">{addr.label}</span>
                                            {addr.isDefault === 'yes' && (
                                                <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Default</span>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            {addr.isDefault === 'no' && (
                                                <button 
                                                    onClick={() => handleSetDefault(addr._id)}
                                                    className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-primary transition-colors"
                                                    title="Set as Default"
                                                >
                                                    <CheckCircle2 size={18} />
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => handleDeleteAddress(addr._id)}
                                                className="p-2 hover:bg-red-500/10 rounded-lg text-zinc-500 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{addr.detail}</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 bg-zinc-900/20 rounded-2xl border border-dashed border-zinc-800">
                                <MapPin size={32} className="mx-auto text-zinc-700 mb-2 opacity-20" />
                                <p className="text-zinc-500 text-sm italic">No saved addresses yet</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Menu List */}
                <div className="space-y-2">
                    {menuItems.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => item.path !== '#' && navigate(item.path)}
                            className="w-full flex items-center justify-between p-4 bg-zinc-900/40 hover:bg-zinc-900 rounded-2xl border border-zinc-800/50 transition-all active:scale-[0.98]"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-xl bg-zinc-800 ${item.color}`}>
                                    {item.icon}
                                </div>
                                <span className="font-semibold">{item.label}</span>
                            </div>
                            <ChevronRight size={20} className="text-zinc-600" />
                        </button>
                    ))}
                </div>

                {/* Account Actions */}
                <div className="mt-8 space-y-3">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 font-bold transition-all active:scale-[0.98]"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                    <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-600 font-medium uppercase tracking-widest mt-6">
                        <Calendar size={12} />
                        Joined {user?.timestamp ? new Date(user.timestamp).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}
                    </div>
                </div>
            </div>

            {/* Add Address Modal */}
            {showAddressModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => !isSubmitting && setShowAddressModal(false)}></div>
                    <div className="relative w-full max-w-md bg-zinc-900 rounded-3xl border border-zinc-800 p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Add New Address</h2>
                            <button 
                                onClick={() => setShowAddressModal(false)}
                                className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddAddress} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 uppercase mb-2 ml-1">Label</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['Home', 'Work', 'Other'].map((label) => (
                                        <button
                                            key={label}
                                            type="button"
                                            onClick={() => setNewAddress({ ...newAddress, label })}
                                            className={`py-2 rounded-xl font-bold text-sm transition-all border ${
                                                newAddress.label === label 
                                                ? 'bg-primary border-primary text-white' 
                                                : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600'
                                            }`}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-zinc-500 uppercase mb-2 ml-1">Full Address</label>
                                <textarea
                                    value={newAddress.detail}
                                    onChange={(e) => setNewAddress({ ...newAddress, detail: e.target.value })}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white focus:outline-none focus:border-primary min-h-[100px] resize-none"
                                    placeholder="Enter your detailed address..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>Save Address</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <BottomBotton />
        </div>
    );
};

export default UserProfile;

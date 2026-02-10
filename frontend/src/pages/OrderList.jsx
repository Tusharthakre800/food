import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, MapPin, Clock, ChefHat, Home as HomeIcon, Bookmark } from 'lucide-react';
import toast from 'react-hot-toast';

const OrderList = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error("Please login to view orders");
                    navigate('/user/login');
                    return;
                }

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/food/order-list`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data && response.data.orders) {
                    // Sort orders by timestamp descending (newest first)
                    const sortedOrders = response.data.orders.sort((a, b) => 
                        new Date(b.timestamp) - new Date(a.timestamp)
                    );
                    setOrders(sortedOrders);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                toast.error("Failed to load order history");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white p-4">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-8 h-8 bg-gray-800 rounded-full animate-pulse"></div>
                    <div className="h-6 w-32 bg-gray-800 rounded animate-pulse"></div>
                </div>
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-zinc-900/50 rounded-xl p-4 mb-4 border border-zinc-800 animate-pulse">
                        <div className="flex justify-between mb-4">
                            <div className="h-4 w-24 bg-gray-800 rounded"></div>
                            <div className="h-4 w-16 bg-gray-800 rounded"></div>
                        </div>
                        <div className="h-16 bg-gray-800 rounded mb-4"></div>
                        <div className="h-4 w-1/2 bg-gray-800 rounded"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md p-4 flex items-center gap-4 border-b border-zinc-800">
                <button 
                    onClick={() => navigate('/home')}
                    className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold">Your Orders</h1>
            </div>

            <div className="p-4 max-w-2xl mx-auto">
                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                            <ShoppingBag size={40} className="text-zinc-500" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
                        <p className="text-zinc-400 mb-6">Looks like you haven't ordered anything yet.</p>
                        <button 
                            onClick={() => navigate('/home')}
                            className="bg-primary text-black px-6 py-2 rounded-full font-bold hover:bg-primary/90 transition-colors"
                        >
                            Start Ordering
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden">
                                {/* Order Header */}
                                <div className="p-4 border-b border-zinc-800 flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
                                            {order.foodPartnerId?.profilePicture ? (
                                                <img 
                                                    src={order.foodPartnerId.profilePicture} 
                                                    alt={order.foodPartnerId.fullname} 
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <ChefHat size={20} className="text-zinc-400" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">
                                                {order.foodPartnerId?.fullname || 'Restaurant'}
                                            </h3>
                                            <p className="text-xs text-zinc-400 flex items-center gap-1">
                                                <Clock size={12} />
                                                {new Date(order.timestamp).toLocaleDateString()} • {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                                        ${order.status === 'delivered' ? 'bg-green-500/20 text-green-400' : 
                                          order.status === 'cancelled' ? 'bg-red-500/20 text-red-400' : 
                                          'bg-yellow-500/20 text-yellow-400'}`}
                                    >
                                        {order.status}
                                    </span>
                                </div>

                                {/* Order Items */}
                                <div className="p-4 bg-zinc-900/30">
                                    <ul className="space-y-2">
                                        {order.items.map((item, idx) => (
                                            <li key={idx} className="flex justify-between items-center text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-xs font-mono">
                                                        {item.quantity}x
                                                    </span>
                                                    <span className="text-zinc-200">{item.name}</span>
                                                </div>
                                                <span className="text-zinc-400">₹{item.price * item.quantity}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Order Footer */}
                                <div className="p-4 bg-zinc-900 border-t border-zinc-800">
                                    <div className="flex items-center gap-2 mb-3 text-xs text-zinc-500">
                                        <MapPin size={14} />
                                        <p className="truncate">{order.address}</p>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-zinc-800/50">
                                        <span className="text-sm text-zinc-400">Total Amount</span>
                                        <span className="text-lg font-bold text-white">₹{order.totalPrice}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 w-full h-16 bg-transparent backdrop-blur-lg border-t border-white/20 flex items-center justify-around z-50">
                <Link
                    to="/home"
                    className="flex flex-col items-center gap-1 text-gray-300 hover:text-white transition-colors"
                >
                    <HomeIcon size={24} />
                    <span className="text-[10px] font-medium">Home</span>
                </Link>

                <Link
                    to="/saved"
                    className="flex flex-col items-center gap-1 text-gray-300 hover:text-white transition-colors"
                >
                    <Bookmark size={24} />
                    <span className="text-[10px] font-medium">Saved</span>
                </Link>

                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex flex-col items-center gap-1 text-primary hover:text-white transition-colors"
                >
                    <ShoppingBag size={24} />
                    <span className="text-[10px] font-medium">Orders</span>
                </button>
            </div>
        </div>
    );
};

export default OrderList;

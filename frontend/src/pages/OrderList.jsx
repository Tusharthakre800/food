import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, MapPin, Clock, ChefHat, Home as HomeIcon, Bookmark, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import BottomBotton from '../bottombtn/BottomBotton';
import OrderCancel from '../components/OrderCancel';
import OrderListSkeleton from '../skeleton/OrderlListSkeleton';


const OrderList = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error("Please login to view orders");
                    navigate('/user/login');
                    return;
                }

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/food/order-list`, {
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

    const handleCancelClick = (order) => {
        setSelectedOrder(order);
        setShowCancelModal(true);
    };

    const handleCancelSuccess = (orderId) => {
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order._id === orderId ? { ...order, status: 'cancelled' } : order
            )
        );
    };

    if (loading) {
        return <>
        <OrderListSkeleton />
        <OrderListSkeleton />
        <OrderListSkeleton />
        <OrderListSkeleton />
        <OrderListSkeleton />
        <OrderListSkeleton />

        </>
    }

    return (
        <div className="min-h-screen bg-black text-white pb-20 pt-14 ">
            {/* Header */}
            <div className="fixed h-16 w-full top-0 z-10 bg-black/80 backdrop-blur-md p-4 flex items-center gap-4 border-b border-zinc-800">
                <button 
                    onClick={() => navigate(-1)}
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
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                                        ${order.status === 'delivered' ? 'bg-green-500/20 text-green-400' : 
                                          order.status === 'cancelled' ? 'bg-red-500/20 text-red-400' : 
                                          order.status === 'confirmed' ? 'bg-blue-500/20 text-blue-400' :
                                          order.status === 'out-for-delivery' ? 'bg-orange-500/20 text-orange-400' :
                                          'bg-yellow-500/20 text-yellow-400'}`}
                                    >
                                        {order.status.replace(/-/g, ' ')}
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
                                        <div className="flex flex-col">
                                            <span className="text-sm text-zinc-400">Total Amount</span>
                                            <span className="text-lg font-bold text-white">₹{order.totalPrice}</span>
                                        </div>
                                        {order.status !== 'cancelled' && order.status !== 'delivered' && (
                                            <button
                                                onClick={() => handleCancelClick(order)}
                                                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors"
                                            >
                                                <XCircle size={14} />
                                                Cancel Order
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showCancelModal && selectedOrder && (
                <OrderCancel 
                    orderId={selectedOrder._id} 
                    onClose={() => setShowCancelModal(false)}
                    onCancelSuccess={handleCancelSuccess}
                />
            )}
            <BottomBotton />
        </div>
    );
};

export default OrderList;
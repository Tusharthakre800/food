import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, ShoppingBag, Utensils, BarChart2, Search, ArrowRight, ArrowLeft, Clock, CheckCircle, XCircle, DollarSign, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const AdminAllOrder = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        pendingOrders: 0,
        deliveredOrders: 0
    });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/admin/login');
                    return;
                }

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/admin/allorders`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                const ordersData = response.data;
                setOrders(ordersData);

                // Calculate Stats
                const totalRev = ordersData.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
                const pending = ordersData.filter(o => o.status === 'pending').length;
                const delivered = ordersData.filter(o => o.status === 'delivered').length;

                setStats({
                    totalRevenue: totalRev,
                    totalOrders: ordersData.length,
                    pendingOrders: pending,
                    deliveredOrders: delivered
                });

            } catch (error) {
                console.error("Error fetching orders:", error);
                toast.error("Failed to load orders");
                if (error.response?.status === 401 || error.response?.status === 403) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/admin/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    const filteredOrders = orders.filter(order => 
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userId?.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getStatusColor = (status) => {
        switch(status) {
            case 'delivered': return 'text-green-400 bg-green-400/10';
            case 'pending': return 'text-yellow-400 bg-yellow-400/10';
            case 'cancelled': return 'text-red-400 bg-red-400/10';
            default: return 'text-gray-400 bg-gray-400/10';
        }
    };

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
                    <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-white font-medium cursor-pointer">
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
                    <h1 className="text-xl font-bold">Orders</h1>
                    <button onClick={() => navigate('/admin/dashboard')} className="p-2 bg-white/5 text-gray-400 rounded-lg">
                        <ArrowRight size={20} />
                    </button>
                </header>

                <div className="p-8 pt-20 md:pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Order Management</h2>
                            <p className="text-gray-400">Track and manage all customer orders.</p>
                        </div>
                        
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search orders..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-900 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-primary"
                            />
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                            <div className="p-3 bg-green-500/10 text-green-500 rounded-lg">
                                <DollarSign size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Total Revenue</p>
                                <p className="text-xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg">
                                <Package size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Total Orders</p>
                                <p className="text-xl font-bold">{stats.totalOrders}</p>
                            </div>
                        </div>
                        <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                            <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-lg">
                                <Clock size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Pending</p>
                                <p className="text-xl font-bold">{stats.pendingOrders}</p>
                            </div>
                        </div>
                        <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                            <div className="p-3 bg-green-500/10 text-green-500 rounded-lg">
                                <CheckCircle size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Delivered</p>
                                <p className="text-xl font-bold">{stats.deliveredOrders}</p>
                            </div>
                        </div>
                    </div>

                    {/* Orders List */}
                    {loading ? (
                         <div className="flex items-center justify-center h-64">
                            <div className="text-gray-400 animate-pulse">Loading orders...</div>
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <ShoppingBag size={48} className="mb-4 opacity-50" />
                            <p>No orders found.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredOrders.map((order) => (
                                <div key={order._id} className="bg-gray-900/40 border border-white/10 rounded-xl p-4 hover:border-primary/30 transition-all">
                                    <div className="flex flex-col md:flex-row justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    #{order._id.slice(-6)}
                                                </span>
                                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                                    <Clock size={12} />
                                                    {new Date(order.timestamp).toLocaleString()}
                                                </span>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-semibold text-white">
                                                    ${order.totalPrice}
                                                </span>
                                                <span className="text-gray-400 text-sm">
                                                    • {order.items.length} items
                                                </span>
                                            </div>

                                            <div className="text-sm text-gray-400">
                                                {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end justify-between gap-2">
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-white">{order.userId?.fullname || 'Unknown User'}</p>
                                                <p className="text-xs text-gray-500">{order.address}</p>
                                            </div>
                                        </div>
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

export default AdminAllOrder;

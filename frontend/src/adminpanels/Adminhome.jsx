import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, ShoppingBag, Utensils, BarChart2, MessageSquare, TrendingUp, DollarSign, ArrowRight, Activity } from 'lucide-react';
import toast from 'react-hot-toast';

const Adminhome = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success("Admin logged out");
        navigate('/admin/login');
    };

    const stats = [
        { title: "Total Revenue", value: "₹45,231", icon: DollarSign, color: "text-green-500", bg: "bg-green-500/10" },
        { title: "Total Orders", value: "356", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10" },
        { title: "Active Users", value: "2,405", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
        { title: "Food Partners", value: "48", icon: Utensils, color: "text-orange-500", bg: "bg-orange-500/10" },
    ];

    const quickActions = [
        { title: "Manage Users", path: "/admin/users", icon: Users, desc: "View and manage registered users" },
        { title: "Manage Partners", path: "/admin/partners", icon: Utensils, desc: "Approve and manage food partners" },
        { title: "Manage Orders", path: "/admin/orders", icon: ShoppingBag, desc: "Track and update order status" },
        { title: "Manage Comments", path: "/admin/comments", icon: MessageSquare, desc: "Moderate user comments" },
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 border-r border-white/10 hidden md:flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-2xl font-bold text-primary">Food Reels Admin</h1>
                </div>
                
                <nav className="flex-1 p-4 space-y-2">
                    <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-white font-medium cursor-pointer">
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
                    <div onClick={() => navigate('/admin/comments')} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                        <MessageSquare size={20} />
                        <span>Comments</span>
                    </div>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Header for Mobile */}
                <header className="md:hidden fixed top-0 left-0 right-0 p-4 bg-gray-900 border-b border-white/10 flex justify-between items-center z-50">
                    <h1 className="text-xl font-bold">Dashboard</h1>
                    <button onClick={handleLogout} className="p-2 bg-white/5 text-red-400 rounded-lg">
                        <LogOut size={20} />
                    </button>
                </header>

                <div className="p-8 pt-20 md:pt-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-2">Welcome back, Admin 👋</h2>
                        <p className="text-gray-400">Here's what's happening with your app today.</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-gray-900/40 border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                                        <stat.icon size={24} />
                                    </div>
                                    <div className="flex items-center gap-1 text-green-400 text-xs font-medium bg-green-400/10 px-2 py-1 rounded-full">
                                        <TrendingUp size={12} />
                                        <span>+2.4%</span>
                                    </div>
                                </div>
                                <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Activity size={20} className="text-primary" />
                        Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {quickActions.map((action, index) => (
                            <div 
                                key={index}
                                onClick={() => navigate(action.path)}
                                className="group bg-gray-900/40 border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/5 hover:border-primary/50 transition-all relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-300">
                                    <action.icon size={64} />
                                </div>
                                <div className="relative z-10">
                                    <div className="p-3 bg-white/5 w-fit rounded-lg text-white mb-4 group-hover:bg-primary group-hover:text-black transition-colors">
                                        <action.icon size={24} />
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-2">{action.title}</h4>
                                    <p className="text-gray-400 text-sm mb-4">{action.desc}</p>
                                    <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                                        Access Now <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Adminhome;
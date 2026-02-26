import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, FileText, ChevronRight } from 'lucide-react';
import Policyskeleton from '../skeleton/Policyskeleton';

const PolicyPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Policyskeleton />;
    }

    const policies = [
        {
            title: "Privacy Policy",
            icon: <Lock size={20} className="text-primary" />,
            description: "How we collect, use, and protect your personal information.",
            lastUpdated: "Last updated: Feb 2026"
        },
        {
            title: "Terms of Service",
            icon: <FileText size={20} className="text-blue-400" />,
            description: "The rules and regulations for using our food delivery platform.",
            lastUpdated: "Last updated: Jan 2026"
        },
        {
            title: "Refund Policy",
            icon: <Shield size={20} className="text-green-400" />,
            description: "Information about cancellations, returns, and refund process.",
            lastUpdated: "Last updated: Dec 2025"
        },
        {
            title: "Cookie Policy",
            icon: <Eye size={20} className="text-orange-400" />,
            description: "How we use cookies to improve your browsing experience.",
            lastUpdated: "Last updated: Feb 2026"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white pb-10 pt-24">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10 p-4 flex items-center gap-4">
                <button 
                    onClick={() => navigate(-1)} 
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="font-bold text-lg">Legal & Policies</h1>
            </div>

            <div className="p-6 max-w-lg mx-auto">
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4">
                        <Shield size={32} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Our Commitment</h2>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        We are committed to protecting your data and providing a transparent experience. 
                        Please review our policies to understand how we operate.
                    </p>
                </div>

                <div className="space-y-4">
                    {policies.map((policy, index) => (
                        <div 
                            key={index} 
                            className="group p-5 bg-zinc-900/50 rounded-3xl border border-zinc-800 hover:border-primary/30 transition-all cursor-pointer"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-black/40 rounded-2xl border border-zinc-800 group-hover:bg-primary/10 transition-colors">
                                    {policy.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-bold text-white group-hover:text-primary transition-colors">
                                            {policy.title}
                                        </h3>
                                        <ChevronRight size={18} className="text-zinc-600 group-hover:text-primary transition-colors" />
                                    </div>
                                    <p className="text-zinc-400 text-xs mb-2 leading-snug">
                                        {policy.description}
                                    </p>
                                    <span className="text-[10px] text-zinc-600 font-medium">
                                        {policy.lastUpdated}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-6 bg-primary/5 rounded-3xl border border-primary/10 text-center">
                    <h4 className="font-bold text-sm mb-2 text-primary">Need Help?</h4>
                    <p className="text-zinc-500 text-xs mb-4">
                        If you have any questions regarding our policies, please contact our legal team.
                    </p>
                    <button className="text-primary text-xs font-bold border-b border-primary/30 pb-0.5 hover:border-primary transition-all">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PolicyPage;

import React from 'react';

const OrderListSkeleton = () => {
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
};

export default OrderListSkeleton;

import React from 'react';
import { ArrowLeft } from 'lucide-react';

const OrderPageSkeleton = () => {
    return (
        <div className="min-h-screen bg-black text-white pb-24">
            {/* Header Skeleton */}
            <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10 p-4 flex items-center gap-4">
                <div className="p-2 bg-white/10 rounded-full animate-pulse">
                    <div className="w-5 h-5 bg-gray-700 rounded-full" />
                </div>
                <div className="h-6 w-32 bg-gray-800 rounded animate-pulse" />
            </div>

            <div className="p-6 max-w-lg mx-auto space-y-6">
                {/* Item Card Skeleton */}
                <div className="bg-gray-900 rounded-2xl p-4 flex gap-4 border border-gray-800 animate-pulse">
                    <div className="w-24 h-24 rounded-xl bg-gray-800 shrink-0" />
                    <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="space-y-2">
                            <div className="h-6 w-3/4 bg-gray-800 rounded" />
                            <div className="h-4 w-1/2 bg-gray-800 rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="h-6 w-20 bg-gray-800 rounded" />
                            <div className="w-24 h-8 bg-gray-800 rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Delivery Info Skeleton */}
                <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 space-y-4 animate-pulse">
                    <div className="h-4 w-32 bg-gray-800 rounded mb-4" />
                    
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gray-800 rounded-full shrink-0" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-24 bg-gray-800 rounded" />
                            <div className="h-3 w-40 bg-gray-800 rounded" />
                        </div>
                        <div className="h-4 w-12 bg-gray-800 rounded" />
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gray-800 rounded-full shrink-0" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-24 bg-gray-800 rounded" />
                            <div className="h-3 w-20 bg-gray-800 rounded" />
                        </div>
                    </div>
                </div>

                {/* Order Summary Skeleton */}
                <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 space-y-3 animate-pulse">
                    <div className="h-4 w-32 bg-gray-800 rounded mb-4" />
                    
                    <div className="flex justify-between">
                        <div className="h-4 w-20 bg-gray-800 rounded" />
                        <div className="h-4 w-16 bg-gray-800 rounded" />
                    </div>
                    <div className="flex justify-between">
                        <div className="h-4 w-24 bg-gray-800 rounded" />
                        <div className="h-4 w-16 bg-gray-800 rounded" />
                    </div>
                    
                    <div className="h-px bg-gray-800 my-2" />
                    
                    <div className="flex justify-between">
                        <div className="h-6 w-16 bg-gray-800 rounded" />
                        <div className="h-6 w-24 bg-gray-800 rounded" />
                    </div>
                    <div className="h-3 w-48 bg-gray-800 rounded mx-auto mt-2" />
                </div>
            </div>

            {/* Bottom Action Skeleton */}
            <div className="fixed bottom-0 left-0 w-full p-4 bg-black/90 backdrop-blur-md border-t border-white/10">
                <div className="max-w-lg mx-auto flex items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <div className="h-3 w-10 bg-gray-800 rounded" />
                        <div className="h-6 w-20 bg-gray-800 rounded" />
                    </div>
                    <div className="flex-1 h-14 bg-gray-800 rounded-xl animate-pulse" />
                </div>
            </div>
        </div>
    );
};

export default OrderPageSkeleton;

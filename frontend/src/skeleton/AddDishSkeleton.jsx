import React from 'react';
import { ArrowLeft } from 'lucide-react';

const AddDishSkeleton = () => {
    return (
        <div className="min-h-screen bg-black text-white p-6 pb-20 font-sans animate-pulse">
            {/* Header Skeleton */}
            <div className="flex items-center gap-4 mb-8">
                <div className="h-8 w-48 bg-gray-800 rounded"></div>
            </div>

            <div className="space-y-6 max-w-md mx-auto">
                {/* Video Upload Skeleton */}
                <div className="w-full aspect-[16/10] bg-gray-800 rounded-2xl"></div>

                {/* Name Input Skeleton */}
                <div className="space-y-2">
                    <div className="h-4 w-20 bg-gray-800 rounded ml-1"></div>
                    <div className="w-full h-14 bg-gray-800 rounded-xl"></div>
                </div>

                {/* Price & Category Row Skeleton */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="h-4 w-16 bg-gray-800 rounded ml-1"></div>
                        <div className="w-full h-14 bg-gray-800 rounded-xl"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 w-20 bg-gray-800 rounded ml-1"></div>
                        <div className="w-full h-14 bg-gray-800 rounded-xl"></div>
                    </div>
                </div>

                {/* Description Skeleton */}
                <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-800 rounded ml-1"></div>
                    <div className="w-full h-32 bg-gray-800 rounded-xl"></div>
                </div>

                {/* Submit Button Skeleton */}
                <div className="w-full h-14 bg-gray-800 rounded-xl"></div>
                
                 {/* View Profile Button Skeleton */}
                 <div className="w-full h-14 bg-gray-800 rounded-xl mt-6"></div>
            </div>
        </div>
    );
};

export default AddDishSkeleton;

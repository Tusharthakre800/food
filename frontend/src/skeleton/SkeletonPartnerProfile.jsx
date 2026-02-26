import React from 'react';
import { ArrowLeft, LogOut } from 'lucide-react';

const SkeletonPartnerProfile = () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans pb-20 animate-pulse">
            {/* Sticky Header / Nav */}
            <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-black/80 backdrop-blur-md border-b border-white/5">
                <div className="w-9 h-9"></div> {/* Spacer */}
                <div className="h-4 w-32 bg-gray-800 rounded"></div>
                <div className="w-9 h-9 bg-gray-800 rounded-full"></div>
            </div>

            {/* Profile Info Section */}
            <div className="px-6 pt-6 flex flex-col items-center">
                {/* Avatar Skeleton */}
                <div className="relative group">
                    <div className="w-28 h-28 rounded-full border-[3px] border-black bg-gray-800 flex items-center justify-center shadow-2xl z-10 relative"></div>
                </div>

                {/* Name Skeleton */}
                <div className="mt-4 h-8 w-48 bg-gray-800 rounded"></div>
                
                {/* Address Skeleton */}
                <div className="mt-3 h-6 w-40 bg-gray-800 rounded-full"></div>

                {/* Stats Row Skeleton */}
                <div className="flex items-center gap-8 mt-8 w-full justify-center px-4 py-4 bg-white/[0.02] rounded-2xl border border-white/5 mx-4">
                    <div className="flex flex-col items-center gap-1">
                        <div className="h-6 w-8 bg-gray-800 rounded"></div>
                        <div className="h-3 w-10 bg-gray-800 rounded"></div>
                    </div>
                    <div className="w-[1px] h-8 bg-white/10"></div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="h-6 w-12 bg-gray-800 rounded"></div>
                        <div className="h-3 w-10 bg-gray-800 rounded"></div>
                    </div>
                    <div className="w-[1px] h-8 bg-white/10"></div>
                     <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1">
                             <div className="h-6 w-8 bg-gray-800 rounded"></div>
                        </div>
                        <div className="h-3 w-10 bg-gray-800 rounded"></div>
                    </div>
                </div>

                {/* Action Buttons Skeleton */}
                <div className="mt-8 w-full max-w-sm">
                    <div className="h-12 w-full bg-gray-800 rounded-xl"></div>
                </div>
            </div>

            {/* Menu Grid Skeleton */}
            <div className="mt-10 px-2">
                <div className="flex items-center justify-between px-2 mb-4">
                    <div className="h-6 w-24 bg-gray-800 rounded"></div>
                    <div className="h-4 w-16 bg-gray-800 rounded"></div>
                </div>
                
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                        <div key={item} className="aspect-square bg-gray-900 rounded-md"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkeletonPartnerProfile;

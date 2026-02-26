import React from 'react';
import { ArrowLeft, MapPin, UtensilsCrossed, Star } from 'lucide-react';

const ProfleSkeleton = () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans pb-20 animate-pulse">
            {/* Sticky Header / Nav */}
            <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-black/80 backdrop-blur-md border-b border-white/5">
                <div className="p-2 bg-white/10 rounded-full h-9 w-9"></div>
                <div className="h-4 w-20 bg-gray-800 rounded"></div>
                <div className="w-9"></div>
            </div>

            {/* Profile Info Section */}
            <div className="px-6 pt-6 flex flex-col items-center">
                {/* Avatar */}
                <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-gray-800 border-[3px] border-black"></div>
                </div>

                <div className="mt-4 h-8 w-48 bg-gray-800 rounded"></div>
                
                <div className="mt-3 h-8 w-32 bg-gray-800 rounded-full"></div>

                {/* Stats Row */}
                <div className="flex items-center gap-8 mt-8 w-full justify-center px-4 py-4 bg-white/[0.02] rounded-2xl border border-white/5 mx-4">
                    <div className="flex flex-col items-center gap-1">
                        <div className="h-6 w-8 bg-gray-800 rounded"></div>
                        <div className="h-3 w-10 bg-gray-800 rounded"></div>
                    </div>
                    <div className="w-[1px] h-8 bg-white/10"></div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="h-6 w-12 bg-gray-800 rounded"></div>
                        <div className="h-3 w-12 bg-gray-800 rounded"></div>
                    </div>
                    <div className="w-[1px] h-8 bg-white/10"></div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1">
                            <div className="h-6 w-8 bg-gray-800 rounded"></div>
                        </div>
                        <div className="h-3 w-12 bg-gray-800 rounded"></div>
                    </div>
                </div>
            </div>

            {/* Menu Tabs / Divider */}
            <div className="mt-10 border-t border-white/10 sticky top-[72px] bg-black z-40">
                <div className="flex justify-center w-full">
                    <div className="border-t-2 border-primary/50 py-4 px-10">
                        <div className="w-5 h-5 bg-gray-800 rounded"></div>
                    </div>
                </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-3 gap-[2px]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                    <div key={item} className="aspect-[9/16] bg-gray-900"></div>
                ))}
            </div>
        </div>
    );
};

export default ProfleSkeleton;

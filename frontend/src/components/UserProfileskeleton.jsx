import React from 'react';

const UserProfileskeleton = () => {
    return (
        <div className="min-h-screen bg-black text-white pb-24 animate-pulse">
            {/* Header Skeleton */}
            <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10 p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-full"></div>
                <div className="h-6 w-32 bg-zinc-800 rounded-md"></div>
            </div>

            <div className="p-6 max-w-lg mx-auto">
                {/* Profile Section Skeleton */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-zinc-800 mb-4"></div>
                    <div className="h-8 w-48 bg-zinc-800 rounded-md mb-2"></div>
                    <div className="h-4 w-32 bg-zinc-800 rounded-md"></div>
                </div>

                {/* Stats Skeleton */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-zinc-900/50 px-4 py-3 rounded-2xl border border-zinc-800 flex flex-col items-center gap-2">
                            <div className="h-3 w-12 bg-zinc-800 rounded"></div>
                            <div className="h-6 w-8 bg-zinc-800 rounded"></div>
                        </div>
                    ))}
                </div>

                {/* Info List Skeleton */}
                <div className="space-y-4 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                            <div className="w-10 h-10 bg-zinc-800 rounded-xl"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-1/4 bg-zinc-800 rounded"></div>
                                <div className="h-3 w-1/2 bg-zinc-800 rounded"></div>
                            </div>
                            <div className="w-5 h-5 bg-zinc-800 rounded"></div>
                        </div>
                    ))}
                </div>

                {/* Address Section Skeleton */}
                <div className="bg-zinc-900/50 rounded-3xl p-6 border border-zinc-800 space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <div className="h-6 w-32 bg-zinc-800 rounded-md"></div>
                        <div className="h-8 w-24 bg-zinc-800 rounded-full"></div>
                    </div>
                    {[1, 2].map((i) => (
                        <div key={i} className="p-4 bg-black/40 rounded-2xl border border-zinc-800/50">
                            <div className="flex justify-between mb-2">
                                <div className="h-4 w-20 bg-zinc-800 rounded"></div>
                                <div className="h-4 w-4 bg-zinc-800 rounded"></div>
                            </div>
                            <div className="h-3 w-full bg-zinc-800 rounded mb-1"></div>
                            <div className="h-3 w-2/3 bg-zinc-800 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserProfileskeleton;

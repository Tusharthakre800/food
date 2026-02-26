import React from 'react';

const Policyskeleton = () => {
    return (
        <div className="min-h-screen bg-black text-white pb-10 animate-pulse">
            {/* Header Skeleton */}
            <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10 p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-full"></div>
                <div className="h-6 w-32 bg-zinc-800 rounded-md"></div>
            </div>

            <div className="p-6 max-w-lg mx-auto">
                {/* Intro Section Skeleton */}
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="w-16 h-16 bg-zinc-800 rounded-2xl mb-4"></div>
                    <div className="h-8 w-48 bg-zinc-800 rounded-md mb-2"></div>
                    <div className="h-4 w-full bg-zinc-800 rounded-md opacity-50"></div>
                    <div className="h-4 w-2/3 bg-zinc-800 rounded-md mt-2 opacity-50"></div>
                </div>

                {/* Policy List Skeleton */}
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="p-5 bg-zinc-900/50 rounded-3xl border border-zinc-800">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-zinc-800 rounded-2xl w-11 h-11"></div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="h-5 w-32 bg-zinc-800 rounded"></div>
                                        <div className="w-4 h-4 bg-zinc-800 rounded"></div>
                                    </div>
                                    <div className="h-3 w-full bg-zinc-800 rounded mb-2 opacity-50"></div>
                                    <div className="h-2 w-20 bg-zinc-800 rounded opacity-30"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Help Skeleton */}
                <div className="mt-12 p-8 bg-zinc-900/30 rounded-3xl border border-zinc-800 text-center">
                    <div className="h-4 w-24 bg-zinc-800 rounded mx-auto mb-3"></div>
                    <div className="h-3 w-48 bg-zinc-800 rounded mx-auto mb-4 opacity-50"></div>
                    <div className="h-4 w-32 bg-zinc-800 rounded mx-auto opacity-30"></div>
                </div>
            </div>
        </div>
    );
};

export default Policyskeleton;

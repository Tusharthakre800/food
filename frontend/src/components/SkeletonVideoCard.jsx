import React from 'react';

const SkeletonVideoCard = () => {
    return (
        <div className="h-screen w-full snap-start relative bg-black flex justify-center">
            <div className="h-full w-full max-w-[500px] relative bg-gray-900 overflow-hidden animate-pulse">
                {/* Video Background Placeholder */}
                <div className="absolute inset-0 bg-gray-800 z-0"></div>

                {/* Right Side Actions Placeholder */}
                <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-20 items-center">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                            <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                            <div className="w-8 h-3 bg-gray-700 rounded"></div>
                        </div>
                    ))}
                </div>

                {/* Bottom Content Area Placeholder */}
                <div className="absolute bottom-16 left-0 w-full p-6 pb-8 z-20 flex flex-col gap-4">
                    
                    {/* Info Section */}
                    <div className="flex flex-col gap-3 max-w-[85%]">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-700 rounded-lg"></div>
                            <div className="w-48 h-6 bg-gray-700 rounded"></div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="w-16 h-5 bg-gray-700 rounded"></div>
                            <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                            <div className="w-12 h-5 bg-gray-700 rounded"></div>
                        </div>

                        {/* Description lines */}
                        <div className="w-full h-4 bg-gray-700 rounded"></div>
                        <div className="w-3/4 h-4 bg-gray-700 rounded"></div>
                    </div>

                    {/* Visit Store Button Placeholder */}
                    <div className="w-full h-14 bg-gray-700 rounded-xl"></div>
                </div>
            </div>
        </div>
    );
};



export default SkeletonVideoCard;
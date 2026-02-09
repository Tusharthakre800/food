import React from 'react';

const SkeletonComment = () => {
    return (
        <div className="flex gap-3 animate-pulse">
            {/* Avatar Skeleton */}
            <div className="w-8 h-8 rounded-full bg-gray-700 shrink-0"></div>
            
            {/* Content Skeleton */}
            <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                    <div className="w-24 h-4 bg-gray-700 rounded"></div>
                    <div className="w-12 h-3 bg-gray-800 rounded"></div>
                </div>
                <div className="w-full h-3 bg-gray-700 rounded"></div>
                <div className="w-3/4 h-3 bg-gray-700 rounded"></div>
            </div>
        </div>
    );
};

export default SkeletonComment;
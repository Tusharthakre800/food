import React from 'react';
import { Heart } from 'lucide-react';

const LikeButton = ({ isLiked, likeCount, onLike }) => {
    return (
        <button onClick={onLike} className="flex flex-col items-center gap-1 group">
            <div className="p-3 bg-black/40 rounded-full backdrop-blur-md group-active:scale-90 transition-transform">
                <Heart size={28} className={`transition-colors ${isLiked ? 'text-red-500 fill-red-500' : 'text-white group-hover:text-red-500'}`} />
            </div>
            <span className="text-xs font-medium shadow-black drop-shadow-md">{likeCount}</span>
        </button>
    );
};

export default LikeButton;
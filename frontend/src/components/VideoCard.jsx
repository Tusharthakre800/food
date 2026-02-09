import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store, Share2, ThumbsUp, ThumbsDown } from 'lucide-react';
import axios from 'axios';
import LikeButton from './LikeButton';
import Comment from './Comment';
import Save from './Save';

const VideoCard = ({ item }) => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    
    // Like state lifted up
    const [isLiked, setIsLiked] = useState(item.isLiked || false);
    const [likeCount, setLikeCount] = useState(item.likeCount || 0);
    const [showLikeAnimation, setShowLikeAnimation] = useState(false);
    const [showUnlikeAnimation, setShowUnlikeAnimation] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const lastClickTime = useRef(0);

    const handleLike = async (e) => {
        e?.stopPropagation();
        
        // Optimistic update
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        setLikeCount(prev => newIsLiked ? prev + 1 : prev - 1);

        // Show animation based on new state
        if (newIsLiked) {
            setShowLikeAnimation(true);
            setTimeout(() => setShowLikeAnimation(false), 1000);
        } else {
            setShowUnlikeAnimation(true);
            setTimeout(() => setShowUnlikeAnimation(false), 1000);
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/food/like`, 
                { foodId: item._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error("Error liking food item:", error);
            // Revert on error
            setIsLiked(isLiked); // Revert to original state (which was isLiked before update)
            setLikeCount(prev => isLiked ? prev + 1 : prev - 1); // Logic: if original was true (so we made it false), now revert to true (add 1). If original was false (we made it true), revert to false (sub 1).
            // Wait, logic check:
            // Original: false. New: true. Count: +1.
            // Revert: setIsLiked(false). Count: sub 1.
            // isLiked (closure) is false.
            // setLikeCount(prev => false ? ... : prev - 1) -> prev - 1. Correct.
            
            // Original: true. New: false. Count: -1.
            // Revert: setIsLiked(true). Count: add 1.
            // isLiked (closure) is true.
            // setLikeCount(prev => true ? prev + 1 : ...) -> prev + 1. Correct.
        }
    };

    const handleBuy = (e) => {
        e.stopPropagation();
        navigate('/order-food', { state: { item } });
    };

    const handleVideoClick = (e) => {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - lastClickTime.current;
        
        if (timeDiff < 300) {
            // Double click detected
            if (!isLiked) {
                handleLike(e);
            } else {
                // Just show animation if already liked
                setShowLikeAnimation(true);
                setTimeout(() => setShowLikeAnimation(false), 1000);
            }
        } else {
            // Single click - toggle play
            togglePlay();
        }
        lastClickTime.current = currentTime;
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div ref={containerRef} className="h-screen w-full snap-start relative bg-gray-900 flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0" onClick={handleVideoClick}>
                <video 
                    ref={videoRef}
                    src={item.video } 
                    className="h-full w-full object-cover cursor-pointer"
                    loop
                    muted // Muted needed for autoplay policy usually
                    autoPlay
                    playsInline
                    preload="metadata"
                />
                 {/* Play/Pause Overlay Indicator (optional) */}
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                        <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                        </div>
                    </div>
                )}

                {/* Like Animation Overlay */}
                {showLikeAnimation && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                        <div className="bg-white/20 p-6 rounded-full backdrop-blur-md animate-like-pop">
                            <ThumbsUp size={80} className="text-white fill-white drop-shadow-2xl" />
                        </div>
                    </div>
                )}
                
                {/* Unlike Animation Overlay */}
                {showUnlikeAnimation && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                        <div className="bg-black/40 p-6 rounded-full backdrop-blur-md animate-dislike-shake">
                            <ThumbsDown size={80} className="text-white-500 fill-white-500 drop-shadow-2xl" />
                        </div>
                    </div>
                )}
            </div>

            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 pointer-events-none z-10"></div>

            {/* Right Side Actions (Like, Share, etc. - typical for reels) */}
            <div className="absolute right-4 bottom-40 flex flex-col gap-3 z-30 items-center">
                <LikeButton isLiked={isLiked} likeCount={likeCount} onLike={handleLike} />
                <Comment item={item} containerRef={containerRef} />
                <Save item={item} />
                <button onClick={handleBuy} className="flex flex-col items-center gap-6 group cursor-pointer">
                    <div className="p-3 bg-black/40 rounded-full backdrop-blur-md group-active:scale-90 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-green-400 transition-colors">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </div>
                    {/* <span className="text-xs font-medium shadow-black drop-shadow-md">Buy</span> */}
                </button>
                {/* <button className="flex flex-col items-center gap-6 group">
                    <div className="p-3 bg-black/40 rounded-full backdrop-blur-md group-active:scale-90 transition-transform">
                        <Share2 size={28} className="text-white group-hover:text-blue-400 transition-colors" />
                    </div>
                    <span className="text-xs font-medium shadow-black drop-shadow-md">Share</span>
                </button> */}
            </div>

            {/* Bottom Content Area */}
            <div className="absolute bottom-16 left-0 w-full p-6 pb-8 z-20 flex flex-col gap-4">
                
                {/* Info Section */}
                <div className="flex flex-col gap-2 max-w-[85%]">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/20 p-1.5 rounded-lg backdrop-blur-md">
                            <Store size={16} className="text-primary" />
                        </div>
                        <h3 className="font-bold text-lg text-white drop-shadow-md">{item.name || "Delicious Dish"}</h3>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-200">
                        <span className="bg-white/20 px-2 py-0.5 rounded text-xs backdrop-blur-sm">{item.category || "Food"}</span>
                        <span>•</span>
                        <span className="font-semibold text-primary">${item.price || "0.00"}</span>
                    </div>

                    {/* Description - Truncated to 2 lines */}
                    <div>
                        <p className={`text-sm text-gray-200 drop-shadow-md opacity-90 transition-all duration-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
                            {item.description || "No description available for this amazing dish. Tap to learn more!"}
                        </p>
                        {item.description && item.description.length > 80 && (
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsExpanded(!isExpanded);
                                }}
                                className="text-xs text-blue-200  mt-1  focus:outline-none"
                            >
                                {isExpanded ? 'Show Less' : 'Read More'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Visit Store Button */}
                <Link to={"/partner/" + item.foodPartnerId} className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                    <Store size={18} />
                    <span>Visit Store</span>
                </Link>
            </div>
        </div>
    );
}

export default VideoCard;
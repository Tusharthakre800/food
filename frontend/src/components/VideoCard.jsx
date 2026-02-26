import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store, Share2, ThumbsUp, ThumbsDown } from 'lucide-react';
import axios from 'axios';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import LikeButton from './LikeButton';
import Comment from './Comment';
import Save from './Save';

const VideoCard = ({ item }) => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const actionsRef = useRef(null);
    const likeOverlayRef = useRef(null);
    const unlikeOverlayRef = useRef(null);
    
    // Like state lifted up
    const [isLiked, setIsLiked] = useState(item.isLiked || false);
    const [likeCount, setLikeCount] = useState(item.likeCount || 0);
    const [showLikeAnimation, setShowLikeAnimation] = useState(false);
    const [showUnlikeAnimation, setShowUnlikeAnimation] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const lastClickTime = useRef(0);

    // GSAP Animations for Like/Unlike Overlays
    useGSAP(() => {
        if (showLikeAnimation) {
            gsap.fromTo(likeOverlayRef.current, 
                { scale: 0, opacity: 0 },
                { scale: 1.2, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
            );
            gsap.to(likeOverlayRef.current, {
                scale: 0.8, opacity: 0, delay: 0.7, duration: 0.2, ease: "power2.in"
            });
        }
    }, [showLikeAnimation]);

    useGSAP(() => {
        if (showUnlikeAnimation) {
            gsap.fromTo(unlikeOverlayRef.current, 
                { scale: 0, opacity: 0 },
                { scale: 1.2, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
            );
            gsap.to(unlikeOverlayRef.current, {
                scale: 0.8, opacity: 0, delay: 0.7, duration: 0.2, ease: "power2.in"
            });
        }
    }, [showUnlikeAnimation]);

    // Entrance animation for content and actions
    useGSAP(() => {
        gsap.from(contentRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2
        });
        gsap.from(actionsRef.current.children, {
            x: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.4
        });
    }, { scope: containerRef });

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
            setIsLiked(isLiked); 
            setLikeCount(prev => isLiked ? prev + 1 : prev - 1);
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
        }
        lastClickTime.current = currentTime;
    };

    return (
        <div ref={containerRef} className="h-screen w-full snap-start relative bg-black flex justify-center">
            <div className="h-full w-full max-w-[500px] relative bg-gray-900 overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 z-0" onClick={handleVideoClick}>
                    <video 
                        ref={videoRef}
                        src={item.video } 
                        className="h-full w-full object-cover cursor-pointer"
                        loop
                        muted 
                        autoPlay
                        playsInline
                        preload="metadata"
                    />

                    {/* Like Animation Overlay */}
                    {showLikeAnimation && (
                        <div ref={likeOverlayRef} className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                            <div className="bg-white/20 p-6 rounded-full backdrop-blur-md">
                                <ThumbsUp className="w-20 h-20 text-white fill-white drop-shadow-2xl" />
                            </div>
                        </div>
                    )}
                    
                    {/* Unlike Animation Overlay */}
                    {showUnlikeAnimation && (
                        <div ref={unlikeOverlayRef} className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                            <div className="bg-black/40 p-6 rounded-full backdrop-blur-md">
                                <ThumbsDown className="w-20 h-20 text-white-500 fill-white-500 drop-shadow-2xl" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 pointer-events-none z-10"></div>

                {/* Right Side Actions */}
                <div ref={actionsRef} className="absolute right-4 bottom-35 flex flex-col gap-1 z-30 items-center">
                    <LikeButton isLiked={isLiked} likeCount={likeCount} onLike={handleLike} />
                    <Comment item={item} containerRef={containerRef} commentCount={item.commentCount} />
                    <Save item={item} />
                    <button onClick={handleBuy} className="flex flex-col items-center gap-6 group cursor-pointer">
                        <div className="p-3 bg-black/40 rounded-full backdrop-blur-md group-active:scale-90 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-green-400 transition-colors">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </div>
                    </button>
                </div>

                {/* Bottom Content Area */}
                <div ref={contentRef} className="absolute bottom-0 left-0 w-full p-6 pb-[calc(5rem+env(safe-area-inset-bottom))] z-20 flex flex-col gap-4">
                    
                    {/* Info Section */}
                    <div className="flex flex-col gap-2 max-w-[85%]">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary/20 p-1.5 rounded-lg backdrop-blur-md">
                                <Store className="w-4 h-4 text-primary" />
                            </div>
                            <h3 className="font-bold text-lg text-white drop-shadow-md">{item.name || "Delicious Dish"}</h3>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-200">
                            <span className="bg-white/20 px-2 py-0.5 rounded text-xs backdrop-blur-sm">{item.category || "Food"}</span>
                            <span>•</span>
                            <span className="font-semibold text-primary">${item.price || "0.00"}</span>
                        </div>

                        {/* Description */}
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
                                    className="text-xs text-blue-200 mt-1 focus:outline-none"
                                >
                                    {isExpanded ? 'Show Less' : 'Read More'}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Visit Store Button */}
                    <Link to={"/partner/" + item.foodPartnerId} className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                        <Store className="w-4.5 h-4.5" />
                        <span>Visit Store</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default VideoCard;
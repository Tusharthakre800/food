import React, { useRef } from 'react';
import { Heart } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const LikeButton = ({ isLiked, likeCount, onLike }) => {
    const heartRef = useRef(null);
    const containerRef = useRef(null);

    const handleLikeClick = (e) => {
        // Run animation
        const tl = gsap.timeline();
        
        if (!isLiked) {
            // "Pop" animation when liking
            tl.to(heartRef.current, {
                scale: 1.5,
                duration: 0.1,
                ease: "power2.out"
            })
            .to(heartRef.current, {
                scale: 1,
                duration: 0.4,
                ease: "elastic.out(1, 0.3)"
            });

            // Particle/Glow effect simulation
            gsap.fromTo(containerRef.current, 
                { boxShadow: "0 0 0px rgba(239, 68, 68, 0)" },
                { 
                    boxShadow: "0 0 20px rgba(239, 68, 68, 0.6)", 
                    duration: 0.2, 
                    yoyo: true, 
                    repeat: 1 
                }
            );
        } else {
            // "Shake" or subtle scale down when unliking
            tl.to(heartRef.current, {
                scale: 0.8,
                duration: 0.1,
                ease: "power2.in"
            })
            .to(heartRef.current, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        }

        // Call the original onLike handler
        onLike(e);
    };

    return (
        <button onClick={handleLikeClick} className="flex flex-col items-center gap-1 group">
            <div 
                ref={containerRef}
                className="p-3 bg-black/40 rounded-full backdrop-blur-md group-active:scale-90 transition-transform overflow-visible"
            >
                <div ref={heartRef}>
                    <Heart 
                        size={28} 
                        className={`transition-colors duration-300 ${isLiked ? 'text-red-500 fill-red-500' : 'text-white group-hover:text-red-500'}`} 
                    />
                </div>
            </div>
            <span className="text-xs font-medium shadow-black drop-shadow-md">{likeCount}</span>
        </button>
    );
};

export default LikeButton;
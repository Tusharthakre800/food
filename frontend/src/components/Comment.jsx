import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, X } from 'lucide-react';
import axios from 'axios';
import SkeletonComment from '../skeleton/SkeletonComment';

const Comment = ({ item, containerRef }) => {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [loadingComments, setLoadingComments] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [commentCount, setCommentCount] = useState(item.commentCount || 0);

    const toggleComments = async (e) => {
        e.stopPropagation();
        if (!showComments) {
            setShowComments(true);
            fetchComments();
        } else {
            setShowComments(false);
        }
    };

    const fetchComments = async () => {
        try {
            setLoadingComments(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/food/comments/${item._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setComments(response.data.comments || []);
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoadingComments(false);
        }
    }

    const handlePostComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/food/comment`, 
                { foodId: item._id, content: commentText , commentCount: commentCount + 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            // Add new comment to list
            setComments([response.data.comment, ...comments]);
            setCommentCount(commentCount + 1);
            setCommentText('');
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    return (
        <>
            <button onClick={toggleComments} className="flex flex-col items-center gap-1 group z-10000">
                <div className="p-3 bg-black/40 rounded-full backdrop-blur-md group-active:scale-90 transition-transform">
                    <MessageCircle size={28} className="text-white group-hover:text-blue-500 transition-colors" />
                </div>
                <span className="text-xs font-medium shadow-black drop-shadow-md">{commentCount}</span>
            </button>

            {/* Comment Drawer - Portaled to the VideoCard container */}
            {showComments && containerRef?.current && createPortal(
                <>
                    <div 
                        className="absolute inset-0 z-40 bg-black/20 backdrop-blur-[1px]" 
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowComments(false);
                        }}
                    />
                    <div className="absolute bottom-0 left-0 w-full h-[70vh] bg-black/90 backdrop-blur-xl rounded-t-3xl z-50 flex flex-col shadow-2xl border-t border-white/10 transition-transform duration-300 ease-in-out" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <h3 className="font-bold text-lg text-white">Comments ({comments.length})</h3>
                        <button onClick={() => setShowComments(false)} className="p-1 hover:bg-white/10 rounded-full text-white">
                            <X size={24} />
                        </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {loadingComments ? (
                            // Show multiple skeletons
                            <>
                                <SkeletonComment />
                                <SkeletonComment />
                                <SkeletonComment />
                                <SkeletonComment />
                                <SkeletonComment />
                                <SkeletonComment />
                                <SkeletonComment />
                                <SkeletonComment />
                                <SkeletonComment />
                                <SkeletonComment />
                                <SkeletonComment />
                                <SkeletonComment />
                            </>
                        ) : comments.length === 0 ? (
                            <div className="text-center text-gray-400 mt-10">No comments yet. Be the first!</div>
                        ) : (
                            comments.map(comment => (
                                <div key={comment._id} className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold uppercase text-white shrink-0">
                                        {comment.user?.fullname?.[0] || 'U'}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-semibold text-sm text-gray-200">{comment.user?.fullname || 'User'}</span>
                                            <span className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-sm text-gray-300 mt-0.5">{comment.content}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <form onSubmit={handlePostComment} className="p-4 mb-14 border-t border-white/10 flex gap-2">
                        <input 
                            type="text" 
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 bg-white/10 border-none rounded-full px-4 py-2.5 text-sm focus:ring-1 focus:ring-primary outline-none text-white placeholder-gray-400"
                        />
                        <button type="submit" disabled={!commentText.trim() || isPosting} className="text-primary font-semibold disabled:opacity-50 px-2">
                            {isPosting ? 'Posting...' : 'Post'}
                        </button>
                    </form>
                 </div>
                 </>,
                 containerRef.current
            )}
        </>
    );
};

export default Comment;
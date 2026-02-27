import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';
import axios from 'axios';

const Save = ({ item }) => {
    const [isSaved, setIsSaved] = useState(item.isSaved || false);

    const handleSave = async (e) => {
        e?.stopPropagation();
        try {
            const token = localStorage.getItem('token');
            // Optimistic update
            const newIsSaved = !isSaved;
            setIsSaved(newIsSaved);

            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/food/save`, 
                { foodId: item._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error("Error saving food item:", error);
            // Revert on error
            setIsSaved(!isSaved);
        }
    };

    return (
        <button onClick={handleSave} className="flex flex-col items-center gap-1 group">
            <div className="p-3 bg-black/40 rounded-full backdrop-blur-md group-active:scale-90 transition-transform">
                <Bookmark size={28} className={`transition-colors ${isSaved ? 'text-yellow-500 fill-yellow-500' : 'text-white group-hover:text-yellow-500'}`} />
            </div>
            <span className="text-xs font-medium shadow-black drop-shadow-md">{isSaved ? 'Saved' : 'Save'}</span>
        </button>
    );
};

export default Save;
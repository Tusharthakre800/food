import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Search, X, TrendingUp, Clock, Star, ChefHat, Loader } from 'lucide-react';
import BottomBotton from '../bottombtn/BottomBotton';
import VideoCard from '../components/VideoCard';

const SearchFood = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

   

    // Debounce search effect
    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query.trim()) {
                setSearchResults([]);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/food/search?q=${encodeURIComponent(query)}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSearchResults(response.data.foodItems || []);
            } catch (err) {
                console.error("Error searching food items:", err);
                setError("Failed to fetch search results");
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchSearchResults();
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [query]);

    return (
        <div className="min-h-screen bg-black text-white pb-24 font-sans">
            {/* Header & Search Bar */}
            <div className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md p-4 border-b border-zinc-800">
                <div className="flex items-center gap-3 max-w-xl mx-auto">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="p-2 hover:bg-zinc-800 rounded-full transition-colors active:scale-95 "
                    >
                        <ArrowLeft size={24} className="text-zinc-400" />
                    </button>
                    <div className="flex-1 relative group">
                        <Search className="absolute left-3 top-4 -translate-y-12/2 text-zinc-500 group-focus-within:text-primary transition-colors pt-" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search for food, restaurants..." 
                            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-full py-3 pl-10 pr-10 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 placeholder-zinc-500 transition-all shadow-inner"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            autoFocus
                        />
                        {query && (
                            <button 
                                onClick={() => setQuery('')}
                                className="absolute right-3 top-8 -translate-y-1/2 p-1 bg-zinc-800 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
                            >
                                <X size={12} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-4 max-w-xl mx-auto">
                {/* Recent Searches - Show only when query is empty */}
                {!query && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Recent Searches</h3>
                                <button className="text-xs text-primary hover:underline">Clear all</button>
                            </div>
                            
                        </div>

                
                    
                    </div>
                )}

                {/* Search Results */}
                {query && (
                    <div className="animate-in fade-in duration-300">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                           Results for <span className="text-primary">"{query}"</span>
                        </h3>
                        
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <Loader className="animate-spin text-primary mb-4" size={32} />
                                <p className="text-zinc-500 text-sm">Searching delicious food...</p>
                            </div>
                        ) : error ? (
                             <div className="flex flex-col items-center justify-center py-12 text-red-400">
                                <p>{error}</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {searchResults.length > 0 ? (
                                    searchResults.map((item) => (
                                        <div 
                                            key={item._id} 
                                            onClick={() => navigate('/order-food', { state: { item } })}
                                            className="flex gap-4 bg-zinc-900/40 p-3 rounded-2xl border border-zinc-800/50 hover:bg-zinc-900 hover:border-zinc-700/80 transition-all cursor-pointer group"
                                        >
                                            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-800 relative">
                                                {item.video ? (
                                                    <video 
                                                        src={item.video} 
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        muted
                                                        playsInline
                                                        onMouseOver={event => event.target.play()}
                                                        onMouseOut={event => {
                                                            event.target.pause();
                                                            event.target.currentTime = 0;
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                                                        <ChefHat size={24} className="text-zinc-600" />
                                                    </div>
                                                )}
                                                <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-white font-medium flex items-center gap-0.5">
                                                    <Star size={8} className="text-yellow-400 fill-yellow-400" />
                                                    {4.5} {/* Mock rating for now */}
                                                </div>
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <h4 className="font-semibold text-white text-base leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-1">{item.name}</h4>
                                                    <p className="text-xs text-zinc-400 line-clamp-1">{item.description}</p>
                                                    <p className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1">
                                                        <ChefHat size={10} />
                                                        {item.foodPartner ? item.foodPartner.fullname : 'Restaurant'}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <span className="text-white font-bold text-lg">${item.price}</span>
                                                    <button className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold hover:bg-primary hover:text-white transition-colors">
                                                        ADD
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
                                        <Search size={48} className="mb-4 opacity-20" />
                                        <p>No results found for "{query}"</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <BottomBotton />
        </div>
    );
};

export default SearchFood;

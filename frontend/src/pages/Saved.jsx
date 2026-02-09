import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, LogOut, Home as HomeIcon, Bookmark } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import VideoCard from '../components/VideoCard';
import SkeletonVideoCard from '../components/SkeletonVideoCard';

const Saved = () => {
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
    navigate('/user/login');
  };

  useEffect(() => {
    const fetchSavedFood = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/food/saved`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        // Map saved items to extract food details and inject isSaved: true
        const items = (response.data.savedItems || []).map(savedItem => ({
            ...savedItem.food,
            isSaved: true
        }));
        setFoodItems(items);
      } catch (err) {
        console.error("Error fetching saved food items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedFood();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black text-white overflow-hidden">
        <SkeletonVideoCard />
      </div>
    );
  }

  if (foodItems.length === 0) {
     return (
        <div className="flex flex-col h-screen w-full items-center justify-center bg-black text-white p-6 text-center">
            <ShoppingBag size={64} className="mb-4 text-gray-500" />
            <h2 className="text-2xl font-bold mb-2">No Saved Items</h2>
            <p className="text-gray-400">Save videos to watch them later!</p>
             {/* <div className="absolute top-5 right-5 z-50">
                <ThemeToggle />
            </div> */}
            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 w-full h-16 bg-transparent backdrop-blur-lg border-t border-white/20 flex items-center justify-around z-50">
                <Link to="/home" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors">
                    <HomeIcon size={24} />
                    <span className="text-[10px] font-medium">Home</span>
                </Link>
                <button className="flex flex-col items-center gap-1 text-primary">
                    <Bookmark size={24} />
                    <span className="text-[10px] font-medium">Saved</span>
                </button>
                <Link 
                          to="/order-list"
                          className="flex flex-col items-center gap-1 text-gray-300 hover:text-white transition-colors">
                          <ShoppingBag size={24} />
                          <span className="text-[10px] font-medium">Orders</span>
                        </Link>
            </div>
        </div>
     )
  }

  return (
    <div className="h-screen w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
       <div className="fixed top-5 right-5 z-50">
        <button onClick={handleLogout} className="p-2 bg-black/40 rounded-full backdrop-blur-md text-white hover:bg-red-500/80 transition-all shadow-lg border border-white/10" title="Logout">
            <LogOut size={24} />
        </button>
      </div>
      
      {foodItems.map((item, index) => (
        <VideoCard key={item._id || index} item={item} />
      ))}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full h-16 bg-transparent backdrop-blur-lg border-t border-white/20 flex items-center justify-around z-50">
        <Link to="/home" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors">
            <HomeIcon size={24} />
            <span className="text-[10px] font-medium">Home</span>
        </Link>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center gap-1 text-primary">
            <Bookmark size={24} />
            <span className="text-[10px] font-medium">Saved</span>
        </button>
      </div>
    </div>
  );
};

export default Saved;
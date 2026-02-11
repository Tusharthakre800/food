import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { ShoppingBag, LogOut, Home as HomeIcon, Bookmark } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import VideoCard from '../components/VideoCard';
import SkeletonVideoCard from '../components/SkeletonVideoCard';
import BottomBotton from '../bottombtn/BottomBotton';



const Home = () => {
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
    toast.success("Logged out successfully");
    navigate('/user/login');
  };

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/food`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        // Ensure we have an array
        const items = response.data.foodItems || [];
        setFoodItems(items);
      } catch (err) {
        console.error("Error fetching food items:", err);
        toast.error("Failed to load food items. Please try again.");
        navigate('/user/login');
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black text-white overflow-hidden">
        <SkeletonVideoCard />
        <SkeletonVideoCard />
        <SkeletonVideoCard />
        <SkeletonVideoCard />
        <SkeletonVideoCard />
        <SkeletonVideoCard />
      </div>
    );
  }

  if (foodItems.length === 0) {
     return (
        <div className="flex flex-col h-[100dvh] w-full items-center justify-center bg-black text-white p-6 text-center">
            <ShoppingBag size={64} className="mb-4 text-gray-500" />
            <h2 className="text-2xl font-bold mb-2">No Food Reels Yet</h2>
            <p className="text-gray-400">Check back later for delicious content!</p>
             {/* <div className="absolute top-5 right-5 z-50">
                <ThemeToggle />
            </div> */}
        </div>
     )
  }

  return (
    <div className="h-[100dvh] w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
       <div className="fixed top-5 right-5 z-50">
        <button onClick={handleLogout} className="p-2 bg-black/40 rounded-full backdrop-blur-md text-white hover:bg-red-500/80 transition-all shadow-lg border border-white/10" title="Logout">
            <LogOut size={24} />
            
        </button>
      </div>
      
      {foodItems.map((item, index) => (
        <VideoCard key={item._id || index} item={item} />
      ))}

      {/* Bottom Navigation */}
      {/* Translucent mirror-style bottom bar */}
      {/* <div className="fixed bottom-0 left-0 w-full h-16 bg-transparent backdrop-blur-lg border-t border-white/20 flex items-center justify-around z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 text-primary hover:text-white transition-colors"
        >
          <HomeIcon size={24} />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        <Link
          to="/saved"
          className="flex flex-col items-center gap-1 text-gray-300 hover:text-white transition-colors"
        >
          <Bookmark size={24} />
          <span className="text-[10px] font-medium">Saved</span>
        </Link>
        <Link 
          to="/order-list"
          className="flex flex-col items-center gap-1 text-gray-300 hover:text-white transition-colors">
          <ShoppingBag size={24} />
          <span className="text-[10px] font-medium">Orders</span>
        </Link>

      </div> */}
      <BottomBotton />
    </div>
  );
};

export default Home;

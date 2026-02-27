import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { ShoppingBag, LogOut, Home as HomeIcon, Bookmark, Search } from 'lucide-react';
// import ThemeToggle from '../components/ThemeToggle';
import VideoCard from '../components/VideoCard';
import SkeletonVideoCard from '../skeleton/SkeletonVideoCard';
import BottomBotton from '../bottombtn/BottomBotton';

const Home = () => {
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

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
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/food`, {
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
        </div>
     )
  }

  return (
    <div ref={containerRef} className="h-[100dvh] w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] z-50">
       <div className="fixed top-5 right-5 z-50">
        <button 
          onClick={handleLogout} 
          className="p-2 bg-black/40 rounded-full backdrop-blur-md text-white hover:bg-red-500/80 transition-all shadow-lg border border-white/10" 
          title="Logout"
        >
            <LogOut size={24} />
        </button>
      </div>
      
      {foodItems.map((item, index) => (
        <VideoCard key={item._id || index} item={item} />
      ))}

      <BottomBotton />
    </div>
  );
};

export default Home;

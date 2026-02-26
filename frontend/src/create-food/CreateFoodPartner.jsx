import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, Upload, Utensils, DollarSign, Tag, FileText, Video ,  } from 'lucide-react';
import AddDishSkeleton from '../skeleton/AddDishSkeleton';

const CreateFoodPartner = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [videoPreview, setVideoPreview] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  });
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("You must be logged in as a partner to create food items.");
            navigate('/partner/login');
            return;
        }
        
        // Simulate loading
        setTimeout(() => {
            setPageLoading(false);
        }, 1000);
    };
    
    checkAuth();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("You must be logged in as a partner to create food items.");
      navigate('/partner/login');
      return;
    }

    if (!videoFile) {
      toast.error("Please upload a food video.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('description', formData.description);
    if (videoFile) {
      data.append('video', videoFile);
    }

    const createDishPromise = axios.post(
      `${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/food`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      }
    );

    toast.promise(createDishPromise, {
      loading: 'Uploading new dish...',
      success: 'Dish added successfully!',
      error: (err) => err.response?.data?.message || 'Failed to create dish'
      
    });

    try {
      const response = await createDishPromise;
      // console.log('Food item created:', response.data);
      
      // Clear form fields
      setFormData({
        name: '',
        price: '',
        category: '',
        description: '',
      });
      setVideoFile(null);
      setVideoPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error creating food item:', error);
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
      return <AddDishSkeleton />;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6  font-sans">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        {/* <Link to="/home" className="p-2 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
          <ArrowLeft size={24} className="text-white" />
        </Link> */}
        <h1 className="text-2xl font-bold">Add New Dish</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2 max-w-md mx-auto">
        
        {/* Video Upload Section */}
        <div className="relative">
            <label className="block w-full aspect-[16/10] bg-gray-900 rounded-2xl border-2 border-dashed border-gray-700 hover:border-primary hover:bg-gray-800 transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden group">
                {videoPreview ? (
                    <video 
                        src={videoPreview} 
                        className="w-full h-full object-cover" 
                        autoPlay 
                        muted 
                        loop 
                    />
                ) : (
                    <div className="flex flex-col items-center text-gray-400 group-hover:text-primary transition-colors">
                        <div className="p-4 bg-gray-800 rounded-full mb-3 group-hover:bg-primary/20">
                            <Upload size={32} />
                        </div>
                        <span className="font-medium">Upload Food Video</span>
                        <span className="text-xs text-gray-600 mt-1">9:16 Vertical Video Recommended</span>
                    </div>
                )}
                <input 
                    type="file" 
                    name="video" 
                    accept="video/*" 
                    onChange={handleFileChange} 
                    className="hidden" 
                />
            </label>
            {videoPreview && (
                <button 
                    type="button" 
                    onClick={() => {
                        setVideoFile(null); 
                        setVideoPreview(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white hover:bg-red-500 transition-colors"
                >
                    <Video size={16} />
                </button>
            )}
        </div>

        {/* Name Input */}
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 ml-1">Dish Name</label>
            <div className="relative">
                <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Spicy Ramen"
                    className="w-full bg-gray-900 text-white pl-12 pr-4 py-4 rounded-xl border border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600"
                    required
                />
            </div>
        </div>

        {/* Price & Category Row */}
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Price</label>
                <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        className="w-full bg-gray-900 text-white pl-12 pr-4 py-4 rounded-xl border border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Category</label>
                <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        placeholder="e.g. Italian"
                        className="w-full bg-gray-900 text-white pl-12 pr-4 py-4 rounded-xl border border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600"
                        required
                    />
                </div>
            </div>
        </div>

        {/* Description Input */}
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 ml-1">Description</label>
            <div className="relative">
                <FileText className="absolute left-4 top-4 text-gray-500" size={20} />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the taste, ingredients, etc..."
                    className="w-full bg-gray-900 text-white pl-12 pr-4 py-4 rounded-xl border border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all min-h-[120px] placeholder:text-gray-600 resize-none"
                    required
                />
            </div>
        </div>

        {/* Submit Button */}
        <button
            type="submit"
            disabled={loading}
            className={`w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
            {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
                <>
                    <Upload size={20} />
                    <span>Upload Dish</span>
                </>
            )}
        </button>
      <button
            type="button"
            onClick={() => navigate('/partner/profile')}
            className="w-full bg-blue-500 hover:bg-blue-800 text-white font-bold py-4  rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-6"
        >
            View Profile
        </button>
      </form>
    </div>
  );
};

export default CreateFoodPartner;

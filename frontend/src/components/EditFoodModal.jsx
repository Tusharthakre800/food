import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { X, Upload, Video, DollarSign, Utensils, Loader2 } from 'lucide-react';

const EditFoodModal = ({ isOpen, onClose, foodItem, onUpdate }) => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  });
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    if (foodItem) {
      setFormData({
        name: foodItem.name || '',
        price: foodItem.price || '',
        category: foodItem.category || '',
        description: foodItem.description || '',
      });
      setVideoPreview(foodItem.video || null);
      setVideoFile(null);
    }
  }, [foodItem]);

  if (!isOpen || !foodItem) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('description', formData.description);
    if (videoFile) {
      data.append('video', videoFile);
    }

    const updatePromise = axios.put(
      `${import.meta.env.VITE_BASE_URL}/api/food/${foodItem._id}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      }
    );

    toast.promise(updatePromise, {
      loading: 'Updating dish...',
      success: 'Dish updated successfully!',
      error: (err) => err.response?.data?.message || 'Failed to update dish'
    }, {
      duration: 4000
    });

    try {
      const response = await updatePromise;
      onUpdate(response.data.food);
      onClose();
    } catch (error) {
      console.error('Error updating food item:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md z-10">
          <h2 className="text-xl font-bold text-white">Edit Dish</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Video Upload Section */}
            <div className="relative">
                <label className="block w-full aspect-[16/9] bg-gray-800 rounded-xl border-2 border-dashed border-gray-700 hover:border-primary hover:bg-gray-800/80 transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden group">
                    {videoPreview ? (
                        <video 
                            src={videoPreview} 
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
                            muted 
                            loop 
                        />
                    ) : (
                        <div className="flex flex-col items-center text-gray-400 group-hover:text-primary transition-colors">
                            <div className="p-3 bg-gray-700 rounded-full mb-2 group-hover:bg-primary/20">
                                <Upload size={24} />
                            </div>
                            <span className="text-sm font-medium">Change Video</span>
                        </div>
                    )}
                    <input 
                        type="file" 
                        name="video" 
                        accept="video/*" 
                        onChange={handleFileChange} 
                        className="hidden" 
                        ref={fileInputRef}
                    />
                    
                    {/* Overlay Hint */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <span className="text-white font-medium flex items-center gap-2">
                            <Upload size={16} /> Change Video
                        </span>
                    </div>
                </label>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Dish Name</label>
                <div className="relative">
                    <Utensils className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-black text-white pl-10 pr-4 py-3 rounded-xl border border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600 text-sm"
                        required
                    />
                </div>
            </div>

            {/* Price & Category */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Price</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="w-full bg-black text-white pl-10 pr-4 py-3 rounded-xl border border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600 text-sm"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Category</label>
                    <div className="relative">
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full bg-black text-white pl-4 pr-10 py-3 rounded-xl border border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none text-sm"
                            required
                        >
                            <option value="" disabled>Select Category</option>
                            <option value="Spicy">Spicy</option>
                            <option value="Sweet">Sweet</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Beverage">Beverage</option>
                            <option value="Dessert">Dessert</option>
                        </select>
                         <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full bg-black text-white p-4 rounded-xl border border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600 text-sm resize-none"
                    required
                ></textarea>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 bg-gray-900/50 backdrop-blur-md z-10 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-700 text-gray-300 font-medium hover:bg-gray-800 transition-all text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFoodModal;

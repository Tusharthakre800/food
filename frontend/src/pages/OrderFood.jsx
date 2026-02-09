import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ArrowLeft, Minus, Plus, ShoppingBag, CreditCard, Clock, MapPin, CheckCircle, Loader, Utensils, Wallet } from 'lucide-react';

const ProcessingOverlay = ({ step }) => {
    if (step === 0) return null;

    const steps = [
        { icon: <Loader className="animate-spin text-blue-500" size={64} />, text: "Verifying Order...", subtext: "Checking availability" },
        { icon: <Wallet className="animate-pulse text-purple-500" size={64} />, text: "Processing Payment...", subtext: "Secure transaction" },
        { icon: <Utensils className="animate-bounce text-orange-500" size={64} />, text: "Sending to Kitchen...", subtext: "Notifying chef" },
        { icon: <CheckCircle className="text-green-500" size={64} />, text: "Order Confirmed!", subtext: "Redirecting you home..." },
    ];

    const currentStep = steps[step - 1];

    return (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
            <div className="bg-gray-900/50 p-8 rounded-full mb-8 ring-4 ring-white/5 shadow-2xl shadow-primary/20">
                {currentStep.icon}
            </div>
            <h2 className="text-2xl font-bold mb-2 animate-in slide-in-from-bottom-4 duration-500">{currentStep.text}</h2>
            <p className="text-gray-400 animate-in slide-in-from-bottom-2 duration-700 delay-100">{currentStep.subtext}</p>
            
            {/* Progress Dots */}
            <div className="flex gap-2 mt-8">
                {[1, 2, 3, 4].map((i) => (
                    <div 
                        key={i} 
                        className={`w-3 h-3 rounded-full transition-all duration-500 ${
                            i === step ? 'bg-primary scale-125' : 
                            i < step ? 'bg-primary/50' : 'bg-gray-800'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

const OrderFood = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { item } = location.state || {};
    
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("123 Food Street, Tasty City");
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [processingStep, setProcessingStep] = useState(0);
    
    // Redirect if no item data
    useEffect(() => {
        if (!item) {
            toast.error("No item selected");
            navigate('/home');
        }
    }, [item, navigate]);

    if (!item) return null;

    const price = parseFloat(item.price) || 0;
    const totalPrice = (price * quantity).toFixed(2);
    const platformFee = (parseFloat(totalPrice) * 0.30).toFixed(2);
    const finalTotal = (parseFloat(totalPrice) + parseFloat(platformFee)).toFixed(2);

    const handleQuantityChange = (delta) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        setProcessingStep(1); // Start Step 1: Verifying

        try {
            // Simulate Step 1 duration
            await new Promise(resolve => setTimeout(resolve, 2000));
            setProcessingStep(2); // Step 2: Payment

            // Simulate Step 2 duration
            await new Promise(resolve => setTimeout(resolve, 2000));
            setProcessingStep(3); // Step 3: Kitchen

            // Make API Call during Step 3
            const token = localStorage.getItem('token');
            const orderData = {
                foodPartnerId: item.foodPartnerId,
                items: [{
                    name: item.name,
                    quantity: quantity,
                    price: price
                }],
                totalPrice: parseFloat(finalTotal),
                address: address
            };

            await axios.post(
                `${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/food/order`,
                orderData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Wait a bit more for Step 3 visual
            await new Promise(resolve => setTimeout(resolve, 2000));
            setProcessingStep(4); // Step 4: Success

            // Show Success Step for a moment
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success("Order placed successfully! 🎉", {
                duration: 5000,
                icon: '🚀'
            });
            
            // Navigate back home
            navigate('/home');
            
        } catch (error) {
            console.error("Order error:", error);
            setProcessingStep(0); // Hide overlay on error
            toast.error(error.response?.data?.message || "Failed to place order");
        } finally {
            setLoading(false);
            // Don't reset processingStep here if successful, because we navigated away. 
            // If we stayed, we would reset.
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pb-24">
            <ProcessingOverlay step={processingStep} />
            {/* Header */}
            <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10 p-4 flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="font-bold text-lg">Checkout</h1>
            </div>

            <div className="p-6 max-w-lg mx-auto space-y-6">
                {/* Item Card */}
                <div className="bg-gray-900 rounded-2xl p-4 flex gap-4 border border-gray-800">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-800 shrink-0">
                         {item.video ? (
                            <video src={item.video} className="w-full h-full object-cover" muted />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-600">
                                <ShoppingBag size={24} />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                            <p className="text-gray-400 text-sm mt-1">{item.category}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-primary">${price.toFixed(2)}</span>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 bg-black rounded-full px-3 py-1 border border-gray-700">
                                <button onClick={() => handleQuantityChange(-1)} className="p-1 hover:text-primary transition-colors">
                                    <Minus size={14} />
                                </button>
                                <span className="font-bold text-sm min-w-[1ch] text-center">{quantity}</span>
                                <button onClick={() => handleQuantityChange(1)} className="p-1 hover:text-primary transition-colors">
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 space-y-4">
                    <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider">Delivery Details</h3>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 text-blue-400 rounded-full">
                            <MapPin size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sm">Home Address</p>
                            {isEditingAddress ? (
                                <input 
                                    type="text" 
                                    value={address} 
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full bg-black/50 text-xs text-white p-1 rounded border border-gray-700 focus:outline-none focus:border-primary mt-1"
                                    autoFocus
                                />
                            ) : (
                                <p className="text-xs text-gray-500">{address}</p>
                            )}
                        </div>
                        <button 
                            onClick={() => setIsEditingAddress(!isEditingAddress)} 
                            className="text-primary text-xs font-bold hover:underline"
                        >
                            {isEditingAddress ? 'Save' : 'Change'}
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 text-purple-400 rounded-full">
                            <Clock size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sm">Delivery Time</p>
                            <p className="text-xs text-gray-500">25-35 mins</p>
                        </div>
                    </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 space-y-3">
                    <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider">Order Summary</h3>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Item Total</span>
                        <span>${totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Platform Fee (30%)</span>
                        <span>${platformFee}</span>
                    </div>
                    <div className="h-px bg-gray-800 my-2"></div>
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-primary">${finalTotal}</span>
                    </div>
                    <p className="text-xs text-center text-gray-500 mt-2">Only COD (Cash on Delivery) available</p>
                </div>
            </div>

            {/* Bottom Action */}
            <div className="fixed bottom-0 left-0 w-full p-4 bg-black/90 backdrop-blur-md border-t border-white/10">
                <div className="max-w-lg mx-auto flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Total</span>
                        <span className="font-bold text-xl">${finalTotal}</span>
                    </div>
                    <button 
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="flex-1 bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? 'Processing...' : (
                            <>
                                <span>Place Order</span>
                                <CreditCard size={20} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderFood;
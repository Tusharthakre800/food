import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate , Link} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ArrowLeft, Minus, Plus, ShoppingBag, CreditCard, Clock, MapPin, CheckCircle, Loader, Utensils, Wallet, ChevronDown, Check, Home as HomeIcon, Briefcase } from 'lucide-react';

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
    const [user, setUser] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressDropdown, setShowAddressDropdown] = useState(false);
    const [processingStep, setProcessingStep] = useState(0);
    const [discountCode, setDiscountCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(null);
    
    // Redirect if no item data
    useEffect(() => {
        if (!item) {
            toast.error("No item selected");
            navigate('/home');
        }
    }, [item, navigate]);

    // Fetch user profile for addresses
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/food/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data?.user) {
                    setUser(response.data.user);
                    const defaultAddr = response.data.user.addresses?.find(a => a.isDefault === 'yes') || response.data.user.addresses?.[0];
                    setSelectedAddress(defaultAddr);
                }
            } catch (error) {
                console.error("Error fetching user for addresses:", error);
            }
        };
        fetchUser();
    }, []);

    if (!item) return null;

    const price = parseFloat(item.price) || 0;
    const totalPrice = (price * quantity).toFixed(2);
    const platformFee = (parseFloat(totalPrice) * 0.30).toFixed(2);
    let finalTotal = (parseFloat(totalPrice) + parseFloat(platformFee));
    
    if (appliedDiscount) {
        finalTotal -= appliedDiscount.discountAmount;
    }
    
    finalTotal = Math.max(0, finalTotal).toFixed(2);

    const handleQuantityChange = (delta) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleApplyDiscount = async () => {
        if (!discountCode.trim()) return;
        
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/food/discount`,
                { discountCode },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            setAppliedDiscount(response.data.discount);
            toast.success(`Discount of $${response.data.discount.discountAmount} applied!`);
        } catch (error) {
            setAppliedDiscount(null);
            toast.error(error.response?.data?.message || "Invalid discount code");
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            toast.error("Please add a delivery address first");
            navigate('/user/profile');
            return;
        }

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
                address: `${selectedAddress.label}: ${selectedAddress.detail}`
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
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pb-24">
            <ProcessingOverlay step={processingStep} />
            {/* Header */}
            <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10 p-4 flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2  hover:bg-white/20 transition-colors">
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
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider">Delivery Details</h3>
                        <Link to="/user/profile" className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                            <Plus size={12} /> Manage
                        </Link>
                    </div>

                    <div className="relative">
                        <button 
                            onClick={() => setShowAddressDropdown(!showAddressDropdown)}
                            className="w-full flex items-center gap-3 p-3 bg-black/50 rounded-xl border border-gray-700 hover:border-gray-600 transition-all text-left group"
                        >
                            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-full group-hover:bg-blue-500/30 transition-colors">
                                {selectedAddress?.label === 'Home' ? <HomeIcon size={18} /> : 
                                 selectedAddress?.label === 'Work' ? <Briefcase size={18} /> : 
                                 <MapPin size={18} />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-sm">{selectedAddress?.label || 'Select Address'}</p>
                                    {selectedAddress?.isDefault === 'yes' && (
                                        <span className="text-[8px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-bold uppercase">Default</span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 truncate">{selectedAddress?.detail || 'No address saved yet'}</p>
                            </div>
                            <ChevronDown size={18} className={`text-gray-500 transition-transform duration-300 ${showAddressDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Address Dropdown */}
                        {showAddressDropdown && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                {user?.addresses && user.addresses.length > 0 ? (
                                    <div className="max-h-60 overflow-y-auto">
                                        {user.addresses.map((addr) => (
                                            <button
                                                key={addr._id}
                                                onClick={() => {
                                                    setSelectedAddress(addr);
                                                    setShowAddressDropdown(false);
                                                }}
                                                className={`w-full flex items-start gap-3 p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 text-left ${
                                                    selectedAddress?._id === addr._id ? 'bg-primary/5' : ''
                                                }`}
                                            >
                                                <div className={`mt-0.5 p-1.5 rounded-lg ${
                                                    addr.label === 'Home' ? 'bg-blue-500/10 text-blue-400' :
                                                    addr.label === 'Work' ? 'bg-purple-500/10 text-purple-400' :
                                                    'bg-gray-800 text-gray-500'
                                                }`}>
                                                    {addr.label === 'Home' ? <HomeIcon size={14} /> : 
                                                     addr.label === 'Work' ? <Briefcase size={14} /> : 
                                                     <MapPin size={14} />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="font-bold text-sm">{addr.label}</span>
                                                        {selectedAddress?._id === addr._id && <Check size={16} className="text-primary" />}
                                                    </div>
                                                    <p className="text-xs text-gray-400 line-clamp-2">{addr.detail}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center">
                                        <MapPin size={32} className="mx-auto text-gray-700 mb-2 opacity-20" />
                                        <p className="text-xs text-gray-500">No saved addresses</p>
                                        <Link to="/user/profile" className="text-primary text-xs font-bold mt-2 inline-block hover:underline">
                                            + Add New Address
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3 px-1">
                        <div className="p-2 bg-purple-500/20 text-purple-400 rounded-full">
                            <Clock size={18} />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sm">Delivery Time</p>
                            <p className="text-xs text-gray-500">25-35 mins</p>
                        </div>
                    </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 space-y-3">
                    <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider">Discount Code</h3>
                    <div className="text-xs text-gray-500 mb-2">Take up to 10–20% off with code</div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            placeholder="Enter Code"
                            className="flex-1 bg-black/50 text-white px-4 py-2 rounded-xl border border-gray-700 focus:outline-none focus:border-primary"
                            disabled={!!appliedDiscount}
                        />
                         {appliedDiscount ? (
                             <button 
                                onClick={() => {
                                    setAppliedDiscount(null);
                                    setDiscountCode('');
                                }}
                                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl font-bold hover:bg-red-500/30 transition-colors"
                            >
                                Remove
                            </button>
                        ) : (
                            <button 
                                onClick={handleApplyDiscount}
                                className="px-4 py-2 bg-primary/20 text-primary rounded-xl font-bold hover:bg-primary/30 transition-colors"
                            >
                                Apply
                            </button>
                        )}
                    </div>
                    {!appliedDiscount && (
                        <div className="mt-2 text-xs text-gray-500">
                            Available Coupon: <button onClick={() => setDiscountCode('tusharthakre800')} className="text-primary font-mono hover:underline ml-1">tusharthakre800</button>
                        </div>
                    )}
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
                    {appliedDiscount && (
                        <div className="flex justify-between text-sm text-green-400">
                            <span>Discount ({appliedDiscount.code})</span>
                            <span>-${appliedDiscount.discountAmount}</span>
                        </div>
                    )}
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
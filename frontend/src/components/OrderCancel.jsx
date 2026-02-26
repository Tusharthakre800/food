import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const OrderCancel = ({ orderId, onClose, onCancelSuccess }) => {
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);

    const reasons = [
        "Changed my mind",
        "Ordered by mistake",
        "Found better price elsewhere",
        "Delivery time is too long",
        "Other"
    ];

    const handleCancel = async () => {
        if (!reason) {
            toast.error("Please select or enter a reason");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/food/order-cancel`, 
                { orderId, cancelReason: reason },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 201) {
                toast.success("Order cancelled successfully");
                onCancelSuccess(orderId);
                onClose();
            }
        } catch (error) {
            console.error("Error cancelling order:", error);
            toast.error(error.response?.data?.message || "Failed to cancel order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <AlertCircle className="text-red-500" size={20} />
                        Cancel Order
                    </h2>
                    <button onClick={onClose} className="p-1 hover:bg-zinc-800 rounded-full transition-colors">
                        <X size={20} className="text-zinc-400" />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-zinc-400 text-sm mb-4">
                        Please select a reason for cancelling this order. This helps us improve our service.
                    </p>

                    <div className="space-y-2 mb-6">
                        {reasons.map((r) => (
                            <button
                                key={r}
                                onClick={() => setReason(r)}
                                className={`w-full text-left p-3 rounded-xl border transition-all text-sm ${
                                    reason === r 
                                    ? 'bg-red-500/10 border-red-500/50 text-red-400' 
                                    : 'bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:border-zinc-600'
                                }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    {reason === 'Other' && (
                        <textarea
                            placeholder="Please specify your reason..."
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-primary transition-colors mb-6 min-h-[100px]"
                            onChange={(e) => setReason(e.target.value)}
                        />
                    )}

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl font-bold text-zinc-400 bg-zinc-800 hover:bg-zinc-700 transition-colors"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleCancel}
                            disabled={loading || !reason}
                            className="flex-1 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-600/20"
                        >
                            {loading ? 'Processing...' : 'Confirm Cancel'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCancel;

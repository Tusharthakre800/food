import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, RefreshCcw, AlertCircle, ArrowLeft } from 'lucide-react';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
            {/* Error Illustration / Icon */}
            <div className="relative mb-8">
                <div className="w-32 h-32 bg-red-500/10 rounded-full flex items-center justify-center animate-pulse">
                    <AlertCircle size={64} className="text-red-500" />
                </div>
                <div className="absolute -top-2 -right-2 bg-red-500 text-black text-xs font-black px-2 py-1 rounded-md rotate-12">
                    404
                </div>
            </div>

            {/* Error Message */}
            <h1 className="text-4xl font-black mb-4 tracking-tighter">
                OOPS! PAGE <span className="text-red-500">LOST.</span>
            </h1>
            <p className="text-zinc-400 max-w-xs mx-auto mb-10 leading-relaxed">
                The page you're looking for has been moved, deleted, or never existed in the first place.
            </p>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 gap-4 w-full max-w-xs">
                <button 
                    onClick={() => navigate('/home')}
                    className="flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-bold hover:bg-zinc-200 transition-all active:scale-[0.98]"
                >
                    <Home size={20} />
                    Back to Home
                </button>
                
                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 bg-zinc-900 text-white py-4 rounded-2xl font-bold border border-zinc-800 hover:bg-zinc-800 transition-all active:scale-[0.98]"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                    <button 
                        onClick={handleRefresh}
                        className="flex items-center justify-center gap-2 bg-zinc-900 text-white py-4 rounded-2xl font-bold border border-zinc-800 hover:bg-zinc-800 transition-all active:scale-[0.98]"
                    >
                        <RefreshCcw size={18} />
                        Retry
                    </button>
                </div>
            </div>

            {/* Footer help */}
            <p className="mt-12 text-zinc-600 text-xs">
                Think this is a mistake? <button className="text-zinc-400 border-b border-zinc-700 pb-0.5">Report Issue</button>
            </p>
        </div>
    );
};

export default ErrorPage;

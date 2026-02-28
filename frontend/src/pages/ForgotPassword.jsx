import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, KeyRound } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import axios from 'axios';
import toast from 'react-hot-toast';
// import "../App.css"


const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetLink, setResetLink] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResetLink(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/user/forgot-password`, { email });
      toast.success(response.data.message);
      
      // For demonstration purposes, we display the link since we don't have email service
      if (response.data.resetToken) {
        setResetLink(`/reset-password/${response.data.resetToken}`);
      }
      
    } catch (error) {
      // console.error('Forgot password error:', error);
      toast.error(error.response?.data?.message || "Failed to process request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      <div className="absolute top-5 right-5 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full flex items-center justify-center p-6 sm:p-12 mt-12 lg:mt-0">
        <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
          <div className="text-center pt-4 lg:pt-0">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <KeyRound className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Forgot Password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              No worries, we'll send you reset instructions.
            </p>
          </div>

          {!resetLink ? (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Reset Password'}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </button>
            </form>
          ) : (
            <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 text-center">
              <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-2">Check your email</h3>
              <p className="text-sm text-green-700 dark:text-green-400 mb-4">
                We've sent a password reset link to <strong>{email}</strong>.
              </p>
              
              <div className="text-xs text-gray-500 mb-4 pt-4 border-t border-green-200 dark:border-green-800">
                <p className="mb-2 uppercase font-bold">Developer Mode:</p>
                <Link 
                  to={resetLink} 
                  className="block w-full py-2 px-4 bg-gray-800 text-white rounded-lg text-center hover:bg-gray-700 transition-colors break-all"
                >
                  Click here to simulate email link
                </Link>
              </div>
            </div>
          )}

          <div className="text-center mt-4">
            <Link to="/user/login" className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

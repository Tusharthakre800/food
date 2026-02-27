import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Store, TrendingUp, Users, Loader2 } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';


const PartnerLogin = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const loginData = Object.fromEntries(formData);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/food-partner/login`, loginData);
      // console.log('Login successful:', response.data);
      // Save token and redirect
      localStorage.setItem('token', response.data.token);
      toast.success("Login successful!");
      navigate('/create-food');
    } catch (error) {
      // console.error('Login failed:', error.response?.data || error.message);
      
      const errorMessage = error.response?.data?.message;
      
      if (errorMessage === 'Food partner not found') {
        toast.error("something went wrong");
      } else if (errorMessage === 'Incorrect password') {
        toast.error("something went wrong");
      } else {
        toast.error(errorMessage || "Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="absolute top-5 right-5 z-50">
        <ThemeToggle />
      </div>

      {/* Left Side - Hero/Image Section (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-90"></div>
        
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12 z-10">
          <div className="bg-white/10 p-6 rounded-2xl mb-8 backdrop-blur-sm border border-white/10">
            <Store size={64} className="text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-6 text-center">Grow Your Business</h2>
          <p className="text-xl text-center max-w-md opacity-80 text-gray-300">
            Manage your restaurant, track orders, and reach new customers with our powerful partner dashboard.
          </p>
          
          <div className="mt-12 grid grid-cols-1 gap-6 w-full max-w-md">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="bg-primary/20 p-2 rounded-lg">
                <TrendingUp className="text-primary h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-lg">Real-time Analytics</div>
                <div className="text-sm text-gray-400">Track your sales and growth</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Users className="text-blue-400 h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-lg">Customer Insights</div>
                <div className="text-sm text-gray-400">Understand your audience</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 mt-12 lg:mt-0">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left pt-4 lg:pt-0">
            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide mb-4">
              Partner Portal
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Partner Login
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Access your restaurant dashboard
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Business Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-input text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="partner@restaurant.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                 
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-input text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="••••••••"
                  />
                </div>
                <Link to="/partner/forgot-password" className="text-sm flex items-center justify-end font-medium text-primary hover:text-primary-hover hover:underline">
                    Forgot password?
                  </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gray-900 hover:bg-gray-800 dark:bg-primary dark:hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Logging in...</span>
                </div>
              ) : (
                <>
                  Login to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 dark:bg-dark-bg text-gray-500">Or</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <Link to="/partner/register" className="flex items-center justify-center px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Register Restaurant</span>
              </Link>
              <Link to="/user/login" className="flex items-center justify-center px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">User Login</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;

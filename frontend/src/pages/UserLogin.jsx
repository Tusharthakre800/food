import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ChefHat, User, Loader2 } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';

const UserLogin = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const loginData = Object.fromEntries(formData);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/user/login`, loginData);
      // console.log('Login successful:', response.data);
      // Save token and redirect
      toast.success("Login successful!");
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      // console.error('Login failed:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed");
      
      const errorMessage = error.response?.data?.message;
      
      if (errorMessage === 'User not found') {
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
      {/* Theme Toggle - Fixed Position */}
      <div className="absolute top-5 right-5 z-50">
        <ThemeToggle />
      </div>

      {/* Left Side - Hero/Image Section (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-orange-600 opacity-90"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12 z-10">
          <div className="bg-white/20 p-6 rounded-full mb-8 backdrop-blur-sm">
            <User size={64} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-6 text-center">Delicious Food Awaits</h2>
          <p className="text-xl text-center max-w-md opacity-90">
            Login to explore thousands of restaurants and get your favorite meals delivered to your doorstep.
          </p>
          
          <div className="mt-12 flex gap-4">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-12 h-12 rounded-full border-2 border-primary bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold overflow-hidden bg-[url('https://i.pravatar.cc/100?img=${i+10}')] bg-cover`}>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-bold">10k+ Happy Eaters</span>
              <span className="text-xs opacity-80">Join our community today</span>
            </div>
          </div>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 mt-12 lg:mt-0">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left pt-4 lg:pt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Welcome Back!
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Please enter your details to sign in
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-5">
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
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-input text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="you@example.com"
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
                <Link to="/forgot-password" className="text-sm flex items-center justify-end font-medium text-primary hover:text-primary-hover hover:underline">
                    Forgot password?
                  </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-primary/50 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 dark:bg-dark-bg text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Link to="/partner/login" className="flex items-center justify-center px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 group">
                <ChefHat className="h-5 w-5 mr-2 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Partner</span>
              </Link>
            </div>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/user/register" className="font-semibold text-primary hover:text-primary-hover hover:underline transition-all">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

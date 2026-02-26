import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Store, ChefHat, MapPin, Phone, Loader2 } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import axios from 'axios';
import { useState } from 'react';

const PartnerRegister = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const partnerData = Object.fromEntries(formData);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/auth/food-partner/register`, partnerData);
      // console.log('Registration successful:', response.data);
      // Save token and redirect
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      // alert("Registration successful! Please login.");
      navigate('/create-food');
    } catch (error) {
      // console.error('Registration failed:', error.response?.data || error.message);
      // alert(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="absolute top-5 right-5 z-50">
        <ThemeToggle />
      </div>

      {/* Left Side - Hero/Image Section (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-gray-800 opacity-90"></div>
        
        {/* Abstract shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12 z-10">
          <div className="bg-white/10 p-6 rounded-2xl mb-8 backdrop-blur-sm border border-white/10">
            <ChefHat size={64} className="text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-6 text-center">Join Our Partner Network</h2>
          <p className="text-xl text-center max-w-md opacity-80 text-gray-300">
            Sign up today and start receiving orders from thousands of hungry customers in your area.
          </p>
          
          <div className="mt-12 flex flex-col gap-4 w-full max-w-sm">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold">1</div>
              <div className="text-gray-300">Create your restaurant profile</div>
            </div>
            <div className="w-0.5 h-6 bg-gray-700 ml-4"></div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 font-bold">2</div>
              <div className="text-gray-500">Upload your menu items</div>
            </div>
            <div className="w-0.5 h-6 bg-gray-700 ml-4"></div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 font-bold">3</div>
              <div className="text-gray-500">Start accepting orders</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 h-full overflow-y-auto mt-12 lg:mt-0">
        <div className="min-h-full flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center lg:text-left pt-4 lg:pt-0">
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide mb-2">
                For Restaurants
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Partner Registration
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Join us to grow your business
              </p>
            </div>

            <form className="mt-4 space-y-4" onSubmit={handleRegister}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Restaurant Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Store className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="fullname"
                      required
                      className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-input text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="Tasty Bites"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Business Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      required
                      className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-input text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="contact@restaurant.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Restaurant Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="address"
                        required
                        className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-input text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
                        placeholder="City, Street"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        required
                        className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-input text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      required
                      className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-input text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="Create a password"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gray-900 hover:bg-gray-800 dark:bg-primary dark:hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Registering...</span>
                  </div>
                ) : (
                  <>
                    Register Partner
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-gray-50 dark:bg-dark-bg text-gray-500">Or</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link to="/partner/login" className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">Partner Login</span>
                </Link>
                <Link to="/user/register" className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">User Sign up</span>
                </Link>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerRegister;

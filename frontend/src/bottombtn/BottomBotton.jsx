
import { ShoppingBag, LogOut, Home as HomeIcon, Bookmark, User , Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';



const BottomBotton = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;


    return (
        <div className="fixed bottom-0 left-0 w-full h-16 bg-transparent backdrop-blur-lg border-t border-white/20 flex items-center justify-around z-50 pb-safe">
        <Link
          to="/home"
          onClick={() => isActive('/home') && window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`flex flex-col items-center gap-1 transition-colors ${isActive('/home') ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
        >
          <HomeIcon size={24} />
          <span className="text-[0.625rem] font-medium">Home</span>
        </Link>

        <Link
          to="/saved"
          className={`flex flex-col items-center gap-1 transition-colors ${isActive('/saved') ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
        >
          <Bookmark size={24} />
          <span className="text-[0.625rem] font-medium">Saved</span>
        </Link>
        
        <Link 
          to="/order-list"
          className={`flex flex-col items-center gap-1 transition-colors ${isActive('/order-list') ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
        >
          <ShoppingBag size={24} />
          <span className="text-[0.625rem] font-medium">Orders</span>
        </Link>
        <Link 
          to="/search"
          className={`flex flex-col items-center gap-1 transition-colors ${isActive('/search') ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
        >
          <Search size={24} />
          <span className="text-[0.625rem] font-medium">Search</span>
        </Link> 
        <Link 
          to="/user/profile"
          className={`flex flex-col items-center gap-1 transition-colors ${isActive('/user/profile') ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
        >
          <User size={24} />
          <span className="text-[0.625rem] font-medium">Profile</span>
        </Link>

      </div>
    );
}

export default BottomBotton;
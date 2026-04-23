# ⚛️ Food App Frontend

**React + Vite** frontend for the Food Discovery & Delivery App. Features a **TikTok-style video feed**, smooth animations with GSAP, notification system, and a seamless ordering experience.

---

## 🎯 Overview

This is a modern, responsive single-page application (SPA) that provides:
- ✅ Immersive video feed with auto-play and interactions
- ✅ Dual authentication flows (users & food partners)
- ✅ Real-time order tracking and notifications
- ✅ Partner dashboard for menu management
- ✅ Admin panel for system monitoring
- ✅ Dark mode with premium glassmorphism UI
- ✅ Mobile-first responsive design
- ✅ High-performance animations with GSAP

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 19 | UI library |
| **Build Tool** | Vite 6.4 | Fast bundler & dev server |
| **Styling** | Tailwind CSS 3.4 | Utility-first CSS |
| **Animations** | GSAP 3.14 | Professional animations |
| **Routing** | React Router DOM 7 | Client-side routing |
| **HTTP Client** | Axios 1.13 | API requests |

| **Icons** | Lucide React 0.563 | Icon library (563+ icons) |
| **Notifications** | React Hot Toast 2.6 | Toast notifications |
| **Date Utility** | date-fns 4.1 | Date formatting & manipulation |
| **Maps** | Leaflet + React Leaflet | Location mapping |
| **Dev Tool** | ESLint 9.39 | Code quality |

---

## ✨ Features

### 👤 User Features

#### Video Feed 📹
- **Infinite Scrolling**: Smooth vertical scroll through food videos
- **Auto-play**: Videos play automatically with sound
- **Playback Control**: Click video to pause/resume
- **Double-tap Like**: Like items with double-tap gesture
- **Video Stats**: View likes, comments, saves count

#### Authentication 🔐
- **User Register**: Create account with email/password
- **User Login**: Secure JWT authentication
- **Password Recovery**: Forgot password & reset flow
- **Session Persistence**: Automatic login on refresh (if token valid)

#### Ordering 🛒
- **Browse & Order**: Add items to cart from feed
- **Address Management**: Save multiple delivery addresses
- **Checkout Flow**: Item review → Address select → Payment
- **Order Tracking**: Real-time status updates (pending → delivered)
- **Order History**: View past orders with details

#### Profile 👥
- **User Dashboard**: View profile info and stats
- **Order Statistics**: Total orders, total spent
- **Saved Items**: Quick access to bookmarked food
- **Address Book**: Manage delivery addresses
- **Settings**: Account preferences

#### Social Engagement 💬
- **Comments**: Read and post comments on food items
- **Likes**: Like/unlike food items
- **Saves**: Bookmark favorite items
- **Partner Profiles**: View restaurant info and complete menu

#### Notifications 🔔
- **Notification Bell Icon**: Shows unread count badge
- **Notification Center**: Full page for all notifications
- **Quick Access**: Mark as read, delete notifications
- **Status Polling**: Regular API checks for new notifications

### 🏪 Partner Features

#### Dashboard 📊
- **Menu Management**: Create, edit, delete food items
- **Bulk Upload**: Upload with video and images
- **Orders List**: See new orders with details
- **Order Actions**: Confirm, prepare, deliver orders
- **Order Cancellation**: Cancel orders with automatic notifications

#### Partner Profile 🏢
- **Profile Info**: Business name, logo, address
- **Menu Display**: Show all offered items
- **Ratings**: Display partner ratings
- **Order History**: View order statistics

#### Goodwill Messages 💌
- **Send Relief**: Send apology messages for cancellations
- **Optional Discount**: Offer discount codes
- **Customer Communication**: Direct channel to users

### 🛠️ Admin Features

#### Dashboard 📈
- **System Stats**: User count, partner count, orders
- **Quick Access**: Links to all admin sections
- **Activity Overview**: Recent activity monitoring

#### User Management 👥
- **User List**: View all registered users
- **User Details**: Profile info and activity
- **Account Status**: Enable/disable accounts

#### Partner Management 🏪
- **Partner List**: View all food partners
- **Verification**: Approve/verify partners
- **Account Management**: Monitor partner activities

#### Order Analytics 📦
- **All Orders**: Complete order history
- **Filtering**: Sort by date, status, user, partner
- **Order Details**: Full order information with timeline

#### Comment Moderation 💬
- **Comment List**: All comments across platform
- **Review Comments**: Read full comments
- **Action**: Delete inappropriate comments

---

## 📋 Installation

### Prerequisites
- **Node.js** v18 or higher
- **npm** or **yarn** package manager
- **Backend API** running on `http://localhost:5000`

### Step 1: Clone & Navigate

```bash
git clone <repository-url>
cd food/frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all packages from `package.json` including React, Vite, Tailwind CSS, etc.

### Step 3: Configure Environment

Create a `.env` file in the frontend root:

```env
VITE_BASE_URL=http://localhost:5000
```

**Production Example:**
```env
VITE_BASE_URL=https://api.yourfooddomain.com
```

---

## 🚀 Running the Application

### Development Server (Recommended)

```bash
npm run dev
```

The app will:
- Start on `http://localhost:5173`
- Auto-reload on file changes (HMR)
- Show errors in browser console
- Enable Vue/React DevTools

### Build for Production

```bash
npm run build
```

Creates optimized build in `dist/` folder ready for deployment.

### Preview Production Build

```bash
npm run preview
```

Serve the production build locally to test before deployment.

### Lint Code

```bash
npm run lint
```

Check code quality with ESLint.

---

## 🗂️ Project Structure

```
frontend/
│
├── src/
│   ├── components/
│   │   ├── VideoCard.jsx           # Main feed card component
│   │   ├── Comment.jsx             # Comment display & posting
│   │   ├── LikeButton.jsx          # Like/unlike toggle
│   │   ├── Save.jsx                # Save/unsave item
│   │   ├── OrderCancel.jsx         # Order cancellation modal
│   │   ├── EditFoodModal.jsx       # Edit food item modal
│   │   ├── SearchFood.jsx          # Search functionality
│   │   ├── ThemeToggle.jsx         # Dark/light mode toggle
│   │   ├── NotificationBell.jsx    # Notification icon with badge
│   │   └── SendGoodwillMessage.jsx # Partner message component
│   │
│   ├── pages/
│   │   ├── Home.jsx                # Main video feed page
│   │   ├── OrderFood.jsx           # Checkout/ordering page
│   │   ├── OrderList.jsx           # Order history page
│   │   ├── Profile.jsx             # User profile dashboard
│   │   ├── UserLogin.jsx           # User login page
│   │   ├── UserRegister.jsx        # User registration page
│   │   ├── UserProfile.jsx         # User profile display
│   │   ├── PartnerLogin.jsx        # Partner login page
│   │   ├── PartnerRegister.jsx     # Partner registration page
│   │   ├── PartnerProfile.jsx      # Partner dashboard
│   │   ├── PolicyPage.jsx          # Terms & privacy page
│   │   ├── ErrorPage.jsx           # 404 error page
│   │   ├── ForgotPassword.jsx      # Password reset request
│   │   ├── ResetPassword.jsx       # Password reset form
│   │   ├── PartnerForgotPassword.jsx
│   │   ├── PartnerResetPassword.jsx
│   │   ├── NotificationCenter.jsx  # Full notification page
│   │   └── PartnerCancelledOrders.jsx
│   │
│   ├── adminpanels/
│   │   ├── Adminhome.jsx           # Admin dashboard
│   │   ├── AdminLogin.jsx          # Admin login
│   │   ├── AdminAllOrder.jsx       # All orders view
│   │   ├── AdminAllComment.jsx     # All comments moderation
│   │   ├── AdminTotalUser.jsx      # User management
│   │   ├── AdminTotalFoodpartner.jsx # Partner management
│   │   └── AdminRoute.jsx          # Protected admin routes
│   │
│   ├── skeleton/
│   │   ├── SkeletonVideoCard.jsx   # Video feed loader
│   │   ├── UserProfileskeleton.jsx # Profile page loader
│   │   ├── OrderPageSkeleton.jsx   # Order page loader
│   │   ├── SkeletonComment.jsx
│   │   ├── SkeletonPartnerProfile.jsx
│   │   ├── AddDishSkeleton.jsx
│   │   ├── OrderlListSkeleton.jsx
│   │   ├── Policyskeleton.jsx
│   │   └── ... (other skeletons)
│   │
│   ├── context/
   │   └── ThemeContext.jsx        # Dark/light mode context
│   │
│   ├── routers/
│   │   └── AppRouter.jsx           # Centralized route configuration
│   │
│   ├── bottombtn/
│   │   └── BottomBotton.jsx        # Mobile bottom navigation
│   │
│   ├── create-food/
│   │   └── CreateFoodPartner.jsx   # Create food item form
│   │
│   ├── assets/                     # Images, icons, static files
│   │
│   ├── App.jsx                     # Root component
│   ├── main.jsx                    # React entry point
│   ├── App.css                     # App styles
│   └── index.css                   # Global styles
│
├── public/                         # Static files (favicon, etc.)
├── .env                            # Environment variables
├── .gitignore
├── package.json                    # Dependencies & scripts
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── eslint.config.js                # ESLint configuration
├── nginx.conf                      # Nginx configuration (Docker)
├── Dockerfile                      # Docker container config
├── index.html                      # HTML entry point
└── README.md                       # This file
```

---

## 🎨 Key Components

### VideoCard.jsx
**The core feed component** displaying food videos with interactions.

```jsx
Features:
• Auto-play video on scroll
• Double-tap to like
• Video stats display
• Quick actions (comment, save, view profile)
• Responsive sizing
```

### OrderFood.jsx
**Checkout page** with address management and order processing.

```jsx
Features:
• Item review and quantity adjustment
• Address selection/editing
• Pricing calculation
• Order confirmation animation
• Payment method selection
```

### UserProfile.jsx
**User dashboard** with stats and address management.

```jsx
Features:
• Profile information display
• Order history summary
• Saved items quick view
• Address book management
• Edit profile functionality
```

### PartnerProfile.jsx
**Restaurant/Partner dashboard** for menu management.

```jsx
Features:
• Menu items list
• Add/edit/delete items
• Order notifications
• Cancel order handling
• Goodwill message sending
```

### NotificationBell.jsx
**Notification** icon component.

```jsx
Features:
• Unread count badge
• Dropdown preview
• Quick actions
• Link to notification center
• Polling for updates
```

---

## 🎨 UI/UX Features

### Dark Mode 🌙
- **System Detection**: Respects system dark mode preference
- **Toggle Button**: Manual dark/light mode switching
- **Persistent**: Saves preference to localStorage
- **Gradients**: Beautiful dark theme with glassmorphism

### Animations ✨
- **GSAP Integration**: Smooth page transitions and interactions
- **Scroll Animations**: Parallax effects on scroll
- **Loading States**: Skeleton screens with shimmer effect
- **Interactive Elements**: Hover effects and micro-interactions

### Responsive Design 📱
- **Mobile-first**: Designed for mobile, scales up
- **Tablet Support**: Optimized for tablets
- **Desktop**: Full-width layouts
- **Touch Events**: Double-tap, swipe support on mobile

### Loading States ⏳
- **Skeleton Screens**: Custom loaders for each page type
- **Shimmer Effect**: Smooth loading animation
- **Placeholders**: Realistic content preview

---

## 🔌 API Integration

### HTTP Client Setup (Axios)

```javascript
// src/utils/api.js (example)
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default API;
```

### Request Examples

```javascript
// Get food feed
GET /api/food

// Create order
POST /api/food/order
{
  "foodItems": [{ "id": "...", "quantity": 2 }],
  "totalPrice": 500,
  "address": "123 Main St"
}

// Like item
POST /api/food/like
{ "foodItemId": "..." }

// Add comment
POST /api/food/comment
{
  "foodItemId": "...",
  "text": "Delicious!"
}
```

---

## 🎬 Routing Structure

### Public Routes
```
/                    → Home (video feed)
/login               → User login
/register            → User registration
/forgot-password     → Password reset request
/partner-login       → Partner login
/partner-register    → Partner registration
/policy              → Terms & privacy
/error               → Error 404 page
```

### Protected Routes (User)
```
/profile             → User profile
/order/:id           → Order details
/orders              → Order history
/saved               → Saved items
/notifications       → Notification center
```

### Protected Routes (Partner)
```
/partner/profile     → Partner dashboard
/partner/create      → Create menu item
/partner/orders      → Partner orders
/partner/cancelled   → Cancelled orders
```

### Admin Routes
```
/admin               → Admin dashboard
/admin/users         → User management
/admin/partners      → Partner management
/admin/orders        → Order management
/admin/comments      → Comment moderation
```

---

## 🌍 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BASE_URL` | Backend API URL | `http://localhost:5000` |

---

## 🏗️ Build & Deployment

### Build for Production

```bash
npm run build
```

Creates optimized build in `dist/` folder:
- Minified JavaScript
- Optimized CSS
- Compressed images
- Hash-based caching

### Deploy to Vercel

```bash
# Option 1: Vercel CLI
npm install -g vercel
vercel

# Option 2: GitHub integration
# Push to GitHub and connect Vercel dashboard
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to Traditional Server

```bash
# Build
npm run build

# Copy dist folder to server
scp -r dist/* user@server:/var/www/app

# Configure web server (Nginx/Apache)
# Point root to /var/www/app
```

### Docker Deployment

```bash
docker build -t food-frontend:latest .
docker run -p 80:80 food-frontend:latest
```

---

## 🐛 Common Issues & Solutions

### API Connection Error
```
Error: connect ECONNREFUSED localhost:5000
```
**Solution:**
- Ensure backend is running
- Check `VITE_BASE_URL` in `.env`
- Verify backend is accessible from your network

### Hot Module Replacement (HMR) Not Working
```
Error: WebSocket connection failed
```
**Solution:**
- Check if Vite server is running
- Verify port 5173 is not blocked by firewall
- Try clearing browser cache

### Tailwind CSS Not Loading
```
Styles not applying
```
**Solution:**
- Rebuild Tailwind: `npx tailwindcss -i ./src/index.css -o ./src/output.css`
- Clear node_modules: `rm -rf node_modules && npm install`
- Restart dev server

### Build Size Too Large
```
Vite bundle size warning
```
**Solution:**
- Code split components: use `React.lazy()`
- Tree-shake unused dependencies
- Use dynamic imports for heavy libraries

---

## 📊 Performance Optimization

### Implemented Optimizations
- ✅ **Code Splitting**: Lazy loading routes with React.lazy()
- ✅ **Image Optimization**: Cloudinary for responsive images
- ✅ **CSS Purging**: Tailwind production build removes unused CSS
- ✅ **Minification**: Vite minifies all assets
- ✅ **Caching**: Service Workers for offline support
- ✅ **Tree Shaking**: Unused code removed at build time

### Tips for Further Optimization
- Use `.webp` images when possible
- Implement virtual scrolling for large feeds
- Debounce search and scroll events
- Lazy load images with intersection observer
- Use React profiler to identify bottlenecks

---

## 🎓 Learning Resources

### React 19
- [React Docs](https://react.dev)
- [React Hooks](https://react.dev/reference/react)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com)

### GSAP Animations
- [GSAP Docs](https://greensock.com/docs/)
- [GSAP Starter](https://greensock.com/gsap/)

### Vite
- [Vite Docs](https://vitejs.dev)
- [Vite Plugin Guide](https://vitejs.dev/guide/plugins.html)

---

## 📚 Related Documentation

- 🏠 [Main README](../README.md)
- 🔌 [Backend README](../backend/README.md)
- 📧 [Notification System](../NOTIFICATIONS_SETUP.md)
- 🔄 [Order Flow](../ORDER_NOTIFICATION_FLOW.md)
- 🏗️ [System Architecture](../SYSTEM_ARCHITECTURE.md)

---

## 🤝 Contributing

We welcome contributions! Please:

1. Create a feature branch: `git checkout -b feature/new-feature`
2. Follow existing code style and component patterns
3. Add proper comments and documentation
4. Test on multiple devices/browsers
5. Submit a pull request with description

---

## 📄 License

ISC License - feel free to use this project!

---

**Built with ❤️ using React, Vite & Tailwind CSS**

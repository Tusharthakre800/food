# 🍕 Food Discovery & Delivery App

A **TikTok-style food discovery and delivery platform** where users can browse short food videos, engage with content, and place orders directly. The platform connects food lovers with food partners (restaurants, chefs, food stalls).

**Live Demo & Documentation Available in separate files:**
- 📋 [System Architecture](./SYSTEM_ARCHITECTURE.md)
- 📧 [Notification System Setup](./NOTIFICATIONS_SETUP.md)
- 🔄 [Order & Notification Flow](./ORDER_NOTIFICATION_FLOW.md)

---

## 🚀 Project Overview

This is a **full-stack MERN (MongoDB, Express, React, Node.js)** monorepo containing:

| Component | Tech Stack | Purpose |
|-----------|-----------|---------|
| **[Frontend](./frontend)** | React 19 + Vite + Tailwind CSS | User interface with video feed, ordering, profiles |
| **[Backend](./backend)** | Node.js + Express + MongoDB | RESTful API, real-time notifications, order management |
| **Database** | MongoDB Atlas | Scalable document storage for all data |

| **Storage** | Cloudinary | Video/image hosting and CDN |

---

## ✨ Key Features

### 👥 For Users
- **📹 TikTok-Style Feed**: Immersive vertical scrolling video feed for food discovery
- **🔐 Secure Authentication**: Register, login, profile management with JWT
- **❤️ Social Engagement**: Like, comment, and save favorite food items
- **📦 Order Management**: Browse, checkout, track orders from restaurants
- **📍 Address Management**: Save multiple delivery addresses
- **💬 Real-time Notifications**: Get instant updates on order status, comments, messages
- **🏪 Shop by Partner**: View individual restaurant profiles and their complete menu
- **🎨 Dark Mode**: Beautiful dark theme with glassmorphism UI

### 🏪 For Food Partners
- **📊 Partner Dashboard**: Upload dishes, manage menu, view orders
- **📦 Order Management**: See new orders, confirm, prepare, deliver
- **❌ Order Cancellation**: Cancel orders with automatic notifications
- **💬 Goodwill Messages**: Send apology/discount messages to disappointed customers
- **👁️ Real-time Alerts**: Receive instant notifications for new orders
- **📈 Menu Management**: Create, edit, delete food items with videos

### 🛡️ For Admins
- **👥 User Management**: View all users, manage accounts
- **🏪 Partner Management**: View all food partners, monitor accounts
- **📋 Order Analytics**: Complete order history and statistics
- **💬 Comment Moderation**: Review and manage user comments
- **📊 Dashboard**: System overview and key metrics

---

## 🛠️ Tech Stack

### Frontend Stack
```json
{
  "framework": "React 19 (Vite)",
  "styling": "Tailwind CSS 3.4",
  "animations": "GSAP 3.14 + Lucide Icons",
  "http": "Axios",
  "routing": "React Router DOM 7",
  "ui": "React Hot Toast + Custom Skeletons",
  "realtime": "Socket.io Client",
  "date": "date-fns",
  "maps": "Leaflet + React Leaflet"
}
```

### Backend Stack
```json
{
  "runtime": "Node.js",
  "framework": "Express 5.2",
  "database": "MongoDB + Mongoose 9.1",
  "auth": "JWT + bcryptjs",
  "storage": "Cloudinary",
  "email": "Nodemailer",
  "realtime": "Socket.io",
  "upload": "Multer",
  "logging": "Morgan",
  "utilities": "UUID, Cookie-Parser, CORS"
}
```

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│          FOOD DISCOVERY & DELIVERY APP                  │
└─────────────────────────────────────────────────────────┘

┌──────────────────────────┐    ┌──────────────────────────┐
│   FRONTEND (React)       │◄──►│   BACKEND (Express)      │
├──────────────────────────┤    ├──────────────────────────┤
│ • Video Feed             │    │ • Auth APIs              │
│ • Order Checkout         │    │ • Food APIs              │
│ • User Profile           │    │ • Order APIs             │
│ • Partner Dashboard      │    │ • Notification APIs      │
│ • Real-time Updates      │    │ • Admin APIs             │
│ • Admin Panel            │    │ • Socket.io Server       │
└──────────────────────────┘    └──────────────────────────┘
         │                               │
         └───────────────────┬───────────────────┘
                             │
                        HTTP Requests
                             │
         ┌───────────────────┴───────────────────┐
         │                                       │
    ┌────▼─────┐                        ┌────────▼──────┐
    │ MongoDB   │                        │  Cloudinary   │
    │ Database  │                        │  (Media CDN)  │
    └───────────┘                        └───────────────┘
    
    Collections:
    • Users             • Comments
    • FoodPartners      • Likes
    • FoodItems         • Saves
    • Orders            • Notifications
    • OrderList         • GoodwillMessages
```

---

## 🏁 Quick Start

### Prerequisites
- **Node.js** v18+ ([Download](https://nodejs.org))
- **MongoDB Atlas** account ([Sign up](https://www.mongodb.com/cloud/atlas)) or local MongoDB
- **Cloudinary** account for media storage ([Sign up](https://cloudinary.com))

### 1️⃣ Clone & Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd food

# Backend setup
cd backend
npm install

# Frontend setup (in another terminal)
cd frontend
npm install
```

### 2️⃣ Environment Configuration

**Backend `.env`** (create in `backend/.env`):
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Food_Application?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_secure_jwt_secret_key_here

# Cloudinary (Media Storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Email (for notifications)
Admin_Email=your_admin_email@gmail.com
```

**Frontend `.env`** (create in `frontend/.env`):
```env
VITE_BASE_URL=http://localhost:5000
```

### 3️⃣ Run the Application

```bash
# Terminal 1 - Backend (from backend folder)
npm run dev
# Server runs on http://localhost:5000

# Terminal 2 - Frontend (from frontend folder)
npm run dev
# App runs on http://localhost:5173
```

---

## 🐳 Docker Deployment

The project includes Docker support for containerized deployment:

### Run with Docker Compose

```bash
docker-compose up --build
```

This will:
- Build and start the backend on `http://localhost:5000`
- Build and start the frontend on `http://localhost:80`
- Create a shared network for communication

### Individual Docker Build

**Backend:**
```bash
cd backend
docker build -t food-backend .
docker run -p 5000:5000 --env-file .env food-backend
```

**Frontend:**
```bash
cd frontend
docker build -t food-frontend .
docker run -p 80:80 food-frontend
```

---

## 📁 Project Structure

```
food/
│
├── backend/
│   ├── src/
│   │   ├── controller/          # Request handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── food.controller.js
│   │   │   ├── foodpartner.controller.js
│   │   │   ├── admin.controller.js
│   │   │   └── notification.controller.js
│   │   │
│   │   ├── models/              # Database schemas
│   │   │   ├── user.model.js
│   │   │   ├── foodpartner.model.js
│   │   │   ├── fooditem.model.js
│   │   │   ├── order.model.js
│   │   │   ├── comment.model.js
│   │   │   ├── like.model.js
│   │   │   ├── save.model.js
│   │   │   ├── notification.model.js
│   │   │   └── ... (other models)
│   │   │
│   │   ├── routes/              # API endpoints
│   │   │   ├── auth.routes.js
│   │   │   ├── food.routes.js
│   │   │   ├── food-parter.routes.js
│   │   │   ├── admin.routes.js
│   │   │   └── notification.routes.js
│   │   │
│   │   ├── middleware/          # Custom middleware
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── services/            # Business logic
│   │   │   ├── notification.service.js
│   │   │   ├── email.service.js
│   │   │   └── storage.service.js
│   │   │
│   │   ├── db/
│   │   │   └── db.js            # MongoDB connection
│   │   │
│   │   └── app.js               # Express app setup
│   │
│   ├── server.js                # Entry point with Socket.io
│   ├── seedAdmin.js             # Admin seeding script
│   ├── package.json
│   ├── Dockerfile
│   ├── .env                      # Environment variables
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── VideoCard.jsx    # Main feed card
│   │   │   ├── Comment.jsx
│   │   │   ├── LikeButton.jsx
│   │   │   ├── Save.jsx
│   │   │   ├── OrderCancel.jsx
│   │   │   ├── SearchFood.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   ├── NotificationBell.jsx
│   │   │   └── EditFoodModal.jsx
│   │   │
│   │   ├── pages/               # Full page components
│   │   │   ├── Home.jsx         # Main feed
│   │   │   ├── OrderFood.jsx    # Checkout page
│   │   │   ├── OrderList.jsx    # Order history
│   │   │   ├── Profile.jsx      # User profile
│   │   │   ├── UserLogin.jsx
│   │   │   ├── UserRegister.jsx
│   │   │   ├── PartnerLogin.jsx
│   │   │   ├── PartnerRegister.jsx
│   │   │   ├── PartnerProfile.jsx
│   │   │   ├── PolicyPage.jsx
│   │   │   ├── ErrorPage.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ... (other pages)
│   │   │
│   │   ├── adminpanels/         # Admin components
│   │   │   ├── Adminhome.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminAllOrder.jsx
│   │   │   ├── AdminAllComment.jsx
│   │   │   ├── AdminTotalUser.jsx
│   │   │   └── AdminTotalFoodpartner.jsx
│   │   │
│   │   ├── skeleton/            # Loading skeletons
│   │   │   ├── SkeletonVideoCard.jsx
│   │   │   ├── UserProfileskeleton.jsx
│   │   │   ├── OrderPageSkeleton.jsx
│   │   │   └── ... (other skeletons)
│   │   │
│   │   ├── context/             # Context API
│   │   │   ├── ThemeContext.jsx
│   │   │   └── NotificationContext.jsx
│   │   │
│   │   ├── routers/
│   │   │   └── AppRouter.jsx    # Route configuration
│   │   │
│   │   ├── bottombtn/
│   │   │   └── BottomBotton.jsx # Mobile bottom nav
│   │   │
│   │   ├── create-food/
│   │   │   └── CreateFoodPartner.jsx
│   │   │
│   │   ├── App.jsx              # Root component
│   │   ├── main.jsx             # React entry point
│   │   ├── index.css
│   │   └── App.css
│   │
│   ├── public/                  # Static assets
│   ├── package.json
│   ├── Dockerfile
│   ├── nginx.conf               # Nginx configuration
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── .env
│   └── README.md
│
├── docker-compose.yml           # Docker Compose configuration
├── SYSTEM_ARCHITECTURE.md       # Architecture documentation
├── NOTIFICATIONS_SETUP.md       # Notification system docs
├── ORDER_NOTIFICATION_FLOW.md   # Order flow documentation
└── README.md                    # This file
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register              - Register new user
POST   /api/auth/login                 - Login user
POST   /api/auth/partner/register      - Register food partner
POST   /api/auth/partner/login         - Login food partner
POST   /api/auth/logout                - Logout user
```

### Food Items
```
GET    /api/food                       - Get all food items (feed)
GET    /api/food/search?q=query        - Search food items
POST   /api/food/create                - Create food item (Partner)
PUT    /api/food/:id                   - Update food item
DELETE /api/food/:id                   - Delete food item
GET    /api/food/:id                   - Get item details
```

### Interactions
```
POST   /api/food/like                  - Like/Unlike food item
POST   /api/food/comment               - Add comment
GET    /api/food/comment/:id           - Get comments for item
POST   /api/food/save                  - Save/Unsave food item
```

### Orders
```
POST   /api/food/order                 - Place new order
GET    /api/food/orders                - Get user orders
PUT    /api/food/order/:id             - Update order status
DELETE /api/food/order/:id             - Cancel order
```

### Notifications
```
GET    /api/notifications              - Get user notifications
PUT    /api/notifications/:id/read     - Mark as read
DELETE /api/notifications/:id          - Delete notification
```

### Admin
```
GET    /api/admin/users                - Get all users
GET    /api/admin/partners             - Get all partners
GET    /api/admin/orders               - Get all orders
GET    /api/admin/comments             - Get all comments
```

---

## 💾 Database Models

### User Model
```javascript
{
  fullName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  avatar: String,
  addresses: Array,
  savedItems: Array (food IDs),
  createdAt: Date,
  updatedAt: Date
}
```

### Food Item Model
```javascript
{
  title: String,
  description: String,
  videoUrl: String (Cloudinary),
  price: Number,
  category: String,
  partnerId: ObjectId (ref: FoodPartner),
  likes: [userId],
  comments: [comment objects],
  saves: [userId],
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  userId: ObjectId (ref: User),
  foodItems: Array,
  totalPrice: Number,
  address: String,
  status: Enum ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'],
  paymentMethod: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Notification Model
```javascript
{
  userId: ObjectId (ref: User),
  type: String ('order', 'comment', 'like', 'system'),
  title: String,
  message: String,
  relatedId: ObjectId,
  relatedModel: String,
  isRead: Boolean,
  createdAt: Date (TTL: 30 days)
}
```

---

##  Notification System

The app includes a real-time notification system:

### Notification Types
- **Order Updates**: When order status changes (pending → confirmed → delivered)
- **Comments**: When someone comments on your food item
- **Likes**: When someone likes your food item
- **System Alerts**: General system messages

### Features
- ✅ Persistent storage in MongoDB
- ✅ Auto-cleanup (30-day TTL)
- ✅ Unread count badge
- ✅ Goodwill messages for cancelled orders

**See [NOTIFICATIONS_SETUP.md](./NOTIFICATIONS_SETUP.md) for detailed setup.**

---

## 🛠️ Development Scripts

### Backend
```bash
npm run dev      # Start dev server with nodemon
npm start        # Start production server
npm test         # Run tests (if configured)
```

### Frontend
```bash
npm run dev      # Start dev server with HMR
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🚀 Deployment

### Frontend Deployment (Vercel)
```bash
# Build locally
npm run build

# Deploy to Vercel
# Option 1: Using Vercel CLI
vercel

# Option 2: Push to GitHub and connect to Vercel dashboard
```

### Backend Deployment (Heroku/Railway/Render)
```bash
# Create a Procfile in backend/
echo "web: node server.js" > Procfile

# Deploy using Railway/Render/Heroku
```

### Environment Variables for Production
Update these in your deployment platform:
- `MONGODB_URI` - Production MongoDB connection
- `JWT_SECRET` - Strong secret key
- `CLOUDINARY_*` - Production Cloudinary credentials
- `FRONTEND_URL` - Production frontend URL
- `NODE_ENV=production` - Set to production

---

## 🐛 Common Issues & Solutions

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution:** Ensure MongoDB URI is correct in `.env` and MongoDB is running/accessible.

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Update `FRONTEND_URL` in backend `.env` to match your frontend URL.

### Cloudinary Upload Fails
```
Error: Invalid credentials
```
**Solution:** Verify Cloudinary credentials in `.env` file.

### Socket.io Connection Issues
**Solution:** Ensure backend is running and WebSocket connections are allowed in your network.

---

## 👥 Contributing

We'd love your contributions! Here's how:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test your changes before submitting
- Update documentation if needed

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details (if available).

---

## 📞 Support & Contact

- **Issues**: Create an issue in the repository
- **Discussion**: Start a discussion for feature requests
- **Email**: For business inquiries, contact the maintainer

---

## 🙏 Acknowledgments

- Built with **React** and **Node.js**
- Styled with **Tailwind CSS**
- Animations with **GSAP**
- Real-time with **Socket.io**
- Database by **MongoDB**
- Media hosting by **Cloudinary**

---

**Built with ❤️ by the Food Delivery Team**

### Quick Links
- 📋 [System Architecture](./SYSTEM_ARCHITECTURE.md)
- 📧 [Notification Setup](./NOTIFICATIONS_SETUP.md)
- 🔄 [Order Flow](./ORDER_NOTIFICATION_FLOW.md)
- 🔙 [Backend README](./backend/README.md)
- ⚛️ [Frontend README](./frontend/README.md)

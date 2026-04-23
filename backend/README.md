# 🔌 Food App Backend API

**RESTful API backend** for the Food Discovery & Delivery App. Built with **Node.js**, **Express**, and **MongoDB**. Includes notification system, secure JWT authentication, and Cloudinary integration for media management.

---

## 🎯 Overview

This backend server provides:
- ✅ User and partner authentication (JWT-based)
- ✅ Food item management (CRUD operations)
- ✅ Order processing with status tracking
- ✅ Social features (likes, comments, saves)
- ✅ Notification management system
- ✅ Admin panel capabilities
- ✅ Email notifications (Nodemailer)
- ✅ Media storage (Cloudinary)

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Runtime** | Node.js 18+ | JavaScript runtime |
| **Framework** | Express.js 5.2 | Web framework |
| **Database** | MongoDB + Mongoose 9.1 | Document database with ODM |
| **Auth** | JWT + bcryptjs | Secure authentication |
| **Storage** | Cloudinary 2.9 | Media hosting & CDN |
| **Email** | Nodemailer 8.0 | Email delivery |
| **Upload** | Multer 2.0 | File upload handling |
| **Logging** | Morgan 1.10 | HTTP request logging |
| **Security** | CORS, Cookie-Parser | Cross-origin & cookie handling |
| **Dev** | Nodemon 3.1 | Auto-restart on file changes |

---

## ✨ Features

### 🔐 Authentication System
- **User Registration & Login** - Secure password hashing with bcryptjs
- **Partner Registration & Login** - Separate food partner authentication
- **JWT Tokens** - Stateless, secure authentication
- **Protected Routes** - Middleware-based route protection
- **Token Validation** - Automatic token verification

### 🍔 Food Item Management
- **CRUD Operations** - Create, read, update, delete food items
- **Video Upload** - Cloudinary integration for video hosting
- **Category Support** - Organize food by category
- **Search Functionality** - Case-insensitive regex search
- **Partner Dashboard** - Manage own food items

### 📦 Order Management
- **Order Creation** - Place new orders with food items
- **Order Tracking** - Multiple status states (pending → confirmed → out-for-delivery → delivered)
- **Address Management** - Support for multiple delivery addresses
- **Payment Methods** - Cash on Delivery (COD) support
- **Order Cancellation** - Cancel orders with notifications

### 💬 Social Features
- **Likes/Unlikes** - Toggle like status on food items
- **Comments** - Add and retrieve comments with user info
- **Saves** - Bookmark favorite items
- **Social Stats** - Track engagement metrics

### 🔔 Notification System
- **Persistent Storage** - Notifications saved to MongoDB
- **Auto-cleanup** - TTL index for 30-day retention
- **Multiple Types** - Order, comment, like, system notifications
- **Badged Counts** - Unread notification tracking

### 👤 User Profiles
- **User Info** - Profile data with avatar support
- **Order History** - Track all user orders
- **Saved Items** - View bookmarked food items
- **Engagement Stats** - Dynamic stat calculation
- **Address Book** - Multiple saved addresses

### 🏪 Partner Features
- **Dashboard** - View and manage listings
- **Goodwill Messages** - Send apologies/discounts after cancellation
- **Order Monitoring** - Real-time order notifications
- **Cancellation Handling** - Manage cancelled orders

### 🛡️ Admin Capabilities
- **User Management** - View all users and accounts
- **Partner Management** - Monitor food partners
- **Order Analytics** - Complete order history
- **Comment Moderation** - Review and manage content
- **System Stats** - Dashboard with key metrics

---

## 📋 Installation

### Prerequisites
- **Node.js** v18 or higher
- **npm** or **yarn** package manager
- **MongoDB** (Atlas or local instance)
- **Cloudinary** account for media storage

### Step 1: Clone & Navigate

```bash
git clone <repository-url>
cd food/backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages from `package.json`.

### Step 3: Configure Environment Variables

Create a `.env` file in the backend root directory:

```bash
cp .env.example .env  # If example exists
# OR
nano .env  # Create and edit manually
```

Add these variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/Food_Application?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your_super_secret_key_change_this_in_production

# Cloudinary Credentials (Media Storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Admin Email (for notifications)
Admin_Email=admin@example.com
```

---

## 🚀 Running the Server

### Development Mode (Recommended)

```bash
npm run dev
```

The server will:
- Start on `http://localhost:5000`
- Auto-restart when files change (via Nodemon)
- Output logs to console

### Production Mode

```bash
npm start
```

The server will start normally and stay running. Make sure `NODE_ENV=production` in `.env`.

### Check Server Health

```bash
curl http://localhost:5000/
# Expected: "Hello World!"

curl http://localhost:5000/api/health
# Expected: { "status": "OK", "message": "Server is running" }
```

---

## 🗂️ Project Structure

```
backend/
│
├── src/
│   ├── controller/
│   │   ├── auth.controller.js        # User/Partner authentication
│   │   ├── food.controller.js        # Food CRUD & user engagement
│   │   ├── foodpartner.controller.js # Partner-specific functions
│   │   ├── admin.controller.js       # Admin operations
│   │   └── notification.controller.js # Notification management
│   │
│   ├── models/
│   │   ├── user.model.js             # User schema & methods
│   │   ├── foodpartner.model.js      # Food partner schema
│   │   ├── fooditem.model.js         # Food item/product schema
│   │   ├── order.model.js            # Order schema & lifecycle
│   │   ├── comment.model.js          # Comments schema
│   │   ├── like.model.js             # Likes schema
│   │   ├── save.model.js             # Saved items schema
│   │   ├── notification.model.js     # Notifications schema
│   │   ├── goodwillmessage.model.js  # Goodwill messages
│   │   ├── ordercancel.model.js      # Cancelled orders
│   │   ├── orderlist.model.js        # Order history
│   │   └── discount.model.js         # Discounts/promo codes
│   │
│   ├── routes/
│   │   ├── auth.routes.js            # Authentication endpoints
│   │   ├── food.routes.js            # Food & order endpoints
│   │   ├── food-parter.routes.js     # Partner endpoints
│   │   ├── admin.routes.js           # Admin endpoints
│   │   └── notification.routes.js    # Notification endpoints
│   │
│   ├── middleware/
│   │   └── auth.middleware.js        # JWT verification & protection
│   │
│   ├── services/
│   │   ├── notification.service.js   # Notification helpers
│   │   ├── email.service.js          # Email sending
│   │   └── storage.service.js        # Cloudinary operations
│   │
│   ├── db/
│   │   └── db.js                     # MongoDB connection & setup
│   │
│   └── app.js                        # Express app configuration
│
├── server.js                         # Entry point with Socket.io
├── seedAdmin.js                      # Script to seed admin user
├── package.json                      # Dependencies & scripts
├── .env                              # Environment variables
├── .gitignore                        # Git ignore rules
├── Dockerfile                        # Docker container config
└── README.md                         # This file
```

---

## 🔌 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | User login | ❌ |
| POST | `/api/auth/partner/register` | Register food partner | ❌ |
| POST | `/api/auth/partner/login` | Partner login | ❌ |
| POST | `/api/auth/logout` | Logout user | ✅ |

### Food Items Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/food` | Get all food items (feed) | ❌ |
| GET | `/api/food/search?q=query` | Search food items | ❌ |
| GET | `/api/food/:id` | Get single food item | ❌ |
| POST | `/api/food/create` | Create new food item | ✅ Partner |
| PUT | `/api/food/:id` | Update food item | ✅ Partner |
| DELETE | `/api/food/:id` | Delete food item | ✅ Partner |

### Interaction Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/food/like` | Like/unlike food item | ✅ User |
| POST | `/api/food/comment` | Add comment | ✅ User |
| GET | `/api/food/comments/:id` | Get comments for item | ❌ |
| POST | `/api/food/save` | Save/unsave item | ✅ User |

### Order Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/food/order` | Place new order | ✅ User |
| GET | `/api/food/orders` | Get user orders | ✅ User |
| GET | `/api/food/orders/:id` | Get order details | ✅ User |
| PUT | `/api/food/order/:id` | Update order status | ✅ Partner/Admin |
| DELETE | `/api/food/order/:id` | Cancel order | ✅ User |

### Notification Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/notifications` | Get user notifications | ✅ |
| GET | `/api/notifications/unread-count` | Get unread count | ✅ |
| PUT | `/api/notifications/:id/read` | Mark as read | ✅ |
| PUT | `/api/notifications/read-all` | Mark all as read | ✅ |
| DELETE | `/api/notifications/:id` | Delete notification | ✅ |

### Admin Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/users` | Get all users | ✅ Admin |
| GET | `/api/admin/partners` | Get all partners | ✅ Admin |
| GET | `/api/admin/orders` | Get all orders | ✅ Admin |
| GET | `/api/admin/comments` | Get all comments | ✅ Admin |

---

## 💾 Database Models

### User Model
```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String (unique, lowercase),
  password: String (bcrypt hashed),
  phone: String,
  avatar: String (Cloudinary URL),
  addresses: [{
    street: String,
    city: String,
    zipCode: String,
    isDefault: Boolean
  }],
  savedItems: [ObjectId],      // References to FoodItem
  createdAt: Date,
  updatedAt: Date
}
```

### Food Partner Model
```javascript
{
  _id: ObjectId,
  businessName: String,
  email: String (unique),
  password: String (bcrypt hashed),
  phone: String,
  logo: String (Cloudinary URL),
  address: String,
  city: String,
  zipCode: String,
  cuisineType: String,
  ratings: Number,
  verified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Food Item Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  videoUrl: String (Cloudinary video),
  imageUrl: String (Cloudinary image),
  price: Number,
  category: String,
  partnerId: ObjectId (ref: FoodPartner),
  likes: [ObjectId],           // User IDs
  comments: [commentObject],
  saves: [ObjectId],           // User IDs
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  foodItems: [{
    foodItemId: ObjectId,
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  deliveryAddress: String,
  status: Enum ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'],
  paymentMethod: String,
  paymentStatus: String,
  estimatedDeliveryTime: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Notification Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  type: Enum ['order', 'comment', 'like', 'system', 'message'],
  title: String,
  message: String,
  relatedId: ObjectId,         // Order/Comment/Item ID
  relatedModel: String,        // 'Order', 'FoodItem', etc.
  isRead: Boolean,
  createdAt: Date              // TTL: 30 days (auto-delete)
}
```

---

## 🔄 Socket.io Events

### Real-time Communication

**Client connects to server:**
```javascript
io.on('connection', (socket) => {
  socket.on('join-notification', (userId) => {
    // User joins their notification room
  });
});
```

**Events emitted:**

| Event | Data | Direction | Purpose |
|-------|------|-----------|---------|
| `join-notification` | `{ userId }` | C → S | User joins notification room |
| `new-order` | `{ orderId, partnerId }` | C → S | New order placed |
| `update-order-status` | `{ orderId, status, userId }` | C → S | Order status changed |
| `notification:new` | `{ notification }` | S → C | New notification for user |

---

## 🔐 Authentication Flow

### User Registration & Login

```
1. User submits credentials
   ↓
2. Email validation & uniqueness check
   ↓
3. Password hashing (bcryptjs, 10 rounds)
   ↓
4. User saved to MongoDB
   ↓
5. JWT token generated
   ↓
6. Token sent in response (cookies)
```

### Protected Routes

```javascript
// Middleware: auth.middleware.js
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Usage in routes
router.post('/order', verifyToken, createOrder);
```

---

## 📧 Email Service

### Nodemailer Configuration

The backend uses **Nodemailer** for sending emails:

```javascript
// services/email.service.js
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
});
```

### Email Types
- **Order Confirmation** - When order is placed
- **Order Status** - When status changes
- **Password Reset** - Password recovery links
- **Welcome Email** - User registration confirmation

---

## 🎬 Cloudinary Media Management

### Video Upload Flow

```javascript
// services/storage.service.js
const uploadToCloudinary = async (file) => {
  const result = await cloudinary.uploader.upload(file.path, {
    resource_type: 'video',
    folder: 'food_app/videos',
    quality: 'auto'
  });
  return result.secure_url;
};
```

### Supported Formats
- **Videos**: MP4, WebM, Mov
- **Images**: JPG, PNG, WebP
- **Auto-optimization**: Cloudinary handles compression

---

## 🧪 Testing the API

### Using cURL

```bash
# Get all food items
curl http://localhost:5000/api/food

# User login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Create food item (requires auth)
curl -X POST http://localhost:5000/api/food/create \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Pizza","price":500,"category":"Italian"}'
```

### Using Postman

1. Import the API collection (if available)
2. Set token in `Authorization` header
3. Configure `VITE_BASE_URL` environment variable
4. Run requests with proper payloads

---

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t food-backend:latest .
```

### Run Container

```bash
docker run -p 5000:5000 \
  --env-file .env \
  -d food-backend:latest
```

### Docker Compose

```bash
docker-compose up -d backend
```

---

## 🔧 Environment Variables Reference

| Variable | Type | Required | Example |
|----------|------|----------|---------|
| `PORT` | Number | Yes | `5000` |
| `NODE_ENV` | String | Yes | `development` \| `production` |
| `MONGODB_URI` | String | Yes | `mongodb+srv://...` |
| `JWT_SECRET` | String | Yes | `your_secret_key` |
| `CLOUDINARY_CLOUD_NAME` | String | Yes | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | String | Yes | `your_api_key` |
| `CLOUDINARY_API_SECRET` | String | Yes | `your_api_secret` |
| `FRONTEND_URL` | String | Yes | `http://localhost:5173` |
| `Admin_Email` | String | No | `admin@example.com` |

---

## 🐛 Common Issues & Solutions

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** 
- Ensure MongoDB is running locally OR
- Check `MONGODB_URI` connection string in `.env`
- Verify IP whitelist in MongoDB Atlas

### CORS/Preflight Errors
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Update `FRONTEND_URL` in `.env` to match actual frontend URL
- Ensure origin is in `allowedOrigins` array in `app.js`

### JWT Token Errors
```
JsonWebTokenError: invalid token
```
**Solution:**
- Verify token is being sent in Authorization header
- Check `JWT_SECRET` matches between token generation and verification
- Ensure token hasn't expired

### Cloudinary Upload Fails
```
Error: Invalid signature
```
**Solution:**
- Verify all Cloudinary credentials in `.env`
- Test credentials in Cloudinary dashboard
- Ensure API key and secret are correct

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:**
```bash
# Find process on port 5000
lsof -i :5000

# Kill process
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

---

## 📚 Related Documentation

- 🏠 [Main README](../README.md)
- ⚛️ [Frontend README](../frontend/README.md)
- 📧 [Notification System](../NOTIFICATIONS_SETUP.md)
- 🔄 [Order Flow](../ORDER_NOTIFICATION_FLOW.md)
- 🏗️ [System Architecture](../SYSTEM_ARCHITECTURE.md)

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Create a feature branch: `git checkout -b feature/new-feature`
2. Follow existing code style and patterns
3. Add comments for complex logic
4. Test thoroughly before submitting PR
5. Update this README if adding new features

---

## 📄 License

ISC License - feel free to use this project!

---

**Maintained with ❤️ by the Development Team**
- `src/models`: Mongoose data models.
- `src/routes`: API route definitions.
- `src/services`: External services (e.g., storage).

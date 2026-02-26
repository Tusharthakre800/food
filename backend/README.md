# Food App Backend

This is the backend for the Food App, a TikTok-style food delivery and discovery platform. It is built with Node.js, Express, and MongoDB.

## Features

- **Authentication**:
  - **User Auth**: Register, Login, Logout (JWT-based).
  - **Partner Auth**: Register, Login, Logout (JWT-based).
- **Food Items**:
  - CRUD operations for food items (Create, Read, Update, Delete).
  - Video upload and streaming support (via Cloudinary).
  - Search functionality with case-insensitive regex.
- **Engagement**:
  - Likes (toggle like/unlike).
  - Comments (add, get).
  - Save items (bookmarking).
- **Ordering**:
  - Place orders with address and quantity.
  - Standardized status workflow: `pending`, `confirmed`, `cancelled`, `out-for-delivery`, `delivered`.
  - Cash on Delivery (COD) support.
- **User Profile Enrichment**:
  - Dynamic fetching of order and saved item counts.
- **Middleware**:
  - Authentication middleware for protecting routes.
  - File upload handling (Multer).

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT), bcryptjs
- **File Storage**: Cloudinary (Media storage & optimization)
- **Logging**: Morgan
- **Other**: UUID, Cors, Cookie-Parser, Dotenv

## Installation

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

## Configuration

Create a `.env` file in the root of the `backend` directory with the following variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Running the Server

- **Development Mode** (with Nodemon):
    ```bash
    npm run dev
    ```
- **Production Mode**:
    ```bash
    npm start
    ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/partner/register` - Register a food partner
- `POST /api/auth/partner/login` - Login food partner

### Food Items
- `GET /api/food` - Get all food items (feed)
- `GET /api/food/search?q=query` - Search food items
- `POST /api/food/create` - Create a new food item (Partner only)
- `PUT /api/food/:id` - Update a food item
- `DELETE /api/food/:id` - Delete a food item

### Interactions
- `POST /api/food/like` - Like/Unlike a food item
- `POST /api/food/comment` - Add a comment
- `POST /api/food/save` - Save/Unsave a food item

### Orders
- `POST /api/food/order` - Place a new order

## Directory Structure

- `src/controller`: Request handlers for routes.
- `src/db`: Database connection logic.
- `src/middleware`: Custom middleware (auth, upload).
- `src/models`: Mongoose data models.
- `src/routes`: API route definitions.
- `src/services`: External services (e.g., storage).

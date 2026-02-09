# Food Delivery Backend

This is the backend API for a food delivery application. It provides authentication for users and food partners, as well as management of food items with image/video upload capabilities.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT (JSON Web Tokens), bcryptjs, cookie-parser
- **File Storage:** ImageKit
- **File Handling:** Multer

## Prerequisites

Ensure you have the following installed:
- Node.js
- MongoDB (Local or Atlas)

You will also need an [ImageKit](https://imagekit.io/) account for file uploads.

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   image_public_key=your_imagekit_public_key
   image_private_key=your_imagekit_private_key
   image_url_endpoint=your_imagekit_url_endpoint
   ```

## Scripts

- **Start Server:**
  ```bash
  npm start
  ```
- **Development Mode:**
  ```bash
  npm run dev
  ```

## API Endpoints

### Authentication

**User**
- `POST /api/auth/user/register`: Register a new user
  - Body: `fullname`, `email`, `password`
- `POST /api/auth/user/login`: Login user
  - Body: `email`, `password`
- `POST /api/auth/user/logout`: Logout user

**Food Partner**
- `POST /api/auth/food-partner/register`: Register a food partner
  - Body: `fullname`, `email`, `password`, `address`, `phone`
- `POST /api/auth/food-partner/login`: Login food partner
  - Body: `email`, `password`
- `POST /api/auth/food-partner/logout`: Logout food partner

### Food Items

- `POST /api/food`
  - **Access:** Protected (Food Partner only)
  - **Description:** Create a new food item with a video/image.
  - **Type:** `multipart/form-data`
  - **Fields:**
    - `name` (text)
    - `price` (number)
    - `description` (text)
    - `category` (text)
    - `video` (file)

- `GET /api/food`
  - **Access:** Protected (User only)
  - **Description:** Get all available food items.

## Project Structure

```
backend/
├── src/
│   ├── controller/      # Request handlers (Auth, Food)
│   ├── db/              # Database connection logic
│   ├── middleware/      # Authentication middleware
│   ├── models/          # Mongoose models (User, FoodPartner, FoodItem)
│   ├── routes/          # API route definitions
│   ├── services/        # External services (ImageKit)
│   └── app.js           # Express app setup
├── server.js            # Entry point
└── package.json         # Dependencies and scripts
```

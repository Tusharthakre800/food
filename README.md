# Food Discovery & Delivery App

A TikTok-style food discovery and delivery platform where users can browse short food videos, engage with content, and place orders directly. The platform connects food lovers with food partners (restaurants/chefs).

## 🚀 Project Overview

This monorepo contains the source code for the full-stack application:

- **[Frontend](./frontend)**: React + Vite application for the user interface.
- **[Backend](./backend)**: Node.js + Express + MongoDB API for data management.

## ✨ Key Features

- **Video Feed**: Immersive, vertical scrolling video feed for food discovery.
- **Dual Authentication**: Separate login/registration flows for Users and Food Partners.
- **Food Ordering**: Seamless checkout process with address management and dynamic pricing.
- **Social Engagement**: Like, comment, and save favorite food items.
- **Partner Dashboard**: Tools for partners to upload dishes and manage their menu.

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**
- **Tailwind CSS**
- **GSAP (Animations)**
- **Axios**
- **React Router DOM**
- **React Hot Toast**

### Backend
- **Node.js & Express**
- **MongoDB (Mongoose)**
- **JWT Authentication**
- **Cloudinary** (for media storage)

## 🏁 Getting Started

To run the full project locally, you need to set up and run both the backend and frontend servers.

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

### 1. Setup Backend
Navigate to the backend folder and follow the [Backend README](./backend/README.md).

```bash
cd backend
npm install
# Configure .env
npm run dev
```

### 2. Setup Frontend
Navigate to the frontend folder and follow the [Frontend README](./frontend/README.md).

```bash
cd frontend
npm install
# Configure .env
npm run dev
```

## 📂 Project Structure

```
food/
├── backend/          # API & Database logic
│   ├── src/
│   ├── .env
│   └── package.json
├── frontend/         # React User Interface
│   ├── src/
│   ├── .env
│   └── package.json
└── README.md         # This file
```

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---
Built with ❤️ for food lovers.

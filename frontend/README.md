# Food App Frontend

This is the frontend for the Food App, a TikTok-style food discovery and delivery platform. It offers an immersive video-based feed for browsing food items and a seamless ordering experience.

## Features

- **Immersive Feed**:
  - TikTok-style vertical scrolling video feed (`VideoCard`).
  - Auto-play videos with play/pause control.
  - Double-tap to like interaction.
- **User Experience**:
  - **Authentication**: User and Partner login/registration flows.
  - **Dark Mode**: Default dark theme with glassmorphism UI elements.
  - **Animations**: Premium, interactive animations using **GSAP** and Tailwind CSS.
- **Toast Notifications**: Interactive alerts using `react-hot-toast`.
- **Ordering System**:
  - **Order Flow**: Buy button -> Order Summary -> Address Edit -> Order Processing Animation -> Success.
  - **Status Badges**: Color-coded status tracking for all orders.
  - **Address Management**: Edit and save delivery address during checkout.
  - **Pricing**: Dynamic calculation with quantity and platform fees.
- **Enhanced UI/UX**:
  - **Skeleton Loaders**: Specialized shimmer effects for Profile and Policy pages.
  - **Error Handling**: Dedicated 404/Error page with recovery actions.
  - **Legal Center**: Dedicated Policy page for legal information.
- **Social Features**:
  - Like, Comment, and Save food items.
  - Visit Partner Profiles to see their menu.
- **Partner Dashboard**:
  - Partners can upload new dishes with videos.
  - Manage existing listings (Edit/Delete).

## Tech Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Installation

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

## Configuration

Create a `.env` file in the root of the `frontend` directory if needed (e.g., for API base URL):

```env
VITE_BASE_URL=http://localhost:3000
```

## Running the Application

- **Development Server**:
    ```bash
    npm run dev
    ```
- **Build for Production**:
    ```bash
    npm run build
    ```
- **Preview Build**:
    ```bash
    npm run preview
    ```

## Key Components

- `VideoCard.jsx`: The core feed component displaying video, info, and interactions.
- `OrderFood.jsx`: The checkout page with address editing and order processing.
- `UserProfile.jsx`: User profile with dynamic stats and address management.
- `UserProfileskeleton.jsx`: Shimmer loading state for the user profile.
- `PolicyPage.jsx`: Legal hub with privacy and terms info.
- `ErrorPage.jsx`: Modern 404/Error recovery page.
- `AppRouter.jsx`: Centralized routing configuration.

## Directory Structure

- `src/components`: Reusable UI components (VideoCard, Comments, etc.).
- `src/pages`: Full-page components (Home, OrderFood, Login, etc.).
- `src/context`: React context providers (e.g., ThemeContext).
- `src/routers`: Route definitions.
- `src/assets`: Static assets.

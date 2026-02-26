import { Routes, Route, Navigate } from 'react-router-dom';
import UserLogin from '../pages/UserLogin';
import UserRegister from '../pages/UserRegister';
import PartnerLogin from '../pages/PartnerLogin';
import PartnerRegister from '../pages/PartnerRegister';
import UserProfile from '../pages/UserProfile';
import Home from '../pages/Home';
import Saved from '../pages/Saved';
import Profile from '../pages/Profile';
import PartnerProfile from '../pages/PartnerProfile';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import PartnerForgotPassword from '../pages/PartnerForgotPassword';
import PartnerResetPassword from '../pages/PartnerResetPassword';
import CreateFoodPartner from '../create-food/CreateFoodPartner';
import OrderFood from '../pages/OrderFood';
import OrderList from '../pages/OrderList';
import AdminLogin from '../adminpanels/AdminLogin';
import Adminhome from '../adminpanels/Adminhome';
import AdminRoute from '../adminpanels/AdminRoute';
import AdminTotalUser from '../adminpanels/AdminTotalUser';
import AdminTotalFoodpartner from '../adminpanels/AdminTotalFoodpartner';
import AdminAllOrder from '../adminpanels/AdminAllOrder';
import AdminAllComment from '../adminpanels/AdminAllComment';
import Search from '../components/SearchFood';

import Policy from '../pages/PolicyPage';
import ErrorPage from '../pages/ErrorPage';



function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/user/login" replace />} />
        
        Admin Routes
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
            <AdminRoute>
              <Adminhome />
            </AdminRoute>
        } />
        <Route path="/admin/users" element={
            <AdminRoute>
              <AdminTotalUser />
            </AdminRoute>
        } />
        <Route path="/admin/partners" element={
            <AdminRoute>
              <AdminTotalFoodpartner />
            </AdminRoute>
        } />
        <Route path="/admin/orders" element={
            <AdminRoute>
              <AdminAllOrder />
            </AdminRoute>
        } />
        <Route path="/admin/comments" element={
            <AdminRoute>
              <AdminAllComment />
            </AdminRoute>
        } />

        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/partner/login" element={<PartnerLogin />} />
        <Route path="/partner/register" element={<PartnerRegister />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/partner/forgot-password" element={<PartnerForgotPassword />} />
        <Route path="/partner/reset-password/:token" element={<PartnerResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/partner/:id" element={<Profile />} />
        <Route path="/create-food" element={<CreateFoodPartner />} />
        <Route path="/order-food" element={<OrderFood />} />
        <Route path="/partner/profile" element={<PartnerProfile />} />
        <Route path="/order-list" element={<OrderList />} />
        <Route path="/search" element={<Search />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/*" element={<ErrorPage />} />



      </Routes>
    </>
  );
}

export default AppRouter;
import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MainLayout from './layouts/MainLayout';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PayOrder from './pages/PayOrder';
import OrderSuccess from './pages/OrderSuccess';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import OrderDetails from './pages/OrderDetails';

const router = createBrowserRouter([
  {
    element: <MainLayout />, // contains Navbar
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/products', element: <Products /> },
      { path: '/products/:id', element: <ProductDetails /> },
      {
        path: '/wishlist',
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: '/cart',
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: '/checkout',
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: '/pay/:id',
        element: (
          <ProtectedRoute>
            <PayOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: '/order-success',
        element: (
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/orders',
        element: (
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: '/orders/:id',
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },

      {
        path: '/admin',
        element: (
          <AdminRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </AdminRoute>
        ),
      },
      {
        path: '/admin/products',
        element: (
          <AdminRoute>
            <AdminLayout>
              <AdminProducts />
            </AdminLayout>
          </AdminRoute>
        ),
      },
      {
        path: '/admin/orders',
        element: (
          <AdminRoute>
            <AdminLayout>
              <AdminOrders />
            </AdminLayout>
          </AdminRoute>
        ),
      },
      {
        path: '/admin/users',
        element: (
          <AdminRoute>
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;

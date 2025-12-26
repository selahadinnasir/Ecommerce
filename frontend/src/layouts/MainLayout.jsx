import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../services/api';
import { setCart } from '../store/slices/cartSlice';
import { setWishlist } from '../store/slices/wishlistSlice';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) return;

    const loadUserData = async () => {
      try {
        const [cartRes, wishlistRes] = await Promise.all([
          API.get('/cart'),
          API.get('/wishlist'),
        ]);

        dispatch(
          setCart({ userId: user._id, cartItems: cartRes.data.cartItems })
        );
        dispatch(
          setWishlist({ userId: user._id, items: wishlistRes.data.items })
        );
      } catch (error) {
        console.error('Failed to load cart/wishlist', error);
      }
    };

    loadUserData();
  }, [user, dispatch]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;

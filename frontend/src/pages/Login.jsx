import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import { setCart } from '../store/slices/cartSlice';
import { setWishlist } from '../store/slices/wishlistSlice';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await API.post('/auth/login', form);
      dispatch(setCredentials(res.data));

      toast.success('Login successful 🎉');

      const cartRes = await API.get('/cart');

      console.log('userId', cartRes.data.user);
      console.log('cartsItems', cartRes.data.cartItems);

      const userId = cartRes.data.user;
      // Only dispatch if there are items
      if (cartRes.data.cartItems.length > 0) {
        dispatch(
          setCart({
            userId,
            cartItems: cartRes.data.cartItems,
          })
        );
      }

      const wishlistRes = await API.get('/wishlist');
      console.log('wishList data', wishlistRes.data);
      if (wishlistRes.data.items.length > 0) {
        dispatch(setWishlist({ userId, items: wishlistRes.data.items }));
      }

      console.log('login data', res.data, 'cart data', cartRes.data);
      queryClient.invalidateQueries({ queryKey: ['cart'] });

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      toast.error(error || 'Login failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
      >
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Welcome back
        </h2>
        <p className="text-gray-500 text-center mb-8">Login to your account</p>

        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className="mt-8 w-full rounded-lg bg-black py-3 text-white font-medium hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Footer */}
        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-gray-600 hover:text-black transition"
          >
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { clearCart } from '../store/slices/cartSlice';
import { Search, Heart, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-gray-900"
        >
          MyShop
        </Link>

        {/* Center: Main navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 hover:text-black transition"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-sm font-medium text-gray-700 hover:text-black transition"
          >
            Products
          </Link>

          {user && (
            <Link
              to="/orders"
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              Orders
            </Link>
          )}
        </div>

        {/* Right: Actions + user */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <button
            onClick={() => navigate('/products')}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            title="Search products"
          >
            <Search size={18} />
          </button>

          {user && (
            <>
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="p-2 rounded-lg hover:bg-gray-100 transition"
                title="Wishlist"
              >
                <Heart size={18} />
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="p-2 rounded-lg hover:bg-gray-100 transition"
                title="Cart"
              >
                <ShoppingCart size={18} />
              </Link>
            </>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-black transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 text-sm font-semibold bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative group">
              {/* User trigger */}
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white text-sm font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>

                <Link
                  to="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Orders
                </Link>

                <div className="border-t my-1" />

                <button
                  onClick={() => {
                    dispatch(logout());
                    dispatch(clearCart());
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

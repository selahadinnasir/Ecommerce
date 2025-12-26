// Shows wishlist items in a modern card layout
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  clearWishlist,
  removeFromWishlist,
} from '../store/slices/wishlistSlice';
import { useEffect } from 'react';
import API from '../services/api';
import { Trash2 } from 'lucide-react';
import { Heart } from 'lucide-react';

const Wishlist = () => {
  const { items } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    API.post('/wishlist', { items });
  }, [items]);

  if (items.length === 0)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4 rounded-xl">
        <Heart className="w-14 h-14 text-gray-400 mb-4" />

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Your wishlist is empty
        </h2>

        <p className="text-gray-500 mb-6 text-center">
          Save items you love and come back to them later
        </p>

        <Link
          to="/products"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Browse products
        </Link>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">My Wishlist</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <Link
                to={`/products/${item.product}`}
                className="font-semibold text-lg mb-2 block hover:underline"
              >
                {item.name}
              </Link>
              <p className="text-gray-700 mb-2">${item.price}</p>
              <button
                onClick={() =>
                  dispatch(
                    removeFromWishlist({
                      id: item.product,
                      userId: user._id,
                    })
                  )
                }
                className="text-red-600 hover:underline"
              >
                <Trash2 className="w-5 h-5" />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          dispatch(
            clearWishlist({
              userId: user._id,
            })
          )
        }
        className=" mt-4 text-center items-center gap-2 rounded-lg border border-red-500 px-5 py-2.5 text-red-600 font-medium hover:bg-red-50 hover:text-red-700 transition"
      >
        Clear All WishLists
      </button>
    </div>
  );
};

export default Wishlist;

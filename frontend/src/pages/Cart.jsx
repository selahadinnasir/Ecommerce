import { useSelector, useDispatch } from 'react-redux';
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from '../store/slices/cartSlice';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { useEffect } from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';

const Cart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const authUser = user || {};

  const { items } = useSelector((state) => state.cart);
  // const items = Array.isArray(cart?.items) ? cart.items : [];

  console.log('items', items);

  useEffect(() => {
    API.post('/cart', { cartItems: items });
  }, [items]);

  const totalPrice = items.reduce(
    (sum, item) => sum + item?.price * item?.quantity,
    0
  );

  console.log('cart Itmes from redux', items);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Your cart is empty
        </h2>

        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything yet
        </p>

        <Link
          to="/products"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {/* Cart Items */}
        <div className="bg-white rounded-xl shadow-sm divide-y">
          {items?.map((item, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-center md:justify-between p-5 gap-4"
            >
              {/* Product */}
              <div className="flex items-center gap-5">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-24 h-24 rounded-lg object-cover border"
                />

                <div>
                  <h3 className="font-semibold text-gray-800">{item?.name}</h3>
                  <p className="text-gray-500 mt-1">${item?.price}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 justify-end">
                <input
                  type="number"
                  min="1"
                  value={item?.quantity}
                  onChange={(e) =>
                    dispatch(
                      updateQuantity({
                        id: item.product,
                        quantity: Number(e.target.value),
                        userId: authUser._id,
                      })
                    )
                  }
                  className="w-20 rounded-lg border px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-black"
                />

                <button
                  onClick={() =>
                    dispatch(
                      removeFromCart({
                        id: item.product,
                        userId: authUser._id,
                      })
                    )
                  }
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 transition"
                >
                  <Trash2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <button
            onClick={() =>
              dispatch(
                clearCart({
                  userId: authUser._id,
                })
              )
            }
            className="  text-center items-center gap-2 rounded-lg border border-red-500 px-5 py-2.5 text-red-600 font-medium hover:bg-red-50 hover:text-red-700 transition"
          >
            Clear Cart
          </button>

          <div className="bg-white rounded-xl shadow-sm p-6 text-right w-full md:w-auto">
            <p className="text-lg text-gray-600 mb-2">Total</p>
            <p className="text-2xl font-bold text-gray-900 mb-4">
              ${totalPrice?.toFixed(2)}
            </p>

            <Link
              to="/checkout"
              className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

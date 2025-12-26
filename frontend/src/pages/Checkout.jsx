import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) navigate('/');
  }, [items, navigate]);

  if (items.length === 0) return null;

  const itemsPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingPrice = 0;
  const taxPrice = 0;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async () => {
    console.log('orders', items);
    try {
      setLoading(true);

      // Map cart items to match orderItemSchema
      const orderItems = items.map((item) => ({
        name: item.name,
        qty: item.quantity,
        image: item.image,
        price: item.price,
        product: item.product, // reference Product ID
      }));

      // Example shipping info (replace with form values later)
      const shippingAddress = {
        fullName: 'John Doe',
        address: '123 Main St',
        city: 'CityName',
        country: 'CountryName',
        postalCode: '12345',
      };

      const { data } = await API.post('/orders', {
        user: user._id, // from Redux auth
        orderItems,
        shippingAddress,
        paymentMethod: 'Stripe',
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      toast.success('Order placed successfully 🎉');

      navigate(`/pay/${data._id}`);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          'Failed to place order. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

        <div className="space-y-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between text-gray-700"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t mt-6 pt-6 flex items-center justify-between">
          <p className="text-lg font-medium text-gray-700">Total</p>
          <p className="text-2xl font-bold text-gray-900">
            ${totalPrice.toFixed(2)}
          </p>
        </div>

        <button
          onClick={placeOrderHandler}
          disabled={loading}
          className="mt-8 w-full rounded-lg bg-black py-3 text-white font-medium hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default Checkout;

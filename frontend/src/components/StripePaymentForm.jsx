import { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import API from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const StripePaymentForm = ({ total, orderId, userEmail }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const authUser = user || {};

  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Create payment intent when component loads
  useEffect(() => {
    const createIntent = async () => {
      const res = await API.post('/payments/create-payment-intent', {
        amount: total,
      });
      setClientSecret(res.data.clientSecret);
    };

    createIntent();
  }, [total]);

  // Handle Stripe payment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);

      toast.error(error || 'Payment failed. Please try again.');

      return;
    }

    if (result.paymentIntent.status === 'succeeded') {
      await API.put(`/orders/${orderId}/pay`, {
        id: result.paymentIntent.id,
        status: result.paymentIntent.status,
        update_time: new Date().toISOString(),
        email_address: userEmail,
      });

      dispatch(
        clearCart({
          userId: authUser._id,
        })
      );
      toast.success('Payment successful 🎉 Your order is confirmed!');

      navigate('/order-success');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-md border p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Payment
        </h2>

        <div className="mb-6">
          <CardElement className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : `Pay $${total}`}
        </button>
      </form>
    </div>
  );
};

export default StripePaymentForm;

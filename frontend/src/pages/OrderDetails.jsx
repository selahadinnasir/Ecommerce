import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';

const fetchOrder = async (id) => {
  const res = await API.get(`/orders/${id}`);
  return res.data;
};

const OrderDetails = () => {
  const { id } = useParams();

  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrder(id),
  });

  if (isLoading) {
    return <p className="p-6 text-center text-gray-500">Loading order...</p>;
  }

  if (error) {
    return (
      <p className="p-6 text-center text-red-500">
        Failed to load order details
      </p>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Order #{order._id.slice(-6).toUpperCase()}
              </h1>
              <p className="text-sm text-gray-500">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm font-medium
                ${
                  order.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}
            >
              {order.status}
            </span>
          </div>
        </div>

        {/* Shipping & Payment */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Shipping */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
            <p className="text-gray-700">{order.shippingAddress.fullName}</p>
            <p className="text-gray-700">{order.shippingAddress.address}</p>
            <p className="text-gray-700">
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            </p>
            <p className="text-gray-700">{order.shippingAddress.country}</p>

            <p
              className={`mt-3 text-sm font-medium ${
                order.isDelivered ? 'text-green-600' : 'text-yellow-600'
              }`}
            >
              {order.isDelivered ? 'Delivered' : 'Not Delivered'}
            </p>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
            <p className="text-gray-700">
              Method: <span className="font-medium">{order.paymentMethod}</span>
            </p>

            <p
              className={`mt-3 text-sm font-medium ${
                order.isPaid ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {order.isPaid ? 'Payment Completed' : 'Payment Pending'}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>

          <div className="divide-y">
            {order.orderItems.map((item) => (
              <div key={item.product} className="flex items-center gap-4 py-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>

                <p className="font-semibold text-gray-900">
                  ${item.price * item.qty}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Items</span>
              <span>${order.itemsPrice}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${order.shippingPrice}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>${order.taxPrice}</span>
            </div>

            <div className="border-t pt-3 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${order.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

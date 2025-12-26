import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import { Link } from 'react-router-dom';

const fetchOrders = async () => {
  const res = await API.get('/orders/myorders');
  return res.data;
};

const OrderHistory = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['myOrders'],
    queryFn: fetchOrders,
  });

  if (isLoading) return <p className="p-6">Loading orders...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Paid</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="border p-2">{order._id.slice(-6)}</td>
                <td className="border p-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="border p-2">${order.totalPrice}</td>
                <td className="border p-2">{order.isPaid ? 'Yes' : 'No'}</td>
                <td className="border p-2">{order.status}</td>
                <td className="border p-2">
                  <Link
                    to={`/orders/${order._id}`}
                    className="text-blue-600 underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;

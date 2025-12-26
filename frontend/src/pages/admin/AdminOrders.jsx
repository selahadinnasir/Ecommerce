import { useQuery } from '@tanstack/react-query';
import API from '../../services/api';

const fetchOrders = async () => {
  const { data } = await API.get('/orders'); // admin route
  return data;
};

const AdminOrders = () => {
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: fetchOrders,
  });

  const markDelivered = async (id, isPaid) => {
    if (!isPaid) {
      return alert('It should be Paid First');
    }
    await API.put(`/orders/${id}/status`, { status: 'delivered' });
    refetch();
  };

  const updateStatus = async (id, isPaid, status) => {
    console.log('isPaid and status', isPaid, status);
    if (status === 'delivered' && !isPaid) {
      console.log('inside if');
      return alert('It should be Paid First');
    }
    await API.put(`/orders/${id}/status`, { status });
    refetch();
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Orders</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">User</th>
            <th className="p-2">Total</th>
            <th className="p-2">Paid</th>
            <th className="p-2">Delivered</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-t">
              <td className="p-2">{o.user ? o.user.name : 'Deleted User'}</td>
              <td className="p-2">${o.totalPrice}</td>
              <td className="p-2">{o.isPaid ? 'Yes' : 'No'}</td>
              <td className="p-2">{o.isDelivered ? 'Yes' : 'No'}</td>
              <td className="p-2">
                <select
                  value={o.status}
                  onChange={(e) =>
                    updateStatus(o._id, o.isPaid, e.target.value)
                  }
                  className="border p-1"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td className="p-2 space-x-2">
                {!o.isDelivered && (
                  <button
                    onClick={() => markDelivered(o._id, o.isPaid)}
                    className="text-green-600"
                  >
                    Mark Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;

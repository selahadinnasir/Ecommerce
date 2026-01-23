import { useQuery } from '@tanstack/react-query';
import API from '../../services/api';
import { Truck, CheckCircle } from 'lucide-react';

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
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-semibold mb-4">Orders</h1>

      {/* Table wrapper */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
        <table className="w-full text-sm md:text-xl   md:min-w-[700px]">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left font-medium">User</th>
              <th className="px-4 py-2 text-left font-medium">Total</th>
              <th className="px-4 py-2 text-center font-medium">Paid</th>
              <th className="px-4 py-2 text-center font-medium">Delivered</th>
              <th className="px-4 py-2 text-left font-medium">Status</th>
              <th className="px-4 py-2 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-2">
                  {o.user ? o.user.name : 'Deleted User'}
                </td>

                <td className="px-4 py-2 font-medium">${o.totalPrice}</td>

                {/* Paid badge */}
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      o.isPaid
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {o.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                </td>

                {/* Delivered badge */}
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      o.isDelivered
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {o.isDelivered ? 'Yes' : 'No'}
                  </span>
                </td>

                {/* Status select */}
                <td className="px-4 py-2">
                  <select
                    value={o.status}
                    onChange={(e) =>
                      updateStatus(o._id, o.isPaid, e.target.value)
                    }
                    className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>

                {/* Actions */}
                <td className="px-4 py-2">
                  <div className="flex justify-end">
                    {!o.isDelivered && (
                      <button
                        onClick={() => markDelivered(o._id, o.isPaid)}
                        className="flex items-center gap-1 text-green-600 hover:text-green-800 transition text-sm"
                      >
                        <Truck size={16} />
                        Mark Delivered
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;

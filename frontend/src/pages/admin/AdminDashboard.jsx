import { useQuery } from '@tanstack/react-query';
import API from '../../services/api';

// Fetch admin overview stats
const fetchStats = async () => {
  const res = await API.get('/admin/stats');
  return res.data;
};

const AdminDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: fetchStats,
  });

  if (isLoading) return <p>Loading dashboard...</p>;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Users */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-sm text-gray-500 mb-1">Total Users</p>
          <p className="text-3xl font-semibold text-gray-900">
            {data.usersCount}
          </p>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-sm text-gray-500 mb-1">Total Orders</p>
          <p className="text-3xl font-semibold text-gray-900">
            {data.ordersCount}
          </p>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
          <p className="text-3xl font-semibold text-gray-900">
            ${data.totalRevenue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

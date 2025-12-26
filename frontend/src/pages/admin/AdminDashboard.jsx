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
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow rounded">
          <p className="text-gray-500">Users</p>
          <p className="text-2xl font-bold">{data.usersCount}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <p className="text-gray-500">Orders</p>
          <p className="text-2xl font-bold">{data.ordersCount}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <p className="text-gray-500">Revenue</p>
          <p className="text-2xl font-bold">${data.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

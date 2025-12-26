import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import API from '../../services/api';

// Fetch all users (admin only)
const fetchUsers = async () => {
  const res = await API.get('/users');
  return res.data;
};

const AdminUsers = () => {
  const queryClient = useQueryClient();
  const { user: authUser } = useSelector((state) => state.auth);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: fetchUsers,
  });

  // Toggle admin role
  const toggleAdmin = async (user) => {
    const action = user.isAdmin ? 'remove admin from' : 'make admin';

    if (!confirm(`Are you sure you want to ${action} ${user.name}?`)) return;

    try {
      const res = await API.put(`/users/${user._id}`, {
        isAdmin: !user.isAdmin,
      });

      alert(res.data.message || 'User role updated');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed');
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    if (!confirm('Delete this user permanently?')) return;

    try {
      await API.delete(`/users/${id}`);
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading users...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">User Management</h1>

      <div className="overflow-x-auto rounded-lg shadow border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => {
              const isSelf = u._id === authUser._id;

              return (
                <tr key={u._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>

                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        u.isAdmin
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {u.isAdmin ? 'Admin' : 'User'}
                    </span>
                  </td>

                  <td className="p-3 flex justify-center gap-3">
                    <button
                      onClick={() => toggleAdmin(u)}
                      disabled={isSelf}
                      className={`px-3 py-1 text-xs rounded border ${
                        isSelf
                          ? 'opacity-40 cursor-not-allowed'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {u.isAdmin ? 'Remove Admin' : 'Make Admin'}
                    </button>

                    <button
                      onClick={() => deleteUser(u._id)}
                      disabled={isSelf}
                      className={`px-3 py-1 text-xs rounded border text-red-600 ${
                        isSelf
                          ? 'opacity-40 cursor-not-allowed'
                          : 'hover:bg-red-50'
                      }`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import API from '../services/api';
import { setCredentials } from '../store/slices/authSlice';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: '',
    email: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordMessage, setPasswordMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/exhaustive-deps

      setForm({ name: user.name, email: user.email, password: '' });
    }
  }, [user]);

  // Update user profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const payload = {
        name: form.name,
        email: form.email,
      };

      const res = await API.put('/users/profile', payload);
      console.log(res.data);
      //   Update Redux + localStorage
      dispatch(
        setCredentials({
          user: res.data,
          token,
        })
      );

      setMessage('Profile updated successfully');

      toast.success('Profile updated successfully');
    } catch (err) {
      setMessage('Update failed');

      toast.error(err.response?.data?.message || 'update failed');
    }

    setLoading(false);
  };

  // Change user password (requires current password)
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMessage('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return setPasswordMessage('New passwords do not match');
    }

    try {
      await API.put('/users/profile/password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      setPasswordMessage('Password updated successfully');
      toast.success('Password updated successfully');

      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      setPasswordMessage(
        err.response?.data?.message || 'Password update failed'
      );
      toast.error(err.response?.data?.message || 'Password update failed');
    }
  };
  return (
    <div className="max-w-lg mx-auto mt-10 px-4">
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          My Profile
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Update your personal information
        </p>

        {message && (
          <p className="mb-4 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            {message}
          </p>
        )}

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="you@example.com"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>

        {/* Divider */}
        <hr className="my-8" />

        {/* Password Section */}
        <h3 className="text-xl font-semibold text-gray-900 mb-1">
          Change Password
        </h3>
        <p className="text-sm text-gray-500 mb-4">Keep your account secure</p>

        {passwordMessage && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {passwordMessage}
          </p>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <input
            type="password"
            placeholder="Current password"
            value={passwordForm.currentPassword}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                currentPassword: e.target.value,
              })
            }
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="New password"
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, newPassword: e.target.value })
            }
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={passwordForm.confirmPassword}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                confirmPassword: e.target.value,
              })
            }
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-black transition">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

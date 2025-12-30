import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../services/api';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.post(`/users/reset-password/${token}`, { password });
      setMessage('Password reset successful. You can now login.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage('Invalid or expired reset link.');
      console.log('error reset', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Reset Password</h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your new password
        </p>

        <input
          type="password"
          placeholder="New password"
          className="w-full rounded-lg border px-4 py-3 mb-4 focus:ring-2 focus:ring-black"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;

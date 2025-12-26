import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await API.post('/auth/register', form);
      dispatch(setCredentials(res.data));
      toast.success('Account created successfully 🎉');

      queryClient.invalidateQueries({ queryKey: ['cart'] });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      toast.error(error || 'Registration failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Create account
        </h2>

        <p className="text-gray-500 text-center mb-8">Sign up to get started</p>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Full name"
            className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          disabled={loading}
          className="mt-8 w-full rounded-lg bg-black py-3 text-white font-medium hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;

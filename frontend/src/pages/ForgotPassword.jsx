import { useState } from 'react';
import API from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await API.post('/users/forgot-password', { email });
    setMessage(`${res.data.message}`);
    // console.log('res User forgot', res.data.User);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>

      {message && <p className="text-sm text-green-600 mb-3">{message}</p>}

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border px-4 py-2 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <Link to="/register" className="text-green-600">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

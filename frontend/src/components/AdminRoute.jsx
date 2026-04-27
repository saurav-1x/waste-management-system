import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="py-10 text-center">Loading...</div>;
  return user && user.role === 'admin' ? children : <Navigate to="/dashboard" />;
};

export default AdminRoute;

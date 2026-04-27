import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="py-10 text-center">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

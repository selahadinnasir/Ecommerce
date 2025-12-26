import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Protect pages so only logged-in users can access
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;

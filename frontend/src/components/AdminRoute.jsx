import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Protect admin-only pages
const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user || !user.isAdmin) {
    return <Navigate to="/" />;
    // console.log("you're not admin but for test");
  }

  return children;
};

export default AdminRoute;

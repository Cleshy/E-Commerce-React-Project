import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const AdminRoute = ({ element }) => {
  const { isLoggedIn, userRole } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (userRole !== 0) {
    return <Navigate to="/" />;
  }

  return element;
};

export default AdminRoute;

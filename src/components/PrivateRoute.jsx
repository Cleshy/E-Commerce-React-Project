import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PrivateRoute = ({ element }) => {
  const { isLoggedIn, loadingAuth, userRole } = useAuth();

  if (loadingAuth) {
    return <h2>Loading...</h2>;
  }

  return isLoggedIn && !loadingAuth && userRole === 1 ? (
    element
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;

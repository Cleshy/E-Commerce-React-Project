import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PrivateRoute = ({ element }) => {
  const { isLoggedIn, loadingAuth } = useAuth();

  if (loadingAuth) {
    return <h2>Loading...</h2>;
  }

  return isLoggedIn && !loadingAuth ? element : <Navigate to="/signin" />;
};

export default PrivateRoute;

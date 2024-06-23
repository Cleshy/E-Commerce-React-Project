import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  // We have to check if Authentication is still loading
  const [loadingAuth, setloadingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user token is already in the localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode the token from the localStorage and get informations like userId, userRole.
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        const userRole = decodedToken.userRole;
        setIsLoggedIn(true);
        setUserId(userId);
        setUserRole(userRole);
      } catch (error) {
        // If decoding doesn't work for some reason.
        console.error("Invalid token:", error);
      }
    } else {
      setIsLoggedIn(false);
    }
    setloadingAuth(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    const userRole = decodedToken.userRole;
    localStorage.setItem("userId", userId);
    setIsLoggedIn(true);
    setUserId(userId);
    setUserRole(userRole);
    navigate("/profile");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserId(null);
    setUserRole(null);
    navigate("/signin");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout,
        userId,
        userRole,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loadingAuth, setloadingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        const userRole = decodedToken.userRole;
        setIsLoggedIn(true);
        setUserId(userId);
        setUserRole(userRole);
      } catch (error) {
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

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

const useFetchCurrentUser = () => {
  const { userId } = useAuth();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/profile", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "user-id": userId,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products!");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  return { user, loading };
};

export default useFetchCurrentUser;

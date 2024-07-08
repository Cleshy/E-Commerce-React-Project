import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

const useFetchOrders = () => {
  const { userId } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/orders", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "user-id": userId,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products!");
        }

        const ordersData = await response.json();
        setOrders(ordersData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  return { orders, loading };
};

export default useFetchOrders;

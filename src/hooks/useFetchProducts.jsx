import { useState, useEffect } from "react";

const API_URL = "https://dummyjson.com/products";

const useFetchProducts = (limit = 0) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}?limit=${limit}`);
        if (!response) {
          throw new Error("Failed to fetch products!");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [limit]);

  return { products, loading };
};

export default useFetchProducts;

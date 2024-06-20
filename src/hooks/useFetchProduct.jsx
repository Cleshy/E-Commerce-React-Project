import { useState, useEffect } from "react";

const PRODUCT_URL = "https://dummyjson.com/products/";

const useFetchProduct = (id) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${PRODUCT_URL}${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products!");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { product, loading };
};

export default useFetchProduct;

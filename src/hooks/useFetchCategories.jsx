import { useState, useEffect } from "react";

const CATEGORIES_URL = "https://dummyjson.com/products/categories";

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${CATEGORIES_URL}`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories!");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return { categories, loading };
};

export default useFetchCategories;

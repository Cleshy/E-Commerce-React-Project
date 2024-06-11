import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../utils/stringUtils.js";
import Sidebar from "../components/Sidebar.jsx";
import ProductList from "../components/ProductList.jsx";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    const data = await response.json();
    const capitalizedCategories = data.map((category) =>
      capitalizeFirstLetter(category)
    );
    setCategories(capitalizedCategories);
  };

  const fetchAllProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setAllProducts(data);
  };

  useEffect(() => {
    fetchCategories();
    fetchAllProducts();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl text-center font-semibold">Products</h1>
      {/* Sidebar for filter */}
      {/* A row for sorting */}
      {/* Content page */}
      <div className="grid grid-cols-8 mt-16">
        <div className="border-2">
          <Sidebar categories={categories} />
        </div>
        <div className="border-t-2 border-r-2 col-start-2 col-span-full">
          A row for sorting
        </div>
        <div className=" col-start-2 col-span-full">
          <ProductList products={allProducts} />
        </div>
      </div>
    </div>
  );
};

export default Products;

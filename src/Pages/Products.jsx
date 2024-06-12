import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../utils/stringUtils.js";
import Sidebar from "../components/Sidebar.jsx";
import Loading from "../components/Loading.jsx";
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
    setLoading(false);
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
      <div className="grid grid-cols-4 gap-4 mt-16">
        <div className="col-span-1">
          {!loading ? <Sidebar categories={categories} /> : <Loading />}
        </div>
        <div className="col-span-3 shadow-2xl rounded-2xl p-5">
          <form class="max-w-sm">
            <div>
              <label
                for="countries"
                class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sort by:
              </label>
              <select
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Price ASC</option>
                <option value="US">Price DESC</option>
                <option value="CA">Product Name</option>
                <option value="FR">Product Category</option>
              </select>
            </div>
          </form>
        </div>
        <div className="col-span-full">
          <ProductList loading={loading} products={allProducts} />
        </div>
      </div>
    </div>
  );
};

export default Products;

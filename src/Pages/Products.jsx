import { useEffect, useState, useMemo } from "react";
import Categories from "../components/Categories.jsx";
import Loading from "../components/Loading.jsx";
import ProductList from "../components/ProductList.jsx";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    const response = await fetch("https://dummyjson.com/products/categories");
    const data = await response.json();
    setCategories(data);
    setLoading(false);
  };

  const fetchAllProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    console.log(data.products);
    setAllProducts(data.products);
  };

  useEffect(() => {
    fetchCategories();
    fetchAllProducts();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl text-center font-semibold">Products</h1>
      <div className="grid grid-cols-6 gap-4 mt-8">
        <div className="col-span-1 row-span-full">
          {!loading ? <Categories categories={categories} /> : <Loading />}
        </div>
        <div className="col-start-2 col-span-full">
          <form className="shadow-xl rounded-2xl p-5">
            <div>
              <label
                htmlFor="countries"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sort by:
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option defaultValue="Price ASC">
                  Default: Price Ascending
                </option>
                <option value="Price DESC">Price Descending</option>
                <option value="Name">Name</option>
                <option value="Category">Category</option>
              </select>
            </div>
          </form>
          <div className="grid auto-cols-fr mt-6">
            <ProductList loading={loading} products={allProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

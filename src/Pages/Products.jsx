import { useEffect, useState } from "react";
import Categories from "../components/Categories.jsx";
import Loading from "../components/Loading.jsx";
import ProductList from "../components/ProductList.jsx";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("price-desc");
  const [sortedProducts, setSortedProducts] = useState([]);

  const handleProductsSort = (products, sortType) => {
    const sorted = [...products];

    switch (sortType) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "title":
        sorted.sort((a, b) => (a.title > b.title ? 1 : -1));
        break;
      case "category":
        sorted.sort((a, b) => (a.category > b.category ? 1 : -1));
        break;
      case "price-desc":
      default:
        sorted.sort((a, b) => b.price - a.price);
    }

    console.log(sorted);

    setSortedProducts(sorted);
  };

  useEffect(() => {
    handleProductsSort(products, sortType);
  }, [products, sortType]);

  const fetchCategories = async () => {
    const response = await fetch("https://dummyjson.com/products/categories");
    const data = await response.json();
    setCategories(data);
    setLoading(false);
  };

  const fetchAllProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    setProducts(data.products);
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
          <form className="shadow-inner border-2 rounded-2xl p-5 flex justify-between gap-16">
            <div className="w-[50%]">
              <label htmlFor="search">Search for a product:</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Search for products..."
                type="text"
              />
            </div>
            <div className="w-[50%]">
              <label
                htmlFor="countries"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sort by:
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="price-desc">Price Decending</option>
                <option value="price-asc">Price Ascending</option>
                <option value="title">Name</option>
                <option value="category">Category</option>
              </select>
            </div>
          </form>
          <div className="grid auto-cols-fr mt-6">
            <ProductList loading={loading} products={sortedProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

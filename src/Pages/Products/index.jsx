import { useEffect, useState } from "react";
import Categories from "./Categories.jsx";
import Loading from "../../components/Loading.jsx";
import ProductList from "./ProductList.jsx";
import useFetchProducts from "../../hooks/useFetchProducts.jsx";
import useFetchCategories from "../../hooks/useFetchCategories.jsx";

const Products = () => {
  const { products, loading: productsLoading } = useFetchProducts();
  const { categories, loading: categoriesLoading } = useFetchCategories();
  const [productChanges, setProductChanges] = useState([]);
  const [sortType, setSortType] = useState("price-desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setselectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productChanges.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(productChanges.length / productsPerPage);

  const nextPage = () => {
    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
  };

  const handleCategoryChange = (selectedCategories) => {
    setselectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(selectedCategories)
        ? prevSelectedCategories.filter((c) => c !== selectedCategories)
        : [...prevSelectedCategories, selectedCategories]
    );
  };

  const handleProductsSortAndFilter = (
    products,
    sortType,
    searchQuery,
    selectedCategories
  ) => {
    let sorted = [...products];

    if (searchQuery) {
      sorted = sorted.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      sorted = sorted.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

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

    setProductChanges(sorted);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleProductsSortAndFilter(
      products,
      sortType,
      searchQuery,
      selectedCategories
    );
  }, [products, sortType, searchQuery, selectedCategories]);

  return (
    <section className="container mx-auto mt-36">
      <h2 className="text-[3rem] text-center font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-rose-700">
        Products
      </h2>
      <div className="grid grid-cols-6 gap-4 mt-14">
        <div className="col-span-1 row-span-full">
          {!categoriesLoading ? (
            <>
              <Categories
                onCategoryChange={handleCategoryChange}
                categories={categories}
              />
            </>
          ) : (
            <Loading />
          )}
        </div>
        <div className="col-start-2 col-span-full">
          <form className="shadow-inner border-2 rounded-2xl p-5 flex justify-between gap-16">
            <div className="w-[50%]">
              <label htmlFor="search">Search for a product:</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Search for products..."
                onChange={(e) => setSearchQuery(e.target.value)}
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
          <div className="grid auto-cols-fr my-6">
            <ProductList loading={productsLoading} products={currentProducts} />
            <div className="mt-4 flex justify-center items-center gap-5">
              <button
                className={`mx-2 px-4 py-2 border rounded ${
                  currentPage === 1 ? "bg-gray-200" : "bg-rose-600 text-white"
                }`}
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <p>{currentPage}</p>
              <button
                className={`mx-2 px-4 py-2 border rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300"
                    : "bg-rose-600 text-white"
                }`}
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;

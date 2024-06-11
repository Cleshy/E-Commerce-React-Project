import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import Loading from "../components/Loading";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch("https://fakestoreapi.com/products?limit=6");
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };

    getProduct();
  }, []);

  return (
    <section className="my-10 mx-10">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-semibold">Welcome to ShopEase!</h1>
        <p className="mt-5 mb-16 w-[80%] mx-auto">
          ShopEase is your one-stop online store for all your shopping needs. We
          offer a wide range of products from electronics to fashion, ensuring
          quality and affordability. Discover an effortless shopping experience
          with fast shipping and exceptional customer service.
        </p>
      </div>
      <div className="container mx-auto">
        {!loading ? (
          <ProductList products={products} />
        ) : (
          <div className="container mx-auto text-c">
            <Loading />
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;

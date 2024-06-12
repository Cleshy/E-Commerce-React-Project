import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import Loading from "../components/Loading";
import Hero from "../components/Hero";

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
    <div className="my-10 mx-10">
      <Hero />
      <div className="container mx-auto">
        {!loading ? (
          <ProductList products={products} />
        ) : (
          <div className="container mx-auto text-c">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

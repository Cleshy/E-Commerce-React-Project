import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import Loading from "../components/Loading";
import Hero from "../components/Hero";
import SimpleSlider from "../components/SimpleSlider";
import ProductCard from "../components/ProductCard";

const Home = ({ onClick, closeModal }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch("https://dummyjson.com/products?limit=5");
      const data = await response.json();
      console.log(data.products);
      setProducts(data.products);
      setLoading(false);
    };

    getProduct();
  }, []);

  return (
    <div className="my-10 mx-10">
      <Hero onClick={onClick} closeModal={closeModal} />
      <div className="container mx-auto">
        {!loading ? (
          <SimpleSlider>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleSlider>
        ) : (
          <div className="container mx-auto">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

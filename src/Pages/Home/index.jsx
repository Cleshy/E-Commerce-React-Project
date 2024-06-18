import React, { useEffect, useState } from "react";
import ProductList from "../Products/ProductList";
import Loading from "../../components/Loading";
import Hero from "./Hero";
import SimpleSlider from "./SimpleSlider";
import ProductCard from "../../components/ProductCard";

const Home = ({ onClick, closeModal }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch("https://dummyjson.com/products?limit=5");
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    };

    getProduct();
  }, []);

  return (
    <>
      <Hero onClick={onClick} closeModal={closeModal} />
      <section className="container mx-auto my-32">
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
      </section>
    </>
  );
};

export default Home;

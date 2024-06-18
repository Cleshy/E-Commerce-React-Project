import Loading from "../../components/Loading";
import Hero from "./Hero";
import ProductSlider from "./ProductSlider";
import useFetchProducts from "../../hooks/useFetchProducts";

const Home = () => {
  const { products, loading } = useFetchProducts(5);

  return (
    <>
      <Hero />
      {loading ? <Loading /> : <ProductSlider products={products} />}
    </>
  );
};

export default Home;

import Loading from "../../components/Loading";
import Hero from "./Hero";
import NewsLetter from "./NewsLetter";
import ProductSlider from "./ProductSlider";
import useFetchProducts from "../../hooks/useFetchProducts";

const Home = () => {
  const { products, loading } = useFetchProducts(5);

  return (
    <>
      <Hero />
      <NewsLetter />
      {loading ? (
        <div className="my-24">
          <Loading />
        </div>
      ) : (
        <ProductSlider products={products} />
      )}
    </>
  );
};

export default Home;

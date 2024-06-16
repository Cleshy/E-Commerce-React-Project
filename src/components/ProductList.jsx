import ProductCard from "./ProductCard";
import Loading from "./Loading";

const ProductList = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="mt-16">
        <Loading />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-auto-fit-25 auto-rows-[25rem] gap-10 mb-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

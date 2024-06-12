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
    <div className="grid grid-cols-auto-fit-25 gap-10">
      {products.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
};

export default ProductList;

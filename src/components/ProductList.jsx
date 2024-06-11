import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-auto-fit-25 gap-10">
      {products.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
};

export default ProductList;

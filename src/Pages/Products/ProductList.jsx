import Card from "../../components/Card";
import Loading from "../../components/Loading";

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
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

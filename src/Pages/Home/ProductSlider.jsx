import SimpleSlider from "./SimpleSlider";
import ProductCard from "../../components/ProductCard";

const ProductSlider = ({ products }) => {
  return (
    <section className="container mx-auto my-32">
      <SimpleSlider>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleSlider>
    </section>
  );
};

export default ProductSlider;

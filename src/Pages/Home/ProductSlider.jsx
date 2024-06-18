import SimpleSlider from "./SimpleSlider";
import Card from "../../components/Card";

const ProductSlider = ({ products }) => {
  return (
    <section className="container mx-auto my-32">
      <SimpleSlider>
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </SimpleSlider>
    </section>
  );
};

export default ProductSlider;

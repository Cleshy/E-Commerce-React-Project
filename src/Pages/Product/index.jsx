import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartProvider";
import Loading from "../../components/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { formatCurrency } from "../../utils/formatters";
import useFetchProduct from "../../hooks/useFetchProduct";
import Review from "./Review";

const Product = () => {
  const { productID } = useParams();
  const { dispatch } = useCart();
  const { product, loading: productLoading } = useFetchProduct(productID);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  if (productLoading) {
    return (
      <div className="mt-10">
        <Loading />
      </div>
    );
  }

  return (
    <section className="container mx-auto mt-44">
      <div className="mt-16 shadow-2xl m-6 p-10 border rounded-2xl grid grid-cols-5 gap-16">
        <div className="col-span-2 flex flex-col items-center">
          <LazyLoadImage
            effect="blur"
            src={product?.images[0]}
            alt={`Image of ${product.title}`}
          />
          <div className="flex flex-wrap gap-6 justify-center mt-auto">
            {product?.images.map((image, index) => (
              <LazyLoadImage
                className="w-32 border rounded-xl hover:scale-110 duration-200 cursor-pointer"
                key={index}
                effect="blur"
                src={image}
                alt={`Image of ${product.title}`}
              />
            ))}
          </div>
        </div>
        <div className="col-start-3 col-span-full flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <span className="bg-rose-600 text-white rounded-full px-4 py-2">
              {product.category}
            </span>
            <button
              onClick={() => addToCart(product)}
              className="bg-rose-500 hover:bg-rose-800 text-white duration-200 px-5 py-3 rounded-full"
            >
              Add to cart
            </button>
          </div>
          <h2 className="text-3xl font-semibold">{product.title}</h2>
          <p className="text-lg">{product.description}</p>
          <span className="text-2xl font-bold tracking-wider">
            {formatCurrency(product.price)}
          </span>
          <div className="flex gap-12 text-lg">
            <p className="flex gap-3">
              <span className="font-semibold">Stock:</span>
              {product.stock}
            </p>
            <p className="flex gap-3">
              <span className="font-semibold">Rating:</span>
              {product.rating}
            </p>
          </div>
          <div className="text-lg flex flex-col mt-auto gap-3">
            <p className="flex justify-between">
              <span className="font-semibold">Warranty:</span>{" "}
              {product.warrantyInformation}
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Shipping:</span>{" "}
              {product.shippingInformation}
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Available status:</span>{" "}
              {product.availabilityStatus}
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Return Policy:</span>{" "}
              {product.returnPolicy}
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Minimum order quantity:</span>{" "}
              {product.minimumOrderQuantity}
            </p>
            <p>{product.qrCode}</p>
          </div>
        </div>
      </div>
      <div className="mt-24 mb-32">
        <h3 className="text-4xl font-bold text-rose-600 text-center">
          Reviews
        </h3>
        <div className="flex justify-around mt-16">
          {product.reviews.map((review) => {
            return <Review review={review} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Product;

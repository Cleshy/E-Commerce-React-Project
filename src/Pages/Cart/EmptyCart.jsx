import emptyCartSVG from "../../assets/empty_cart.svg";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <section className="mt-40">
      <h2 className="text-[3.5rem] text-center font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-rose-700">
        Your cart is empty!
      </h2>
      <img className="w-[30%] mx-auto mt-20" src={emptyCartSVG} alt="" />
      <p className="text-center mt-16 text-xl">
        Back to{" "}
        <Link
          to="/products"
          className="font-bold text-rose-700 hover:text-rose-500 hover:border-b-2 border-b-rose-500"
        >
          Shopping &rarr;
        </Link>
      </p>
    </section>
  );
};

export default EmptyCart;

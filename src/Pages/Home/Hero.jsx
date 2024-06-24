import HeroImg from "../../assets/hero_img.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const Hero = () => {
  const { isLoggedIn } = useAuth();

  return (
    <section className="container mt-52 mb-32 mx-auto grid grid-cols-2 gap-16">
      <div>
        <h1 className="text-5xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-rose-700">
          Welcome to ShopEase!
        </h1>
        <p className="mt-6 mb-8 text-justify leading-7 text-lg">
          ShopEase is your one-stop online store for all your shopping needs. We
          offer a wide range of products from electronics to fashion, ensuring
          quality and affordability. Discover an effortless shopping experience
          with fast shipping and exceptional customer service.
        </p>
        <div className="flex gap-6">
          {!isLoggedIn && (
            <Link
              to="/signup"
              className="border-2 border-rose-500 hover:border-rose-600 bg-rose-500 hover:bg-rose-600 duration-300 py-2 px-5 rounded-full text-white"
            >
              Sign Up
            </Link>
          )}
          <Link
            to="/products"
            className="border-2 border-rose-500 hover:bg-rose-500 hover:text-white duration-300 py-2 px-5 rounded-full"
          >
            Products
          </Link>
        </div>
      </div>
      <div className="w-[75%] mx-auto">
        <img
          src={HeroImg}
          alt="An illustration. A girl holds a box infront of the browser."
        />
      </div>
    </section>
  );
};

export default Hero;

import HeroImg from "../assets/hero_img.svg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="container my-32 mx-auto grid grid-cols-2 gap-16">
      <div>
        <h1 className="text-5xl font-bold tracking-wider">
          Welcome to ShopEase!
        </h1>
        <p className="mt-6 mb-8 text-justify leading-7 text-lg">
          ShopEase is your one-stop online store for all your shopping needs. We
          offer a wide range of products from electronics to fashion, ensuring
          quality and affordability. Discover an effortless shopping experience
          with fast shipping and exceptional customer service.
        </p>
        <div className="flex gap-4">
          <button className="bg-rose-500 hover:bg-rose-600 duration-300 py-2 px-5 rounded-full text-white">
            Registration
          </button>
          <Link
            to="/products"
            className="border-2 border-rose-500 hover:bg-rose-500 hover:text-white duration-300 py-2 px-5 rounded-full"
          >
            Products
          </Link>
        </div>
      </div>
      <div className="w-[75%] mx-auto">
        <img src={HeroImg} alt="" />
      </div>
    </section>
  );
};

export default Hero;

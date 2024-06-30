import notFoundImage from "../assets/404_svg.svg";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="container mx-auto text-center mt-48 my-24">
      <img className="mx-auto w-[50%]" src={notFoundImage} />
      <Link to="/" className="mt-16 block text-xl">
        Back to{" "}
        <span className="font-semibold text-rose-700 hover:text-rose-500 duration-150">
          Home Page &rarr;
        </span>
      </Link>
    </section>
  );
};

export default NotFound;

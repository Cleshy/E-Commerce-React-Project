import { Link } from "react-router-dom";
import paymentOptions from "../assets/payment_options.png";
import { RiFacebookBoxFill } from "react-icons/ri";
import { FaXTwitter, FaInstagram, FaTiktok } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-rose-700 text-white py-7">
      <div className="container mx-auto grid grid-cols-5">
        <div className="col-span-2">
          <Link className="text-3xl font-bold" to="/">
            ShopEase
          </Link>
          <p className="text-sm mt-4">
            &copy; 2024 Shopease. All Rights Reserved.
          </p>
        </div>
        <div className="col-span-3 grid grid-cols-2">
          <div>
            <h3 className="font-bold mb-2">Payment Options:</h3>
            <img className="w-52" src={paymentOptions} alt="" />
          </div>
          <div>
            <h3 className="font-bold mb-2">Social:</h3>
            <ul className="flex gap-6 text-5xl">
              <li>
                <a href="https://facebook.com" target="_blank">
                  <RiFacebookBoxFill className="border-2 p-1.5 hover:bg-white hover:text-rose-500 hover:border-rose-500 duration-300" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank">
                  <FaXTwitter className="border-2 p-1.5 hover:bg-white hover:text-rose-500 hover:border-rose-500 duration-300" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank">
                  <FaInstagram className="border-2 p-1.5 hover:bg-white hover:text-rose-500 hover:border-rose-500 duration-300" />
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank">
                  <FaTiktok className="border-2 p-1.5 hover:bg-white hover:text-rose-500 hover:border-rose-500 duration-300" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

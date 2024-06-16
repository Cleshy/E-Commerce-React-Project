import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { FaUser, FaShoppingCart } from "react-icons/fa";

const Navigation = ({ onClick, closeModal }) => {
  const [loginStatus, setLoginStatus] = useState("");

  return (
    <header className="bg-rose-800 p-10 text-white">
      <nav className="container mx-auto flex justify-between items-center relative">
        <Link className="text-3xl font-semibold" to="/">
          ShopEase
        </Link>
        <ul className="flex items-center text-lg gap-14">
          <li>
            <Link
              className="hover:text-rose-400 font-semibold duration-200"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-rose-400 font-semibold duration-200"
              to="/products"
            >
              Products
            </Link>
          </li>
          {loginStatus ? (
            <>
              <li className="text-2xl cursor-pointer">
                <FaUser className="hover:text-rose-400 duration-150" />
              </li>
            </>
          ) : (
            <>
              <button
                onClick={() => onClick(<Login onClose={closeModal} />)}
                className="bg-rose-500 hover:bg-rose-600 duration-200 py-2 px-5 rounded-full"
              >
                Login
              </button>
            </>
          )}
          <>
            <li className="text-2xl cursor-pointer">
              <Link to="/cart">
                <FaShoppingCart className="relative hover:text-rose-400 duration-150" />
                <span className="absolute text-lg w-9 h-9 bg-rose-200 text-gray-800 font-semibold flex justify-center items-center rounded-full -top-5 -right-11">
                  69
                </span>
              </Link>
            </li>
          </>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;

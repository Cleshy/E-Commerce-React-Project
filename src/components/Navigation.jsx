import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartProvider";

const Navigation = () => {
  const { cart } = useCart();
  const isLoggedIn = true;

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-rose-800 py-6 text-white fixed top-0 w-full z-50">
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
          {isLoggedIn ? (
            <>
              <li className="text-2xl cursor-pointer">
                <FaUser className="hover:text-rose-400 duration-150" />
              </li>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-rose-500 hover:bg-rose-600 duration-200 py-2 px-5 rounded-full"
              >
                Login
              </Link>
            </>
          )}
          <>
            <li className="text-2xl cursor-pointer">
              <Link to="/cart">
                <FaShoppingCart className="relative hover:text-rose-400 duration-150" />
                {totalItems > 0 && (
                  <span className="absolute text-sm w-6 h-6 bg-rose-200 text-gray-800 font-semibold flex justify-center items-center rounded-full -top-2 -right-7">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>
          </>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;

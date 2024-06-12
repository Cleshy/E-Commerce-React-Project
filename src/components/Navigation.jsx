import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [loginStatus, setLoginStatus] = useState("");

  return (
    <header className="bg-rose-800 p-5 text-white">
      <nav className="container mx-auto flex justify-between items-center relative">
        <Link className="text-3xl font-semibold" to="/">
          ShopEase
        </Link>
        <ul className="flex items-center gap-12">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          {loginStatus ? (
            <>
              <li className="text-3xl cursor-pointer">
                <FaUser />
              </li>
              <li className="text-3xl cursor-pointer">
                <FaShoppingCart />
              </li>
            </>
          ) : (
            <>
              <button className="bg-rose-500 hover:bg-rose-600 duration-200 py-2 px-5 rounded-full">
                Login
              </button>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;

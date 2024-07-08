import React, { useState, useRef } from "react";
import CartProduct from "../Cart/CartProduct";
import EmptyCart from "../Cart/EmptyCart";
import { useCart } from "../../context/CartProvider";
import { formatCurrency } from "../../utils/formatters";
import CartModal from "./CartModal";
import { Link, useNavigate } from "react-router-dom";
import { useMessage } from "../../context/MessageProvider";
import { useAuth } from "../../context/AuthProvider";

const Cart = () => {
  const { cart, dispatch } = useCart();
  const { showMessage } = useMessage();

  const [showModal, setShowModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleCheckOut = () => {
    if (isLoggedIn && cart.length > 0) {
      navigate("/checkout");
    } else if (cart.length > 0) {
      setShowModal(true);
    }
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const calculateTotal = () => {
    const total = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return total;
  };

  return (
    <div className="container mx-auto mt-40 my-16">
      <CartModal showModal={showModal} setShowModal={setShowModal} />
      {cart.length !== 0 && (
        <>
          <h2 className="text-[2.5rem] font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-rose-700 text-center mb-8">
            Shopping Cart
          </h2>
          <button
            onClick={() => clearCart()}
            className="text-lg mt-6 font-semibold text-rose-600"
          >
            Clear cart
          </button>
        </>
      )}
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-5 gap-24">
          <div className="col-span-3 mt-16 flex flex-col gap-5">
            {cart.map((product) => (
              <React.Fragment key={product.id}>
                <CartProduct product={product} />
                <hr />
              </React.Fragment>
            ))}
          </div>
          <div className="col-span-2 mt-16">
            <div className="mt-6">
              <div className="text-lg flex justify-between">
                <span className="font-bold">Total</span>
                <span>{formatCurrency(calculateTotal().toFixed(2))}</span>
              </div>
              <p className="text-gray-400 mt-2">
                Shipping and taxes will be calculated at checkout.
              </p>
              <button
                onClick={handleCheckOut}
                className="w-full mt-4 bg-rose-600 hover:bg-rose-700 duration-200 rounded py-4 font-semibold tracking-wider text-rose-100"
              >
                Checkout
              </button>
              <p className="text-center mt-4">
                or{" "}
                <Link
                  to="/products"
                  className="border-b-transparent hover:border-b-2 hover:border-b-rose-700 font-semibold text-rose-700"
                >
                  Continue Shopping &rarr;
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

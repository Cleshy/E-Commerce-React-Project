import React, { useState, useRef } from "react";
import CartProduct from "../components/CartProduct";
import { useCart } from "../Context/CartProvider";
import { formatCurrency } from "../utils/utilityFunctions";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    dispatch,
    discount,
    applyPromoCode,
    PROMO_CODE,
    DISCOUNT_PERCENTAGE,
  } = useCart();
  const promoCodeRef = useRef(null);
  const [promoCodeValid, setPromoCodeValid] = useState(false);
  const [promoCodeApplied, setPromoCodeApplied] = useState(false);
  const [showPromoCodeMessage, setShowPromoCodeMessage] = useState(false);

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const increaseQuantity = (id) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: { id } });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: { id } });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = promoCodeRef.current.value;
    const isValid = applyPromoCode(input);
    setPromoCodeApplied(isValid);
    if (isValid) {
      setPromoCodeValid(true);
      setPromoCodeApplied(true);
      setShowPromoCodeMessage(true);
      hidePromoCodeMessage();
      promoCodeRef.current.value = "";
    } else {
      setPromoCodeValid(false);
      setPromoCodeApplied(true);
      setShowPromoCodeMessage(true);
      hidePromoCodeMessage();
      promoCodeRef.current.value = "";
    }
  };

  const calculateTotalPrice = () => {
    const total = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return total * (1 - discount);
  };

  const hidePromoCodeMessage = () => {
    setTimeout(() => {
      setShowPromoCodeMessage(false);
    }, 6000);
  };

  return (
    <div className="container mx-auto my-16">
      <h2 className="text-3xl font-semibold">Shopping Cart</h2>
      {cart.length !== 0 && (
        <button
          onClick={() => clearCart()}
          className="text-lg mt-6 font-semibold text-rose-600"
        >
          Clear cart
        </button>
      )}
      {cart.length === 0 ? (
        <p className="text-2xl font-semibold text-center mt-16">
          Your cart is empty!
        </p>
      ) : (
        <div className="grid grid-cols-5 gap-24">
          <div className="col-span-3 mt-16 flex flex-col gap-5">
            {cart.map((product, index) => (
              <>
                <CartProduct
                  key={product.id + index}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  removeFromCart={removeFromCart}
                  product={product}
                />
                <hr />
              </>
            ))}
          </div>
          <div className="col-span-2 mt-16">
            <div className="flex flex-col gap-2">
              {showPromoCodeMessage && promoCodeValid && (
                <p>Promo Code applied!</p>
              )}
              {showPromoCodeMessage && !promoCodeValid && (
                <p>Invalid promo code!</p>
              )}
              <form onSubmit={handleSubmit}>
                <input
                  className="border border-gray-300 py-2 px-4 focus:border-rose-600"
                  type="text"
                  ref={promoCodeRef}
                  placeholder="Discount code..."
                  required
                />
                <button
                  className="bg-rose-600 py-2 px-8 text-rose-100 font-semibold tracking-wider"
                  type="submit"
                >
                  Apply
                </button>
              </form>
            </div>
            <div className="mt-8">
              <p className="flex justify-between">
                <span className="font-bold">Total:</span>{" "}
                {formatCurrency(calculateTotalPrice().toFixed(2))}
              </p>
              {promoCodeValid && promoCodeApplied && (
                <div className="flex justify-between my-5">
                  <p className="font-semibold tracking-wider">{PROMO_CODE}</p>
                  <p>{DISCOUNT_PERCENTAGE * 100}%</p>
                </div>
              )}
              <p className="text-gray-400 mt-2">
                Shipping and taxes will be calculated at checkout.
              </p>
              <button className="w-full mt-4 bg-rose-600 hover:bg-rose-700 duration-200 rounded py-4 font-semibold tracking-wider text-rose-100">
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

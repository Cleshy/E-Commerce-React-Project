import { useCart } from "../../context/CartProvider";
import { formatCurrency } from "../../utils/formatters";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState, useRef } from "react";
import { useMessage } from "../../context/MessageProvider";
import { Link } from "react-router-dom";

const TAX = 14;

const Checkout = () => {
  const {
    cart,
    discount,
    setDiscount,
    DISCOUNT_PERCENTAGE,
    applyPromoCode,
    dispatch,
  } = useCart();
  const [promoCodeApplied, setPromoCodeApplied] = useState(false);
  const [promoCodeValid, setPromoCodeValid] = useState(false);
  const { showMessage } = useMessage();

  const promoCodeRef = useRef(null);

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  const calculateSubtotal = () => {
    const total = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return total;
  };

  const calculateTotal = () => {
    const total = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    if (promoCodeValid && promoCodeApplied) {
      return total * (1 - discount) + TAX;
    }

    return total + TAX;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = promoCodeRef.current.value;
    const isValid = applyPromoCode(input);
    setPromoCodeApplied(isValid);
    if (isValid) {
      setPromoCodeValid(true);
      setPromoCodeApplied(true);
      showMessage(true, "success", "Promo Code Applied!");
      promoCodeRef.current.value = "";
    } else {
      setPromoCodeValid(false);
      setPromoCodeApplied(true);
      showMessage(true, "error", "Invalid Promo Code!");
      promoCodeRef.current.value = "";
    }
  };

  const handleDiscountRemove = () => {
    setDiscount(0);
    setPromoCodeApplied(false);
    showMessage(true, "success", "Promo Code removed!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full flex gap-4">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-rose-700">
                Checkout
              </h2>
              <form className="space-y-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    placeholder="Last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    placeholder="Your address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    placeholder="Your city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    placeholder="Your zip code"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 mt-4"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
            <div className="w-1/2 pl-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-rose-700">
                  Order Summary
                </h2>
                <Link
                  to="/cart"
                  className="text-sm text-rose-600 font-semibold hover:underline"
                >
                  Back to Cart
                </Link>
              </div>
              <div className="space-y-2 mt-6">
                {cart.length > 0 &&
                  cart.map((product) => {
                    return (
                      <div key={product.id} className="flex items-center my-3">
                        <img
                          className="w-20 mr-3"
                          src={product.images[0]}
                          alt=""
                        />
                        <a
                          href={`/product/${product.id}`}
                          target="_blank"
                          className="text-sm text-rose-600 underline"
                        >
                          {product.title}
                        </a>
                        <FaRegTrashAlt
                          className="text-lg ms-auto cursor-pointer"
                          onClick={() => removeFromCart(product.id)}
                        />
                      </div>
                    );
                  })}
                <div className="flex flex-col gap-5">
                  <form onSubmit={handleSubmit}>
                    <input
                      className="border border-gray-300 py-2 px-4 focus:border-rose-600 rounded-s-md"
                      type="text"
                      ref={promoCodeRef}
                      placeholder="Discount code..."
                      required
                    />
                    <button
                      className="bg-rose-600 py-2 px-8 text-rose-100 font-semibold tracking-wider rounded-e-md"
                      type="submit"
                    >
                      Apply
                    </button>
                  </form>
                  <div className="flex justify-between font-bold">
                    <span>Subtotal</span>
                    <span>
                      {formatCurrency(calculateSubtotal().toFixed(2))}
                    </span>
                  </div>
                  {promoCodeApplied && promoCodeValid && (
                    <div className="flex justify-between items-center font-bold">
                      <span>Discount</span>
                      <div className="flex gap-4 items-center">
                        <span>{DISCOUNT_PERCENTAGE * 100}%</span>
                        <FaRegTrashAlt
                          onClick={handleDiscountRemove}
                          className="text-md cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${TAX}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(calculateTotal().toFixed(2))}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

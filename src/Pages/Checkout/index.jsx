import { useCart } from "../../context/CartProvider";
import { formatCurrency } from "../../utils/formatters";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useMessage } from "../../context/MessageProvider";
import { useAuth } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import useFetchCurrentUser from "../../hooks/useFetchCurrentUser";

const TAX = 14;

const Checkout = () => {
  const { isLoggedIn, userId } = useAuth();
  const { user, loading } = useFetchCurrentUser(userId);
  const navigate = useNavigate();

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

  const [formData, setFormData] = useState({
    userId: isLoggedIn ? userId : null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    billingAddress: "",
    billingCity: "",
    billingZip: "",
    shippingAddress: "",
    shippingCity: "",
    shippingZip: "",
    sameAsBilling: true,
    totalAmount: null,
    status: "pending",
    isGuest: !isLoggedIn,
  });

  useEffect(() => {
    if (isLoggedIn && user) {
      setFormData({
        ...formData,
        userId: userId,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        billingAddress: user.billingAddress || "",
        billingCity: user.billingCity || "",
        billingZip: user.billingZip || "",
        shippingAddress: user.shippingAddress || "",
        shippingCity: user.shippingCity || "",
        shippingZip: user.shippingZip || "",
        isGuest: !isLoggedIn,
      });
    }
  }, [isLoggedIn, userId, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalAmount = calculateTotal();

    const updatedFormData = {
      ...formData,
      totalAmount,
    };

    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      const result = await response.json();

      if (result) {
        showMessage(true, "success", "Ordered successfully!");
        clearCart();
        navigate("/myorders");
      }
    } catch (error) {
      showMessage(true, "error", "Something went wrong! Try again later!");
    }
  };

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

  const handlePromoCodeSubmit = (event) => {
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
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full flex gap-8 mt-36 mb-24">
            <div className="w-1/2">
              <h2 className="text-xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-rose-700">
                Checkout
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div className="flex gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      placeholder="First name"
                      disabled={isLoggedIn}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      placeholder="Last name"
                      disabled={isLoggedIn}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    placeholder="Your email"
                    disabled={isLoggedIn}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    placeholder="Your phone"
                    required
                  />
                </div>
                <fieldset className="flex flex-col gap-4">
                  <legend className="mb-3 font-semibold flex">
                    Billing Address
                  </legend>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      placeholder="Your address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="billingCity"
                      value={formData.billingCity}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      placeholder="Your city"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="billingZip"
                      value={formData.billingZip}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      placeholder="Your zip code"
                      required
                    />
                  </div>
                </fieldset>
                <div className="flex gap-3">
                  <input
                    name="sameAsBilling"
                    id="sameAsBilling"
                    type="checkbox"
                    onChange={handleChange}
                    defaultChecked
                  />
                  <label htmlFor="sameAsBilling">
                    Delivery address is same as Billing address
                  </label>
                </div>
                {!formData.sameAsBilling && (
                  <fieldset className="flex flex-col gap-4">
                    <legend className="mb-3 font-semibold flex">
                      Delivery address
                    </legend>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        name="shippingAddress"
                        value={formData.shippingAddress}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        placeholder="Your address"
                        required={sameAsBilling || false}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        name="shippingCity"
                        value={formData.shippingCity}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        placeholder="Your city"
                        required={sameAsBilling || false}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        name="shippingZip"
                        value={formData.shippingZip}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        placeholder="Your zip code"
                        required={sameAsBilling || false}
                      />
                    </div>
                  </fieldset>
                )}
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
                  <form onSubmit={handlePromoCodeSubmit}>
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

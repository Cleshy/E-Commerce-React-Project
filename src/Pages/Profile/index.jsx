import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import useFetchCurrentUser from "../../hooks/useFetchCurrentUser";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userId, isLoggedIn, loadingAuth } = useAuth();
  const { user } = useFetchCurrentUser(userId);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!loadingAuth && !isLoggedIn) {
      navigate("/signup");
    }
  }, [loadingAuth, isLoggedIn, navigate]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <section className="container mx-auto my-36">
      <h2 className="text-[2.3rem] font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-rose-700">
        Profile Page
      </h2>
      <div className="w-[60%] mt-8">
        <form onSubmit={handleFormSubmit} className="bg-rose-50 p-8 rounded-xl">
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
                className="mt-1 p-2 rounded-md w-full disabled:bg-gray-500 disabled:text-white"
                placeholder="First name"
                required
                disabled
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
                className="mt-1 p-2 rounded-md w-full disabled:bg-gray-500 disabled:text-white"
                placeholder="Last name"
                required
                disabled
              />
            </div>
          </div>
          <div className="mt-7">
            <label htmlFor="e-mail" className="block mb-2">
              E-mail
            </label>
            <input
              className="text-gray-600 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-500 disabled:text-white"
              type="email"
              id="e-mail"
              name="name"
              value={formData.email}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="mt-7">
            <label htmlFor="phone" className="block mb-2">
              Phone
            </label>
            <input
              className="text-gray-600 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-500 disabled:text-white"
              type="text"
              id="phone"
              name="name"
              placeholder="Your phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <fieldset className="flex flex-col gap-4 mt-6">
            <legend className="mb-3 font-semibold flex">Billing Address</legend>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="billingAddress"
                className="mt-1 p-2 rounded-md w-full"
                placeholder="Your address"
                value={formData.billingAddress}
                onChange={handleChange}
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
                className="mt-1 p-2 rounded-md w-full"
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
                className="mt-1 p-2 rounded-md w-full"
                placeholder="Your zip code"
                required
              />
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-4 mt-6">
            <legend className="mb-3 font-semibold flex">
              Delivery Address
            </legend>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="billingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                className="mt-1 p-2 rounded-md w-full"
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
                value={formData.shippingCity}
                onChange={handleChange}
                className="mt-1 p-2 rounded-md w-full"
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
                value={formData.shippingZip}
                onChange={handleChange}
                className="mt-1 p-2 rounded-md w-full"
                placeholder="Your zip code"
                required
              />
            </div>
          </fieldset>
          <button
            type="submit"
            className="mx-auto w-full mt-8 text-lg font-semibold bg-rose-600 p-3 rounded-xl text-white hover:bg-rose-500"
          >
            Save
          </button>
        </form>
      </div>
    </section>
  );
};

export default Profile;

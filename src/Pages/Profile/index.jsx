import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import useFetchCurrentUser from "../../hooks/useFetchCurrentUser";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userId, isLoggedIn, loadingAuth } = useAuth();
  const { user, loading } = useFetchCurrentUser(userId);
  const [inputDisabled, setInputDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingAuth && !isLoggedIn) {
      navigate("/signup");
    }
  }, [loadingAuth, isLoggedIn, navigate]);

  const handleInputEnable = () => {
    setInputDisabled((prev) => !prev);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  if (loading || loadingAuth) {
    return <h2>Loading!</h2>;
  }

  return (
    <section className="container mx-auto mt-36">
      <h2 className="text-[2.3rem] font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-rose-700">
        Profile Page
      </h2>
      <div className="w-[60%] mt-8">
        <form onSubmit={handleFormSubmit} className="bg-rose-50 p-8 rounded-xl">
          <div className="mt-7">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              className="text-gray-600 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-300"
              type="text"
              id="name"
              name="name"
              defaultValue={user.name}
              disabled
            />
          </div>
          <div className="mt-7">
            <label htmlFor="e-mail" className="block mb-2">
              E-mail
            </label>
            <input
              className="text-gray-600 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-300"
              type="email"
              id="e-mail"
              name="name"
              defaultValue={user["e-mail"]}
              disabled
            />
          </div>
          <div className="mt-7">
            <label htmlFor="phone" className="block mb-2">
              Phone
            </label>
            <input
              className="text-gray-600 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-300"
              type="text"
              id="phone"
              name="name"
              placeholder={user.phone || "empty"}
              disabled={inputDisabled}
            />
          </div>
          <div className="w-full flex gap-24">
            <div className="mt-7 flex-grow">
              <label htmlFor="name" className="block mb-2">
                Zip
              </label>
              <input
                className="text-gray-600 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-300"
                type="text"
                id="name"
                name="name"
                placeholder={user.zip || "empty"}
                disabled={inputDisabled}
              />
            </div>
            <div className="mt-7 flex-grow">
              <label htmlFor="name" className="block mb-2">
                City
              </label>
              <input
                className="text-gray-600 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-300"
                type="text"
                id="name"
                name="name"
                placeholder={user.city || "empty"}
                disabled={inputDisabled}
              />
            </div>
          </div>
          <div className="mt-7">
            <label htmlFor="name" className="block mb-2">
              Address
            </label>
            <input
              className="text-gray-600 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-300"
              type="text"
              id="name"
              name="name"
              placeholder={user.address || "empty"}
              disabled={inputDisabled}
            />
          </div>
          <div className="mt-12 flex justify-center gap-24 tracking-widest">
            <button
              onClick={handleInputEnable}
              className="border-2 border-rose-900 hover:border-rose-600 bg-rose-900 hover:bg-rose-600 duration-300 py-2 px-5 rounded-full text-white"
            >
              {inputDisabled ? "Edit" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;

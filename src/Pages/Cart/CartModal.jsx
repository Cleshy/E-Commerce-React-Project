import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from "../../context/AuthProvider";

const CartModal = ({ showModal, setShowModal }) => {
  const { isLoggedIn } = useAuth();

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      {showModal && (
        <div className="bg-black/80 fixed top-0 left-0 w-screen h-screen z-50">
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white rounded-md p-16 flex flex-col gap-12">
            <IoCloseOutline
              onClick={() => setShowModal(false)}
              className="text-3xl absolute top-3 right-3 cursor-pointer"
            />
            <h1 className="text-center font-bold text-2xl">
              Thanks for your Shopping!
            </h1>
            {!isLoggedIn ? (
              <div className="flex flex-col gap-4 text-center">
                <Link
                  to="/checkout"
                  className="bg-rose-500 hover:bg-rose-700 duration-300 text-white py-2 px-4 rounded-full"
                >
                  Continue as a Guest
                </Link>
                <Link
                  to="/signup"
                  className="bg-rose-500 hover:bg-rose-700 duration-300 text-white py-2 px-4 rounded-full"
                >
                  Sign Up
                </Link>
                <p>
                  Already a member?{" "}
                  <Link
                    to="/signin"
                    className="font-semibold text-rose-500 hover:text-rose-700 duration-300"
                  >
                    Login
                  </Link>
                </p>
              </div>
            ) : (
              <p className="text-center font-semibold">
                You'll be redirected in 5 sec.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;

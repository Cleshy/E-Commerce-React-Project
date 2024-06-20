import { FaUsers } from "react-icons/fa";
import { IoIosArrowDown, IoMdSettings } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { BsCartCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Dropdown = ({ showItems, setShowItems }) => {
  const { isLoggedIn, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleNavigationClick = (authorizedPath, notAuthorizedPath) => {
    if (isLoggedIn) {
      navigate(`${authorizedPath}`);
    } else {
      navigate(`${notAuthorizedPath}`);
    }
  };

  return (
    <div className="relative z-10">
      <div
        onMouseEnter={() => setShowItems(true)}
        className="flex items-center gap-2 hover:text-rose-400 duration-150 cursor-pointer"
      >
        My account
        <IoIosArrowDown className="text-2xl" />
      </div>
      {/* Menu items */}
      <div
        onMouseLeave={() => setShowItems(false)}
        className={`${
          showItems ? "flex" : "hidden"
        } absolute right-0 mt-7 bg-white text-rose-800 border border-t-0 p-3 pt-5 origin-top-right flex flex-col gap-4 w-40`}
      >
        <div
          onClick={() => handleNavigationClick("/profile", "/")}
          className="flex justify-start items-center gap-3 cursor-pointer"
        >
          <IoMdSettings className="text-2xl" />
          <span>Settings</span>
        </div>
        {userRole === 0 ? (
          <div
            onClick={() => handleNavigationClick("/users", "/")}
            className="flex justify-start items-center gap-3 cursor-pointer"
          >
            <FaUsers className="text-2xl" />
            <span>Users</span>
          </div>
        ) : (
          <div
            onClick={() => handleNavigationClick("/myorders", "/")}
            className="flex justify-start items-center gap-3 cursor-pointer"
          >
            <BsCartCheck className="text-2xl" />
            <span>My orders</span>
          </div>
        )}
        <div
          onClick={logout}
          className="flex items-center gap-3 cursor-pointer hover:text-rose-00"
        >
          <LuLogOut className="text-2xl" />
          <span>Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

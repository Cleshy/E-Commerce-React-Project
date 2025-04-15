import Home from "./Pages/Home/";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile/index.jsx";
import Registration from "./Pages/Registration";
import Product from "./Pages/Product/";
import Products from "./Pages/Products/";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout/index.jsx";
import Orders from "./Pages/Orders/index.jsx";
import Users from "./Pages/Users/index.jsx";
import NotFound from "./Pages/NotFound";
import AdminRoute from "./components/AdminRoute.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import CartRoute from "./components/CartRoute.jsx";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/signin", element: <Login /> },
  { path: "/signup", element: <Registration /> },
  { path: "/products", element: <Products /> },
  { path: "/cart", element: <Cart /> },
  { path: "/product/:productID", element: <Product /> },
  { path: "/checkout", element: <CartRoute element={<Checkout />} /> },
  { path: "/profile", element: <PrivateRoute element={<Profile />} /> },
  { path: "/myorders", element: <PrivateRoute element={<Orders />} /> },
  { path: "/users", element: <AdminRoute element={<Users />} /> },
  { path: "*", element: <NotFound /> },
];

export default routes;

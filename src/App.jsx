import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile/index.jsx";
import Registration from "./Pages/Registration";
import Product from "./Pages/Product/";
import Products from "./Pages/Products/";
import Cart from "./Pages/Cart";
import Navigation from "./components/Navigation.jsx";
import NotFound from "./Pages/NotFound";
import { CartProvider } from "./context/CartProvider.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { MessageProvider } from "./context/MessageContext.jsx";
import Orders from "./Pages/Orders/index.jsx";
import Users from "./Pages/Users/index.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

const App = () => {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <MessageProvider>
            <Navigation />
            <Routes>
              {/* Static routes */}
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<Registration />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              {/* Dynamic routes (ex: productID) */}
              <Route path="/product/:productID" element={<Product />} />
              {/* Private routes */}
              <Route
                path="/profile"
                element={<PrivateRoute element={<Profile />} />}
              />
              <Route
                path="/myorders"
                element={<PrivateRoute element={<Orders />} />}
              />
              <Route
                path="/users"
                element={<AdminRoute element={<Users />} />}
              />
              {/* Not found route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MessageProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
};

export default App;

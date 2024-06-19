import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Product from "./Pages/Product/";
import Products from "./Pages/Products/";
import Cart from "./Pages/Cart";
import Navigation from "./components/Navigation.jsx";
import NotFound from "./Pages/NotFound";
import { CartProvider } from "./context/CartProvider.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";

const App = () => {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:productID" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Product from "./Pages/Product/";
import Products from "./Pages/Products/";
import Cart from "./Pages/Cart";
import Navigation from "./components/Navigation";
import NotFound from "./Pages/NotFound";
import { CartProvider } from "./context/CartProvider.jsx";

const App = () => {
  return (
    <>
      <CartProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </>
  );
};

export default App;

import { Navigate } from "react-router-dom";
import { useCart } from "../context/CartProvider";

const CartRoute = ({ element }) => {
  const { cart } = useCart();

  return cart.length > 0 ? element : <Navigate to="/cart" />;
};

export default CartRoute;

import { createContext, useContext } from "react";
import { useReducer } from "react";

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        const updatedCart = state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return updatedCart;
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload.id);
    case "INCREASE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case "DECREASE_QUANTITY":
      return state.reduce((acc, item) => {
        if (item.id === action.payload.id) {
          if (item.quantity === 1) {
            return acc;
          } else {
            return [...acc, { ...item, quantity: item.quantity - 1 }];
          }
        } else {
          return [...acc, item];
        }
      }, []);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

// Cart provider komponens
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook a Cart context használatához
export const useCart = () => {
  return useContext(CartContext);
};

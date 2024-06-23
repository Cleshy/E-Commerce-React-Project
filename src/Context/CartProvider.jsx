import { createContext, useContext, useState } from "react";
import { useReducer } from "react";

const CartContext = createContext(null);

const PROMO_CODE = "SHOPEASE2024";
const DISCOUNT_PERCENTAGE = 0.05;

const cartReducer = (cartState, cartAction) => {
  switch (cartAction.type) {
    case "ADD_TO_CART":
      // Check if the product is already in the cart
      const existingItemIndex = cartState.findIndex(
        // Payload is the attribute that we pass into the dispatch() function after the type.
        // Example: dispatch({ type: "ADD_TO_CART", payload: product });
        (product) => product.id === cartAction.payload.id
      );
      // findIndex returns -1 if the product is not in the cart yet
      if (existingItemIndex !== -1) {
        const updatedCart = cartState.map((product) =>
          /* When we call the dispatch, we pass a payload (current product id), so we can check if the product id in the cart is equals with the product id in the payload.
           */
          product.id === cartAction.payload.id
            ? // If it's true, we give back the product and also increase the quantity by 1.
              { ...product, quantity: product.quantity + 1 }
            : // Else, just give back the product.
              product
        );
        return updatedCart;
      } else {
        // If the product isn't in the cart, we add the product into the cart and set it's quantity to 1.
        return [...cartState, { ...cartAction.payload, quantity: 1 }];
      }
    case "REMOVE_FROM_CART":
      return cartState.filter(
        (product) => product.id !== cartAction.payload.id
      );
    case "INCREASE_QUANTITY":
      return cartState.map((product) =>
        product.id === cartAction.payload.id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
    case "DECREASE_QUANTITY":
      return cartState.map((product) => {
        if (product.id === cartAction.payload.id) {
          if (product.quantity > 1) {
            return { ...product, quantity: product.quantity - 1 };
          }
        }
        return product;
      });
    case "CLEAR_CART":
      return [];
    default:
      return cartState;
  }
};

// Cart provider component
export const CartProvider = ({ children }) => {
  /*
  cartReducer => Contains the actions we want to make on our initale state which is an empty array at start.
  cart => the actual state of the useReducer
  dispatch => the function we call when we want to make an action on our state
  */
  /*    state  actions                actionsFunc  initialState  */
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [discount, setDiscount] = useState(0);

  const applyPromoCode = (input) => {
    if (input === PROMO_CODE) {
      setDiscount(DISCOUNT_PERCENTAGE);
      return true;
    }
    setDiscount(0);
    return false;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        dispatch,
        discount,
        applyPromoCode,
        PROMO_CODE,
        DISCOUNT_PERCENTAGE,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook a Cart context használatához
export const useCart = () => {
  return useContext(CartContext);
};

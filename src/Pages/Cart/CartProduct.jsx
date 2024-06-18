import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatters";

const CartProduct = ({
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  product,
}) => {
  return (
    <div className="grid grid-cols-4 gap-8 auto-rows-[10rem] text-sm my-6">
      <img className="col-span-1 self-center w-52" src={product.images[0]} />
      <div className="col-span-3 w-full flex justify-between">
        <div className="flex flex-col">
          <Link to={`/product/${product.id}`} className="cursor-pointer">
            {product.title}
          </Link>
          <p className="font-semibold mt-auto">
            {formatCurrency(product.quantity * product.price)}
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-3 text-lg font-semibold">
            <button
              onClick={() => decreaseQuantity(product.id)}
              className="text-3xl hover:text-rose-600 duration-200"
            >
              -
            </button>
            <p>{product.quantity}</p>
            <button
              onClick={() => increaseQuantity(product.id)}
              className="text-3xl hover:text-rose-600 duration-200"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeFromCart(product.id)}
            className="mt-auto cursor-pointer font-semibold text-rose-600"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;

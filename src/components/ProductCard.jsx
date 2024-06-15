import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const checkProductDescriptionLength = (productDescription) => {
    if (productDescription.length > 140) {
      return productDescription.slice(0, 140) + "...";
    } else {
      return productDescription + "...";
    }
  };

  return (
    <div className="shadow-inner border-2 rounded-2xl grid grid-cols-1 max-h-[60rem] lg:grid-cols-2 relative overflow-hidden">
      <div className="h-[100%]">
        <img
          className="object-contain h-full p-8"
          src={product?.images[0]}
          alt={product.title}
        />
      </div>
      <div className="p-4 text-sm flex flex-col gap-2">
        <span className="bg-rose-500 text-white rounded-full px-2 py-1 self-start">
          {product.category}
        </span>
        <h2 className="font-semibold text-lg">{product.title}</h2>
        <p className="text-justify">
          {checkProductDescriptionLength(product.description)}
        </p>
        <div className="flex flex-col gap-3 mt-auto">
          <span className="font-bold text-lg">${product.price}</span>
          <Link
            to={`/product/${product?.id}`}
            className="bg-rose-300 hover:bg-rose-500 text-white text-center duration-200 px-3 py-2 rounded-full"
          >
            Read more
          </Link>
          <button className="bg-rose-700 hover:bg-rose-800 text-white duration-200 px-3 py-2 rounded-full">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProductCard = ({ product }) => {
  const checkProductDescriptionLength = (productDescription) => {
    if (productDescription.length > 80) {
      return productDescription.slice(0, 80) + "...";
    } else {
      return productDescription + "...";
    }
  };

  return (
    <div className="grid auto-rows-[22rem] grid-cols-2 m-5 shadow border border-gray-200 rounded-3xl">
      <div className="h-[100%]">
        <LazyLoadImage
          src={product?.images[0]}
          alt={product.title}
          effect="blur"
        />
        {/* <img
          className="object-contain h-full p-8"
          src={product?.images[0]}
          alt={product.title}
          loading="lazy"
        /> */}
      </div>
      <div className="p-4 text-sm flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          <span className="bg-rose-500 text-white rounded-full px-2 py-1 self-start">
            {product.category}
          </span>
          <h2 className="font-semibold text-sm">{product.title}</h2>
          <p className="text-justify">
            {checkProductDescriptionLength(product.description)}
          </p>
        </div>
        <div className="flex flex-col gap-5 mt-auto">
          <span className="font-bold text-lg">${product.price}</span>
          <div className="flex flex-col gap-2 justify-end">
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
    </div>
  );
};

export default ProductCard;

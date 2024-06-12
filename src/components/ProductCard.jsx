import React from "react";

const ProductCard = ({ data }) => {
  const checkProductDescriptionLength = (productDescription) => {
    if (productDescription.length > 140) {
      return productDescription.slice(0, 140) + "...";
    } else {
      return productDescription + "...";
    }
  };

  return (
    <div className="shadow-xl rounded-2xl grid grid-cols-1 max-h-[60rem] lg:grid-cols-2 relative overflow-hidden">
      <span className="absolute bg-yellow-300 font-semibold py-1 px-10 -rotate-45 top-3 -left-10 z-10">
        On Sale
      </span>

      <div className="h-[100%]">
        <img
          className="object-contain h-full p-8"
          src={data.image}
          alt={data.title}
        />
      </div>
      <div className="p-4 text-sm flex flex-col gap-2">
        <span className="bg-rose-500 text-white rounded-full px-2 py-1 self-start">
          {data.category}
        </span>
        <h2 className="font-semibold text-lg">{data.title}</h2>
        <p className="text-justify">
          {checkProductDescriptionLength(data.description)}
        </p>
        <div className="flex flex-col gap-3 mt-auto">
          <span className="font-bold text-lg">${data.price}</span>
          <button className="bg-rose-300 hover:bg-rose-500 text-white duration-200 px-3 py-2 rounded-full">
            Read more
          </button>
          <button className="bg-rose-700 hover:bg-rose-800 text-white duration-200 px-3 py-2 rounded-full">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

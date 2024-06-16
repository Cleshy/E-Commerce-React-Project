import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);

  const getSingleProduct = async () => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    setProduct(data);
    setLoading(false);
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  if (loading) {
    return (
      <div className="mt-10">
        <Loading />
      </div>
    );
  }

  return (
    <section className="container mx-auto">
      <div className="mt-16 shadow-2xl m-6 p-10 rounded-2xl flex flex-col lg:grid lg:grid-cols-4 gap-16">
        <div>
          <img src={product?.images[0]} alt={`Image of ${product.title}`} />
        </div>
        <div className="col-start-2 col-span-full flex flex-col gap-3">
          <span className="bg-rose-500 text-white rounded-full px-2 py-1 self-start">
            {product.category}
          </span>
          <h2 className="text-3xl font-semibold">{product.title}</h2>
          <p className="text-lg">{product.description}</p>
          <span className="text-2xl font-bold tracking-wider">
            ${product.price}
          </span>
          <div className="flex justify-between mt-auto">
            <p>{`Stock: ${product.stock}`}</p>
            <p>{`Rating: ${product.rating}`}</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-center">Reviews</h3>
        <div className="flex justify-around mt-16">
          {product.reviews.map((review, index) => {
            return (
              <div
                key={review.reviewerName + index}
                className="flex flex-col gap-3"
              >
                <span className="text-xl font-semibold">
                  {review.reviewerName}
                </span>
                <span className="text-lg italic">{review.reviewerEmail}</span>
                <p className="text-lg">{review.comment}</p>
                <p>Rating: {review.rating}</p>
                <p></p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Product;

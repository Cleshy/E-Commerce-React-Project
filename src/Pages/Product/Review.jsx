import { formatDate } from "../../utils/formatters";

const Review = ({ review }) => {
  return (
    <div
      key={review.reviewerName}
      className="flex flex-col gap-8 border border-rose-200 p-8 rounded-xl min-w-[25rem]"
    >
      <div className="flex justify-between items-center">
        <span className="text-xl font-semibold italic text-rose-800">
          {review.reviewerName}
        </span>
        <p>Rating: {review.rating}</p>
      </div>
      <p className="text-lg">{review.comment}</p>
      <p className="ms-auto text-gray-300 text-sm">{formatDate(review.date)}</p>
    </div>
  );
};

export default Review;

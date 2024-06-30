import { useMessage } from "../../context/MessageProvider";

const NewsLetter = () => {
  const { showMessage } = useMessage();

  const handleSignUp = (e) => {
    e.preventDefault();
    e.target.reset();

    showMessage(true, "success", "Thanks for your signup!");
  };

  return (
    <section className="bg-rose-700 text-rose-50">
      <div className="container mx-auto py-8 grid grid-cols-4">
        <div className="col-start-1 col-end-3">
          <h3 className="text-3xl font-semibold mb-3">Join Our Mailing List</h3>
          <p className="">
            Be the first to know about new products, sales, and exclusive
            offers.
            <br />
          </p>
        </div>
        <div className="col-start-3 col-end-5">
          <p className="font-semibold mb-3">
            Sign up for our newsletter today!
          </p>
          <form onSubmit={handleSignUp} className="flex gap-8">
            <input
              className="rounded-full py-2 px-6 w-[70%] text-gray-600 border-none focus:border-none outline-none"
              type="email"
              required
            />
            <button
              type="submit"
              className="w-[25%] bg-white hover:bg-rose-500 border-2 hover:border-white text-rose-500 hover:text-white font-semibold duration-300 py-2 px-5 rounded-full"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;

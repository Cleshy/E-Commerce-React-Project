const Message = ({ isError, text, duration = 3000 }) => {
  const show = false;

  return (
    <div
      className={`absolute right-8 top-28 font-semibold text-center rounded-md py-5 px-12 tracking-wider text-md translate-x-[150%] duration-700 ${
        show ? "translate-x-0" : ""
      } ${isError ? "bg-rose-700" : "bg-green-600"}`}
    >
      Invalid email or password!
    </div>
  );
};

export default Message;

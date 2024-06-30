import { useMessage } from "../context/MessageProvider";

const Message = () => {
  const { message } = useMessage();
  const { show, type, text } = message;

  return (
    <div
      className={`absolute right-8 top-28 font-semibold text-center rounded-md py-5 px-12 tracking-wider text-md translate-x-[150%] duration-700 ${
        show ? "translate-x-0" : ""
      } ${type === "error" ? "bg-rose-700" : "bg-green-600"}`}
    >
      {text}
    </div>
  );
};

export default Message;

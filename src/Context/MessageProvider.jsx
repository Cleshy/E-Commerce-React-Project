import { createContext, useState, useContext } from "react";

const MessageContext = createContext();

const messageDuration = 3000;

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState({
    show: false,
    type: null,
    text: null,
  });

  const hideMessage = () => {
    setMessage((prev) => ({ ...prev, show: false }));
  };

  const showMessage = (show, type, text) => {
    setMessage({ show: show, type: type, text: text });

    setTimeout(() => {
      hideMessage();
    }, messageDuration);
  };

  return (
    <MessageContext.Provider value={{ message, showMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);

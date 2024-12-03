import { createContext, useContext, useEffect, useState } from "react";

const MessagingCotext = createContext();

export const useMessaging = () => {
  return useContext(MessagingCotext);
};

export const MessagingProvider = ({ children }) => {
  const [viewBox, setViewBox] = useState(true);
  const [closeBox, setCloseBox] = useState(false);
  const [chatlists, setChatlists] = useState([]);

  useEffect(() => {
    setChatlists(["todo"]);
  }, []);

  const handleViewBox = () => {
    setViewBox((prev) => !prev);
  };

  const handleCloseBox = () => {
    setCloseBox((prev) => !prev);
  };
  return (
    <MessagingCotext.Provider
      value={{ chatlists, closeBox, handleCloseBox, viewBox, handleViewBox }}
    >
      {children}
    </MessagingCotext.Provider>
  );
};

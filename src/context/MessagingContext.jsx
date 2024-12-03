import { createContext, useContext } from "react";

const MessagingCotext = createContext();

export const useMessaging = () => {
  useContext(MessagingCotext);
};

export const MessagingProvider = ({ children }) => {
  const [chatlists, setChatlists] = useState([]);

  useEffect(() => {
    setChatlists("todo");
  }, [chatlists]);
  return (
    <MessagingCotext.Provider value={chatlists}>
      {children}
    </MessagingCotext.Provider>
  );
};

import { createContext, useContext, useEffect, useState } from "react";
import { useLogin } from "./LoginContext";
import { getUsers } from "../apis/Api";

const MessagingCotext = createContext();

export const useMessaging = () => {
  return useContext(MessagingCotext);
};

export const MessagingProvider = ({ children }) => {
  const { loginInfo } = useLogin();
  const pagenumber = 1;
  const loggedinUserRole = loginInfo.userRole;
  const loggedInUserId = loginInfo.userId;
  const [viewBox, setViewBox] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [closeBox, setCloseBox] = useState(false);
  const [chatlists, setChatlists] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers(
          loggedinUserRole,
          pagenumber,
          loggedInUserId
        );
        setAllUsers(data.allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const chatListsUpdate = (updates) => {
    setChatlists((prevList) => {
      [...prevList, updates];
    });
  };

  const handleViewBox = () => {
    setViewBox((prev) => !prev);
  };

  const handleCloseBox = () => {
    setCloseBox((prev) => !prev);
  };
  return (
    <MessagingCotext.Provider
      value={{
        loading,
        allUsers,
        chatlists,
        chatListsUpdate,
        closeBox,
        handleCloseBox,
        viewBox,
        handleViewBox,
      }}
    >
      {children}
    </MessagingCotext.Provider>
  );
};

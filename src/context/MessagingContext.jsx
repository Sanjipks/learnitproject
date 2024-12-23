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
  const [closeBox, setCloseBox] = useState(false);
  const [chatlists, setChatlists] = useState([]);
  const [messageUpdate, setMessageUpdate] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(
          loggedinUserRole,
          pagenumber,
          loggedInUserId
        );
        // setAllUsers(data.allUsers);
        setAllUsers(
          data.allUsers.sort((a, b) => {
            const aTimestamp =
              new Date(a.latestMessages?.[0]?.timestamp).getTime() || 0;
            const bTimestamp =
              new Date(b.latestMessages?.[0]?.timestamp).getTime() || 0;

            return bTimestamp - aTimestamp;
          })
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [messageUpdate]);

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
        allUsers,
        chatlists,
        chatListsUpdate,
        closeBox,
        handleCloseBox,
        viewBox,
        handleViewBox,
        messageUpdate,
        setMessageUpdate,
      }}
    >
      {children}
    </MessagingCotext.Provider>
  );
};

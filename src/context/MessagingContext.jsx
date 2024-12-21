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
            // ensure both users have a latestMessages array with at least one message
            const aTimestamp = a.latestMessages?.[0]?.timestamp;

            const bTimestamp = b.latestMessages?.[0]?.timestamp;

            // compare timestamps (descending order for most recent first)
            return aTimestamp - bTimestamp;
          })
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [messageUpdate]);

  console.log("all", allUsers);

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

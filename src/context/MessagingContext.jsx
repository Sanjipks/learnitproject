import { createContext, useContext, useEffect, useState } from "react";
import { useLogin } from "./LoginContext";
import { getUsers } from "../apis/Api";

const MessagingContext = createContext();

export const useMessaging = () => {
  return useContext(MessagingContext);
};

export const MessagingProvider = ({ children }) => {
  const { loginInfo } = useLogin();
  const pagenumber = 1;
  const loggedinUserRole = loginInfo?.userRole;
  const loggedInUserId = loginInfo?.userId;
  const [viewBox, setViewBox] = useState(true);
  const [closeBox, setCloseBox] = useState(false);
  const [chatlist, setChatlist] = useState({
    userChatlist: [],
    groupList: [],
  });
  const [messageUpdate, setMessageUpdate] = useState(false);

  useEffect(() => {
    const fetchUserChatList = async () => {
      try {
        const data = await getUsers(
          loggedinUserRole,
          pagenumber,
          loggedInUserId
        );
        if (data?.allUsers) {
          const sortedUsers = data.allUsers.sort((a, b) => {
            const aTimestamp =
              new Date(a.latestMessages?.[0]?.timestamp).getTime() || 0;
            const bTimestamp =
              new Date(b.latestMessages?.[0]?.timestamp).getTime() || 0;
            return bTimestamp - aTimestamp;
          });

          setChatlist((prev) => ({
            ...prev,
            userChatlist: sortedUsers,
          }));
        }
      } catch (error) {
        console.error("Error fetching user chat list:", error);
      }
    };

    const fetchGroupChatList = async () => {
      try {
        const groupData = await getGroups(loggedInUserRole, loggedInUserId);
        if (groupData?.groups) {
          setChatlist((prev) => ({
            ...prev,
            groupList: groupData.groups,
          }));
        }
      } catch (error) {
        console.error("Error fetching group chat list:", error);
      }
    };

    if (loggedinUserRole && loggedInUserId) {
      fetchUserChatList();
      fetchGroupChatList();
    }
  }, [messageUpdate, loggedinUserRole, loggedInUserId]);

  const chatListsUpdate = (updates) => {
    setChatlist((prevList) => ({
      userChatlist: [...prevList.userChatlist, ...(updates.userChatlist || [])],
      groupList: [...prevList.groupList, ...(updates.groupList || [])],
    }));
  };

  const handleViewBox = () => {
    setViewBox((prev) => !prev);
  };

  const handleCloseBox = () => {
    setCloseBox((prev) => !prev);
  };

  return (
    <MessagingContext.Provider
      value={{
        chatlist,
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
    </MessagingContext.Provider>
  );
};

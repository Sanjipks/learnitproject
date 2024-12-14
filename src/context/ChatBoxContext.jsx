import { createContext, useContext, useEffect, useState } from "react";
import { useLogin } from "./LoginContext";

const ChatCotext = createContext();

export const useChatBox = () => {
  return useContext(ChatCotext);
};

export const ChatProvider = ({ children }) => {
  const { loginInfo } = useLogin();
  const pagenumber = 1;
  const loggedinUserRole = loginInfo.userRole;
  const loggedInUserId = loginInfo.userId;

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [viewChatBox, setViewChatBox] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const [chatlists, setChatlists] = useState([]);
  const [messageUpdate, setMessageUpdate] = useState(false);

  const chatListsUpdate = (updates) => {
    setChatlists((prevList) => {
      [...prevList, updates];
    });
  };

  const handleViewChatBox = (state) => {
    setViewChatBox(state);
  };

  const handleCloseChatBox = () => {
    setViewChatBox(false);
  };
  return (
    <ChatCotext.Provider
      value={{
        allUsers,
        chatlists,
        selectedUser,
        setSelectedUser,
        chatListsUpdate,
        handleCloseChatBox,
        viewChatBox,
        handleViewChatBox,
        messageUpdate,
        setMessageUpdate,
        selectedUserId,
        setSelectedUserId,
      }}
    >
      {children}
    </ChatCotext.Provider>
  );
};

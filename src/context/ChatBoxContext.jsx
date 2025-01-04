import { createContext, useContext, useState } from "react";
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
  const [selectedUserImage, setSelectedUserImage] = useState(null);
  const [display, setDisplay] = useState("block");
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

  const handleMinimizeChatBox = () => {
    setDisplay((prevDisplay) => (prevDisplay === "block" ? "hidden" : "block"));
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
        display,
        handleMinimizeChatBox,
        selectedUserImage,
        setSelectedUserImage,
      }}
    >
      {children}
    </ChatCotext.Provider>
  );
};

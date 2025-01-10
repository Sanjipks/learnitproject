import { createContext, useContext, useState } from "react";

const ChatCotext = createContext();

export const useChatBox = () => {
  return useContext(ChatCotext);
};

export const ChatProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserImage, setSelectedUserImage] = useState(null);
  const [display, setDisplay] = useState("block");
  const [viewChatBox, setViewChatBox] = useState(false);
  const [messageUpdate, setMessageUpdate] = useState(false);

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
        selectedUser,
        setSelectedUser,
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

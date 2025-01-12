import React from "react";
import ChatBox from "./Chatbox";
import { useChatBox } from "../context/ChatBoxContext";

const ChatBoxContainer = () => {
  const {
    handleCloseChatBox,
    handleMinimizeChatBox,
    display,
    viewChatBox,
    selectedUserImage,
    selectedUser,
    selectedUserId,
  } = useChatBox();

  return (
    <div>
      <ChatBox
        handleCloseChatBox={handleCloseChatBox}
        handleMinimizeChatBox={handleMinimizeChatBox}
        display={display}
        viewChatBox={viewChatBox}
        selectedUserImage={selectedUserImage}
        selectedUser={selectedUser}
        selectedUserId={selectedUserId}
      />
    </div>
  );
};

export default ChatBoxContainer;

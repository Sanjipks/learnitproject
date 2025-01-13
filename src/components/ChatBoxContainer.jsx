import React from "react";
import ChatBox from "./Chatbox";
import { useChatBox } from "../context/ChatBoxContext";
import { useChats } from "../context/ChatsContext";

const ChatBoxContainer = () => {
  const { chatContainerItems } = useChats();

  return (
    <div>
      <div className="flex-grow overflow-y-scroll mb-20">
        <div className="flex flex-row">
          {chatContainerItems.map((user, id) => (
            <div key={id} className="relative">
              <ChatBox
                key={user.user_id}
                selectedUser={user.user_name}
                selectedUserId={user.user_id}
                selectedUserImage={user.user_image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBoxContainer;

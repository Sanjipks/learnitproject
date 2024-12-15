import React, { useState } from "react";
import { useLogin } from "../../context/LoginContext";
import ChatBox from "../../components/Chatbox";
import GroupChatBox from "../../components/GroupChatbox";
import CreateChatGroup from "../../components/CreateChatGroup";
import { useMessaging } from "../../context/MessagingContext";
import UsersForMessaging from "../../components/UsersCardForMessaging";
import { useChatBox } from "../../context/ChatBoxContext";

const UserChatlistsForMessaging = () => {
  const { loginInfo } = useLogin();
  const { allUsers } = useMessaging();
  const { viewChatBox } = useChatBox();

  const [expandeduser, setExpandeduser] = useState(null);
  const [expandeduserId, setExpandeduserId] = useState(null);
  const [createGroupChat, setCreateGroupChat] = useState(false);
  const [opengroupchatbox, setOpengroupchatbox] = useState(false);

  const loggedInUserId = loginInfo.userId;

  const handleCreateChatRoom = () => {
    setCreateGroupChat((prev) => !prev);
  };
  const handleCloseCreateChatRoom = () => {
    setCreateGroupChat(false);
  };

  const handlegroupchatclose = () => {
    setOpengroupchatbox(false);
  };

  return (
    <div className="flex flex-col bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
      <div className="flex-none py-6 border-b border-gray-400">
        <button
          className="flex px-6 py-2 my-2 border border-white rounded-lg text-lg mx-auto"
          onClick={handleCreateChatRoom}
        >
          Create Chat Room
        </button>
        {createGroupChat && (
          <CreateChatGroup
            loggedInuserId={loggedInUserId}
            handleclosecreateroom={handleCloseCreateChatRoom}
            userlist={allUsers}
          />
        )}
      </div>

      <div className="flex-grow overflow-y-scroll mb-20">
        <div className="flex flex-col">
          {allUsers.map((user, id) => (
            <div key={id} className="relative">
              <UsersForMessaging
                key={user.user_id}
                user={user.user_name}
                userId={user.user_id}
                userImage={user.user_image}
                expandeduser={expandeduser}
                setExpandeduser={setExpandeduser}
                expandeduserId={expandeduserId}
                setExpandeduserId={setExpandeduserId}
                connStatus={user.connectionStatus}
                latestMessage={user.latestMessages}
              />
            </div>
          ))}
        </div>
      </div>

      {viewChatBox && <ChatBox />}

      {opengroupchatbox && (
        <GroupChatBox
          handleclose={handlegroupchatclose}
          opengroupchatbox={setOpengroupchatbox}
        />
      )}
    </div>
  );
};

export default UserChatlistsForMessaging;

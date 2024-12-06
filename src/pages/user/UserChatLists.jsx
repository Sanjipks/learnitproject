import React, { useEffect, useState } from "react";
import Spinner from "../../components/common/Spinner";
import { getUsers } from "../../apis/Api";
import { useLogin } from "../../context/LoginContext";
import ChatBox from "../../components/Chatbox";
import GroupChatBox from "../../components/GroupChatbox";
import CreateChatGroup from "../../components/CreateChatGroup";
import { useMessaging } from "../../context/MessagingContext";
import UsersForMessaging from "../../components/UsersCardForMessaging";

const UserChatlistsForMessaging = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [expandeduser, setExpandeduser] = useState(null);
  const [expandeduserId, setExpandeduserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openchatbox, setOpenchatbox] = useState(false);
  const [createGroupChat, setCreateGroupChat] = useState(false);
  const [opengroupchatbox, setOpengroupchatbox] = useState(false);

  const { loginInfo } = useLogin();
  const { closeBox, handleCloseBox, viewBox, handleViewBox } = useMessaging();
  const pagenumber = 1;
  const loggedinUserRole = loginInfo.userRole;
  const loggedInUserId = loginInfo.userId;

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

  const handleCreateChatRoom = () => {
    setCreateGroupChat((prev) => !prev);
  };
  const handleCloseCreateChatRoom = () => {
    setCreateGroupChat(false);
  };

  const handleclose = () => {
    setOpenchatbox(false);
  };
  const handlegroupchatclose = () => {
    setOpengroupchatbox(false);
  };

  return (
    <div className="flex flex-col  bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
      <div className="flex-none p-4 border-b border-gray-400">
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

      <div className="flex-grow-1 overflow-y-scroll p-4">
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col space-y-2">
            {allUsers.map((user, id) => (
              <div key={id} className="p-2">
                <UsersForMessaging
                  key={user.user_id}
                  user={user.user_name}
                  userId={user.user_id}
                  userImage={user.user_image}
                  expandeduser={expandeduser}
                  setExpandeduser={setExpandeduser}
                  expandeduserId={expandeduserId}
                  setExpandeduserId={setExpandeduserId}
                  openchatbox={openchatbox}
                  setOpenchatbox={setOpenchatbox}
                  connStatus={user.connectionStatus}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat Boxes */}
      {openchatbox && (
        <ChatBox
          handleclose={handleclose}
          selectedUserId={expandeduserId}
          selectedUser={expandeduser}
          openchatbox={setOpenchatbox}
        />
      )}

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
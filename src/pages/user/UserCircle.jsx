import React from "react";
import { useEffect, useState } from "react";
import Spinner from "../../components/common/Spinner";
import User from "../../components/UsersCardForCircle";
import { getUsers } from "../../apis/Api";
import { useLogin } from "../../context/LoginContext";
import ChatBox from "../../components/Chatbox";
import GroupChatBox from "../../components/GroupChatbox";
import CreateGroupChatForm from "../../components/CreateGroupChatForm";

const UserCircle = () => {
  const [userlist, setUserlist] = useState([]);
  const [pagenumber, setPagenumber] = useState(1);
  const [userperpage, setUserperpage] = useState(0);
  const [totalUserscount, setTotalUserscount] = useState(0);
  const [expandeduser, setExpandeduser] = useState(null);
  const [expandeduserId, setExpandeduserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openchatbox, setOpenchatbox] = useState(false);
  const [createGroupChat, setCreateGroupChat] = useState(false);
  const [opengroupchatbox, setOpengroupchatbox] = useState(false);

  const { loginInfo } = useLogin();
  const loggedinUserRole = loginInfo.userRole;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers(loggedinUserRole, pagenumber);
        setUserlist(data.paginatedUsers);
        setUserperpage(data.usersPerPage);
        setTotalUserscount(data.totalEntries);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [pagenumber]);

  const handlePrevPage = () => {
    if (pagenumber > 1) {
      setPagenumber(pagenumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pagenumber >= 0) {
      setPagenumber(pagenumber + 1);
    }
  };

  const handleCreateChatRoom = () => {
    setCreateGroupChat(true);
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
    <div className="min-h-dvh h-auto flex flex-col justify-items-start justify-between bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
      <div className="flex md:my-20 xm:my-10 ">
        <div className="w-full max-w-screen-xl flex mx-auto justify-center bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
          <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-4 ">
            User Circle
          </h1>
        </div>
      </div>
      <div>
        {" "}
        <button
          className="flex p-4 my-4 border border-white rounded-lg text-lg mx-auto"
          onClick={handleCreateChatRoom}
        >
          Create Chat Room
        </button>
        {createGroupChat ? (
          <CreateGroupChatForm
            handleclosecreateroom={handleCloseCreateChatRoom}
          />
        ) : null}
      </div>

      <div className="flex  justify-start mx-auto">
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {userlist.map((user, id) => (
              <div key={id} className="p-2">
                <User
                  key={user.user_id}
                  user={user.user_name}
                  userId={user.user_id}
                  userEmail={user.user_email}
                  userImage={user.user_image}
                  expandeduser={expandeduser}
                  setExpandeduser={setExpandeduser}
                  expandeduserId={expandeduserId}
                  setExpandeduserId={setExpandeduserId}
                  openchatbox={openchatbox}
                  setOpenchatbox={setOpenchatbox}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center">
        <div className="mt-4">
          {userlist.length !== 0 ? (
            <span className="text-sm text-gray-950 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {pagenumber * userperpage - (userperpage - 1)}
              </span>{" "}
              {userlist.length !== 1 ? " to " : null}
              {userlist.length !== 1 ? (
                <span className="font-semibold text-gray-900 dark:text-white">
                  {(pagenumber - 1) * userperpage + userlist.length}
                </span>
              ) : null}
              <span className="font-semibold text-gray-900 dark:text-white">
                {" of "} {totalUserscount}
              </span>{" "}
              Total Users
            </span>
          ) : (
            <div> NO USERS TO DISPLAY</div>
          )}
        </div>

        <div className="flex max-w-screen-xl w-full justify-between mb-4 px-2 float-end">
          <button
            disabled={pagenumber === 1}
            onClick={handlePrevPage}
            className="items-center px-4 h-8 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-100 bg-gray-800 rounded-s border  disabled:hover:bg-gray-100 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            &larr; Prev
          </button>
          <button
            disabled={
              pagenumber === Math.ceil(totalUserscount / userperpage) ||
              userlist.length === 0
            }
            onClick={handleNextPage}
            className="items-center px-4 h-8 text-sm font-medium text-white  disabled:cursor-not-allowed disabled:bg-gray-100 disabled:hover:bg-gray-100 bg-gray-800  rounded-e border border-gray-700  hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next &rarr;
          </button>
        </div>
      </div>
      {openchatbox ? (
        <ChatBox
          handleclose={handleclose}
          selectedUserId={expandeduserId}
          selectedUser={expandeduser}
          openchatbox={setOpenchatbox}
        />
      ) : null}

      {opengroupchatbox ? (
        <GroupChatBox
          handleclose={handlegroupchatclose}
          opengroupchatbox={setOpengroupchatbox}
        />
      ) : null}
    </div>
  );
};

export default UserCircle;

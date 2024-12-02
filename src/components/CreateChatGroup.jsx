import React, { useState } from "react";
import { useGChat } from "../context/GChatContext";

const CreateChatGroup = (props) => {
  const { handleclosecreateroom, userlist, loggedInuserId } = props;
  const { GChatInfo, setGChatInfo, addGroupMember, removeGroupMember } =
    useGChat();

  const [groupCreated, setGroupCreated] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleInput = (e) => {
    const { value } = e.target;
    setGChatInfo((prevState) => ({
      ...prevState,
      groupName: value,
    }));
  };

  const filteredUsers = userlist.filter((user) =>
    user.user_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleUserSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleAddUser = (userId) => {
    if (userId && !GChatInfo.groupMembers.includes(userId)) {
      addGroupMember(userId);
    }
    setSearchInput("");
  };

  const handleRemoveUser = (userId) => {
    console.log("removeuserid", userId);
    if (userId) {
      removeGroupMember(userId);
    }
  };

  const handleCloseCreateChatRoomBox = () => {
    handleclosecreateroom();
    setGroupCreated(false);
  };

  const handleCreateGroup = () => {
    setGroupCreated(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Chat group creation submitted:", GChatInfo);
    setGroupCreated(false);
  };

  return (
    <>
      <div className="z-50 absolute p-4 w-full max-w-md max-h-full mt-16">
        <div className="relative bg-gray-100 rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create Chat Room
            </h3>
            <button
              onClick={handleCloseCreateChatRoomBox}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5">
            <div className="mb-4">
              <label
                htmlFor="groupName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Group Name
              </label>
              <input
                type="text"
                name="groupName"
                id="groupName"
                value={GChatInfo.groupName || ""}
                onChange={handleInput}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Type group name"
                required
              />
            </div>

            <button
              onClick={handleCreateGroup}
              className={`${
                groupCreated ? "hidden" : "block"
              } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-600 dark:border-gray-500`}
            >
              Create
            </button>

            {groupCreated && (
              <div className="pt-4 px-1">
                <label
                  htmlFor="findUser"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Add Group Members
                </label>
                <input
                  type="text"
                  id="findUser"
                  name="findUser"
                  value={searchInput}
                  onChange={handleUserSearchInput}
                  placeholder="Search users..."
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                />
                {searchInput && (
                  <ul className="bg-white border border-gray-300 rounded-lg mt-2 max-h-40 overflow-y-auto">
                    {filteredUsers.map((user) => (
                      <li
                        key={user.user_id}
                        className="flex justify-between items-center p-2 text-gray-900 bg-gray-200 hover:bg-gray-100 cursor-pointer"
                      >
                        <span>{user.user_name}</span>
                        <button
                          onClick={() => handleAddUser(user.user_id)}
                          className="ml-4 p-1 bg-blue-500 text-white rounded-lg text-xs"
                        >
                          Add
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-4">
                  <h3 className="text-sm font-medium">Added Members:</h3>
                  <ul>
                    {GChatInfo.groupMembers.map((userId) => {
                      const user = userlist.find((u) => u.user_id === userId);
                      return (
                        <li key={userId} className="flex justify-between mt-2">
                          <span>{user ? user.user_name : "Unknown User"}</span>
                          <button
                            onClick={() => handleRemoveUser(user.user_id)}
                            className="text-red-600"
                          >
                            Remove
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateChatGroup;

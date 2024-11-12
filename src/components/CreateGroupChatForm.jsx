import React, { useState } from "react";

const CreateGroupChatForm = (props) => {
  const { handleclosecreateroom } = props;

  const [groupCreated, setGroupCreated] = useState(false);
  const [groupChat, setGroupChat] = useState({
    groupChatId: null,
    groupChatName: "",
    groupChatMembers: [],
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setGroupChat((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGroupCreated(true);
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
              type="button"
              onClick={handleclosecreateroom}
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
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

          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="groupChatName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Group Name
                </label>
                <input
                  type="text"
                  name="groupChatName"
                  id="groupChatName"
                  onChange={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type group name"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create
            </button>
            {groupCreated ? (
              <div className="pt-4 px-1  text-lg font-semibold ">
                Add Group Members
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateGroupChatForm;

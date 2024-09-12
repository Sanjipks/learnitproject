import React, { useEffect, useState } from "react";
import { deleteMessageInfo, viewMessageInfo } from "../apis/Api";
import { useLogin } from "../context/LoginContext";
import DeleteDecision from "./modals/DeleteDecision";
import { toast } from "react-toastify";

const MessageCard = () => {
  const { loginInfo } = useLogin();
  const loggedinUserRole = loginInfo.userRole;
  const [messageInfo, setMessageInfo] = useState([]);
  const [selectedMessageInfo, setSelectedMessageInfo] = useState(null);
  const [deletedId, setDeletedId] = useState(null);
  const [pop, setPop] = useState(false);
  const [expand, setExpand] = useState("hidden");

  useEffect(() => {
    viewMessageInfo(loggedinUserRole).then((data) => {
      setMessageInfo(data.result);
    });
  }, []);

  const handleExpand = (id) => {
    if (expand === "hidden") {
      setExpand("block");
      setSelectedMessageInfo(id);
    } else {
      setExpand("hidden");
      setSelectedMessageInfo(null);
    }
  };

  //first step to remove user, passed as removeuser props and it recieves user id from child and set Pop true to dispaly component created as modal
  const handleDelete = async (id) => {
    setDeletedId(id);
    setPop(true);
  };

  //user delete decision can be made and receives true or false state from child compo
  const handlePop = async (state) => {
    setPop(false);
    if (state && deletedId !== null) {
      try {
        const response = await deleteMessageInfo(deletedId, loggedinUserRole);
        const data = await response.json();

        if (response.ok) {
          toast(data.message);
          setMessageInfo(
            messageInfo.filter((message) => message.messageid !== deletedId)
          );
        } else {
          console.error("Failed to delete message");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setExpand("hidden");
        setSelectedMessageInfo(null);
        setDeletedId(null);
      }
    }
  };

  return (
    <>
      {messageInfo.map((message) => (
        <div key={message.messageid}>
          {" "}
          <div className="flex items-start gap-1 ">
            {/* <img
              className="w-12 h-12 rounded-full"
              src="/docs/images/people/profile-picture-3.jpg"
              alt="Jese image"
            /> */}
            <div className="flex flex-col min-w-full my-2 max-w-[420px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {message.sender_name}
                </span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  11:46
                </span>
              </div>
              <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                {message.message}
              </p>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Replied
              </span>
            </div>
            <div>
              <button
                onClick={() => handleExpand(message.messageid)}
                id="dropdownMenuIconButton"
                data-dropdown-toggle="dropdownDots"
                data-dropdown-placement="bottom-start"
                className="inline-flex self-center items-center p-2 mt-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                type="button"
              >
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 4 15"
                >
                  <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              </button>
              {selectedMessageInfo === message.messageid ? (
                <div
                  id="dropdownDots"
                  className={`z-10 ${expand} absolute  px-2 bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700 dark:divide-gray-600`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconButton"
                  >
                    <li>
                      <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Reply
                      </div>
                    </li>
                    <li>
                      <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Forward
                      </div>
                    </li>
                    <li>
                      <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Copy
                      </div>
                    </li>
                    <li>
                      <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Report
                      </div>
                    </li>
                    <li>
                      <div
                        onClick={() => handleDelete(message.messageid)}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Delete
                      </div>
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ))}
      {pop ? (
        <DeleteDecision handlePopAction={handlePop} type="message" />
      ) : null}
    </>
  );
};

export default MessageCard;

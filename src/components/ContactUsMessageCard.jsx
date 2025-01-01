import React, { useEffect, useState } from "react";
import { deleteMessageInfo, viewMessageInfo } from "../apis/Api";
import { useLogin } from "../context/LoginContext";
import { toast } from "react-toastify";
import { dateFormater } from "../utility/DateFormatter";
import ContactMessageReply from "./modals/ContactMessageReply";
import ConfirmDecision from "./modals/utilitycomponent/ConfirmDecision";

const ContactUsMessageCard = () => {
  const { loginInfo } = useLogin();
  const loggedinUserRole = loginInfo.userRole;
  const [messageInfo, setMessageInfo] = useState([]);
  const [selectedMessageInfo, setSelectedMessageInfo] = useState(null);
  const [deletedId, setDeletedId] = useState(null);
  const [pop, setPop] = useState(false);
  const [popMessageReply, setPopMessageReply] = useState(false);
  const [expand, setExpand] = useState("hidden");

  useEffect(() => {
    viewMessageInfo(loggedinUserRole).then((data) => {
      setMessageInfo(data.result);
    });
  }, []);

  const handleExpand = (id) => {
    if (expand === "hidden" && popMessageReply === false) {
      setExpand("block");
      setSelectedMessageInfo(id);
    } else {
      setExpand("hidden");
      setSelectedMessageInfo(null);
      setPopMessageReply(false);
    }
  };

  //first step to remove message recieves id as parameter and sets deleetedId and pop modal to make decision
  const handleDelete = async (id) => {
    setDeletedId(id);
    setPop(true);
  };

  const popMessageReplyBox = () => {
    setPopMessageReply((prev) => !prev);
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
                  {dateFormater(message.date_created)}
                </span>
              </div>
              <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                {message.message}
              </p>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {!message.message_status ? "Received" : "Replied"}
              </span>
            </div>
            <div>
              <button
                onClick={() => handleExpand(message.messageid)}
                id="dropdownMenuIconButton"
                data-dropdown-toggle="dropdownDots"
                data-dropdown-placement="bottom-start"
                className="inline-flex self-center items-center p-2 mt-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
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
              {selectedMessageInfo === message.messageid && (
                <div
                  id="dropdownDots"
                  className={`z-10 ${expand} absolute mt-1 -ml-20  bg-gray-100 divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700 dark:divide-gray-600  border`}
                >
                  <ul
                    className="flex flex-col  text-sm m-1 text-gray-900 dark:text-gray-100 divide-y divide-gray-900 dark:divide-gray-100  dark:bg-gray-700 bg-gray-100    dark:hover:bg-gray-800 hover:bg-gray-200 "
                    aria-labelledby="dropdownMenuIconButton"
                  >
                    <li>
                      <button
                        onClick={() =>
                          popMessageReplyBox(
                            message.sender_name,
                            message.email_from
                          )
                        }
                        className=" px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white hover:text-gray-900"
                      >
                        Reply
                      </button>
                      {popMessageReply && (
                        <div className="absolute -ml-72 mt-10">
                          <ContactMessageReply
                            senderEmail={message.email_from}
                            senderName={message.sender_name}
                          />
                        </div>
                      )}
                    </li>

                    <li>
                      <button
                        onClick={() => "todo"}
                        className="flex px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white hover:text-gray-900"
                      >
                        Copy
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleDelete(message.messageid)}
                        className="flex px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white hover:text-gray-900"
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {pop && (
        <ConfirmDecision
          handlePopAction={handlePop}
          typo="Are you sure you want to delete this message?"
        />
      )}
    </>
  );
};

export default ContactUsMessageCard;

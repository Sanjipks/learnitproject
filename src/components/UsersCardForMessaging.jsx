import React from "react";
import { useLogin } from "../context/LoginContext";
import {
  TimeStampToDay,
  TimeStampToMonthAndDay,
  TimeStampToTime,
  TimeStampToYear,
} from "../utility functions/TimestampToRE";
import { bufferToImage } from "../utility functions/BufferToImage";
import { useChats } from "../context/ChatsContext";

export default function UsersForMessaging(props) {
  const { addChatUser, chatContainerItems } = useChats();

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentDay = date.toLocaleDateString("en-US", { weekday: "long" });
  const currentMonthAndDay = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });

  const { loginInfo } = useLogin();

  const loggedInUserRole = loginInfo.userRole;

  const { user, userId, userImage, latestMessage } = props;

  const image = bufferToImage(userImage && userImage.data);
  const userName = user;

  const userToAdd = { userName, userId, image };

  const handleOpenChatbox = (useradd) => {
    const userExists = chatContainerItems.some(
      (item) => item.userId === useradd.userId
    );
    return userExists ? null : addChatUser(useradd);
  };

  return (
    <>
      {loggedInUserRole === "user" && latestMessage.length > 0 && (
        <div className="w-96 mt-2 sticky mx-1 bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div
            className="flex w-full flex-row  items-center p-1 mx-auto"
            onClick={() => handleOpenChatbox(userToAdd)}
          >
            <img
              className="w-12 h-12 my-2 mr-1 rounded-full shadow-lg"
              src={bufferToImage(userImage && userImage.data)}
              alt="Bonnie image"
            />
            <div className="mb-10  text-sm font-medium text-gray-900 dark:text-white">
              {user}
            </div>
            <div className="mt-6 ml-14 absolute w-80 h-11 p-1 border border-gray-900 text-sm font-medium rounded-sm  bg-gray-100 text-gray-900 ">
              {" "}
              {latestMessage.map((msg, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row text-black justify-between"
                  >
                    <div className="flex w-40 p-2 ">
                      {" "}
                      {msg.message.length < 15
                        ? msg.message
                        : msg.message.slice(0, 15) + "...."}
                    </div>
                    <div className="w-40 font-light text-xs  p-0.5">
                      {" "}
                      {(currentMonthAndDay ==
                      TimeStampToMonthAndDay(msg.timestamp)
                        ? ""
                        : TimeStampToMonthAndDay(msg.timestamp) + ", ") +
                        (currentYear == TimeStampToYear(msg.timestamp)
                          ? ""
                          : TimeStampToYear(msg.timestamp)) +
                        " " +
                        (currentDay == TimeStampToDay(msg.timestamp)
                          ? "Today"
                          : TimeStampToDay(msg.timestamp)) +
                        ", " +
                        TimeStampToTime(msg.timestamp)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

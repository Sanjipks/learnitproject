import React from "react";
import { useLogin } from "../context/LoginContext";
import { useChatBox } from "../context/ChatBoxContext";
import {
  TimeStampToDay,
  TimeStampToMonth,
  TimeStampToMonthAndDay,
  TimeStampToTime,
  TimeStampToYear,
} from "../utility/TimestampToRE";
import { bufferToImage } from "../utility/BufferToImage";

export default function UsersForMessaging(props) {
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentDay = date.toLocaleDateString("en-US", { weekday: "long" });
  const currentMonthAndDay = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });
  const currentMonth = date.toLocaleString("en-US", { month: "long" });

  const { loginInfo } = useLogin();

  const loggedInUserRole = loginInfo.userRole;
  const { handleViewChatBox, setSelectedUser, setSelectedUserId } =
    useChatBox();

  const { userId, userImage, user, latestMessage } = props;

  // const [image, setImage] = useState(null);

  // useEffect(() => {
  //   if (userImage && userImage.data) {
  //     const base64String = bufferToBase64(userImage.data);
  //     setImage(`data:image/jpeg;base64,${base64String}`);
  //   }
  // }, [userImage]);

  const handleOpenChatbox = (id, user) => {
    handleViewChatBox(true);
    setSelectedUserId(id);
    setSelectedUser(user);
  };

  return (
    <>
      {loggedInUserRole === "user" && latestMessage.length > 0 && (
        <div className="w-96 mt-2 sticky mx-1 bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div
            className="flex w-full flex-row  items-center p-1 mx-auto"
            onClick={() => handleOpenChatbox(userId, user)}
          >
            <img
              className="w-12 h-12 my-2 mr-1 rounded-full shadow-lg"
              src={bufferToImage(userImage && userImage.data)}
              alt="Bonnie image"
            />
            <div className="mb-10  text-sm font-medium text-gray-900 dark:text-white">
              {user}
            </div>
            <div className="mt-6 ml-14 absolute w-80 h-11 border border-gray-900 text-sm font-medium rounded-sm  bg-gray-100 text-gray-900 ">
              {" "}
              {latestMessage.map((msg, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row text-black justify-between"
                  >
                    <div className="flex w-40 p-2"> {msg.message} </div>
                    <div className="w-40 font-light text-xs">
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

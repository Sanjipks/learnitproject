import React from "react";
import CloseIcon from "../assets/icons/CloseIcon";
import { useMessaging } from "../context/MessagingContext";

import UserChatlistsForMessaging from "../pages/user/UserChatLists";
import { useLogin } from "../context/LoginContext";

const Messaging = () => {
  const { loginInfo } = useLogin();
  const userState = loginInfo.loginState;
  const { chatlists, closeBox, handleCloseBox, viewBox, handleViewBox } =
    useMessaging();

  return (
    <>
      {userState === "true" && (
        <div
          className={`${viewBox ? "h-auto" : "h-10"} ${
            closeBox && "hidden"
          } fixed bottom-1 z-10 flex flex-col max-h-[80%] max-w-md w-[400px] ml-1 justify-center border border-gray-900 dark:border-gray-100  rounded-md bg-slate-100 dark:bg-slate-700`}
        >
          <h1 className="flex max-w-md w-full justify-between border border-gray-900 z-10 dark:border-gray-100 h-10 mx-auto text-center py-2 rounded-t-md dark:text-slate-200 text-slate-900">
            <button className="w-12 ml-2" onClick={handleCloseBox}>
              <CloseIcon />
            </button>

            <span>Messaging</span>

            <button className="w-12 mr-2" onClick={handleViewBox}>
              ---
            </button>
          </h1>

          <div className="flex-grow overflow-y-auto w-full border border-gray-900 dark:border-gray-100 dark:text-slate-200 text-slate-900">
            <UserChatlistsForMessaging />
          </div>
        </div>
      )}
    </>
  );
};

export default Messaging;

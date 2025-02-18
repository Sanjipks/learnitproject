import React, { useEffect } from "react";

import Login from "../common/Login";
import UserProfile from "../../components/UserProfile";
import { useLogin } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import UserInfo from "../../components/UserInfo";

const Home = () => {
  const { loginInfo } = useLogin();
  const loginState = loginInfo.loginState;
  const userName = loginInfo.userName;
  const userRole = loginInfo.userRole;
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== "user" && localStorage.getItem("tempUserId") === null) {
      localStorage.clear();
      navigate("/");
    }
  });

  return (
    <>
      {loginState === "true" && userRole === "user" ? (
        <div className="min-h-dvh dark:bg-gray-600 dark:border-gray-800 bg-gray-200 border-gray-200 ">
          <div className="max-w-screen-xl w-full flex flex-col mx-auto">
            <div className="flex justify-start bg-gray-200 dark:bg-gray-600 my-20">
              <div className="w-full flex mx-auto justify-center bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
                <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-4 ">
                  Hello, {userName}
                </h1>
              </div>
            </div>
            <div className="flex flex-col md:flex-row sm:flex-col-reverse">
              <section className="flex justify-center w-full md:h-auto px-6 mx-auto lg:pt-6 ">
                <div className="w-full bg-gray-100 rounded-lg shadow dark:border xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      My Info
                    </h1>
                    <UserInfo />
                  </div>
                </div>
              </section>
              <section className="flex justify-center w-full md:h-auto px-6 mx-auto lg:pt-6 ">
                <div className="w-full bg-gray-100 rounded-lg shadow dark:border xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      My Profile
                    </h1>
                    <UserProfile />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;

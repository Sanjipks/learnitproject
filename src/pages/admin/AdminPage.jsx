import React, { useEffect } from "react";
import { useLogin } from "../../context/LoginContext";
import Login from "../common/Login";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const { loginInfo } = useLogin();
  const loginState = loginInfo.loginState;
  const userRole = loginInfo.userRole;
  const userName = loginInfo.userName;
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== "admin") {
      localStorage.clear();
      navigate("/");
    }
  });
  return (
    <>
      {userRole === "admin" && loginState === "true" ? (
        <div className="min-h-dvh h-auto pb-16 flex flex-col justify-items-center justify-between bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
          <div className="md:my-20">
            <div className="w-full flex mx-auto justify-center bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-4 ">
                Hello, {" " + userName}
              </h1>
            </div>
          </div>
          <div className="max-w-screen-xl justify-center h-auto w-full flex md:flex-row sm:flex-col sm:items-center mx-auto">
            <section className="sm:min-h-dvh bg-gray-200 dark:bg-gray-600 md:w-1/2 sm:w-full mt-8 border dark:border-black ">
              <div className=" flex flex-col items-center md:h-dvh px-6 mx-auto lg:pt-6 ">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-8">
                    Requests
                  </h1>
                </div>
              </div>
            </section>

            <section className="sm:min-h-dvh bg-gray-200 dark:bg-gray-600 md:w-1/2 sm:w-full mt-8 border dark:border-black">
              <div className=" flex flex-col items-center sm:h-auto md:h-dvh px-6 mx-auto lg:pt-6 ">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-8">
                    My Items
                  </h1>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default AdminPage;

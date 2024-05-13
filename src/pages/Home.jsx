import React from "react";

import Login from "./Login";
import UserProfile from "../components/UserProfile";

const Home = () => {
  return (
    <>
      {localStorage.getItem("loginState") === null ? (
        <Login />
      ) : (
        <div className="md:h-dvh sm:h-auto sm:py-6  dark:bg-gray-600 dark:border-gray-800 bg-gray-200 border-gray-200 ">
          <section className="flex justify-start bg-gray-300 dark:bg-gray-600">
            <p className=" text-xl p-4">
              Hello, {localStorage.getItem("email")}
            </p>
          </section>
          <div className=" flex justify-center px-6 mx-auto lg:pt-6 ">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Welcome
                </h1>
                <UserProfile />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

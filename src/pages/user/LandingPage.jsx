import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("loginState") === null) {
      navigate("/");
    }
  });

  return (
    <div className="min-h-screen dark:bg-gray-600 dark:border-gray-800 bg-gray-200 border-gray-200">
      <section className=" bg-gray-100 dark:bg-gray-600">
        <p className=" text-xl p-4">Hello, {localStorage.getItem("email")}</p>
        <div className=" flex flex-col items-center md:h-dvh px-6 mx-auto lg:pt-6 ">
          <div className="w-full bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Welcome
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

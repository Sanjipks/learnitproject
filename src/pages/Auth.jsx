import React, { useState } from "react";

const Auth = () => {
  const [code, setCode] = useState("");

  const handleOnchange = (event) => {
    setCode(event.target.value);
  };

  const handleAuth = (event) => {
    event.preventDefault();
  };
  const handleResend = () => {
    "todo";
  };
  return (
    <div className="md:h-dvh dark:bg-gray-600 dark:border-gray-800 bg-gray-200 border-gray-200 sm:py-16 lg:-my-16">
      <section className=" bg-gray-300 dark:bg-gray-600">
        <div className=" flex flex-col items-center justify-center md:h-dvh px-6 mx-auto lg:pt-6 ">
          <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Authenticate Your Account
          </p>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h2 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Enter the code sent in your email
              </h2>

              <form className="space-y-4 md:space-y-6 ">
                <div>
                  <input
                    type="text"
                    name="code"
                    onChange={handleOnchange}
                    id="code"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex flex-col items-center justify-center ">
                  <button
                    onClick={handleAuth}
                    type="submit"
                    className=" w-36 border dark:border-gray-200 border-gray-900 text-gray-900 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-white"
                  >
                    Authenticate
                  </button>
                  <button
                    onClick={handleResend}
                    type="submit"
                    className=" w-36 border mt-2 dark:border-gray-200 border-gray-900 text-gray-900 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-white"
                  >
                    Resend the code
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auth;

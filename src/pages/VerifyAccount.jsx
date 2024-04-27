import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyAccount = () => {
  const [accountVerificationCode, setAccountVerificationCode] = useState("");
  const email = localStorage.getItem("email");

  const navigate = useNavigate();

  const handleOnchange = (event) => {
    setAccountVerificationCode(event.target.value);
  };

  const handleVerifyAccount = async (event) => {
    event.preventDefault();
    if (accountVerificationCode) {
      console.log(email, accountVerificationCode);
      try {
        const response = await fetch("http://localhost:3000/verifyEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, accountVerificationCode }),
        });
        console.log("vcode " + response.json());
        if (!response.ok) throw new Error("Network response was not ok.");
        const data = await response.json();
        console.log("data", data); // Handle the response data
        if (data) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("code required");
    }
  };

  return (
    <div className="md:h-dvh dark:bg-gray-600 dark:border-gray-800 bg-gray-200 border-gray-200 py-16">
      <section className=" bg-gray-300 dark:bg-gray-600">
        <div className=" flex flex-col items-center justify-center md:h-dvh px-6 mx-auto lg:pt-6 ">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            LearnIT
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Verify Your Account
              </h1>
              <form className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    id="code"
                    onChange={handleOnchange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="verificationcode"
                    required
                  />
                </div>

                <button
                  onSubmit={handleVerifyAccount}
                  type="submit"
                  className="w-full text-gray-900 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-white"
                >
                  Verify
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerifyAccount;

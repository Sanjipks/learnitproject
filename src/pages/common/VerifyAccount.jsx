import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogin } from "../../context/LoginContext";
import { verifyAccount } from "../../apis/Api";
import Spinner from "../../components/common/Spinner";

const VerifyAccount = () => {
  const [accountVerificationCode, setAccountVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginInfo } = useLogin();
  const email = loginInfo.userEmail;
  console.log(email);

  const navigate = useNavigate();

  const handleOnchange = (event) => {
    setAccountVerificationCode(event.target.value);
  };

  const handleVerifyAccount = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (accountVerificationCode) {
      try {
        const response = await verifyAccount(email, accountVerificationCode);
        console.log("response", response);

        const data = await response.json();
        console.log("data", data);

        if (response.ok) {
          toast(data.message);
          navigate("/");
          localStorage.clear();
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      toast("Please Enter the Code");
    }
  };

  return (
    <div className="flex md:h-screen sm:h-auto justify-center items-center dark:bg-gray-600 dark:border-gray-800 bg-gray-200 border-gray-200 sm:pb-4 xm:pb-4">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex w-full flex-col items-center justify-center  lg:pt-6 sm:m-2 md:m-0">
          <div className="w-full bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Verify Your Account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleVerifyAccount}
              >
                <div>
                  <label
                    htmlFor="code"
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
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-gray-900 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-white"
                >
                  Verify
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyAccount;

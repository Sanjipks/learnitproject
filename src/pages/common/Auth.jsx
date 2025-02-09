import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogin } from "../../context/LoginContext";
import { authCodeResend, authLogin } from "../../apis/Api";
import Spinner from "../../components/common/Spinner";

const Auth = () => {
  const [authCode, setAuthCode] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginInfo, loginInfoUpdate } = useLogin();

  const email = loginInfo.userEmail;

  const token = loginInfo.token;
  const Role = loginInfo.userRole;

  const navigate = useNavigate();

  const handleOnchange = (event) => {
    setAuthCode(event.target.value);
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (authCode) {
      try {
        const response = await authLogin(email, authCode);
        const data = await response.json();

        if (data) {
          toast(data.message);
          loginInfoUpdate((loginInfo.loginState = "true"));
          if (Role === "admin") {
            navigate("/admin");
          } else if (Role === "user") {
            navigate("/home");
          } else {
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      toast("Please provite the code", { autoClose: 1000 });
    }
  };
  const handleResend = async () => {
    try {
      const res = await authCodeResend(email, token);

      if (!res.ok) throw new Error("Network response was not ok.");

      if (res.ok) {
        toast("new code is sent to your email, please check you email");
      }
      if (res.status == 404) {
        toast("email not found", { autoClose: 1000 });
      }
    } catch (error) {}
  };
  return (
    <div className="flex md:h-screen sm:h-auto justify-center items-center dark:bg-gray-800 dark:border-gray-800 bg-gray-400 border-gray-200 sm:pb-4 xm:pb-4">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex p-4 flex-col max-w-xl w-full rounded-xl  dark:bg-gray-700 bg-gray-100 items-center justify-center sm:m-2 md:m-0">
          <h1 className="flex items-center  mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Authenticate your Account
          </h1>
          <div className="w-full bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
      )}
    </div>
  );
};

export default Auth;

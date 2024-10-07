import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetForgotPassword } from "../../apis/Api";
import EyeShow from "../../assets/icons/EyeShow";
import EyeHide from "../../assets/icons/EyeHide";
import Spinner from "../../components/common/Spinner";

const ResetForgetPassword = () => {
  const [inputs, setInputs] = useState({
    password: "",
    confirmpassword: "",
  });

  const email = localStorage.getItem("email");

  const [passwordtype, setPasswordtype] = useState("password");
  const [confirmpasswordtype, setConfirmpasswordtype] = useState("password");

  const navigate = useNavigate();

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs({ ...inputs, [name]: value });
  };
  const togglePasswordVisibility = () => {
    setPasswordtype("text");
  };

  const endHold = () => {
    setPasswordtype("password");
  };

  const togglePasswordVisibilityC = () => {
    if (confirmpasswordtype === "password") {
      setConfirmpasswordtype("text");
    } else {
      setConfirmpasswordtype("password");
    }
  };

  const handleReset = async (event) => {
    event.preventDefault();
    if (inputs.password === inputs.confirmpassword) {
      let password = inputs.password;
      try {
        const res = await resetForgotPassword(password, email);

        if (res.ok) {
          toast("password was reset successfully");
          navigate("/");
        }
        if (res.status == 404) {
          toast("password reset failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      toast("password did not match");
    }
  };

  return (
    <div className="flex md:h-screen sm:h-auto justify-center items-center dark:bg-gray-800 dark:border-gray-800 bg-gray-400 border-gray-200 sm:pb-4 xm:pb-4">
      <div className="flex p-4 flex-col max-w-xl w-full rounded-xl  dark:bg-gray-700 bg-gray-100 items-center justify-center sm:m-2 md:m-0">
        <p className="flex items-center  mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Reset your Password
        </p>
        <div className="w-full bg-gray-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Password Reset
            </h2>

            <form className="space-y-4 md:space-y-6" onSubmit={handleReset}>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>

                <input
                  type={passwordtype}
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInput}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                <button
                  className="float-right -mt-8 mr-2"
                  disabled={inputs.password.length < 1 && true}
                  onMouseDown={togglePasswordVisibility}
                  onMouseUp={endHold}
                  onMouseLeave={endHold}
                >
                  {passwordtype === "password" ? <EyeShow /> : <EyeHide />}
                </button>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>

                <input
                  type={confirmpasswordtype}
                  name="confirmpassword"
                  id="confirmpassword"
                  autoComplete="new-password"
                  onChange={handleInput}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />

                <button
                  type="button"
                  disabled={inputs.confirmpassword.length < 1 && true}
                  className="float-right -mt-8 mr-2"
                  onClick={togglePasswordVisibilityC}
                >
                  {confirmpasswordtype === "password" ||
                  inputs.confirmpassword.length < 1 ? (
                    <EyeShow />
                  ) : (
                    <EyeHide />
                  )}
                </button>
              </div>
              <div className="flex flex-col items-center justify-center ">
                <button
                  type="submit"
                  className=" w-36 border dark:border-gray-200 border-gray-900 text-gray-900 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-white"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetForgetPassword;

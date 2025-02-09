import { toast } from "react-toastify";
import React, { useState } from "react";
import { useLogin } from "../../context/LoginContext";
import { loginUser } from "../../apis/Api";
import { useNavigate } from "react-router-dom";
import EyeHide from "../../assets/icons/EyeHide";
import discussion from "../../assets/images/discussionSession.jpeg";
import leadership from "../../assets/images/leadership.jpeg";
import reflection from "../../assets/images/reflection.jpeg";
import shining from "../../assets/images/shining.jpeg";
import Carasoul from "../../components/modals/utilitycomponent/Carasoul";
import Spinner from "../../components/common/Spinner";

export default function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const images = [discussion, leadership, reflection, shining];

  const { loginInfo, loginInfoUpdate } = useLogin();

  const [passwordtype, setPasswordtype] = useState("password");
  const [loading, setLoading] = useState(false);

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(inputs);
      const data = await res.json();

      if (res.status === 200) {
        const token = data.token;
        const userRole = data.role;
        const userName = data.userName;
        const userId = data.userId;
        const userImage = data.userImage;

        loginInfoUpdate(
          (loginInfo.token = token),
          (loginInfo.userEmail = inputs.email),
          (loginInfo.userName = userName),
          (loginInfo.userRole = userRole),
          (loginInfo.userId = userId),
          (loginInfo.userImage = userImage)
        );
        localStorage.setItem("tempUserId", null);
        navigate("/auth");
      }
      if (res.status === 401) {
        const errorData = await res.json();
        const message = errorData.message;

        throw new Error(message);
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      toast(error.message, { autoClose: 1000 });
    } finally {
      setLoading(false); // Set loading to false after the API call is complete
    }
  };
  const handleNavigate = (nv) => {
    switch (nv) {
      case "su":
        navigate("/register");
        break;
      case "fp":
        navigate("/forgetpassword");
        break;
      default:
        console.warn("Unknown navigation value:", nv);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordtype("text");
  };

  const endHold = () => {
    setPasswordtype("password");
  };

  return (
    <>
      <div className="min-h-screen h-auto flex flex-col xm:gap-4 bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
        <div className="flex items-center justify-center md:my-40 sm:my-20 px-2">
          {loading ? (
            <Spinner />
          ) : (
            <div className="max-w-screen-xl w-full sm:h-auto sm:m-auto flex md:flex-row xm:flex-col-reverse">
              <section className="flex md:h-[756px]  bg-gray-400 dark:bg-gray-900 sm:rounded-br-xl md:rounded-br-none sm:rounded-bl-xl md:rounded-tl-xl  justify-center items-center w-full">
                <Carasoul
                  images={images}
                  buttonShow={false}
                  csss="w-auto md:h-[756px] sm:rounded-br-xl md:rounded-br-none sm:rounded-bl-xl md:rounded-tl-xl"
                />
              </section>
              <section className="flex md:h-[756px] justify-center items-center min-h-max w-full bg-gray-400 dark:bg-gray-900 md:rounded-br-xl sm:rounded-tr-xl sm:rounded-tl-xl md:rounded-tl-none sm:mt-8 md:mt-0 sm:px-2 md:px-0">
                <div className=" flex w-full flex-col items-center justify-center sm:py-2 md:py-0 m-auto ">
                  <div className="w-full mx-4 bg-gray-200 rounded-xl shadow dark:border md:mt-0 sm:max-w-sm md:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="py-6 space-y-4 md:space-y-6 md:p-10 sm:m-4">
                      <h1 className="text-center text-3xl py-4 font-bold leading-tight tracking-tight text-gray-900  dark:text-white">
                        Sign in to your account
                      </h1>
                      <form
                        className="space-y-4 md:h-[475px]"
                        onSubmit={handleSubmit}
                      >
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleInput}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@emaildomain.com"
                            required
                          />
                        </div>
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
                            onChange={handleInput}
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                          />
                          <span
                            className="float-right -mt-10 mr-2"
                            onMouseDown={togglePasswordVisibility}
                            onMouseUp={endHold}
                            onMouseLeave={endHold}
                          >
                            {passwordtype === "password" ? (
                              <>👁️</>
                            ) : (
                              <EyeHide />
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="remember"
                                aria-describedby="remember"
                                type="checkbox"
                                className="w-4 h-4 mt-1 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                              />
                            </div>
                            <div className="ml-3 text-md">
                              <label
                                htmlFor="remember"
                                className="text-gray-500 dark:text-gray-300"
                              >
                                Remember me
                              </label>
                            </div>
                          </div>
                          <button
                            onClick={() => handleNavigate("fp")}
                            className="text-md font-medium text-primary-600 hover:underline text-black dark:text-primary-500 dark:text-white"
                          >
                            Forgot password?
                          </button>
                        </div>
                        <button
                          type="submit"
                          className="w-full text-dark bg-primary-600 hover:bg-primary-700  hover:underline focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800  text-gray-950 dark:text-white"
                        >
                          Sign in
                        </button>
                        <p className="text-md font-light text-gray-500 dark:text-gray-400">
                          Don’t have an account yet? {""}
                          <button
                            onClick={() => handleNavigate("su")}
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-gray-950 dark:text-white"
                          >
                            Sign up
                          </button>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useLogin } from "../../context/LoginContext";
import { registerUser } from "../../apis/Api";
import EyeHide from "../../assets/icons/EyeHide";
import EyeShow from "../../assets/icons/EyeShow";
import discussion from "../../assets/images/discussionSession.jpeg";
import leadership from "../../assets/images/leadership.jpeg";
import reflection from "../../assets/images/reflection.jpeg";
import shining from "../../assets/images/shining.jpeg";
import Carasoul from "../../components/modals/utilitycomponent/Carasoul";
import { validatePassword } from "../../utility/ValidatePassword";

export default function RegisterPage() {
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const images = [discussion, leadership, reflection, shining];
  const { loginInfo, loginInfoUpdate } = useLogin();

  const navigate = useNavigate();

  const [passwordtype, setPasswordtype] = useState("password");
  const [confirmpasswordtype, setConfirmpasswordtype] = useState("password");

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

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const passWordCheck = validatePassword(inputs.password);
    if (!passWordCheck) {
      if (inputs.password === inputs.confirmpassword) {
        try {
          const response = await registerUser(inputs);
          if (response.status == 201) {
            loginInfoUpdate((loginInfo.userEmail = inputs.email));
            navigate("/verifyaccount");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        toast("password did not match");
      }
    } else {
      toast(passWordCheck.toastMessage);
    }
  };

  return (
    <div className="min-h-screen h-auto flex flex-col xm:gap-4 bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
      <div className="items-center justify-start md:my-40 sm:my-20 px-2">
        <div className="max-w-screen-xl w-full sm:h-auto sm:m-auto flex md:flex-row xm:flex-col-reverse">
          <section className="flex  justify-center items-center w-full bg-blue-200 sm:rounded-br-xl md:rounded-br-none sm:rounded-bl-xl md:rounded-tl-xl">
            <Carasoul images={images} buttonShow={false} />
          </section>
          <section className="flex md:h-[756px] justify-center items-center min-h-max w-full bg-amber-100 md:rounded-br-xl sm:rounded-tr-xl sm:rounded-tl-xl md:rounded-tl-none sm:mt-8 md:mt-0 px-2">
            <div className=" flex w-full flex-col items-center justify-center mx-auto lg:pt-6 my-12">
              <div className="w-full mx-4 bg-white rounded-xl shadow dark:border md:mt-0 sm:max-w-sm md:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="py-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Register new account
                  </h1>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label
                        htmlFor="firstname"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your First Name
                      </label>
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="firstname"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastname"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your Last Name
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="lastname"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
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
                        autoComplete="new-password"
                        onChange={handleChange}
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
                        {passwordtype === "password" ? (
                          <EyeShow />
                        ) : (
                          <EyeHide />
                        )}
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
                        onChange={handleChange}
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
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          aria-describedby="terms"
                          name="terms"
                          onChange={handleChange}
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="font-light text-gray-500 dark:text-gray-300">
                          I accept the{" "}
                          <Popup
                            trigger={
                              <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                Terms and Conditions
                              </a>
                            }
                          >
                            <div>
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Est vitae quibusdam veniam culpa
                              eaque! Eligendi, sit eaque rem dignissimos
                              perferendis quaerat quos aliquam, minima impedit
                              fugit laborum harum culpa reprehenderit.{" "}
                            </div>
                          </Popup>
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-gray-900 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-white"
                    >
                      Register
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account?{" "}
                      <a
                        href="/"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-gray-900 dark:text-white"
                      >
                        Sign in
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

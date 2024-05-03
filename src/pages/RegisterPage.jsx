import React, { useState } from "react";
import EyeShow from "../assets/EyeShow";
import EyeHide from "../assets/EyeHide";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

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

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     try {
  //         const responseData = await registerUser(inputs);
  //         console.log(responseData); // Handle the response data
  //     } catch (error) {
  //         console.error('Error:', error);
  //     }
  // };;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputs.password === inputs.confirmpassword) {
      try {
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        });

        if (!response.ok) throw new Error("Network response was not ok.");
        // const data = await response.json();
        // console.log(response); // Handle the response data
        if (response.status === 201) {
          localStorage.setItem("email", inputs.email);
          navigate("/verifyaccount");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      toast("password did not match");
    }
  };

  return (
    <div className=" dark:bg-gray-600 dark:border-gray-800 bg-gray-200 border-gray-200">
      <section className=" bg-gray-300 dark:bg-gray-600">
        <div className=" flex flex-col items-center justify-center md:h-dvh px-6 mx-auto lg:pt-6 ">
          <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            {/* <img className="w-8 h-8 mr-2" src="" alt="logo"/> */}
            User Registration
          </h1>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Register new account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username"
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
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
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
  );
}

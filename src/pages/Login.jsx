import EyeHide from "../assets/EyeHide";
import React, { useState } from "react";

export default function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [passwordtype, setPasswordtype] = useState("password");

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      if (res) console.log(">>>>>" + res.status);
      // console.log(">>>>>" + res.json());
      if (res.status === 200) {
        // alert("login successfully");
        // window.location.href = "/userprofile";
        // const data = await res.json();
        console.log("res", res);
        // const token = data.token;

        // localStorage.setItem("token", token);
        localStorage.setItem("email", inputs.email);

        window.location.href = "/auth";
      }
      if (res.status === 401) {
        const errorData = await res.json();
        const message = errorData.message;
        console.log(message);
        throw new Error(message);
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordtype("text");
  };

  const endHold = () => {
    setPasswordtype("password");
  };

  return (
    <div className=" dark:bg-gray-600 dark:border-gray-800 bg-gray-200 border-gray-200">
      <section className=" bg-gray-300 dark:bg-gray-600">
        <div className=" flex flex-col items-center justify-center md:h-dvh px-6 mx-auto lg:pt-6 ">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            {/* <img className="w-8 h-8 mr-2" src="" alt="logo"/> */}
            LearnIT
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleInput}
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
                    onChange={handleInput}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <span
                    className="float-right -mt-8 mr-2"
                    onMouseDown={togglePasswordVisibility}
                    onMouseUp={endHold}
                    onMouseLeave={endHold}
                  >
                    {passwordtype === "password" ? <>👁️</> : <EyeHide />}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="/forgetpassword"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 dark:text-white"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-dark bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800  text-gray-950 dark:text-white"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? {""}
                  <a
                    href="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-gray-950 dark:text-white"
                  >
                    Sign up
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

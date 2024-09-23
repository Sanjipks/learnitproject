import React, { useState, useEffect } from "react";

const DarkModeToggle = () => {
  // const [darkMode, setDarkMode] = useState(true);

  // useEffect(() => {
  //   if (darkMode) {
  //     document.body.classList.add("dark");
  //   } else {
  //     document.body.classList.remove("dark");
  //   }
  // }, [darkMode]);

  const [darkMode, setDarkMode] = useState(() => {
    const savedPreference = localStorage.getItem("darkMode");
    if (savedPreference !== null) {
      return savedPreference === "true";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onClick={handleToggle}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-100 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="ms-3 text-sm font-medium  text-gray-900 dark:text-gray-100 ">
        {" "}
        Turn {darkMode ? "Light" : "Dark"} Mode
      </span>
    </label>
  );
};

export default DarkModeToggle;

import React, { useState } from "react";

export default function Progress() {
  const [classes, setClasses] = useState(false);

  const handleClasses = () => {
    setClasses(true);
  };
  const handleMyProgress = () => {
    setClasses(false);
  };
  return (
    <div className="min-h-screen h-auto flex flex-col justify-items-center justify-between bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
      <div className="md:my-20">
        <div className="w-full flex mx-auto justify-center bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
          <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-4 ">
            Learner Portal
          </h1>
        </div>
        <div className="flex flex-row  justify-evenly mx-auto gap-8">
          <button
            onClick={handleClasses}
            className="flex py-3 w-48 justify-center my-4 border border-white rounded-lg text-lg  "
          >
            Classes
          </button>
          <button
            onClick={handleMyProgress}
            className="flex py-3  w-48 justify-center my-4 border border-white rounded-lg text-lg "
          >
            My Progress
          </button>
        </div>
        <div className="flex justify-center mx-auto">
          {classes ? <div>My Classes</div> : <div>My Progress</div>}
        </div>
      </div>
    </div>
  );
}

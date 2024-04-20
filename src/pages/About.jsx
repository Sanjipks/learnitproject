import React from "react";

export default function About() {
  return (
    <div className="h-dvh flex md:flex-row sm:flex-col sm:items-center dark:bg-gray-600 dark:border-gray-800 bg-gray-200 border-gray-200">
      <section className=" bg-gray-200 dark:bg-gray-600 md:w-1/2 sm:w-full mt-8 border dark:border-black ">
        <div className=" flex flex-col items-center md:h-dvh px-6 mx-auto lg:pt-6 ">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-8">
              About Us
            </h1>
          </div>
        </div>
      </section>

      <section className=" bg-gray-200 dark:bg-gray-600 md:w-1/2 sm:w-full mt-8 border dark:border-black">
        <div className=" flex flex-col items-center md:h-dvh px-6 mx-auto lg:pt-6 ">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-8">
              Goals
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}

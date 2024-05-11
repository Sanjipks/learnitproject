import React from "react";

export default function About() {
  return (
    <div className="flex md:flex-row sm:flex-col sm:items-center sm:mb-auto dark:bg-gray-600 dark:border-gray-800 bg-gray-200 border-gray-200 ">
      <section className=" bg-gray-200 dark:bg-gray-600 md:w-1/2 sm:w-full mt-8 sm:mt-2 border dark:border-black ">
        <div className=" flex flex-col items-center md:h-dvh px-6 mx-auto lg:pt-6 ">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-8">
              About Us
            </h1>
          </div>
          <p className="mt-24 dark:text-slate-300 text-slate-900 md:text-3xl  text-wrap mx-24 text-justify">
            "At LearnIT, we are dedicated to empowering individuals through
            personalized IT education. Our consultancy stands out by offering
            one-on-one support, ensuring that each student receives tailored
            guidance that matches their unique learning style and pace. With a
            team of experienced IT professionals and educators, we provide a
            comprehensive range of classes that cover everything from basic
            computer skills to advanced programming and network security. Our
            mission is to make IT education accessible and engaging, helping
            students of all levels achieve their personal and professional
            goals. Whether you're looking to start a new career in tech, enhance
            your skills for a current role, or simply gain a better
            understanding of technology, LearnIT is here to support your journey
            every step of the way."
          </p>
        </div>
      </section>

      <section className=" bg-gray-200 dark:bg-gray-600 md:w-1/2 sm:w-full mt-8 sm:mt-2 border dark:border-black ">
        <div className=" flex flex-col items-center md:h-dvh px-6 mx-auto lg:pt-6 ">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-8">
              Goals
            </h1>
          </div>
          <ul className="mt-24 dark:text-slate-300 text-slate-900 md:text-3xl mx-24 list-disc text-left">
            <li>
              At LearnIT, we're dedicated to nurturing the next generation of IT
              professionals with personalized, one-on-one mentorship.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

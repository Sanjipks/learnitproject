import React, { useEffect, useState } from "react";

const Carasoul = (props) => {
  const { images, buttonShow } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative flex justify-center items-center">
      <button
        onClick={prevSlide}
        className={`absolute left-2 z-10 text-white bg-gray-800 p-2 rounded-full ${
          buttonShow ? "block" : "hidden"
        }`}
      >
        &larr;
      </button>

      <img
        className=" md:h-[756px] w-auto sm:rounded-xl md:rounded-r-none"
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
      />

      <button
        onClick={nextSlide}
        className={`absolute right-2 z-10 text-white bg-gray-800 p-2 rounded-full ${
          buttonShow ? "block" : "hidden"
        }`}
      >
        &rarr;
      </button>
    </div>
  );
};

export default Carasoul;

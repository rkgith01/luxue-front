"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Slider = () => {
  //   const imgData = [
  //     "/hero1.jpg",
  //     "/hero2.jpg",
  //     "/hero3.jpg",
  //   ];

  const imgData = [
    {
      src: "/hero1.jpg",
      text: "Welcome to LuxueLease – Your Gateway to High-End Fashion, Effortlessly!",
    },
    { src: "/hero2.jpg", text: "" },
    { src: "/hero3.jpg", text: "" },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % imgData.length;
      setActiveIndex(nextIndex);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [activeIndex]);

  const renderCarouselItems = () => {
    return imgData.map((item, index) => (
      <div
        key={index}
        className={`flex-shrink-0 w-full h-full transform ${
          index === activeIndex ? "opacity-100" : "opacity-0"
        } transition-opacity duration-700 ease-in-out `}
        data-carousel-item
      >
        <img
          src={item.src}
          className="object-cover w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          alt={`Slide ${index + 1}`}
        />
      </div>
    ));
  };

  return (
    <div
      id="hero-carousel"
      className="relative w-full h-96 md:h-[70vh] overflow-hidden "
    >
      {/* Carousel wrapper */}
      <div className="flex h-[100%]">{renderCarouselItems()}</div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {imgData.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? "bg-white" : "bg-gray-400"
            }`}
            aria-current={index === activeIndex}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
          ></button>
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-1/2 end-4 z-30 flex items-center justify-center h-10 w-10 bg-white/30 dark:bg-gray-600/30 rounded-full cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={() => setActiveIndex((activeIndex + 1) % imgData.length)}
      >
        <ChevronRight
          className="w-5 h-5 text-white dark:text-gray-200"
          aria-hidden="true"
        />
        <span className="sr-only">Next</span>
      </button>

      <button
        type="button"
        className="absolute top-1/2 start-4 z-30 flex items-center justify-center h-10 w-10 bg-white/30 dark:bg-gray-600/30 rounded-full cursor-pointer group focus:outline-none"
        data-carousel-prev
        onClick={() =>
          setActiveIndex((activeIndex - 1 + imgData.length) % imgData.length)
        }
      >
        <ChevronLeft
          className="w-5 h-5 text-white dark:text-gray-200"
          aria-hidden="true"
        />

        <span className="sr-only">Previous</span>
      </button>
      {/* Text */}
      {/* <div className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-center transition-opacity duration-700 ease-in-out ${activeIndex === 0 || activeIndex ===1 || activeIndex === 2 ? 'opacity-100' : 'opacity-0'}`}></div> */}
      <div className="absolute bottom-0 top-9 w-[60%] right-8  rounded text-wrap flex-wrap flex items-center justify-center text-center">
        <h1 className="text-3xl/[45px] md:text-[50px] heading rounded font-bold lg:bg-gradient-to-r  from-cyan-500 to-blue-500 bg-clip-content lg:text-black sm:text-amber-500 m-2 text-right">
          {imgData[activeIndex].text}
        </h1>
      </div>
    </div>
  );
};

export default Slider;

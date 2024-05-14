import React, { useState } from "react";
import LawyerGif from "/Lawyer.gif";

const Hero = () => {
  return (
    <>
      <div className="relative max-[400px]:px-2 py-16  border-gray-400 border-opacity-25  w-full flex justify-center bg-white  dark:bg-dark ">
        <div className="container">
          <div className="- flex justify-center flex-wrap">
            <div className="w-full max-[400px]:px-0 my-auto  px-4 lg:w-5/12">
              <div className="  w-full h-full">
                <div className=" dark:text-white w-full h-full flex flex-col  justify-center">
                  <h1 className="font-bold max-[400px]:text-2xl max-[400px]:px-2 md:text-5xl text-4xl  bg-white dark:bg-black  mt-4 xl:text-6xl xl:pl-6 ">
                    Legal Advice Online From Top Lawyers
                  </h1>
                  <button
                    type="button"
                    className="text-white  dark:text-black dark:bg-white bg-black md:text-base font-bold text-xs border-2 xl:ml-6 mx-2  lg:mt-10 mt-5 border-black px-5 py-3 w-40 max-[400px]:text-xs max-[400px]:p-2 rounded-3xl"
                  >
                    Consult Lawyer
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="hidden px-4 lg:block lg:w-1/12"></div> */}
            <div className="w-full max-[400px]:px-0 px-4 lg:w-6/12">
              <div className="lg:ml-auto lg:text-right">
                <div className="relative flex justify-center z-10 inline-block pt-11 lg:pt-0">
                  <img
                    src={LawyerGif}
                    alt="Lawyer gif"
                    className="max-w-full  lg:ml-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

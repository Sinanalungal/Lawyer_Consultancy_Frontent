import React, { useState } from "react";
import LawyerGif from "/Lawyer.gif";

const Hero = () => {
  return (
    <>
      <div className="relative max-[400px]:px-2 p-6  border-gray-400 border-opacity-25  w-full flex justify-center bg-white  dark:bg-dark ">
        <div className="container">
          <div className="- flex justify-center max-lg:flex-col-reverse  border border-black rounded-xl flex-wrap">
            <div className="w-full max-[400px]:px-0 my-auto  flex  max-lg:py-10  px-4 lg:w-5/12">
              <div className="  w-full h-full flex ">
                <div className=" dark:text-white w-full h-full  flex flex-col  justify-center max-lg:p-3">
                  <div>
                  <h1 className="font-bold h-full   max-[400px]:text-3xl  md:text-5xl text-4xl  dark:bg-black max-md:p-0 max-lg:p-8  mt-4 xl:text-6xl xl:pl-6 ">
                    Legal Advice Online From Top Lawyers
                  </h1>
                  <button
                    type="button"
                    className="text-white  dark:text-black dark:bg-white bg-black md:text-base font-bold text-xs border-2 xl:ml-6 max-md:mx-0 max-lg:mx-8 max-sm:mt-6  lg:mt-10 mt-8 border-black px-5 py-3 w-40 max-[400px]:text-xs max-[400px]:p-2 rounded-3xl"
                  >
                    Consult Lawyer
                  </button>
                  </div>
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
                    className="max-w-full  p-3 lg:ml-0"
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

import React, { useState } from "react";
import LawyerGif from "/Lawyer.gif";

const Hero = () => {
  return (
    <>
      {/* <div className="relative max-[400px]:px-2 p-6     w-full flex justify-center bg-white  dark:bg-dark ">
        <div className="container">
          <div className="- flex justify-center max-lg:flex-col-reverse  max-lg:border border-black rounded-xl flex-wrap">
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
      </div> */}

<div
  className="relative overflow-hidden bg-white dark:bg-gray-900 dark:text-gray-100"
>
  {/* <header id="page-header" className="relative flex flex-none items-center py-8">
    <div
      className="container mx-auto flex flex-col gap-4 px-4 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-0 lg:px-8 xl:max-w-7xl"
    >
      <div>
        <a
          href="javascript:void(0)"
          className="group inline-flex items-center gap-2 text-lg font-bold tracking-wide text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
        >
          <svg
            className="hi-mini hi-cube-transparent inline-block size-5 text-teal-600 transition group-hover:scale-110 dark:text-teal-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M9.638 1.093a.75.75 0 01.724 0l2 1.104a.75.75 0 11-.724 1.313L10 2.607l-1.638.903a.75.75 0 11-.724-1.313l2-1.104zM5.403 4.287a.75.75 0 01-.295 1.019l-.805.444.805.444a.75.75 0 01-.724 1.314L3.5 7.02v.73a.75.75 0 01-1.5 0v-2a.75.75 0 01.388-.657l1.996-1.1a.75.75 0 011.019.294zm9.194 0a.75.75 0 011.02-.295l1.995 1.101A.75.75 0 0118 5.75v2a.75.75 0 01-1.5 0v-.73l-.884.488a.75.75 0 11-.724-1.314l.806-.444-.806-.444a.75.75 0 01-.295-1.02zM7.343 8.284a.75.75 0 011.02-.294L10 8.893l1.638-.903a.75.75 0 11.724 1.313l-1.612.89v1.557a.75.75 0 01-1.5 0v-1.557l-1.612-.89a.75.75 0 01-.295-1.019zM2.75 11.5a.75.75 0 01.75.75v1.557l1.608.887a.75.75 0 01-.724 1.314l-1.996-1.101A.75.75 0 012 14.25v-2a.75.75 0 01.75-.75zm14.5 0a.75.75 0 01.75.75v2a.75.75 0 01-.388.657l-1.996 1.1a.75.75 0 11-.724-1.313l1.608-.887V12.25a.75.75 0 01.75-.75zm-7.25 4a.75.75 0 01.75.75v.73l.888-.49a.75.75 0 01.724 1.313l-2 1.104a.75.75 0 01-.724 0l-2-1.104a.75.75 0 11.724-1.313l.888.49v-.73a.75.75 0 01.75-.75z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Company</span>
        </a>
      </div>
      <nav className="space-x-3 md:space-x-6">
        <a
          href="javascript:void(0)"
          className="text-sm font-semibold text-gray-900 hover:text-teal-600 dark:text-gray-100 dark:hover:text-teal-400"
        >
          <span>Features</span>
        </a>
        <a
          href="javascript:void(0)"
          className="text-sm font-semibold text-gray-900 hover:text-teal-600 dark:text-gray-100 dark:hover:text-teal-400"
        >
          <span>Pricing</span>
        </a>
        <a
          href="javascript:void(0)"
          className="text-sm font-semibold text-gray-900 hover:text-teal-600 dark:text-gray-100 dark:hover:text-teal-400"
        >
          <span>Support</span>
        </a>
      </nav>
    </div>
  </header> */}

  <div
    className="container relative mx-auto flex flex-col gap-16 px-4 py-16 text-center lg:flex-row lg:gap-0 lg:px-8 lg:py-32 lg:text-left xl:max-w-7xl"
  >
    <div className="lg:flex lg:w-1/2 lg:items-center">
      <div>
        {/* <div
          className="mb-2 inline-flex rounded border border-gray-200 bg-gray-100 px-2 py-1 text-sm font-medium leading-4 text-gray-800 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-200"
        >
          v6.0 Latest Version
        </div> */}
        <h1 className="mb-4 text-4xl max-[400px]:hidden font-black text-black dark:text-white">
        Legal Advice Online 
          <span className="text-black dark:text-black">&nbsp;From Top Lawyers</span>
        </h1>
        <h1 className="mb-4 text-4xl hidden max-[400px]:flex flex-col font-black text-black dark:text-white">
          <span>Legal Advice Online</span> 
          <span className="text-black dark:text-black">&nbsp;From Top Lawyers</span>
        </h1>
        <h2
          className="xl:text-base sm:text-sm text-xs font-medium leading-relaxed text-gray-600 dark:text-gray-300"
        >
          Super fast and easy to use software to power your next idea or build
          your client’s web projects. Get it today and profit.
        </h2>
        <div
          className="flex flex-col justify-center gap-2 pb-16 pt-10 sm:flex-row sm:items-center lg:justify-start"
        >
          {/* teal-600 */}
          <a
            href="javascript:void(0)"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-black bg-black px-7 py-3.5 font-semibold leading-6 text-white hover:border-black hover:bg-black hover:text-white focus:ring focus:ring-teal-400/50 active:border-teal-700 active:bg-teal-700 dark:focus:ring-teal-400/90"
          >
           
            <span>Consult Lawyer</span>
          </a>
          {/* <a
            href="javascript:void(0)"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-7 py-3.5 font-semibold leading-6 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300/25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-transparent dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600/40 dark:active:border-gray-700"
          >
            <span>Learn more</span>
          </a> */}
        </div>
      </div>
    </div>
    <div className="lg:ml-16 lg:flex lg:w-1/2 lg:items-center lg:justify-center">
      <div className="relative mx-5 lg:w-96">
        <div
          className="bg-tranparent absolute left-0 top-0 -ml-20 -mt-16 size-40 rounded-full border border-black dark:border-black lg:size-72"
        ></div>
        <div
          className="bg-tranparent absolute left-0 top-0 -ml-14 -mt-20 size-40 rounded-full border border-slate-900 dark:border-black lg:size-72"
        ></div>
        <div
          className="bg-tranparent absolute bottom-0 right-0 -mb-16 -mr-20 size-40 rounded-full border border-black dark:border-black lg:size-72"
        ></div>
        <div
          className="bg-tranparent absolute bottom-0 right-0 -mb-20 -mr-14 size-40 rounded-full border border-slate-900 dark:border-black lg:size-72"
        ></div>
        <div
          className="absolute inset-0 -m-6 -rotate-2 rounded-xl bg-gray-200 dark:bg-gray-800"
        ></div>
        <div
          className="absolute inset-0 -m-6 rotate-1 rounded-xl bg-black/75 shadow-inner dark:bg-black/75"
        ></div>
        <img
          src={LawyerGif}
          className="relative mx-auto rounded-lg shadow-lg"
          alt="Hero Image"
        />
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default Hero;

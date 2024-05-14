import React from "react";
import { Link } from "react-router-dom";

const PlansFrontView: React.FC = () => {
  return (
    <>
      <div className="px-4  rounded-3xl mt-10 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              Pricing Plans
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              {/* <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="7e5e8ff8-1960-4094-a63a-2a0c0f922d69"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#7e5e8ff8-1960-4094-a63a-2a0c0f922d69)"
                width="52"
                height="24"
              />
            </svg> */}
              <span className="relative">Transparent</span>
            </span>{" "}
            Pricing...
          </h2>
          <p className="text-xs font-semibold text-gray-700 md:text-sm">
            Discover different pricing options designed to scale with your needs
            .Select the plan that best suits your requirements and start or
            upgrade effortlessly.
          </p>
        </div>
        <div className="grid mx-auto  max-w-md gap-10 row-gap-5 lg:max-w-screen-lg sm:row-gap-10 lg:grid-cols-3 xl:max-w-screen-lg sm:mx-auto">
          <div className="flex flex-col justify-between p-8 max-[400px]:p-2 transition-shadow duration-300 bg-white border rounded-3xl shadow-sm sm:items-center hover:shadow">
            <div className="text-center">
              {/* <div className="text-lg font-semibold">Start</div> */}
              <div className="flex items-center justify-center mt-2">
                <div className="mr-1 max-[400px]:text-2xl text-5xl font-bold">
                  Weekly
                </div>
              </div>
              <div className="mt-2 space-y-3 flex flex-col items-center justify-center py-6">
                <div className="text-gray-700 w-[70%] text-xs font-medium">
                  choose a weekly plan based on your requirement
                </div>
                <div className="text-gray-700 text-xs font-medium">
                  - Video Consultation
                </div>
                <div className="text-gray-700 text-xs font-medium">
                  - 24*7 Messaging
                </div>
              </div>
            </div>
            <div>
              <Link
                to="/"
                className="inline-flex text-sm items-center justify-center w-full h-12 px-6 mt-6 font-semibold tracking-wide text-white transition duration-200 bg-gray-800 rounded-full shadow-md hover:bg-gray-900 focus:shadow-outline focus:outline-none"
              >
                Subscribe
              </Link>
            </div>
            <p className="max-w-xs max-[400px]:hidden mx-auto mt-6 font-medium text-xs text-gray-600 sm:text-xs sm:text-center sm:max-w-sm sm:mx-auto">
              Available Lawyers and Their prices listed here
            </p>
          </div>
          <div className="flex flex-col justify-between p-8 max-[400px]:p-2 transition-shadow duration-300 bg-white border rounded-3xl shadow-sm sm:items-center hover:shadow">
            <div className="text-center">
              {/* <div className="text-lg font-semibold">Start</div> */}
              <div className="flex items-center justify-center mt-2">
                <div className="mr-1 max-[400px]:text-2xl text-5xl font-bold">
                  Monthly
                </div>
              </div>
              <div className="mt-2 space-y-3 flex justify-center flex-col items-center py-6">
                <div className="text-gray-700 w-[70%] text-xs  font-medium">
                  choose a montly plan based on your requirement
                </div>
                <div className="text-gray-700 text-xs  font-medium">
                  - Video Consultation
                </div>
                <div className="text-gray-700 text-xs font-medium">
                  - 24*7 Messaging
                </div>
              </div>
            </div>
            <div>
              <Link
                to="/"
                className="inline-flex text-sm items-center justify-center w-full h-12 px-6 mt-6 font-semibold tracking-wide text-white transition duration-200 bg-gray-800 rounded-full shadow-md hover:bg-gray-900 focus:shadow-outline focus:outline-none"
              >
                Subscribe
              </Link>
            </div>
            <p className="max-w-xs max-[400px]:hidden mx-auto mt-6 font-medium text-xs text-gray-600 sm:text-xs sm:text-center sm:max-w-sm sm:mx-auto">
              Available Lawyers and Their prices listed here
            </p>
          </div>
          <div className="flex flex-col justify-between p-8 max-[400px]:p-2 transition-shadow duration-300 bg-white border rounded-3xl shadow-sm sm:items-center hover:shadow">
            <div className="text-center">
              {/* <div className="text-lg font-semibold">Start</div> */}
              <div className="flex items-center justify-center mt-2">
                <div className="mr-1 max-[400px]:text-2xl text-5xl font-bold">
                  Yearly
                </div>
              </div>
              <div className="mt-2 space-y-3 flex flex-col items-center justify-center py-6">
                <div className="text-gray-700 w-[70%] text-xs font-medium">
                  choose a yearly plan based on your requirement
                </div>
                <div className="text-gray-700 text-xs font-medium">
                  - Video Consultation
                </div>
                <div className="text-gray-700 text-xs font-medium">
                  - 24*7 Messaging
                </div>
              </div>
            </div>
            <div>
              <Link
                to="/"
                className="inline-flex text-sm items-center justify-center w-full h-12 px-6 mt-6 font-semibold tracking-wide text-white transition duration-200 bg-gray-800 rounded-full shadow-md hover:bg-gray-900 focus:shadow-outline focus:outline-none"
              >
                Subscribe
              </Link>
            </div>
            <p className="max-w-xs mx-auto max-[400px]:hidden mt-6 text-xs font-medium text-gray-600 sm:text-xs sm:text-center sm:max-w-sm sm:mx-auto">
              Available Lawyers and Their prices listed here
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlansFrontView;

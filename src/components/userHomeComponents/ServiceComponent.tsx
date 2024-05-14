import React from "react";
import Service1 from "/service1.gif";
import Service2 from "/service2.gif";
import Service3 from "/service3.gif";

const Content: React.FC = () => {
  return (
    <>
      <div className="px-4  bg-[#f2f4fb] rounded-xl py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div></div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-5xl md:mx-auto">
            <span className="relative inline-block">
              {/* <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="2feffae2-9edf-414e-ab8c-f0e6396a0fc1"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#2feffae2-9edf-414e-ab8c-f0e6396a0fc1)"
                width="52"
                height="24"
              />
            </svg> */}
              <span className="relative">Our</span>
            </span>{" "}
            Range of Services
          </h2>
          <p className="text-xs font-semibold text-gray-700 md:text-sm">
            Get timely Legal Updates, personalized Consultations, and expert
            Legal Advice tailored to your needs. Stay informed, get guidance,
            and resolve legal issues with confidence.
          </p>
        </div>
        <div className="grid max-w-screen-lg gap-8 lg:grid-cols-2 sm:mx-auto">
          <div className="grid grid-cols-2  gap-5">
            <img
              className="object-contain  bg-white border-gray-600 border-opacity-20  w-full h-56 col-span-2 rounded shadow-md"
              src={Service1}
              alt=""
            />
            <img
              className="object-contain  bg-white border-gray-600 border-opacity-20 w-full h-48 rounded shadow-md"
              src={Service2}
              alt=""
            />
            <img
              className="object-contain  bg-white border-gray-600 border-opacity-20 w-full h-48 rounded shadow-md"
              src={Service3}
              alt=""
            />
          </div>
          <div className="flex  flex-col justify-center">
            <div className="pb-4  mb-4 border-b">
              <h6 className="mb-5 text-xl font-bold leading-5">Legal Advice</h6>
              <p className="text-sm  text-gray-900">
                Offer general or specific legal advice on various legal matters
                such as family law, business law, immigration law, etc.
              </p>
            </div>
            <div className="pb-4 mb-4 border-b">
              <h6 className="mb-5 text-xl font-bold leading-5">
                Consultations
              </h6>
              <p className="text-sm  text-gray-900">
                Facilitate one-on-one consultations between clients and lawyers
                via video calls or chat sessions to discuss legal issues and
                receive guidance.
              </p>
            </div>
            <div>
              <h6 className="mb-5 font-bold text-xl leading-5">
                Legal Updates
              </h6>
              <p className="text-sm  text-gray-900">
                Keep users informed about changes in laws, regulations, and
                legal precedents relevant to their areas of interest or another
                informations through the blog.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;

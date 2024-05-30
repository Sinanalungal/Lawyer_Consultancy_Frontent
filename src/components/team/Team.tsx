import React from "react";
import { Link } from "react-router-dom";
import "./Team.css";

const TeamSection = ({ teamMembers }) => {
  return (
    <div className="px-4  rounded-lg py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <hr className="border-t-2 border-gray-300 mb-6" />
        <h2 className="legal-professionals max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          Your Dedicated Legal Professionals
        </h2>
        <hr className="border-t-2 border-gray-300 mb-6" />
        <p className="text-xs text-gray-700 md:text-sm">
          Our team of experienced lawyers is committed to providing exceptional
          legal services tailored to your unique needs.
        </p>
      </div>

      <div className="flex justify-end mb-8">
        <Link to="lawyer-list">
          <p className="text-xs  font-semibold bg-black text-white p-2 rounded-md">
            view all lawyers
          </p>
        </Link>
      </div>
      <div className="flex justify-center gap-10">
        {teamMembers.map((member, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/4">
            <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
              <img
                className="absolute object-cover w-full h-full rounded"
                src={member.imgUrl}
                alt={member.name}
              />
            </div>
            <div className="flex flex-col sm:text-center">
              <p className="text-lg font-bold">{member.name}</p>
              <p className="mb-5 text-xs text-gray-800">{member.experience}</p>
              <p className="mb-5 text-xs text-gray-600">{member.description}</p>
              <p className="mb-5 text-xs text-gray-600">{member.button}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;

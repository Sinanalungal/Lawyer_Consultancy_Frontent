import React, { useEffect, useState } from "react";
import { getAxiosInstance } from "../../services/axiosInstance/AxiosInstance";
import { BASE_URL } from "../../constants";

function LawyerList() {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedExperience, setSelectedExperience] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [lawyers, setLawyers] = useState([]);
  
    useEffect(() => {
      async function fetchDepartmentData() {
        try {
          const axiosInstance = await getAxiosInstance();
          const response = await axiosInstance.get(`${BASE_URL}api/departments/`);
          setDepartments(response.data);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchDepartmentData();
      window.scrollTo(0, 0);
    }, []);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        fetchLawyers();
      }, 500);
  
      return () => {
        clearTimeout(timer);
      };
    }, [selectedDepartment, selectedExperience, searchQuery]);
  
    async function fetchLawyers() {
      try {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.get(`${BASE_URL}api/filter-lawyer/`, {
          params: {
            department_name: selectedDepartment,
            experience: selectedExperience,
            search_term: searchQuery
          },
        });
        setLawyers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full p-5 sm:p-10 rounded-lg bg-white">
        <div className="relative">
          <div className="absolute flex items-center ml-2 h-full">
            <svg
              className="w-4 h-4 fill-current text-primary-gray-dark"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by names, departments, experience..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="font-medium">Filters</p>
          <button
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
            onClick={() => {
              setSelectedDepartment("");
              setSelectedExperience("");
            }}
          >
            Reset Filter
          </button>
        </div>

        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            <select
              className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">Departments</option>
              {departments.map((department) => (
                <option key={department.id} value={department.department_name}>
                  {department.department_name}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
            >
              <option value="">Experience</option>
              <option value="<5">Less Than 5 years</option>
              <option value="5-10">Inbetween 5-10 years</option>
              <option value=">10">More Than 10 Years</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4 w-full items-center   rounded-xl bg-white px-8 sm:col-span-2 min-h-[400px]">
        {lawyers.map((lawyer) => (
          <div key={lawyer.id} className="w-full p-2 sm:p-12  border rounded-xl dark:bg-gray-50 dark:text-gray-800">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              <img
                src={`${BASE_URL}${lawyer.profile}`}
                alt=""
                className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-300"
              />
              <div className="flex flex-col w-full">
                <h4 className="text-lg font-semibold text-center md:text-left">
                  {lawyer.full_name}
                </h4>
                <div className="flex py-[1px] text-sm">
                  <p className="font-semibold">Experience:&nbsp;</p>
                  <p>{lawyer.experience} years</p>
                </div>
                <div className="flex py-[1px] text-sm">
                  <p className="font-semibold">Departments:&nbsp;</p>
                  <div className="flex flex-wrap gap-1">
                    {lawyer.departments.map((department, index) => (
                      <p
                        key={index}
                        className="bg-gray-300 whitespace-nowrap max-[400px]:text-[7px] text-[11px] p-1 rounded-md"
                      >
                        {department.department_name}
                      </p>
                    ))}
                  </div>
                </div>
                <p className="dark:text-gray-600 text-sm">
                  {lawyer.description}
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-1">
                <p className="text-xs p-1 bg-slate-800 rounded-md text-center text-white">
                  Take A Session
                </p>
                <p className="text-xs p-1 border border-slate-800 rounded-md text-center text-black">
                  Chat
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LawyerList;

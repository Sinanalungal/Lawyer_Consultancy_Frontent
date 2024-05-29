import React, { useEffect, useState } from "react";
import "./Homepage.css";
import Hero from "./MainHeader";
import Stories from "../../../components/stories/Stories";
import { getAxiosInstance } from "../../../services/axiosInstance/AxiosInstance";
import { BASE_URL } from "../../../constants";
import Marquee from "react-fast-marquee";
import TeamSection from "../../../components/team/Team";

const Homepage: React.FC = () => {
  const [lawyers, setLawyers] = useState([]);
  useEffect(() => {
    async function fetchLawyerData() {
      try {
        const axiosInstance =await getAxiosInstance();
        const response = await axiosInstance.get(`${BASE_URL}api/lawyer-list/`);
        setLawyers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLawyerData();
  }, []);
  const teamMembers =
    lawyers?.map((member) => ({
      name: member.full_name,
      experience: `${member.experience} years experience`,
      description: member.description,
      imgUrl: `${BASE_URL}${member.profile}`,
      button: (
        <div className="bg-slate-900 cursor-pointer inline-block p-2 rounded-md text-white">
          Take a session
        </div>
      ),
    })) ;

  return (
    // <div className="homepage">
    //     <Navbar/>
    //     <div className=" homepage_elements max-sm:hidden dark:bg-black items-center relative max-lg:h-[420px] h-[600px]" style={{ backgroundImage: `url("./homepageimg.png")`, backgroundSize: "contain", backgroundRepeat: 'no-repeat', backgroundPositionX: 'right', width: "100%" }}>
    //         <div className="h-[80%] md:w-[60%] sm:w-[65%] dark:text-white flex flex-col justify-center">
    //             <h1 className="font-bold text-5xl bg-white dark:bg-black  mt-4 xl:text-7xl px-6 md:px-24">Legal Advice Online From Top Lawyers</h1>
    //             <button type="button" className="text-white  dark:text-black dark:bg-white bg-black md:text-base font-bold text-xs border-2 mx-6 md:mx-24 lg:mt-10 mt-5 border-black px-5 py-3 w-40 rounded-3xl">Consult Lawyer</button>
    //         </div>
    //         {/* <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white dark:from-black via-transparent to-transparent"></div> */}

    //     </div>

    //     {/* <div className="homepage_elements sm:hidden dark:bg-black items-center relative" style={{ width: "100%" }}>
    //         <div className="h-[80%] w-[100%] flex flex-col justify-center py-6">
    //             <h1 className="font-extrabold dark:bg-black dark:text-white text-4xl lg:text-5xl xl:text-7xl px-6 md:px-24">Legal Advice Online From Top Lawyers</h1>
    //             <div className="w-full dark:bg-black relative" style={{ backgroundImage: `url("Homepage-mobile.png")`, backgroundSize: "cover", backgroundRepeat: 'no-repeat', backgroundPositionX: 'right', width: "100%", height: "600px" }}>
    //                 <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white dark:from-black via-transparent to-transparent"></div>
    //             </div>
    //             <button type="button" className="text-white  dark:bg-white dark:text-black bg-black md:text-base  font-bold text-xs border-2 mx-6 md:mx-24 border-black px-5 py-3 w-40 rounded-3xl">Consult Lawyer</button>
    //         </div>
    //     </div> */}
    //     <div className='sm:hidden'>
    //     <Header/>
    //     </div>
    //     <Content/>
    //     <div className=" "></div>
    // </div>

    // <div className="homepage">
    //         <Navbar/>
    //         <div className='w-full px-4  flex flex-col-reverse md:flex-row md:h-[600px]  items-center justify-center'>
    //             <div className='w-full md:w-1/2 flex flex-col justify-center  max-md:py-10'>
    //                 <h1 className="font-bold text-5xl xl:text-7xl bg-white dark:bg-black mt-4 px-6 md:px-24">Legal Advice Online From Top Lawyers</h1>
    //                 <button type="button" className="text-white dark:text-black dark:bg-white bg-black md:text-base font-bold text-xs border-2 mx-6 md:mx-24 lg:mt-10 mt-5 border-black px-5 py-3 w-40 rounded-3xl">Consult Lawyer</button>
    //             </div>
    //             <div className='w-full md:w-1/2 h-full flex items-center'>
    //                 <img src={LawyerGif} className='object-cover' alt="" />
    //             </div>
    //         </div>

    //      <Content/>
    //      <div className=" "></div>
    // </div>
    <>
      {/* <Headers />
      <div className="homepage  flex flex-col justify-center items-center">
        <div className=" w-full px-4 flex flex-col-reverse md:flex-row md:h-[600px] items-center justify-center">
          <div className="2xl:px-auto w-full  md:w-1/2 flex flex-col justify-center max-md:py-10">
            <h1 className="font-bold text-5xl xl:text-7xl  bg-white dark:bg-black mt-4 px-6 md:px-24">
              Legal Advice Online From Top Lawyers
            </h1>
            <button
              type="button"
              className="text-white dark:text-black dark:bg-white bg-black md:text-base font-bold text-xs border-2 mx-6 md:mx-24 lg:mt-10 mt-5 border-black px-5 py-3 w-40 rounded-3xl"
            >
              Consult Lawyer
            </button>
          </div>
          <div className="w-full md:w-1/2 2xl:w-auto h-full flex items-center justify-center max-w-[500px] mx-auto"> {/* Added max-width and mx-auto */}
      {/* <img
              src={LawyerGif}
              className="object-cover h-[500px] w-[100%] md:h-auto md:w-auto" // Set specific height and width for the image
              alt="Lawyer Image"
            /> */}
      {/* </div>
        </div>
        <Content />
        <div className=""></div>
      </div> */}
      <Hero />

      <TeamSection teamMembers={teamMembers} />

      {/* <Content/> */}
      <div className="max-w-xl  max-sm:mb-0 mb-10 mt-10 max-md:p-4 p-2 mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div></div>
        <h2 className="max-w-lg mb-6  font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-5xl md:mx-auto">
          <span className="relative inline-block">
            <span className="relative">Our</span>
          </span>{" "}
          Range of Services
        </h2>
        <p className="text-xs font-semibold text-gray-700 md:text-sm">
          Get timely Legal Updates, personalized Consultations, and expert Legal
          Advice tailored to your needs. Stay informed, get guidance, and
          resolve legal issues with confidence.
        </p>
      </div>

      <div className="container mx-auto p-4 lg:px-40 py-12 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="p-4 lg:p-12 rounded-2xl overflow-hidden bg-blue-50">
            <h2 className="mt-4 text-3xl font-semibold max-[400px]:text-xl max-lg:text-2xl text-slate-800">
              Legal Advice
            </h2>

            <p className="mt-4 text-base max-sm:text-sm max-[400px]:text-xs max-lg:text-sm text-slate-600">
              Offer general or specific legal advice on various legal matters
              such as family law, business law, immigration law, etc.
            </p>

            <div className="mt-12 flex justify-center items-center hover:scale-125 transform ease-in-out duration-150 transition-transform">
              <img
                src="/Lawyer-rafiki.svg"
                className="w-[300px] h-auto"
                alt="Description of image"
              />
            </div>
          </div>

          <div className="p-4 lg:p-12 rounded-2xl overflow-hidden bg-pink-50">
            
            <h2 className="mt-4 text-3xl max-[400px]:text-xl font-semibold max-lg:text-2xl text-slate-800">
              Consultations
            </h2>

            <p className="mt-4 text-base max-sm:text-sm max-[400px]:text-xs max-lg:text-sm text-slate-600">
              Facilitate one-on-one consultations between clients and lawyers
              via video calls or chat sessions to discuss legal issues and
              receive guidance.
            </p>

            <div className="mt-12 flex justify-center items-center hover:scale-125 transform ease-in-out duration-150 transition-transform">
              <img
                src="/Law firm-bro (1).svg"
                className="w-[300px] h-auto"
                alt="Description of image"
              />
            </div>
          </div>

          <div className="p-4 lg:p-12 rounded-2xl overflow-hidden bg-green-50">
            

            <h2 className="mt-4 text-3xl max-[400px]:text-xl font-semibold max-lg:text-2xl text-slate-800">
              Legal Updates
            </h2>

            <p className="mt-4 text-base max-sm:text-sm max-[400px]:text-xs max-lg:text-sm text-slate-600">
              Keep users informed about changes in laws, regulations, and legal
              precedents relevant to their areas of interest or another
              informations through the blog.
            </p>

            <div className="mt-12 flex justify-center items-center hover:scale-125 transform ease-in-out duration-150 transition-transform">
              <img
                src="/Law firm-pana.svg"
                className="w-[300px] h-auto"
                alt="Description of image"
              />
            </div>
          </div>

          <div className="p-4 lg:p-12 rounded-2xl overflow-hidden bg-purple-50">
            

            <h2 className="mt-4 text-3xl max-[400px]:text-xl font-semibold max-lg:text-2xl text-slate-800">
              Mediation Services
            </h2>

            <p className="mt-4 text-base max-sm:text-sm max-[400px]:text-xs max-lg:text-sm text-slate-600">
              Help clients resolve conflicts amicably with a neutral mediator,
              reducing the need for court intervention.
            </p>

            <div className="mt-12 flex justify-center items-center hover:scale-125 transform ease-in-out duration-150 transition-transform">
              <img
                src="/Lawyer-bro.svg"
                className="w-[300px] h-auto"
                alt="Description of image"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className='border border-opacity-30'></div> */}
      {/* <PlansFrontView/> */}
      <div className="w-full p-6  2xl:container mx-auto  flex flex-col items-center  rounded-xl overflow-hidden">
        <div className="flex flex-col border-t border-b py-5 items-center space-y-2 justify-center">
          <p className="text-2xl font-medium">Success Stories</p>
          <p className="text-4xl font-bold">To Know About Our Lawyers</p>
        </div>
        <div className="flex py-16 ">
          <div className="stories-container   ">
            <Marquee>
              <Stories
                text={
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sit similique recusandae tempora quas at aperiam voluptatum blanditiis nostrum officia rem, atque quod, dignissimos fuga consequatur, iusto hic doloribus eaque."
                }
              />
              <Stories
                text={
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sit similique recusandae tempora quas at aperiam voluptatum blanditiis nostrum officia rem, atque quod, dignissimos fuga consequatur, iusto hic doloribus eaque.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sit similique recusandae tempora quas at aperiam voluptatum blanditiis nostrum officia rem, atque quod, dignissimos fuga consequatur, iusto hic doloribus eaque."
                }
              />
              <Stories
                text={
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sit similique recusandae tempora quas at aperiam voluptatum blanditiis nostrum officia rem, atque quod, dignissimos fuga consequatur, iusto hic doloribus eaque."
                }
              />
              <Stories
                text={
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sit similique recusandae tempora quas at aperiam voluptatum blanditiis nostrum officia rem, atque quod, dignissimos fuga consequatur, iusto hic doloribus eaque."
                }
              />
              <Stories
                text={
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sit similique recusandae tempora quas at aperiam voluptatum blanditiis nostrum officia rem, atque quod, dignissimos fuga consequatur, iusto hic doloribus eaque."
                }
              />
            </Marquee>

          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;

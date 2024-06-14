import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Hero from "../user/Home/MainHeader";
import Content from "../../components/userHomeComponents/ServiceComponent";
import PlansFrontView from "../../components/plans/PlansFrontView";
import Stories from "../../components/stories/Stories";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import { logout } from "../../redux/slice/LoginActions";
import TeamSection from "../../components/team/Team";
import Marquee from "react-fast-marquee";
import { getAxiosInstance } from "../../services/axiosInstance/AxiosInstance";
import { BASE_URL, ImgBackendUrl } from "../../constants";
import axios from "axios";
import "../../components/team/Team.css";


const LandingPage: React.FC = () => {
  const { registered } = useSelector((state: any) => state.register);
  const { isAuthenticated } = useSelector((store: any) => store.login);
  const [lawyers, setLawyers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const RoleGetting = (authTokens: any) => {
    if (authTokens) {
      const tokens = JSON.parse(authTokens);
      const { access } = tokens;

      const tokenParts = access.split(".");
      if (tokenParts.length !== 3) {
        console.error("Invalid token format");
      } else {
        const encodedPayload = tokenParts[1];
        const decodedPayload = atob(encodedPayload);
        const payload = JSON.parse(decodedPayload);
        const { role } = payload;
        console.log("Role:", role);
        return role;
      }
    } else {
      console.error("No authTokens found in localStorage");
      return null;
    }
  };
  useEffect(() => {
    if (registered) {
      navigate("/register");
    }
    // if(isAuthenticated){
    const authTokens = localStorage.getItem("authTokens");
    console.log(authTokens);

    if (isAuthenticated && authTokens) {
      const role_of_user = RoleGetting(authTokens);
      console.log(role_of_user);

      if (role_of_user == "user") {
        navigate("/user");
      } else if (role_of_user == "lawyer") {
        navigate("/lawyer");
      } else if (role_of_user == "admin") {
        navigate("/admin");
      }
    }

    if (!isAuthenticated || !authTokens) {
      dispatch(logout());
    }

    async function fetchLawyerData() {
      try {
        const response = await axios.get(`${BASE_URL}api/lawyer-list/`);
        setLawyers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLawyerData();
  }, []);

  const teamMembers = lawyers?.map((member) => ({
    name: member.full_name,
    experience: `${member.experience} years experience`,
    description: member.description,
    imgUrl: `${ImgBackendUrl}${member.profile}`,
    button: (
      <Link to={`user/user-session/${member.id}`}><div className="bg-slate-900 cursor-pointer inline-block p-2 rounded-md text-white">
        Take a session
      </div></Link>
    ),
  }));

  return (
    
    <>
      
      {!isAuthenticated && <Navbar />}
      <Hero />

      <TeamSection teamMembers={teamMembers} landing={true}/>

      {/* <Content/> */}
      <div className="max-w-xl max-sm:mb-0 mb-10 mt-10 max-md:p-4 p-2 mx-auto sm:text-center lg:max-w-2xl md:mb-12">
  <hr className="border-t-2 border-gray-300 mb-6" />
  <h2 className="max-w-lg mb-6 legal-professionals font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
    <span className="relative inline-block">
      <span className="relative">Our</span>
    </span>{" "}
    Range of Services
  </h2>
  <hr className="border-t-2 border-gray-300 mb-6" />
  <p className="text-xs text-gray-700 md:text-sm">
    Get timely Legal Updates, personalized Consultations, and expert Legal
    Advice tailored to your needs. Stay informed, get guidance, and
    resolve legal issues with confidence.
  </p>
</div>

<div className="container mx-auto p-4 lg:px-20 py-12 bg-white">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
    <div className="p-4 lg:p-8 rounded-xl overflow-hidden bg-slate-50">
      <h2 className="mt-4 text-2xl font-semibold max-[400px]:text-lg max-lg:text-xl text-slate-800">
        Legal Advice
      </h2>
      <p className="mt-4 text-sm max-sm:text-xs max-[400px]:text-xs max-lg:text-sm text-slate-600">
        Offer general or specific legal advice on various legal matters such as family law, business law, immigration law, etc.
      </p>
      <div className="mt-8 flex justify-center items-center hover:scale-110 transform ease-in-out duration-150 transition-transform">
        <img src="./Lawyer-rafiki.svg" className="w-[250px] h-auto" alt="Description of image" />
      </div>
    </div>

    <div className="p-4 lg:p-8 rounded-xl overflow-hidden bg-slate-50">
      <h2 className="mt-4 text-2xl font-semibold max-[400px]:text-lg max-lg:text-xl text-slate-800">
        Consultations
      </h2>
      <p className="mt-4 text-sm max-sm:text-xs max-[400px]:text-xs max-lg:text-sm text-slate-600">
        Facilitate one-on-one consultations between clients and lawyers via video calls or chat sessions to discuss legal issues and receive guidance.
      </p>
      <div className="mt-8 flex justify-center items-center hover:scale-110 transform ease-in-out duration-150 transition-transform">
        <img src="./Law firm-bro (2).svg" className="w-[250px]  h-auto" alt="Description of image" />
      </div>
    </div>

    <div className="p-4 lg:p-8 rounded-xl overflow-hidden bg-slate-50">
      <h2 className="mt-4 text-2xl font-semibold max-[400px]:text-lg max-lg:text-xl text-slate-800">
        Legal Updates
      </h2>
      <p className="mt-4 text-sm max-sm:text-xs max-[400px]:text-xs max-lg:text-sm text-slate-600">
        Keep users informed about changes in laws, regulations, and legal precedents relevant to their areas of interest or other information through the blog.
      </p>
      <div className="mt-8 flex justify-center items-center hover:scale-110 transform ease-in-out duration-150 transition-transform">
        <img src="./Law firm-pana (1).svg" className="w-[250px] h-auto" alt="Description of image" />
      </div>
    </div>

    <div className="p-4 lg:p-8 rounded-xl overflow-hidden bg-slate-50">
      <h2 className="mt-4 text-2xl font-semibold max-[400px]:text-lg max-lg:text-xl text-slate-800">
        Mediation Services
      </h2>
      <p className="mt-4 text-sm max-sm:text-xs max-[400px]:text-xs max-lg:text-sm text-slate-600">
        Help clients resolve conflicts amicably with a neutral mediator, reducing the need for court intervention.
      </p>
      <div className="mt-8 flex justify-center items-center hover:scale-110 transform ease-in-out duration-150 transition-transform">
        <img src="./Law firm-amico.svg" className="w-[250px] h-auto" alt="Description of image" />
      </div>
    </div>
  </div>
</div>

      {/* <div className='border border-opacity-30'></div> */}
      {/* <PlansFrontView/> */}
      <div className="w-full p-6  2xl:container mx-auto  flex flex-col items-center  rounded-xl overflow-hidden">
        <div className="flex flex-col border-t border-b py-5 items-center space-y-2 justify-center">
          <p className="text-2xl legal-professionals font-medium">Success Stories</p>
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

            {/* <Stories />
      <Stories />
      <Stories />
      <Stories /> */}
          </div>
        </div>
      </div>

      {!isAuthenticated && <Footer />}
    </>
  );
};

export default LandingPage;

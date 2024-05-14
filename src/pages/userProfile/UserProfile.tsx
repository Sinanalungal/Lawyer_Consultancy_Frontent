import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import SocialMediaCard from "../../components/userProfileComponents/SocialMediaCard";
import React, { ReactNode } from "react";

interface UserProfileProps {
  component: ReactNode;
  index: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ component, index }) => {
  const navigate = useNavigate();
 

  return (
    <>
      <Navbar />
      <div className="h-full max-[400px]:p-2 w-full p-6 mt-6 flex items-center flex-col justify-center">
        <SocialMediaCard />
      </div>
      <div className="w-full mx-auto p-4 flex text-xs sm:text-sm font-semibold max-md:flex-col sm:w-[80%] items-start rounded-lg">
        <div className="w-full flex-wrap max-[400px] justify-center flex sm:space-x-2 items-center">
          <div
            className={
              index === 1
                ? "bg-gray h-full px-6 py-2 rounded-full flex items-center justify-center bg-black text-white cursor-pointer transition-all duration-300 ease-in-out"
                : "cursor-pointer bg-gray h-full px-6 py-2 rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out"
            }
            onClick={() => navigate("../userprofile")}
          >
            Profile
          </div>
          <div
            className={
              index === 2
                ? "bg-gray h-full px-6 py-2 rounded-full flex items-center justify-center bg-black text-white cursor-pointer transition-all duration-300 ease-in-out"
                : "cursor-pointer bg-gray h-full px-6 py-2 rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out"
            }
            onClick={() => navigate("../userblog")}
          >
            Blogs
          </div>
        </div>
      </div>
      <div className="min-h-[500px]">{component}</div>
    </>
  );
};

export default UserProfile;

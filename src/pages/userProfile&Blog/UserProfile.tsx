import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import SocialMediaCard from "../../components/userProfileComponents/SocialMediaCard";
import React, { ReactNode, useEffect, useState } from "react";
import ProfileComponent from "./ProfileComponent";
import BlogContent from "./BlogContent";
import { FaCrown } from "react-icons/fa";
import { getAxiosInstance } from "../../services/axiosInstance/AxiosInstance";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../constants";
import Loader from "../../components/loader/loader";

// interface UserProfileProps {
//   component: ReactNode;
//   index: number;
// }
{/* <UserProfileProps></UserProfileProps> */}
const UserProfile: React.FC = () => {
  const [userDetails, setUserDetails] = useState({});
  // const navigate = useNavigate();
  const [index, setIndex] = useState(1);
  const [loader,setLoader] = useState(false)
  const { value } = useSelector((state: any) => state.login);
  const navigate = useNavigate()
  useEffect(() => {
    setLoader(true)
    const useDataCall = async () => {
      try {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.get(
          BASE_URL + `api/users/${value}/`
        );
        console.log(response.data);
        setUserDetails(response.data);
        setLoader(false)
      } catch (err) {
        console.log(err);
        setLoader(false)
      }
    };
    useDataCall();
    window.scrollTo(0, 0);

  }, []);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = (dropdownId: string) => {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
      setDropdownVisible(!dropdownVisible);
    }
  };

  return (
    <>
    {loader && <Loader width="w-full" height="min-h-screen" />}{" "}
    {!loader && (<>
    <div className="w-full mx-auto p-4 flex text-xs justify-end sm:text-sm font-semibold items-end max-md:flex-col sm:w-[80%]  rounded-lg">
    <div className="items-center space-x-1  flex text-left">
      
      <Link to='../../../../../../user/user-subscriptions/'><FaCrown size={30}  className="bg-yellow-500 rounded-md p-2"/></Link>
      <button
        id="dropdownMenuIconHorizontalButton"
        onClick={() => toggleDropdown('dropdownDotsHorizontal')}
        type="button"
        className="inline-flex items-center p-2 text-sm font-medium  text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >

        <svg 
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>

      {/* Dropdown menu 2 */}
      <div
        id="dropdownDotsHorizontal"
        className={`${
          dropdownVisible ? 'block' : 'hidden'
        } origin-top-right absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
          <li>
            <p onClick={()=>navigate('../saved-blogs')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Saved Blogs
            </p>
          </li>
          {/* <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Settings
            </a>
          </li> */}
          {/* <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Earnings
            </a>
          </li> */}
        </ul>
        {/* <div className="py-2">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Separated link
          </a>
        </div> */}
      </div>
    </div>
    </div>
      {/* <Navbar /> */}
      <div className=" max-[400px]:p-2 w-full p-6  flex items-center flex-col ">
        <SocialMediaCard
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
      </div>
      <div className="w-full mx-auto p-4 flex text-xs sm:text-sm font-semibold max-md:flex-col sm:w-[80%] items-start rounded-lg">
        <div className="w-full flex-wrap max-[400px] justify-center flex sm:space-x-2 items-center">
          <div
            className={
              index === 1
                ? "bg-gray h-full px-6 py-2 rounded-full flex items-center justify-center bg-black text-white cursor-pointer transition-all duration-300 ease-in-out"
                : "cursor-pointer bg-gray h-full px-6 py-2 rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out"
            }
            onClick={() => setIndex(1)}
          >
            Profile
          </div>
          <div
            className={
              index === 2
                ? "bg-gray h-full px-6 py-2 rounded-full flex items-center justify-center bg-black text-white cursor-pointer transition-all duration-300 ease-in-out"
                : "cursor-pointer bg-gray h-full px-6 py-2 rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out"
            }
            onClick={() => setIndex(2)}
          >
            Blogs
          </div>
        </div>
      </div>
      <div className="min-h-[500px]">
        {index == 1 ? (
          <ProfileComponent
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        ) : (
          <BlogContent />
        )}
      </div>
    </>)}
    </>
  );
};

export default UserProfile;

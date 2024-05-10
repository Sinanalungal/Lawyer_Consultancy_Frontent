import React from "react";
import { MdPassword,MdDriveFileRenameOutline } from "react-icons/md";
import UserProfile from "./UserProfile";


const ProfileComponent: React.FC = () => {
  return (
    <>
      <UserProfile index={1}
        component={
          <>
            <div className="w-[98%] mt-10 mx-auto  max-md:px-4 max-md:py-1 p-4 md:space-x-2 max-md:space-y-2 flex flex-col  md:grid md:grid-cols-2 text-sm font-semibold  sm:w-[80%] items-start  rounded-lg">
              <div className="w-full space-x-2 h-20 bg-gray-100 rounded-md flex items-center ">
                <div>
                  <svg
                    className="ml-2 max-[400px]:size-12"
                    width="63"
                    height="56"
                    viewBox="0 0 63 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <rect width="54" height="54" rx="8" fill="white" />
                    <rect
                      x="15"
                      y="15"
                      width="33"
                      height="26"
                      fill="url(#pattern0_66_2557)"
                    />
                    <g transform="translate(15, 17)">
                      <MdDriveFileRenameOutline size={22} />
                    </g>
                  </svg>
                </div>
                <div className="sm:text-sm text-xs w-full truncate font-semibold">
                  <div>Full Name</div>
                  <div>Muhamed Sinan</div>
                </div>
              </div>
              <div className="w-full h-20 space-x-1 bg-gray-100 rounded-md flex items-center">
                <div>
                  <svg
                    className="ml-2 max-w-[400px] h-10"
                    width="54"
                    height="54"
                    viewBox="0 0 54 54"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="54" height="54" rx="8" fill="white" />
                    <path
                      d="M32.9024 23.8516L28.4591 27.4646C27.6196 28.1306 26.4384 28.1306 25.5989 27.4646L21.1182 23.8516"
                      stroke="#1A162E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M31.9089 36C34.9502 36.0084 37 33.5095 37 30.4384V23.57C37 20.4988 34.9502 18 31.9089 18H22.0911C19.0498 18 17 20.4988 17 23.57V30.4384C17 33.5095 19.0498 36.0084 22.0911 36H31.9089Z"
                      stroke="#1A162E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="sm:text-sm text-xs w-full truncate font-semibold">
                  <div>Email</div>
                  <div>email@gmail.com</div>
                </div>
              </div>
              
            </div>
            <div className="w-[98%] md:mt-1 mx-auto   px-4 py-1 md:space-x-2 max-md:space-y-2 flex flex-col  md:grid md:grid-cols-2 text-sm font-semibold  sm:w-[80%] items-start  rounded-lg">
            <div className="w-full space-x-2 h-20 bg-gray-100 rounded-md flex items-center ">
                <div>
                  <svg
                    className="ml-2 max-[400px]:size-10"
                    width="54"
                    height="54"
                    viewBox="0 0 54 54"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="54" height="54" rx="8" fill="white" />
                    <path
                      d="M29.3525 17.5C33.0535 17.911 35.9775 20.831 36.3925 24.532"
                      stroke="#1A162E"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M29.3525 21.043C31.1235 21.387 32.5075 22.772 32.8525 24.543"
                      stroke="#1A162E"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M26.0315 27.4724C30.0205 31.4604 30.9254 26.8467 33.4653 29.3848C35.9138 31.8328 37.3222 32.3232 34.2188 35.4247C33.8302 35.737 31.3613 39.4943 22.6845 30.8197C14.0066 22.144 17.7616 19.6724 18.0739 19.2839C21.1838 16.1738 21.6668 17.5894 24.1154 20.0373C26.6541 22.5765 22.0425 23.4844 26.0315 27.4724Z"
                      stroke="#1A162E"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="sm:text-sm text-xs w-full truncate font-semibold">
                  <div>Phone Number</div>
                  <div>9207400638</div>
                </div>
              </div>
              <div className="w-full space-x-2 h-20 bg-gray-100 rounded-md flex items-center ">
                <div>
                  <svg
                    className="ml-2 max-[400px]:size-12"
                    width="63"
                    height="56"
                    viewBox="0 0 63 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <rect width="54" height="54" rx="8" fill="white" />
                    <rect
                      x="15"
                      y="15"
                      width="33"
                      height="26"
                      fill="url(#pattern0_66_2557)"
                    />
                    <g transform="translate(15, 17)">
                      <MdPassword size={22} />
                    </g>
                  </svg>
                </div>
                <div className="sm:text-sm text-xs w-full truncate font-semibold">
                  <div>Change Password</div>
                  {/* <div>9207400638</div> */}
                </div>
              </div>
              {/* <div className='w-full h-20 bg-gray-100 rounded-md flex items-center ' >
            <svg className='ml-2 max-[400px]:size-10' width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="54" height="54" rx="8" fill="white"/>
            <path d="M29.3525 17.5C33.0535 17.911 35.9775 20.831 36.3925 24.532" stroke="#1A162E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M29.3525 21.043C31.1235 21.387 32.5075 22.772 32.8525 24.543" stroke="#1A162E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.0315 27.4724C30.0205 31.4604 30.9254 26.8467 33.4653 29.3848C35.9138 31.8328 37.3222 32.3232 34.2188 35.4247C33.8302 35.737 31.3613 39.4943 22.6845 30.8197C14.0066 22.144 17.7616 19.6724 18.0739 19.2839C21.1838 16.1738 21.6668 17.5894 24.1154 20.0373C26.6541 22.5765 22.0425 23.4844 26.0315 27.4724Z" stroke="#1A162E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div> */}
            </div>
          </>
        }
      />
    </>
  );
};

export default ProfileComponent;

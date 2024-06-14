import React, { ReactElement, useState, lazy, Suspense, useEffect } from "react";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { RiDashboard3Fill } from "react-icons/ri";
import {  FaMoneyBill } from "react-icons/fa";
import { MdVideoLabel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { CgLogOut } from "react-icons/cg";
import Dropdown from "../../../components/dropdown/DropDown";
import { logout } from "../../../redux/slice/LoginActions";
import { FiLogOut } from 'react-icons/fi';
import {  useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";




function LawyerHome({ component, ind }:{ component: ReactElement, ind: number }) {
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isAuthenticated  } = useSelector((state: any) => state.login);
  useEffect(()=>{
    const authTokens = localStorage.getItem('authTokens');
    console.log(authTokens);
    
    if(!isAuthenticated && !authTokens){
      // window.location.href = '/login'
      navigate('/login')
    }
    
  },[isAuthenticated])

  interface Option {
    name: string;
    icon: ReactElement;
    route: string;
  }

  const options: Option[] = [
    {
      name: "Dashboard",
      icon: <RiDashboard3Fill size={30} />,
      route: "",
    },
    {
      name: "Scheduled Sessions",
      icon: <MdVideoLabel size={30} />,
      route: "sessions",
    },
    {
      name: "Subscription",
      icon: <FaMoneyBill size={30} />,
      route: "subscriptions",
    },
    {
      name: "Chat",
      icon: <IoIosChatboxes size={30} />,
      route: "chat",
    },
    {
      name: "Profile",
      icon: <FaUserCircle size={30} />,
      route: "profile",
    },
  
  ];

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false)
  };

  const handleSidebarToggle = () => {
    setOpen(!open);
  };

  const handleOptionClick = (route: string) => {
    setOpen(false);
    navigate(`../${route}`);
  };

  return (
    <>
      <div className="w-full h-screen flex ">
        {open && (
          <div className="w-full sm:hidden min-h-screen fixed transition-all ease-in-out duration-300 z-50 bg-white">
            <div className="w-full p-5 flex justify-end">
              <IoClose
                className="cursor-pointer"
                onClick={handleSidebarToggle}
                size={30}
              />
            </div>
            {options.map((option, index: number) => (
              <div
                key={index}
                onClick={() => {
                  handleOptionClick(option.route);
                }}
                className={`w-full h-16 flex justify-start items-center p-5 cursor-pointer
                         ${
                           ind === index
                             ? "bg-slate-700 text-white"
                             : "text-slate-800"
                         }`}
              >
                <span>{option.icon}</span>
                <span className="ml-3 font-semibold">{option.name}</span>
              </div>
            ))}
          </div>
        )}
        <div
          className={`${
            open ? "w-64" : "w-28 "
          } h-full z-40  transition-all ease-in-out duration-300  fixed flex justify-between flex-col max-sm:hidden shadow-md bg-slate-800`}
        >
          <div>
            <div className="h-[80px] w-full bg-slate-800"></div>
            {options.map((option, index) =>
              open ? (
                <div
                  key={index}
                  onClick={() => handleOptionClick(option.route)}
                  className={
                    ind == index
                      ? "w-full transition-all ease-in-out duration-300 bg-slate-500  shadow-lg h-16 flex justify-start text-white items-center p-5 cursor-pointer"
                      : "w-full  h-16 flex justify-start dark:text-white text-white items-center p-5 cursor-pointer"
                  }
                >
                  <span>{option.icon}</span>{" "}
                  <span className="ml-3  font-semibold">{option.name}</span>
                </div>
              ) : (
                <div
                  key={index}
                  onClick={() => handleOptionClick(option.route)}
                  className={
                    ind == index
                      ? "w-full  h-16 p-3 text-white bg-slate-500  shadow-xl flex items-center justify-center cursor-pointer"
                      : "w-full  h-16 p-3  text-white flex items-center justify-center cursor-pointer"
                  }
                >
                  {option.icon}
                </div>
              )
            )}
          </div>
          <div className="">
            {open ? (
              <div
                onClick={() => dispatch(logout())}
                className={
                  "w-full  h-20 flex justify-start dark:text-white text-white items-center p-5 cursor-pointer"
                }
              >
                <span>
                  <CgLogOut size={27} />
                </span>{" "}
                <span className="ml-3  font-semibold">Logout</span>
              </div>
            ) : (
              <div
                onClick={() => dispatch(logout())}
                className={
                  "w-full  h-20 p-3  text-white flex items-center justify-center cursor-pointer"
                }
              >
                <CgLogOut size={27} />
              </div>
            )}
          </div>
        </div>
        <div
          className={`${
            open ? "sm:ml-64" : "sm:ml-28"
          } transition-all ease-in-out duration-300 w-full min-h-screen flex flex-col  bg-white `}
        >
          <div className="w-full  fixed z-40 h-[80px] flex items-center bg-slate-800 shadow-sm text-white justify-between px-4">
            <TiThMenu
              className="cursor-pointer"
              onClick={handleSidebarToggle}
              size={30}
            />
            <div
              className={`${
                open ? "sm:mr-64" : "sm:mr-28"
              } flex items-center rounded-xl relative`}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="w-11 h-11 bg-white text-black flex justify-center items-center font-semibold mr-3 cursor-pointer rounded-full">L</div>
              {showDropdown && (
                <Dropdown component={
                  <>
                  {/* <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    <FaUserCircle  className="inline-block mr-2" size={20} />Lawyer Profile
                  </div> */}
                    <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                    <FiLogOut className="inline-block mr-2" size={20} />
                    Logout
                  </button>
                  
                 </>
                }/>
              )}
            </div>
          </div>

          <div className="w-full pt-[80px] bg-blend-saturation saturate-200 ">
            <Suspense fallback={<div>Loading...</div>}>{component}</Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

export default LawyerHome;

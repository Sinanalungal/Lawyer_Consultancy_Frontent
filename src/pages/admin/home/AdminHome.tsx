import React, { ReactElement, useState, lazy, Suspense, useEffect } from "react";
import { TiThMenu } from "react-icons/ti";
import { IoClose, IoNotificationsCircleSharp } from "react-icons/io5";
import { RiDashboard3Fill } from "react-icons/ri";
import { GoLaw } from "react-icons/go";
import { FaUsers, FaMoneyBill } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { CgLogOut } from "react-icons/cg";
import { ImBlog } from "react-icons/im";
import Dropdown from "../../../components/dropdown/DropDown";
import { logout } from "../../../redux/slice/LoginActions";
import { Route, useNavigate } from "react-router-dom";


function AdminHome({ component, ind }:{ component: ReactElement, ind: number }) {
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
      name: "Lawyers",
      icon: <GoLaw size={30} />,
      route: "lawyers-list",
    },
    {
      name: "Users",
      icon: <FaUsers size={30} />,
      route: "users-list",
    },
    {
      name: "Plans",
      icon: <FaMoneyBill size={30} />,
      route: "subscriptions",
    },
    {
      name: "Blogs",
      icon: <ImBlog size={30} />,
      route: "blogs",
    },
    {
      name: "Notifications",
      icon: <IoNotificationsCircleSharp size={30} />,
      route: "notification",
    },
  ];

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
          <div className="w-full fixed z-40 h-[80px] flex items-center bg-slate-800 shadow-sm text-white justify-between px-4">
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
              <div className="w-11 h-11 bg-black mr-3 cursor-pointer rounded-full"></div>
              {/* Dropdown */}
              {showDropdown && (
                <Dropdown onClose={() => setShowDropdown(false)} />
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

export default AdminHome;

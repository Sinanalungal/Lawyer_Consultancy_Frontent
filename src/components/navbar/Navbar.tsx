import React, { useState, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import Sidebar from "../sidebar/Sidebar";
import { BiMenuAltLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/LoginActions";


const Navbar: React.FC= ({ }) => {

  const [isFixed, setIsFixed] = useState(false);
  const { isAuthenticated, user } = useSelector((state: any) => state.login);
  const dispatch = useDispatch();
  const items = ['Home', 'About', 'Services', 'Contact'];
  const title ='My Website'

  useEffect(() => {
    const handleScroll = () => {
      const isNavbarFixed = window.scrollY > 10;
      setIsFixed(isNavbarFixed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const sidebarItems = [{ title: "Dashboard" }, { title: "Profile" }];

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div className="flex justify-center">
        <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        items={sidebarItems}
      />

      <nav
        className={`fixed 2xl:container  navbar dark:bg-black z-30 dark:text-white w-full flex md:text-base font-bold text-xs items-center  px-6 md:px-24 max-[400px]:justify-start  justify-between h-20 ${
          isFixed
            ? "fixed top-0 w-full bg-white dark:bg-white text-dark dark:text-black shadow-lg dark:shadow-gray-300 dark:shadow-sm z-40 transition-all duration-300 ease-in-out"
            : "bg-white"
        }`}
      >
        {/* <IoMenu className={`sm:hidden ${isFixed?'dark:text-black text-white':'text-dark dark:text-white'}`} size={33}/> */}
        <button
          className="sm:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <BiMenuAltLeft
              className={` ${
                isFixed
                  ? "dark:text-black text-white"
                  : "text-dark dark:text-white"
              }`}
              size={33}
            />
          ) : (
            <IoMenu
              className={`${
                isFixed
                  ? "dark:text-black text-black"
                  : "text-dark dark:text-white"
              }`}
              size={33}
            />
          )}
        </button>
        <div
          className={`navbar-brand ml-4 ${
            isFixed ? "dark:text-black text-dark" : "dark:text-white text-dark"
          }`}
        >
          {title}
        </div>
        {isAuthenticated && (<ul className="navbar-items max-sm:hidden flex mr-4 items-center">
          {items.map((item, index) => (
            <li
              key={index}
              className="ml-4 cursor-pointer text-sm font-semibold"
            >
              {item}
            </li>
          ))}
        </ul>)}
       <div className="max-[400px]:hidden"> {isAuthenticated && user != null ? (
          <button
            type="button"
            onClick={() => dispatch(logout())}
            className={` font-bold border-2 text-xs  px-5 py-2 rounded-3xl ${
              isFixed
                ? "dark:text-black text-dark dark:border-black border-black"
                : "dark:text-white  text-dark dark:border-white border-black"
            }`}
          >
            Logout
          </button>
        ) : <div className="space-x-1">
        
          <Link to={"/login"}>
            <button
              type="button"
              className={` font-bold border-2 text-xs  px-5 py-2 rounded-3xl ${
                isFixed
                  ? "dark:text-black text-dark dark:border-black border-black"
                  : "dark:text-white text-dark dark:border-white border-black"
              }`}
            >
              Login
            </button>
          </Link>
        
        
          <Link to={"/register"}>
            <button
              type="button"
              className={` font-bold border-2  text-xs  px-5 py-2 rounded-3xl ${
                isFixed
                  ? "dark:text-white bg-black dark:bg-black  text-white"
                  : "dark:text-white bg-black dark:border-white  text-white"
              }`}
            >
              Register
            </button>
          </Link>
        
        </div>
        }</div>
      </nav>
      <div className="h-20 w-full"></div>
      </div>
    </>
  );
};

export default Navbar;

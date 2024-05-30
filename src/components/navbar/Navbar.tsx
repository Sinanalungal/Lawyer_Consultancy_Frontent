import React, { useState, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import Sidebar from "../sidebar/Sidebar";
import { BiMenuAltLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/LoginActions";
import { CiLogin } from "react-icons/ci";

// const Navbar: React.FC= ({ }) => {

//   const [isFixed, setIsFixed] = useState(false);
//   const { isAuthenticated, user } = useSelector((state: any) => state.login);
//   const dispatch = useDispatch();
//   const items = ['Home', 'About', 'Services', 'Contact'];
//   const title ='My Website'

//   useEffect(() => {
//     const handleScroll = () => {
//       const isNavbarFixed = window.scrollY > 10;
//       setIsFixed(isNavbarFixed);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const sidebarItems = [{ title: "Dashboard" }, { title: "Profile" }];

//   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

//   const handleCloseSidebar = () => {
//     setIsSidebarOpen(false);
//   };

//   return (
//     <>
//       <div className="flex justify-center">
//         <Sidebar
//         isOpen={isSidebarOpen}
//         onClose={handleCloseSidebar}
//         items={sidebarItems}
//       />

//       <nav
//         className={`fixed 2xl:container  navbar dark:bg-black z-30 dark:text-white w-full flex md:text-base font-bold text-xs items-center  px-6 md:px-24 max-[400px]:justify-start  justify-between h-20 ${
//           isFixed
//             ? "fixed top-0 w-full bg-white dark:bg-white text-dark dark:text-black shadow-lg dark:shadow-gray-300 dark:shadow-sm z-40 transition-all duration-300 ease-in-out"
//             : "bg-white"
//         }`}
//       >
//         {/* <IoMenu className={`sm:hidden ${isFixed?'dark:text-black text-white':'text-dark dark:text-white'}`} size={33}/> */}
//         <button
//           className="sm:hidden"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         >
//           {isSidebarOpen ? (
//             <BiMenuAltLeft
//               className={` ${
//                 isFixed
//                   ? "dark:text-black text-white"
//                   : "text-dark dark:text-white"
//               }`}
//               size={33}
//             />
//           ) : (
//             <IoMenu
//               className={`${
//                 isFixed
//                   ? "dark:text-black text-black"
//                   : "text-dark dark:text-white"
//               }`}
//               size={33}
//             />
//           )}
//         </button>
//         <div
//           className={`navbar-brand ml-4 ${
//             isFixed ? "dark:text-black text-dark" : "dark:text-white text-dark"
//           }`}
//         >
//           {title}
//         </div>
//         {isAuthenticated && (<ul className="navbar-items max-sm:hidden flex mr-4 items-center">
//           {items.map((item, index) => (
//             <li
//               key={index}
//               className="ml-4 cursor-pointer text-sm font-semibold"
//             >
//               {item}
//             </li>
//           ))}
//         </ul>)}
//        <div className="max-[400px]:hidden"> {isAuthenticated && user != null ? (
//           <button
//             type="button"
//             onClick={() => dispatch(logout())}
//             className={` font-bold border-2 text-xs  px-5 py-2 rounded-3xl ${
//               isFixed
//                 ? "dark:text-black text-dark dark:border-black border-black"
//                 : "dark:text-white  text-dark dark:border-white border-black"
//             }`}
//           >
//             Logout
//           </button>
//         ) : <div className="space-x-1">

//           <Link to={"/login"}>
//             <button
//               type="button"
//               className={` font-bold border-2 text-xs  px-5 py-2 rounded-3xl ${
//                 isFixed
//                   ? "dark:text-black text-dark dark:border-black border-black"
//                   : "dark:text-white text-dark dark:border-white border-black"
//               }`}
//             >
//               Login
//             </button>
//           </Link>

//           <Link to={"/register"}>
//             <button
//               type="button"
//               className={` font-bold border-2  text-xs  px-5 py-2 rounded-3xl ${
//                 isFixed
//                   ? "dark:text-white bg-black dark:bg-black  text-white"
//                   : "dark:text-white bg-black dark:border-white  text-white"
//               }`}
//             >
//               Register
//             </button>
//           </Link>

//         </div>
//         }</div>
//       </nav>
//       <div className="h-20 w-full"></div>
//       </div>
//     </>
//   );
// };

// export default Navbar;

import { Fragment } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Blogs", href: "../../../../user/blog", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state: any) => state.login);
  // const [userData,setUserData] = useState({})
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Disclosure as="nav" className="fixed w-full  z-50 shadow-md bg-white py-2">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-black hover:bg-gray-100 hover:text-black",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      {isAuthenticated && user != null ? (
                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </MenuButton>
                      ) : (
                        <div className="space-x-1">
                          <Link to={"/login"}>
                            <button
                              type="button"
                              className={` font-bold border-2 text-xs  px-5 py-2 rounded-3xl ${"dark:text-white max-[400px]:px-3 text-white dark:border-white border-white"}`}
                            >
                              <p className="max-[400px]:hidden">Login</p>

                              <p className="max-[400px]:flex hidden ">
                                <CiLogin size={15} />
                              </p>
                            </button>
                          </Link>

                          {/* <Link to={"/register"}>
            <button
              type="button"
              className={` font-bold border-2  text-xs  px-5 py-2 rounded-3xl ${
                 "dark:text-white bg-black dark:border-white  text-white"
              }`}
            >
              Register
            </button>
          </Link> */}
                        </div>
                      )}
                    </div>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <MenuItem>
                          {({ focus }) => (
                            <Link
                              to="userprofile"
                              className={classNames(
                                focus ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="#"
                              className={classNames(
                                focus ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ focus }) => (
                            <div
                              onClick={() => dispatch(logout())}
                              className={classNames(
                                focus ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </div>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-black text-white"
                        : "text-black hover:bg-gray-100 hover:text-black",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="w-full h-24"></div>
    </>
  );
}

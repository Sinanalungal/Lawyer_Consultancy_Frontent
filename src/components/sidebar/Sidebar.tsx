import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/slice/LoginActions";

interface SidebarItem {
  title: string;
  //   icon: React.ReactNode;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, items }) => {
  const [isFixed, setIsFixed] = useState(false);
  const { isAuthenticated, user } = useSelector((state: any) => state.login);
  const dispatch = useDispatch();
  const handleClick = () => {
    onClose();
  };

  return (
    <>
      <div
        id="drawer-navigation"
        className={`fixed z-50  bg-gray-200 top-0 left-0 max-sm:w-full  min-w-52 h-screen p-4 max-sm:p-12 overflow-y-auto transition-transform ${
          isOpen ? "" : "-translate-x-full"
        } bg-white dark:bg-gray-800`}
        tabIndex={-1}
        aria-labelledby="drawer-navigation-label"
      >
        {/* <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Website Name
        </h5> */}
        <button
          type="button"
          onClick={handleClick}
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
         
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {items.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  {/* {item.icon} */}
                  <span className="ms-3">{item.title}</span>
                </a>
              </li>
            ))}
            <li>
  {isAuthenticated && user != null ? (
    <a
      href="#"
      onClick={() =>{ dispatch(logout())
        handleClick()
      }}
      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
    >
      <span className="ms-3">Logout</span>
    </a>
  ) : (
    <div className="space-x-1">
      <Link to={"/login"}>
        <a
          href="#"
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
          <span className="ms-3">Login</span>
        </a>
      </Link>
      {/* <Link to={"/register"}>
        <a
          href="#"
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
          <span className="ms-3">Register</span>
        </a>
      </Link> */}
    </div>
  )}
</li>
<li>
  {isAuthenticated && user != null ? (
    ''
  ) : (
    <div className="space-x-1">
      
       
      <Link to={"/register"}>
        <a
          href="#"
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
          <span className="ms-3">Register</span>
        </a>
      </Link>
    </div>
  )}
</li>

          </ul>
          
        </div>
      </div>
    </>
  );
};

export default Sidebar;


// {isAuthenticated && user != null ? (
//   <button
//     type="button"
//     onClick={() => dispatch(logout())}
//     className={` font-bold border-2 text-xs  px-5 py-2 rounded-3xl ${
//       isFixed
//         ? "dark:text-black text-dark dark:border-black border-black"
//         : "dark:text-white  text-dark dark:border-white border-black"
//     }`}
//   >
//     Logout
//   </button>
// ) : <div className="space-x-1">

//   <Link to={"/login"}>
//     <button
//       type="button"
//       className={` font-bold border-2 text-xs  px-5 py-2 rounded-3xl ${
//         isFixed
//           ? "dark:text-black text-dark dark:border-black border-black"
//           : "dark:text-white text-dark dark:border-white border-black"
//       }`}
//     >
//       Login
//     </button>
//   </Link>


//   <Link to={"/register"}>
//     <button
//       type="button"
//       className={` font-bold border-2  text-xs  px-5 py-2 rounded-3xl ${
//         isFixed
//           ? "dark:text-white bg-black dark:bg-black  text-white"
//           : "dark:text-white bg-black dark:border-white  text-white"
//       }`}
//     >
//       Register
//     </button>
//   </Link>

// </div>
// }
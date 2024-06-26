import React, { useEffect, useState } from "react";
import { MdPassword, MdDriveFileRenameOutline } from "react-icons/md";
import UserProfile from "./UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import { getAxiosInstance } from "../../services/axiosInstance/AxiosInstance";
import { BASE_URL } from "../../constants";
import Modal from "../../components/modal/Modal";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { logout } from "../../redux/slice/LoginActions";
import Loader from "../../components/loader/loader";

const ProfileComponent: React.FC = ({ userDetails, setUserDetails }) => {
  console.log(userDetails);
  // const [userDetails, setUserDetails] = useState({});
  console.log(userDetails, "form the user profile component");
  const { value ,role } = useSelector((state: any) => state.login);
  const [editModal, setEditModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [loader,setLoader]=useState(false)

  const dispatch = useDispatch()
  // const [inputOpen,setInputOpen]=useState({full_name:false,email:false,phone_number:false,password:false})
  const passwordFormik = useFormik({
    initialValues: {
      recent_password: '',
      password: '',
      confirm_password: ''
    },
    validationSchema: Yup.object({
      recent_password: Yup.string()
        .min(8, "current password must be at least 8 characters")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
          "current password must contain at least one letter, one number, and one special character"
        )
        .required('Current password is required'),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
          "Password must contain at least one letter, one number, and one special character"
        )
        .required('Password is required'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required')
    }),
    onSubmit: async (values) => {
      // Handle form submission
      console.log('Form data', values);
      if (values.password == values.confirm_password) {
        if (values.password == "") {
          delete values.password;
        }
        try {
          setLoader(true)
          const axiosInstance = await getAxiosInstance();
          const response = await axiosInstance.post(
            BASE_URL + `api/update_password/`,
            {...values,"user_id":value}
          );

          console.log(response.data);
          toast.info('Password updated successfully,please login once again..')
          setPasswordModal(false);
          setTimeout(() => {
            dispatch(logout());
          }, 1000);
          setLoader(false)
          // setUserDetails(response.data);
        } catch (err) {
          console.log(err);
          toast.error(err.response.data.message);
          setLoader(false)
        }
      } else {
        toast.error("Passwords do not match");
      }
    }
  });
  const formik = useFormik({
    initialValues: {
      full_name: userDetails.full_name || "",
      email: userDetails.email || "",
      phone_number: userDetails.phone_number || "",
      password: "",
      confirm_password: "",
      role: role,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      full_name: Yup.string()
        .matches(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/, "Give a valid Full Name")
        .min(4, "Full name must be at least 4 characters")
        .required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .matches(/@gmail\.com$/, "Email must be a valid Gmail address"),
      phone_number: Yup.string()
        .matches(/^\d{10}$/, "Give a valid Phone Number")
        .required("Phone number is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
          "Password must contain at least one letter, one number, and one special character"
        ),
      // .required("Password is required"),
      confirm_password: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: async (values) => {
      console.log(values, "this is the valid data");
      console.log(
        values.password,
        value.confirm_password,
        "pass and cnfpassword"
      );
      // if (values.password == values.confirm_password) {
        // if (values.password == "") {
        //   delete values.password;
        // }
      try {
        setLoader(true)
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.patch(
          BASE_URL + `api/users/${value}/update/`,
          values
        );

        console.log(response.data);
        toast.success("data updated successfully");
        setEditModal(false);
        setUserDetails(response.data);
        setLoader(false)
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
        setLoader(false)
      }
      // } else {
      //   toast.error("Passwords do not match");
      // }
    },
  });

  return (
    <>
      {/* <UserProfile
        index={1}
        component={ */}
      <>
        <div className="w-full  mx-auto p-4 flex  justify-end space-y-3 sm:text-sm font-semibold  sm:w-[80%]  rounded-lg">
          <div
            onClick={() => setEditModal(true)}
            className="sm:px-5 px-3 py-2 space-x-1 cursor-pointer bg-slate-800 flex justify-center items-center text-xs text-white rounded-full"
          >
            <p>Edit Details</p>
          </div>
        </div>
        <div className="w-[98%]  mx-auto  max-md:px-4 max-md:py-1 p-4 md:space-x-2 max-md:space-y-2 flex flex-col  md:grid md:grid-cols-2 text-sm font-semibold  sm:w-[80%] items-start  rounded-lg">
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
            <div className="sm:text-sm text-xs  w-full truncate font-semibold">
              <div>Full Name</div>
              <div>{userDetails.full_name}</div>
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
              <div>{userDetails.email}</div>
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
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M29.3525 21.043C31.1235 21.387 32.5075 22.772 32.8525 24.543"
                  stroke="#1A162E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M26.0315 27.4724C30.0205 31.4604 30.9254 26.8467 33.4653 29.3848C35.9138 31.8328 37.3222 32.3232 34.2188 35.4247C33.8302 35.737 31.3613 39.4943 22.6845 30.8197C14.0066 22.144 17.7616 19.6724 18.0739 19.2839C21.1838 16.1738 21.6668 17.5894 24.1154 20.0373C26.6541 22.5765 22.0425 23.4844 26.0315 27.4724Z"
                  stroke="#1A162E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="sm:text-sm text-xs w-full truncate font-semibold">
              <div>Phone Number</div>
              <div>{userDetails.phone_number}</div>
            </div>
          </div>
          <div
            onClick={() => setPasswordModal(true)}
            className="w-full space-x-2 h-20 bg-gray-100 rounded-md flex items-center "
          >
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
            <path d="M29.3525 17.5C33.0535 17.911 35.9775 20.831 36.3925 24.532" stroke="#1A162E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M29.3525 21.043C31.1235 21.387 32.5075 22.772 32.8525 24.543" stroke="#1A162E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M26.0315 27.4724C30.0205 31.4604 30.9254 26.8467 33.4653 29.3848C35.9138 31.8328 37.3222 32.3232 34.2188 35.4247C33.8302 35.737 31.3613 39.4943 22.6845 30.8197C14.0066 22.144 17.7616 19.6724 18.0739 19.2839C21.1838 16.1738 21.6668 17.5894 24.1154 20.0373C26.6541 22.5765 22.0425 23.4844 26.0315 27.4724Z" stroke="#1A162E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div> */}
        </div>
        {editModal && (
          <Modal
            isOpen={editModal}
            onClose={() => setEditModal(false)}
            children={
              <>
                {loader && <Loader width="w-full rounded-md bg-white" height="min-h-screen" />}{" "}
                {!loader && (<div className="bg-white rounded-md">
                  <div className="flex justify-between rounded-md items-center p-5 bg-slate-800  text-white font-bold text-lg">
                    <p>Edit Details</p>
                    <p
                      className="cursor-pointer"
                      onClick={() => {
                        setEditModal(false);
                        formik.resetForm();
                      }}
                    >
                      <IoCloseSharp size={25} />
                    </p>
                  </div>
                  <div className="p-5 space-y-2">
                    <form onSubmit={formik.handleSubmit}>
                      <div>
                        <label className="font-medium">Full Name</label>
                        <input
                          type="text"
                          id="full_name"
                          name="full_name"
                          // required
                          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-300 shadow-sm rounded-lg"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.full_name}
                        />
                      </div>
                      {formik.touched.full_name && formik.errors.full_name ? (
                        <div className="text-red-500 p-[2px] text-[11px] ">
                          {formik.errors.full_name}
                        </div>
                      ) : (
                        <div className="h-[12px]"></div>
                      )}

                      <div>
                        <label className="font-medium">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          // required
                          className="w-full mt-2 px-3 py-2 text-gray-500 bg-slate-200 outline-none border focus:border-gray-300 shadow-sm rounded-lg"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          disabled
                        />
                      </div>
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 p-[2px] text-[11px] ">
                          {formik.errors.email}
                        </div>
                      ) : (
                        <div className="h-[12px]"></div>
                      )}

                      <div>
                        <label className="font-medium">Phone Number</label>
                        <input
                          type="number"
                          id="phone_number"
                          name="phone_number"
                          // required
                          className="w-full mt-2 px-3 py-2  text-gray-500 bg-slate-200 outline-none border focus:border-gray-300 shadow-sm rounded-lg"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.phone_number}
                          disabled
                        />
                        {formik.touched.phone_number &&
                        formik.errors.phone_number ? (
                          <div className="text-red-500 p-[2px] text-[11px] ">
                            {formik.errors.phone_number}
                          </div>
                        ) : (
                          <div className="h-[12px]"></div>
                        )}
                      </div>
                      {/* <div>
                        <label className="font-medium">Password</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          // required
                          className="w-full mt-2 px-3 py-2 mb-1 text-gray-500 bg-transparent outline-none border focus:border-gray-300 shadow-sm rounded-lg"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                        />
                      </div>
                      {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500 p-[2px] text-[11px]">
                          {formik.errors.password}
                        </div>
                      ) : (
                        <div className="h-[12px]"></div>
                      )}
                      <div>
                        <label className="font-medium">Confirm Password</label>
                        <input
                          type="password"
                          id="confirm_password"
                          name="confirm_password"
                          // required
                          className="w-full mt-2 px-3 py-2 mb-1 text-gray-500 bg-transparent outline-none border focus:border-gray-300 shadow-sm rounded-lg"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.confirm_password}
                        />
                      </div>
                      {formik.touched.confirm_password &&
                      formik.errors.confirm_password ? (
                        <div className="text-red-500 p-[2px] text-[11px]">
                          {formik.errors.confirm_password}
                        </div>
                      ) : (
                        <div className="h-[12px]"></div>
                      )} */}
                      <button
                        type="submit"
                        className="w-full px-4 py-2 mt-5 mb-4 text-white font-medium bg-slate-900 rounded-lg duration-150"
                      >
                        Save Details
                      </button>
                    </form>
                  </div>
                </div>)}
              </>
            }
          />
        )}
        {passwordModal && (
          <Modal
          isOpen={passwordModal}
          onClose={() => setPasswordModal(false)}
          children={
            <>
            {loader && <Loader width="w-full bg-white rounded-md" height="min-h-screen" />}{" "}
              {!loader &&(<>
                <div className="flex justify-between rounded-t-md items-center p-5 bg-slate-800 text-white font-bold text-lg">
                <p>Change Password</p>
                <p
                  className="cursor-pointer"
                  onClick={() => {
                    setPasswordModal(false);
                    passwordFormik.resetForm();
                  }}
                >
                  <IoCloseSharp size={25} />
                </p>
              </div>
              <form onSubmit={passwordFormik.handleSubmit} className="bg-white rounded-b-md py-5 px-3">
                <div>
                  <label className="text-sm font-semibold">Current Password</label>
                  <input
                    type="password"
                    id="recent_password"
                    name="recent_password"
                    className="w-full mt-2 px-3 py-2 mb-1 text-gray-500 bg-transparent outline-none border focus:border-gray-300 shadow-sm rounded-lg"
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    value={passwordFormik.values.recent_password}
                  />
                  {passwordFormik.touched.recent_password && passwordFormik.errors.recent_password ? (
                    <div className="text-red-500 p-[2px] text-[11px]">
                      {passwordFormik.errors.recent_password}
                    </div>
                  ) : (
                    <div className="h-[12px]"></div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full mt-2 px-3 py-2 mb-1 text-gray-500 bg-transparent outline-none border focus:border-gray-300 shadow-sm rounded-lg"
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    value={passwordFormik.values.password}
                  />
                  {passwordFormik.touched.password && passwordFormik.errors.password ? (
                    <div className="text-red-500 p-[2px] text-[11px]">
                      {passwordFormik.errors.password}
                    </div>
                  ) : (
                    <div className="h-[12px]"></div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold">Confirm Password</label>
                  <input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    className="w-full mt-2 px-3 py-2 mb-1 text-gray-500 bg-transparent outline-none border focus:border-gray-300 shadow-sm rounded-lg"
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    value={passwordFormik.values.confirm_password}
                  />
                  {passwordFormik.touched.confirm_password && passwordFormik.errors.confirm_password ? (
                    <div className="text-red-500 p-[2px] text-[11px]">
                      {passwordFormik.errors.confirm_password}
                    </div>
                  ) : (
                    <div className="h-[12px]"></div>
                  )}
                </div>
                <button type="submit" className="mt-4 w-full bg-slate-900 font-semibold text-white py-2 rounded-lg">Submit</button>
              </form>
              </>)}
            </>
          }
        />
        )}
      </>
      {/* } */}
      {/* /> */}
    </>
  );
};

export default ProfileComponent;
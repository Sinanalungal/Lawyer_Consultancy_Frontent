import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaArrowDown } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { modaloff } from "../../redux/slice/LoginActions";

interface ExtraDataAccessProps {}

const ExtraDataAccess: React.FC<ExtraDataAccessProps> = () => {
  const { user } = useSelector((state: any) => state.login);
  const dispatch = useDispatch();
  const [openPassword, setOpenPassword] = useState(false);
  const [otpverification, setOtpVerification] = useState(false);
  const [email, setEmail] = useState('');
  const [timer,setTimer]=useState('0');
  const [seconds,setSeconds]=useState(0);

  useEffect(() => {
    const { access } = user;
    console.log(access, "this is the access token");
    const decodedToken = JSON.parse(atob(access.split(".")[1]));
    const { email } = decodedToken;
    setEmail(email);
  }, [user]);

  const validationSchema = Yup.object({
    phone_number: Yup.string()
      .matches(/^\d{10}$/, "Please enter a valid 10-digit phone number")
      .required("Phone number is required"),
    password: openPassword
      ? Yup.string()
          .min(8, "Password must be at least 8 characters")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
            "Password must contain at least one letter, one number, and one special character"
          )
          .required("Password is required")
      : Yup.string().notRequired(), // No validation if openPassword is false
    otp: Yup.string()
      .length(6, "Please enter a valid 6-digit OTP")
  });

  const formik = useFormik({
    initialValues: {
      phone_number: "",
      password: "",
      otp: "", // Added OTP field to form values
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!openPassword) {
        console.log(values.phone_number);
        const res = await axios.post(`${BASE_URL}api/save-data-request/`, {
          email: email,
          phone_number: values.phone_number,
          otp: values.otp,
        });
        if (res.status === 200) {
          toast.success(res.data.message);
          dispatch(modaloff());
        } else {
          toast.error(res.data.message);
        }
      } else {
        console.log(values);
        const res = await axios.post(`${BASE_URL}api/save-data-request/`, {
          email: email,
          phone_number: values.phone_number,
          password: values.password,
          otp: values.otp, 
        });
        if (res.status === 200) {
          toast.success(res.data.message);
          dispatch(modaloff());
        } else {
          toast.error(res.data.message);
        }
      }
    },
  });

  setTimeout(() => {
    const calculateTimeLeft = (expirationTime: string) => {
      const now = Math.floor(Date.now() / 1000); // Current time in seconds
      const timeDiff = new Date(expirationTime).getTime() / 1000 - now; // Time difference in seconds
      return Math.max(Math.floor(timeDiff), 0); // Ensure timer is not negative
    };
    const time=calculateTimeLeft(timer)
    setSeconds(time)
  },1000)

  const sendOTP = async () => {
    const { phone_number } = formik.values;
    if (formik.isValid && phone_number !== '' && email !== '') {
      const res = await axios.post(`${BASE_URL}api/otpsend/`, {
        phone_number: phone_number,
        email: email,
      });
      if (res.status === 200) {
        setOtpVerification(true);
        toast.info('OTP Sent to your phone number');
        setTimer(res.data.timer);
        console.log(res.data);
      }
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="shadow-md rounded px-8 bg-slate-200 pt-10 pb-10 mb-4 flex flex-col">
        <div className="mb-4">
          <label
            htmlFor="phone_number"
            className="block text-sm font-semibold mb-2"
          >
            Phone Number
          </label>
          <input
            id="phone_number"
            name="phone_number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            type="text"
            placeholder="Phone Number"
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone_number && formik.errors.phone_number && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.phone_number}
            </div>
          )}
        </div>
        {openPassword ? (
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-1"
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={() => setOpenPassword(true)}
            className="w-full flex justify-end items-center text-xs mb-3 cursor-pointer"
          >
            Set Password <FaArrowDown />
          </div>
        )}
        {otpverification && (
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block text-sm font-semibold mb-2"
            >
              OTP
            </label>
            <input
              id="otp"
              name="otp"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-1"
              type="text"
              placeholder="Enter OTP"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.otp && formik.errors.otp && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.otp}
              </div>
            )}
          {seconds >0 ?(<p className="text-xs w-full flex justify-end cursor-pointer"> {`00:${seconds  > 9 ? seconds  : `0${seconds }`}`}</p>):(<p className="text-xs w-full flex justify-end cursor-pointer " onClick={()=>sendOTP()}>Resend OTP ?</p>)}
          </div>
        )}
        <div className="flex items-center w-full justify-center">
          {otpverification ? (
            <button
              className="bg-black hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => sendOTP()}
              className="bg-black hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Send OTP
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ExtraDataAccess;

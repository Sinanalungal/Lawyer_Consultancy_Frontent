import React, { useState } from "react";
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
  });

  const formik = useFormik({
    initialValues: {
      phone_number: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { access } = user;
      console.log(access, "this is the access token");
      const decodedToken = JSON.parse(atob(access.split(".")[1]));
      const { email } = decodedToken;
      if (!openPassword) {
        console.log(values.phone_number);
        const res = await axios.post(`${BASE_URL}api/save-data-request/`, {
          email: email,
          phone_number: values.phone_number,
        });
        if (res.status == 200) {
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
        });
        if (res.status == 200) {
          toast.success(res.data.message);
          dispatch(modaloff());
        } else {
          toast.error(res.data.message);
        }
      }
    },
  });

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
        <div className="flex items-center w-full justify-center">
          <button
            className="bg-black hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExtraDataAccess;

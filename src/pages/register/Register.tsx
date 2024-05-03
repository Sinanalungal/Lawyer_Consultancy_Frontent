import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Register.css";
import { UserData } from "../../actions/RegisterAction";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAsync } from "../../actions/RegisterAction";
import Loader from "../../components/loader/loader";
import Cookies from "js-cookie";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const { loading, registered } = useSelector((state: any) => state.register);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (registered) {
      navigate("/otp");
    }
  }, [registered]);
  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      phone_number: "",
      password: "",
      role: "user",
    },
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
        )
        .required("Password is required"),
      // confirm_password: Yup.string()
      //   .oneOf([Yup.ref("password"), null], "Passwords must match")
      //   .required("Confirm Password is required"),
    }),
    onSubmit: async (values: UserData) => {
      var variable = await dispatch(registerUserAsync(values));
      console.log(variable);
      if (variable.meta.requestStatus == "fulfilled") {
        await Cookies.set("registration_start", true, {
          expires: 10 / (24 * 60),
        });
        navigate("/otp");
      }
    },
  });

  return (
    <>
      {loading ? (
        <Loader height={"h-screen"} width={"w-full"} />
      ) : (
        <div className="relative min-h-screen">
          <img
            src="./photorealistic-lawyer.jpg"
            className="absolute inset-0 object-cover w-full h-full transform scale-x-[-1]"
            alt=""
          />

          <div className="relative bg-gray-900 py-auto min-h-screen bg-opacity-70">
            <div className="px-4  py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-0">
              <div className="flex flex-col items-center justify-between xl:flex-row">
                <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                  <h2 className="max-w-lg mb-6 font-sans text-3xl sm:text-5xl font-bold tracking-tight text-white  sm:leading-none">
                    Register{" "}
                  </h2>
                  <p className="max-w-xl mb-4 text-sm text-slate-100 md:text-base">
                    You can register to the website by providing required
                    credentials
                  </p>
                </div>
                <div className="w-full max-w-xl xl:px-8 py-4 xl:w-5/12">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="bg-white shadow-md rounded px-8 pt-10 pb-10 mb-4 flex flex-col">
                      <div className="mb-1">
                        <label
                          htmlFor="full_name"
                          className="block text-grey-darker text-sm font-semibold mb-2"
                        >
                          Full Name
                        </label>
                        <input
                          id="full_name"
                          name="full_name"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          type="text"
                          placeholder="full name"
                          value={formik.values.full_name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.full_name && formik.errors.full_name ? (
                          <div className="text-red-500 text-[11px] mt-1">
                            {formik.errors.full_name}
                          </div>
                        ) : (
                          <div className=" h-[17px] w-full mt-1"></div>
                        )}
                      </div>
                      <div className="mb-1">
                        <label
                          htmlFor="email"
                          className="block text-grey-darker text-sm font-semibold mb-2"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          type="email"
                          placeholder="Email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <div className="text-red-500 text-[11px] mt-1">
                            {formik.errors.email}
                          </div>
                        ) : (
                          <div className=" h-[17px] w-full mt-1"></div>
                        )}
                      </div>
                      <div className="mb-1">
                        <label
                          htmlFor="phone_number"
                          className="block text-grey-darker text-sm font-semibold mb-2"
                        >
                          Phone Number
                        </label>
                        <input
                          id="phone_number"
                          name="phone_number"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          type="text"
                          placeholder="phone number"
                          value={formik.values.phone_number}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.phone_number &&
                        formik.errors.phone_number ? (
                          <div className="text-red-500 text-[11px] mt-1">
                            {formik.errors.phone_number}
                          </div>
                        ) : (
                          <div className=" h-[17px] w-full mt-1"></div>
                        )}
                      </div>
                      <div className="mb-1">
                        <label
                          htmlFor="password"
                          className="block text-grey-darker text-sm font-semibold mb-2"
                        >
                          Password
                        </label>
                        <input
                          id="password"
                          name="password"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-1"
                          type="password"
                          placeholder="******************"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password ? (
                          <div className="text-red-500 text-[11px] mt-1">
                            {formik.errors.password}
                          </div>
                        ) : (
                          <div className=" h-[20px] w-full mt-1"></div>
                        )}
                      </div>
                      {/* <div className="mb-1">
                    <label htmlFor="confirm_password" className="block text-grey-darker text-sm font-semibold mb-2">
                      Confirm Password
                    </label>
                    <input
                      id="confirm_password"
                      name="confirm_password"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-1"
                      type="password"
                      placeholder="Confirm Password"
                      value={formik.values.confirm_password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.confirm_password && formik.errors.confirm_password ? (
                      <div className="text-red-500 text-[11px] mt-1">{formik.errors.confirm_password}</div>
                    ) : (
                      <div className=" h-[20px] w-full mt-1"></div>
                    )}
                  </div> */}
                      <div className="flex items-center justify-between mt-1">
                        <button
                          className="bg-black hover:bg-blue-dark w-full text-white font-bold py-2 px-4 rounded"
                          type="submit"
                        >
                          Register
                        </button>
                        {/* <button className="bg-black hover:bg-blue-dark w-full text-white font-bold py-2 px-4 rounded" type="submit">
                      {loading ? "Registering..." : "Register"}
                    </button> */}
                      </div>

                      <div className="text-center text-grey-dark mt-3">
                        <span className="font-bold text-xs">
                          Already have an account?{" "}
                          <Link
                            to="/login"
                            className="text-slate-900 hover:underline"
                          >
                            Login
                          </Link>
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;

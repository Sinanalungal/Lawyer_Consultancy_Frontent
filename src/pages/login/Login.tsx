import React, { useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../redux/slice/LoginActions";
import GoogleLoginButton from "../../components/googleLoginButton/GoogleLoginButton";
import LoginButton from "../../components/googleLoginButton/GoogleLoginButton";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const { registered } = useSelector((state: any) => state.register);
  const { isAuthenticated,user,role } = useSelector((state: any) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    username: Yup.string()
      .email("Invalid Email format")
      .required("Email is required")
      .matches(/@gmail\.com$/, "Email must end with @gmail.com"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must contain at least 8 characters, one letter, one number, and one special character"
      ),
  });

  useEffect(() => {
    if (registered) {
      navigate("/register");
    }
    if (isAuthenticated && user!=null){
      if( role=='user'){
        navigate("/user");
      }else if (role=='lawyer'){
        navigate("/lawyer");
      }else {
        navigate("/admin");
      }
    }
  }, [isAuthenticated,user,registered]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
      dispatch(loginAsync(values)); 
    },
  });

  return (
    <div className="relative min-h-screen">
      <img
        src="./photorealistic-lawyer.jpg"
        className="absolute inset-0 object-cover w-full h-full transform scale-x-[-1]"
        alt=""
      />

      <div className="relative bg-gray-900 py-auto min-h-screen bg-opacity-70">
        <div className="px-4  py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-36">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl sm:text-5xl font-bold tracking-tight text-white  sm:leading-none">
                LOGIN{" "}
              </h2>
              <p className="max-w-xl mb-4 text-sm text-slate-100 md:text-base">
                You can login to the website by providing required credentials
              </p>
            </div>
            <div className="w-full max-w-xl xl:px-8 py-4 xl:w-5/12">
              <form onSubmit={formik.handleSubmit}>
                <div className="bg-white  shadow-md rounded px-8 pt-10 pb-10 mb-4 flex flex-col">
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="block text-grey-darker text-sm font-semibold mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="username"
                      name="username"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                      type="text"
                      placeholder="Email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                    />
                    {formik.touched.username && formik.errors.username ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.username}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="password"
                      className="block text-grey-darker text-sm font-semibold mb-2"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                      type="password"
                      placeholder="******************"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.password}
                      </div>
                    ) : null}
                    <div className="text-center w-full flex justify-end text-blue-950">
                      <Link to="#" className="hover:underline  text-[10px]">
                        Forgot Password?
                      </Link>
                    </div>{" "}
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-black hover:bg-blue-dark w-full text-white font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>

                  <div className="text-center flex flex-col items-center text-grey-dark mt-3">
                    <span className="font-bold text-xs mb-4">
                      Don't have any account ?{" "}
                      <Link
                        to="/register"
                        className="text-slate-900 hover:underline"
                      >
                        Register
                      </Link>
                    </span>
                    <GoogleLoginButton />
                    {/* <LoginButton/> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

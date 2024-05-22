import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import "./Otp.css";
// import { auth } from '../../firebase_config';
import { useDispatch, useSelector } from "react-redux";
import { OtpVerification, ResendOtp } from "../../../redux/slice/RegisterAction";
import { useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";

// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import Cookies from 'js-cookie';

// interface OtpProps {}

// const OtpPage: React.FC<OtpProps> = () => {
  // const [otp, setOtp] = useState("");
  // const [closed,setClosed] = useState(false);
  // const { user, loading, error, timer } = useSelector(
  //   (state: any) => state.register
  // );
  // const [seconds, setSeconds] = useState(0);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (user == null) {
  //     navigate("/");
  //   }
  // }, [user]);

  // useEffect(() => {
  //   console.log("Timer:", timer);
  //   const timerId = setInterval(() => {
  //     const diffSeconds = calculateTimeLeft(timer);
  //     console.log("Time left:", diffSeconds);
  //     setSeconds(diffSeconds);
  //     if (diffSeconds <= 0) {
  //       clearInterval(timerId); // Stop the interval when time is up
  //     }
  //   }, 1000);

  //   return () => clearInterval(timerId); // Cleanup on unmount or timer change
  // }, [timer]);

  // const calculateTimeLeft = (expirationTime: string) => {
  //   const now = Math.floor(Date.now() / 1000); // Current time in seconds
  //   const timeDiff = new Date(expirationTime).getTime() / 1000 - now; // Time difference in seconds
  //   return Math.max(Math.floor(timeDiff), 0); // Ensure timer is not negative
  // };

  // const resendOtp = async () => {
  //   var variable = await dispatch(ResendOtp(user));
  //   if (variable.meta.requestStatus == "rejected") {
  //     navigate("/register");
  //   }
  //   setClosed(false)
  // };
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("Submitting OTP:", otp);
  //   console.log("User:", user);
  //   const respo = await dispatch(
  //     OtpVerification({ email: user.email, otp: otp })
  //   );
  //   if (respo.meta.requestStatus == "fulfilled") {
  //     navigate("/");
  //   }
  // };

  // const handleInputChange = (otpValue: string) => {
  //   setOtp(otpValue);
  // };

  // const renderInput = (inputProps: any, index: number) => {
  //   return (
  //     <input
  //       {...inputProps}
  //       key={index}
  //       style={{
  //         width: "3rem",
  //         height: "3rem",
  //         fontSize: "1.5rem",
  //         textAlign: "center",
  //         margin: "0 0.5rem",
  //         border: "1px solid black",
  //         borderRadius: "0.25rem",
  //       }}
  //     />
  //   );
  // };

//   return (
//     <div className="relative min-h-screen">
//       <div id="recaptcha-container"></div>
//       <img
//         src="./photorealistic-lawyer.jpg"
//         className="absolute inset-0 object-cover w-full h-full transform scale-x-[-1]"
//         alt=""
//       />

//       <div className="relative bg-gray-900 py-auto min-h-screen bg-opacity-70">
//         <div className="px-4  py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-36">
//           <div className="flex flex-col items-center justify-between xl:flex-row">
//             <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
//               <h2 className="max-w-lg mb-6 font-sans text-3xl sm:text-5xl font-bold tracking-tight text-white  sm:leading-none">
//                 OTP VERIFICATION{" "}
//               </h2>
//               <p className="max-w-xl mb-4 text-sm text-slate-100 md:text-base">
//                 Verify your otp and finish the registration process
//               </p>
//             </div>
//             <div className="w-full max-w-xl xl:px-8 py-4 xl:w-5/12">
//               {/* <div className="bg-slate-100  rounded shadow-2xl p-7 sm:p-10"> */}

//               <form onSubmit={handleSubmit}>
//                 <div className="bg-white items-center justify-center  shadow-md rounded px-8 pt-10 pb-10 mb-4 flex flex-col">
//                   <h1 className={`${closed?"mb-6":"mb-3"} text-2xl font-bold font-serif  dark:text-white`}>
//                     OTP Verification
//                   </h1>
//                   <div className={`${closed?'hidden h-0 ':''}bg-yellow-100 mb-4 text-yellow-600 text-xs p-4 w-full rounded-md flex justify-between`}><span className={`${closed?'hidden':''}`}>otp shared into your phone number</span><span className={`${closed?"hidden":""} text-gray-600 cursor-pointer`} onClick={()=>setClosed(true)}><IoIosClose size={18}/></span></div>
//                   <OtpInput
//                     value={otp}
//                     onChange={handleInputChange}
//                     numInputs={6}
//                     renderSeparator={<span> </span>}
//                     inputStyle="otp-input"
//                     renderInput={renderInput}
//                   />
//                   {seconds > 0 ? (
//                     <p className="font-semibold text-sm cursor-pointer mt-4 mb-5  text-gray-700">
//                       {`00:${seconds > 9 ? seconds : `0${seconds}`}`}
//                     </p>
//                   ) : (
//                     <p
//                       onClick={resendOtp}
//                       className="font-semibold text-sm cursor-pointer mt-3 mb-5 hover:underline text-gray-700"
//                     >
//                       Resend OTP?
//                     </p>
//                   )}
//                   <div className="flex items-center justify-between">
//                     <button
//                       className="bg-black hover:bg-blue-dark w-full text-white font-bold py-2 px-4 rounded"
//                       type="submit"
//                     >
//                       Verify
//                     </button>
//                   </div>{" "}
//                 </div>
//               </form>
//               {/* </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OtpPage;




const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [closed,setClosed] = useState(false);
  const { user, loading, error, timer } = useSelector(
    (state: any) => state.register
  );
  const { isAuthenticated,role } = useSelector((state: any) => state.login);

  const [seconds, setSeconds] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }

    const authTokens = localStorage.getItem('authTokens');

    if (isAuthenticated && authTokens){
      if( role=='user'){
        navigate("/user");
      }else if (role=='lawyer'){
        navigate("/lawyer");
      }else {
        navigate("/admin");
      }
    }
  }, [user]);

  useEffect(() => {
    console.log("Timer:", timer);
    const timerId = setInterval(() => {
      const diffSeconds = calculateTimeLeft(timer);
      console.log("Time left:", diffSeconds);
      setSeconds(diffSeconds);
      if (diffSeconds <= 0) {
        clearInterval(timerId); // Stop the interval when time is up
      }
    }, 1000);

    return () => clearInterval(timerId); // Cleanup on unmount or timer change
  }, [timer]);

  const calculateTimeLeft = (expirationTime: string) => {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const timeDiff = new Date(expirationTime).getTime() / 1000 - now; // Time difference in seconds
    return Math.max(Math.floor(timeDiff), 0); // Ensure timer is not negative
  };

  const resendOtp = async () => {
    var variable = await dispatch(ResendOtp(user));
    if (variable.meta.requestStatus == "rejected") {
      navigate("/register");
    }
    setClosed(false)
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting OTP:", otp);
    console.log("User:", user);
    const respo = await dispatch(
      OtpVerification({ email: user.email, otp: otp })
    );
    if (respo.meta.requestStatus == "fulfilled") {
      navigate("/");
    }
  };

  const handleInputChange = (otpValue: string) => {
    setOtp(otpValue);
  };

  const renderInput = (inputProps: any, index: number) => {
    return (
      <input
        {...inputProps}
        key={index}
        style={{
          width: "3rem",
          height: "3rem",
          fontSize: "1.5rem",
          textAlign: "center",
          margin: "0 0.5rem",
          border: "1px solid black",
          borderRadius: "0.25rem",
        }}
      />
    );
  };

  return (
      <main className="w-full min-h-screen  flex">
          <div className="relative min-h-screen flex-1  hidden items-center justify-center py-3 bg-gray-900 lg:flex">
              <div className="relative z-10  bbg-gray-900 w-full max-w-md">
                  {/* <img src="https://floatui.com/logo-dark.svg" width={150} /> */}
                  <div className=" mt-16 space-y-3">
                      <h3 className="text-white text-3xl font-bold">Otp Verification</h3>
                      <p className="text-sm text-gray-300">
                      Verify your otp and finish the registration process
                      </p>
                      <div className="flex items-center -space-x-2 overflow-hidden">
                          <img src="https://randomuser.me/api/portraits/women/79.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
                          <img src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
                          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f" className="w-10 h-10 rounded-full border-2 border-white" />
                          <img src="https://randomuser.me/api/portraits/men/86.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
                          <img src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e" className="w-10 h-10 rounded-full border-2 border-white" />
                          <p className="text-sm text-gray-400 font-medium translate-x-5">
                               100+ lawyers..
                          </p>
                      </div>
                  </div>
              </div>
              {/* <div
                  className=" inset-0  h-full"
                  style={{
                      background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)", filter: "blur(118px)"
                  }}
              >

              </div> */}
          </div>
          <div className="flex-1 flex items-center h-full my-auto  justify-center ">
              <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
                  <div className="">
                      <img src="https://floatui.com/logo.svg" width={150} className="lg:hidden" />
                      <div className="mt-5 space-y-2">
                          <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">OTP VERIFICATION</h3>
                          {/* <p className="text-sm">Already have an account? <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">Login</Link></p> */}
                      </div>
                  </div>
                  
                <form onSubmit={handleSubmit}>
                {/* <div className="bg-white items-center justify-center  shadow-md rounded px-8 pt-10 pb-10 mb-4 flex flex-col"> */}
                  {/* <h1 className={`${closed?"mb-6":"mb-3"} text-2xl font-bold font-serif  dark:text-white`}>
                    OTP Verification
                  </h1> */}
                  <div className={`${closed?'hidden h-0 ':''}bg-yellow-100 mb-4 text-yellow-600 text-xs p-4 w-full rounded-md flex justify-between`}><span className={`${closed?'hidden':''}`}>otp shared into your phone number</span><span className={`${closed?"hidden":""} text-gray-600 cursor-pointer`} onClick={()=>setClosed(true)}><IoIosClose size={18}/></span></div>
                  <div className="w-full flex justify-center ">
                  <OtpInput
                    value={otp}
                    onChange={handleInputChange}
                    numInputs={6}
                    renderSeparator={<span> </span>}
                    inputStyle="otp-input"
                    renderInput={renderInput}
                  />
                  </div>
                  <div className="w-full flex justify-end"> 
                  {seconds > 0 ? (
                    <p className="font-semibold text-sm cursor-pointer mt-4 mb-5  text-gray-700">
                      {`00:${seconds > 9 ? seconds : `0${seconds}`}`}
                    </p>
                  ) : (
                    <p
                      onClick={resendOtp}
                      className="font-semibold text-xs  cursor-pointer mt-3 mb-5 hover:underline text-gray-700"
                    >
                      Resend OTP?
                    </p>
                  )}
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      // className="w-full px-4 py-2 mt-1 mb-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-700 rounded-lg duration-150"
                      className="w-full px-4 py-2 mt-1 mb-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                      type="submit"
                    >
                      Verify
                    </button>
                  </div>{" "}
                {/* </div> */}
              </form>
                  
              </div>
          </div>
      </main>
  )
}

export default OtpPage
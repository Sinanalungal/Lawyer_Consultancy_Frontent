import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import "./Otp.css";
// import { auth } from '../../firebase_config';
import { useDispatch, useSelector } from "react-redux";
import { OtpVerification, ResendOtp } from "../../actions/RegisterAction";
import { useNavigate } from "react-router-dom";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import Cookies from 'js-cookie';

interface OtpProps {}

const OtpPage: React.FC<OtpProps> = () => {
  const [otp, setOtp] = useState("");
  const { user, loading, error, timer } = useSelector(
    (state: any) => state.register
  );
  const [seconds, setSeconds] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null) {
      navigate("/");
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
    <div className="relative min-h-screen">
      <div id="recaptcha-container"></div>
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
                OTP VERIFICATION{" "}
              </h2>
              <p className="max-w-xl mb-4 text-sm text-slate-100 md:text-base">
                Verify your otp and finish the registration process
              </p>
            </div>
            <div className="w-full max-w-xl xl:px-8 py-4 xl:w-5/12">
              {/* <div className="bg-slate-100  rounded shadow-2xl p-7 sm:p-10"> */}

              <form onSubmit={handleSubmit}>
                <div className="bg-white items-center justify-center  shadow-md rounded px-8 pt-10 pb-10 mb-4 flex flex-col">
                  <h1 className="mb-8 text-2xl font-bold font-serif  dark:text-white">
                    OTP Verification
                  </h1>
                  <OtpInput
                    value={otp}
                    onChange={handleInputChange}
                    numInputs={6}
                    renderSeparator={<span> </span>}
                    inputStyle="otp-input"
                    renderInput={renderInput}
                  />
                  {seconds > 0 ? (
                    <p className="font-semibold text-sm cursor-pointer mt-3 mb-5  text-gray-700">
                      {`00:${seconds > 9 ? seconds : `0${seconds}`}`}
                    </p>
                  ) : (
                    <p
                      onClick={resendOtp}
                      className="font-semibold text-sm cursor-pointer mt-3 mb-5 hover:underline text-gray-700"
                    >
                      Resend OTP?
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-black hover:bg-blue-dark w-full text-white font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      Verify
                    </button>
                  </div>{" "}
                </div>
              </form>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;

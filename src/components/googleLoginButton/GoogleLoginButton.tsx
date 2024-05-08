import GoogleButton from "react-google-button";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { GoogleLoginAsync } from "../../redux/slice/LoginActions";

function GoogleLoginButton() {
  const dispatch = useDispatch();
  const handleSuccess = async (response: any) => {
    console.log(response,'thi is respponse');
    const res = await dispatch(GoogleLoginAsync(response.code));
    console.log(res.payload.registering, "res");
    // if(res.payload.registering == true){
    //   navigate
    // }
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    flow: "auth-code",
  });
  return (
    <>
      <GoogleButton onClick={login} label="Sign in with Google" />
    </>
  );
}

export default GoogleLoginButton;

import GoogleButton from 'react-google-button'
import { useGoogleLogin } from '@react-oauth/google'

function GoogleLoginButton() {
    const handleSuccess = (response:any) => {
        console.log(response)
    }

    const login = useGoogleLogin({
        onSuccess: handleSuccess,
        flow: "auth-code"
    })
  return (
    <>
        <GoogleButton onClick={login} label='Sign in with Google'/>
    </>
  )
}

export default GoogleLoginButton
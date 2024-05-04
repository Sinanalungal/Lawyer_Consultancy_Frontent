import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
// import Homepage from './components/UsersPage/homepage';
// import AdminLogin from './components/card/cardcomponent';
import OtpPage from './pages/otp/Otp';
import AdminLogin from './components/login/administrativeLogin';
// import LawyerHome from './components/lawyerPage/lawyerHome';
import toast, { Toaster } from 'react-hot-toast';
import AdminRoute from './route/AdminRoute';
import LawyerRoute from './route/LawyerRoute';
import UserRoute from './route/UserRoute';
import ForgotPasswordForm from './pages/forgotpassword/ForgotPassword';
import ResetPasswordPage from './pages/forgotpassword/ResetPassword';

// const notify = () => toast('Here is your toast.');

function App() {

  return (
    <>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    <Router>
      <Routes>
        <Route path="/forgotpassword" element={<ForgotPasswordForm />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/admin/*" element={<AdminRoute/>} />
        <Route path="/lawyer/*" element={<LawyerRoute/>} />
        <Route path="/user/*" element={<UserRoute/>} />
      </Routes>
    </Router>
    </>
    
  );
}

export default App;


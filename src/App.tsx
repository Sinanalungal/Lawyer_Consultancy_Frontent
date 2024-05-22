import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from './components/modal/Modal';
import ExtraDataAccess from './components/modal/ExtraDataAccess';
import Register from './pages/authenticate/register/Register';
import Login from './pages/authenticate/login/Login';
import OtpPage from './pages/authenticate/otp/Otp';
import AdminRoute from './route/AdminRoute';
import LawyerRoute from './route/LawyerRoute';
import UserRoute from './route/UserRoute';
import ForgotPasswordForm from './pages/authenticate/forgotpassword/ForgotPassword';
import ResetPasswordPage from './pages/authenticate/forgotpassword/ResetPassword';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserLayer from './layer/UserLayer';
import Homepage from './pages/user/Home/Homepage';
import LandingPage from './pages/landingPage/LandingPage';

function App() {
  const { dataRequired } = useSelector((state: any) => state.login);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(dataRequired); // Update isOpen based on dataRequired
  }, [dataRequired]);

  return (
    <>
      {isOpen && (<Modal isOpen={isOpen} onClose={() => {}}>
        <ExtraDataAccess />
      </Modal>)}
      <Router>
        <GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
          <Routes>
        
            <Route path='/' element={<LandingPage />} />
            <Route path="/forgotpassword" element={<ForgotPasswordForm />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp" element={<OtpPage />} />
            <Route path="/admin/*" element={<AdminRoute />} />
            <Route path="/lawyer/*" element={<LawyerRoute />} />
            <Route path="/user/*" element={<UserRoute />} />
          
          </Routes>
        </GoogleOAuthProvider>
      </Router>
    </>
  );
}

export default App;

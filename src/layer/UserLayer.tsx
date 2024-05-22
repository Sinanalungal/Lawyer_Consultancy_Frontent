import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function UserLayer() {
  // const { isAuthenticated ,role } = useSelector((state: any) => state.login);
  // const navigate = useNavigate()
  // useEffect(()=>{
  //   const authTokens = localStorage.getItem('authTokens');
  //   if(!isAuthenticated && !authTokens){
  //     // window.location.href = '/login'
  //     navigate('/login')
  //   }
    
  // },[isAuthenticated])

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default UserLayer;

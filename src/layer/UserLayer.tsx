import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { logout } from '../redux/slice/LoginActions';
import { toast } from 'react-toastify';

function UserLayer() {
  const { isAuthenticated ,role } = useSelector((state: any) => state.login);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(()=>{
    const authTokens = localStorage.getItem('authTokens');
    console.log(authTokens);
    
    if(!isAuthenticated || !authTokens){
      // window.location.href = '/login'
      dispatch(logout())
      // toast.error('Session Time Out')
      navigate('/login')
    }
    
  },[isAuthenticated])

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default UserLayer;

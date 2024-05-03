import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const LawyerPrivateRoute = () => {
    const { isAuthenticated ,role } = useSelector((state: any) => state.login);
    return (isAuthenticated && role =='lawyer') ?<Outlet/> :  <Navigate to="/" replace />
}

export default LawyerPrivateRoute
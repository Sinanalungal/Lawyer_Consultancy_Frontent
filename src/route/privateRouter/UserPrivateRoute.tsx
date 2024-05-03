import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserPrivateRoute = () => {
    const { isAuthenticated ,role } = useSelector((state: any) => state.login);
    return (isAuthenticated && role =='user') ?<Outlet/> :  <Navigate to="/" replace />
}

export default UserPrivateRoute
import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminPrivateRoute = () => {
    const { isAuthenticated ,role } = useSelector((state: any) => state.login);
    return (isAuthenticated && role =='admin') ?<Outlet/> :  <Navigate to="/" replace />
}

export default AdminPrivateRoute
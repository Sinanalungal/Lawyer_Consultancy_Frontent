import { Navigate,Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/LoginActions";

const AdminPrivateRoute = () => {
    const dispatch = useDispatch()
    const { isAuthenticated ,role } = useSelector((state: any) => state.login);
    const authTokens = localStorage.getItem('authTokens');
    if (!authTokens){
        dispatch(logout())
    }
    return (isAuthenticated && role =='admin'&&authTokens) ?<Outlet/> :  <Navigate to="/" replace />
}

export default AdminPrivateRoute
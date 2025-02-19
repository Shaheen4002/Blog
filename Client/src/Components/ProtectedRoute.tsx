import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../Context/Auth/AuthContext";

export const ProtectedRoute = () => {

    const {isAuth} = useAuth();
    if(!isAuth){
        return <Navigate to="/login" replace={true}/>
    }
    return(
        <Outlet />
    )
}

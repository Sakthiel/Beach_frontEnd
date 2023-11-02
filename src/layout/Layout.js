import Header from "../header/Header";
import { Outlet , useNavigate ,useLocation} from "react-router-dom";
import { isLoggedIn } from "../helper/authService";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
const Layout = () => {
   
    const navigate = useNavigate();
    const location = useLocation();
    
    // Define an array of public routes
    const publicRoutes = ['/movies', '/login' , '/signup'];

    // Check if the current location matches a public route
    const isPublicRoute = publicRoutes.includes(location.pathname);
    // useEffect(()=> {
    //     if (!isLoggedIn() && !isPublicRoute) {
    //         navigate('/login'); // Redirect to your login page
    //     }
    // },[])
   
    if(!isLoggedIn() && !isPublicRoute){
        return <Navigate to="/login" replace /> ;
    }
    return(<>

    <Header/>
    <Outlet />
    </>);
}
export default Layout;
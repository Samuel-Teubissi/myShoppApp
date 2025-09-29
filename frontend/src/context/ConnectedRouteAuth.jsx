import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";
import LoaderComp from "../components/LoaderComp";
import { jwtDecode } from "jwt-decode";

const ConnectedRouteAuth = ({ children }) => {
    const navigate = useNavigate()
    const { isAuthenticated, userSession, isLogging } = useAuth() || {}
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const params = new URLSearchParams()
    const [isWorking, setIsWorking] = useState(true);

    const token = localStorage.getItem('accessToken');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp * 1000 > Date.now()) {
                return <Navigate to="/user" />; // ou autre route protégée
            }
        } catch (error) {
            console.warn("Token invalide ou expiré :", error.message);
        }
    }

    // if (isLogging) return <LoaderComp />
    // useEffect(() => {
    //     if (isAuthenticated) {
    //         // const redirectPath = userSession.role === "admin" ? "/admin" : "/user";
    //         const redirectPath = "/user";
    //         <Navigate to={redirectPath} replace state={{ from: location }} />;
    //     }
    // }, [isAuthenticated]);

    return children
}

export default ConnectedRouteAuth
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import LoaderComp from "../components/LoaderComp";

const ConnectedRouteAuth = ({ children }) => {
    const navigate = useNavigate()
    const { isAuthenticated, userSession, isLogging } = useAuth() || {}
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const params = new URLSearchParams()

    // if (isLogging) return <LoaderComp />
    if (isAuthenticated) {
        const redirectPath = userSession.role === "admin" ? "/admin" : "/user";
        return <Navigate to={redirectPath} replace state={{ from: location }} />;
    }
    return children
}

export default ConnectedRouteAuth
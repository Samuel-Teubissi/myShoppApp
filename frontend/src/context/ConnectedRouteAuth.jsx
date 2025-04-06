import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ConnectedRouteAuth = ({ children }) => {
    const { isAuthenticated } = useAuth()
    return !isAuthenticated ? children : <Navigate to='/user' />
}

export default ConnectedRouteAuth
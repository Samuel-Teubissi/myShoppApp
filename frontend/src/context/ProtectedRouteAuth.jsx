import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthContext"

/*
const ProtectedRouteAuth = ({ redirect, children }) => {
    const { isAuthenticated } = useAuth()
    const location = window.location.href
    if (location.search('login') < 1) console.log('yes')
    else console.log('no')

    /*
        if ((window.location.href.search('login') < 1 && redirect === 'login') || (window.location.href.search('user') < 1 && redirect === 'user')) {
            // return isAuthenticated ? children : <Navigate to={`/${redirect}`} />
        }

    return isAuthenticated ? children : <Navigate to={`/${redirect}`} />; console.log("redirect ProtectedRouteAuth");
}
*/

const ProtectedRouteAuth = ({ children }) => {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? children : <Navigate to='/login' />
}

export default ProtectedRouteAuth
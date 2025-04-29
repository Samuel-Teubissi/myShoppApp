import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import LoaderComp from "../components/LoaderComp"
import { useEffect } from "react"
import { mergeCartsAndSave } from "./useCookie"

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

const ProtectedRouteAuth = ({ children, allowedRoles }) => {
    const { isAuthenticated, userSession, isLogging } = useAuth() || {}
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/user';
    const search = location.state?.search || '';

    if (isLogging) return <div className="ms_Main mb-12"><LoaderComp /></div>
    console.log('ProtectedRouteAuth');
    if (!userSession) {
        // Pas connecté → vers login
        // state={{ from: location }}
        console.log('ProtectedRouteAuth !userSession');

        return <Navigate to="/login" replace state={{ from: from, search: search }} />
    }
    // Si des rôles sont requis, vérifier si l'utilisateur a le bon rôle
    // if (allowedRoles) {
    // const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    // Si l'utilisateur n'a pas de rôle ou si son rôle n'est pas dans la liste des rôles autorisés
    console.log('allowedRoles', userSession.role, allowedRoles);

    if (!userSession.role || !allowedRoles.includes(userSession.role)) {
        return <Navigate to='/unauthorized' replace state={{ from: location }} />;
    }
    // }
    useEffect(() => {
        if (userSession?.user_id) {
            mergeCartsAndSave(userSession?.user_id)
        }
    }, [userSession])

    return children
}

export default ProtectedRouteAuth
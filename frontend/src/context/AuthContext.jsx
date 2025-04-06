import { createContext, useContext, useState, useEffect } from "react";
import { API_href } from "../App.json";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { waitSync } from "../components/AppComp";

// Création du contexte d'authentification
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [loginErrors, setLoginErrors] = useState({})
    const [userSession, setUserSession] = useState({})
    const [redirect, setRedirect] = useState('')

    axios.defaults.baseURL = API_href;
    // axios.defaults.withCredentials = true;
    // const navigate = useNavigate()

    // Vérifier la présence du token au chargement de l'app
    // useEffect(async () => {
    //     // logout()
    //     const token = ''
    //     // const token = await axios.get(`${API_href}/logged`);
    //     console.log('token :' + token);

    //     if (token) {
    //         setIsAuthenticated(true)
    //         setUserSession(JSON.parse(token))
    //     }

    //     setIsLoading(false)
    // }, [])
    const checkAuth = async () => {
        try { 
            const res = await axios.get("/logged", {withCredentials: true})
            if (res.data.status === 'success') {
                setUserSession(res.data.dataUser)
                setIsAuthenticated(true)
            } else {
                setUserSession(null)
                setIsAuthenticated(false)
            }
        } catch (err) {
            console.log('Authentification Error :' + err)
            setUserSession(null)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        // setIsAuthenticated(true);
        // `${API_href}/logged`
        checkAuth()
    }, []);

    const login = async (dataForm, redirectCallback) => {
        setIsLoading(true)
        try {
            // `${API_href}/login`
            const res = await axios.post('/login', dataForm, { withCredentials: true })
            if (res.data.status === 'success') {
                // localStorage.setItem("user_token", JSON.stringify(res.data.user_token))
                // setUserSession(JSON.stringify(res.data.user_token))
                toast.success(res.data.message)
                // console.log(res.data.user_token);
                setUserSession(res.data.user_token)
                setLoginErrors({})
                setTimeout(() => {
                    setIsAuthenticated(true)
                    return { success: true }
                    // if (redirectCallback) redirectCallback()
                }, 1000);
                // setRedirect('/user')
            } else {
                // toast.error(res.data.message || {})
                setLoginErrors(res.data.errors || {})
                return { success: false }
            }
        } catch (error) {
            console.log(error);
            toast.error('Erreur de connexion')
            return { success: false }
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }
    }

    const logout = async () => {
        try {
            // `${API_href}/logout`
            axios.post('/logout', {}, { withCredentials: true });
            toast.warn("Déconnexion en cours...");
            console.log('déconnexion normale');
            setTimeout(() => {
                setIsAuthenticated(false);
                setUserSession(null)
                // if (redirectCallback) redirectCallback()
                }, 1000)
            // Suppression du token en local
            // localStorage.removeItem("user_token");
            // if (redirectCallback) redirectCallback()
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
            toast.error('Erreur lors de la déconnexion')
        }
    }

    const addArticle = async (dataForm) => {

    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loginErrors, isLoading, userSession }}>
            <ToastContainer position="bottom-right" autoClose={2000} />
            {children}
        </AuthContext.Provider>
    )
}

// Hook personnalisé pour accéder au contexte
export function useAuth() {
    return useContext(AuthContext);
}

import { createContext, useContext, useState, useEffect } from "react";
import { API_href } from "../App.json";
// import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { waitSync } from "../components/AppComp";
import { api } from "../hooks/api";
import { Toaster, toast } from "sonner";

// Création du contexte d'authentification
const AuthContext = createContext();
axios.defaults.baseURL = API_href;

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLogging, setIsLogging] = useState(false)
    const [isRegisterLoad, setIsRegisterLoad] = useState(false)
    const [loginErrors, setLoginErrors] = useState({})
    const [registerErrors, setRegisterErrors] = useState({})
    const [userSession, setUserSession] = useState({})
    const [redirect, setRedirect] = useState('')

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

    //     setIsLogging(false)
    // }, [])

    const checkAuth = async () => {
        try {
            const checkSess = await api.get("/logged")
            if (checkSess.data.status === 'success') {
                // console.log(checkSess.data.dataUser);
                setUserSession(checkSess.data.dataUser)
                setIsAuthenticated(true)

            } else {
                setUserSession(null)
                setIsAuthenticated(false)
            }
        } catch (err) {
            console.log('Authentification Error :' + err)
            setUserSession(null)
            setIsAuthenticated(false)
        } finally {
            setIsLogging(false)
        }
    }

    useEffect(() => {
        // setIsAuthenticated(true);
        // `${API_href}/logged`
        setLoginErrors({})
        checkAuth()

    }, [isAuthenticated]);

    const login = async (dataForm, redirectCallback) => {
        setIsLogging(true)
        try {
            // `${API_href}/login`
            const res = await axios.post('/login', dataForm, { withCredentials: true })
            if (res.data.status === 'success') {
                toast.success(res.data.message)
                setUserSession(res.data.user_token)
                setLoginErrors({})
                setTimeout(() => {
                    setIsAuthenticated(true)
                    return { success: true }
                }, 1000);
            } else {
                toast.error('Remplissez correctement tous les champs', { description: 'Erreur de remplissage', duration: 3000 })
                setLoginErrors(res.data.errors || {})
                return { success: false }
            }
        } catch (error) {
            console.log('Erreur de connexion', error);
            toast.error('Erreur de connexion')
            return { success: false }
        } finally {
            setIsLogging(false)
            // setTimeout(() => {
            // }, 1000)
        }
    }

    const Register = async (RegisterData) => {
        setIsRegisterLoad(true)
        try {
            const response = await axios.post(`/register`, RegisterData)
            if (response.data.status === 'success') {
                toast.success(response.data.message)
                setUserSession(response.data.user_token)
                await createNotification('admin', 'addUser')
                // localStorage.setItem("user", JSON.stringify(response.data.user));
                setTimeout(() => {
                    // navigate('/user')
                    setIsAuthenticated(true)
                    return { success: true }
                }, 1000);
            } else {
                setRegisterErrors(response.data.errors)
                toast.error('Remplissez correctement tous les champs')
            }
        } catch (error) {
            console.log("Erreur de création d'utilisateur : ", error);
            toast.error("Erreur de création d'utilisateur")
        } finally {
            setTimeout(() => {
                setIsRegisterLoad(false)
            }, 1000);
        }
    }

    const logout = async () => {
        try {
            // `${API_href}/logout`
            const dellSess = await axios.get('/logout', { withCredentials: true });
            if (dellSess?.data?.status) {
                toast(dellSess.data.message, { autoClose: 1000 });
                setIsAuthenticated(false);
                setUserSession(null)
            }
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
            toast.error('Erreur lors de la déconnexion')
        }
    }

    const Become_Trader = async () => {
        try {
            const BTrader = await axios.get('/user/become_trader', { withCredentials: true })
            if (BTrader?.data?.status) {
                toast.success(BTrader?.data?.message)
            } else {
                toast.error(BTrader?.data?.errors)
            }
        } catch (error) {
            console.error("Erreur lors du procéssus de création de trader :", error);
            toast.error('Erreur lors du procéssus de création de trader')
        }
        checkAuth()
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated, login, logout, loginErrors, isLogging, userSession, Become_Trader, Register, isRegisterLoad, registerErrors, setLoginErrors
        }}>
            {/* <ToastContainer position="bottom-right" autoClose={2000} /> */}
            <Toaster position="bottom-right" />
            {children}
        </AuthContext.Provider>
    )
}

// Hook personnalisé pour accéder au contexte
export function useAuth() {
    return useContext(AuthContext);
}

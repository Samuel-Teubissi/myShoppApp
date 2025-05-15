import { createContext, useContext, useState, useEffect } from "react";
import { API_href } from "../App.json";
// import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { encodePassword, SoundNotif, waitSync } from "../components/AppComp";
import { api } from "../hooks/api";
import { Toaster, toast } from "sonner";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
import { delSessionCookie, getSessionCookie, saveSessionCookie } from "./useCookie";
import { useSessionStore } from "../hooks/useSession";
import bcrypt from 'bcryptjs';

// Création du contexte d'authentification
const AuthContext = createContext();
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.baseURL = API_href;

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLogging, setIsLogging] = useState(true)
    const [isLoggingLoad, setIsLoggingLoad] = useState(false)
    const [isRegisterLoad, setIsRegisterLoad] = useState(false)
    const [loginErrors, setLoginErrors] = useState({})
    const [registerErrors, setRegisterErrors] = useState({})
    const [userSession, setUserSession] = useState({})
    const [redirect, setRedirect] = useState('')
    // const createSessionStore = useSessionStore((s) => s.createSession)
    // const userSessionStore = useSessionStore((s) => s.sessionUser)

    const checkAuth = async () => {
        try {
            const checkSess = await axios.get('/auth/logged', { withCredentials: true })
            if (checkSess.data.status === 'success') {
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
        return;

        const userCookie = getSessionCookie(localStorage.getItem('userID'))
        const userConnected = getSessionCookie(localStorage.getItem('userConnected'))
        console.log("userCookie", userCookie);
        if (userCookie && userConnected === 'yes') {
            setUserSession(userCookie)
            setIsAuthenticated(true)
        } else {
            setUserSession(null)
            setIsAuthenticated(false)
        }
    }

    useEffect(() => {
        checkAuth()
    }, [isAuthenticated]);

    const login = async (dataForm) => {
        SoundNotif()
        setIsLoggingLoad(true)
        try {
            const res = await axios.post('/auth/login', dataForm, { withCredentials: true })
            if (res.data.status === 'success') {
                // SoundNotif()
                toast.success(res.data.message)
                setUserSession(res.data.user_token)
                setLoginErrors({})
                setTimeout(() => {
                    setIsAuthenticated(true)
                    return { success: true }
                }, 1000);
            } else {
                // SoundNotif()
                setLoginErrors(res.data.errors)
                toast.error('Remplissez correctement tous les champs')//, { description: 'Erreur de remplissage', duration: 3000 }
                // return { success: false }
            }
        } catch (error) {
            console.log('Erreur de connexion', error);
            toast.error('Erreur de connexion')
            // return { success: false }
        } finally {
            setTimeout(() => {
                setIsLoggingLoad(false)
            }, 1000);
        }
        return;

        let User = getSessionCookie(dataForm.number)
        setTimeout(() => {
            if (User.length !== 0) {
                // let loginPassword = encodePassword(dataForm.password)
                const userPass = localStorage.getItem('userPassword')
                if (bcrypt.compareSync(dataForm.password, userPass)) {
                    // setUserSession(User)
                    localStorage.setItem('userConnected', 'yes')
                    setIsAuthenticated(true)
                    return { success: true }
                } else {
                    setLoginErrors({ password: "Mot de passe incorect !" })
                }
            } else {
                setLoginErrors({ number: "Ce numéro n'a pas de compte !" })
            }
        }, 1000);
    }

    const Register = async (RegisterData) => {
        setIsRegisterLoad(true)
        SoundNotif()
        try {
            const response = await axios.post(`/auth/register`, RegisterData)
            if (response.data.status === 'success') {
                // SoundNotif()
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
                // SoundNotif()
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
        return;

        let ckeckUser = getSessionCookie(RegisterData.number)
        if (!ckeckUser) {
            let userSession = {
                data_trader: null,
                user_id: RegisterData.number,
                user_name: RegisterData.username,
                user_number: RegisterData.number,
                role: 'user'
            }
            localStorage.setItem('userID', RegisterData.number)
            localStorage.setItem('userConnected', 'yes')
            localStorage.setItem('userPassword', encodePassword(RegisterData.password))
            // setUserSession(userSession)
            saveSessionCookie(RegisterData, null, true)
            toast.success("Inscription réussie")
            setTimeout(() => {
                setIsAuthenticated(true)
                return { success: true }
            }, 1000);
        } else {
            setLoginErrors({ number: "Ce numéro a déjà un compte !" })
        }
    }

    const logout = async () => {
        try {
            // `${API_href}/logout`
            const dellSess = await axios.get('/auth/logout', { withCredentials: true });
            if (dellSess?.data?.status) {
                toast(dellSess.data.message, { autoClose: 1000 });
                setIsAuthenticated(false);
                setUserSession(null)
            }
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
            toast.error('Erreur lors de la déconnexion')
        }
        return;

        let userID = localStorage.getItem('userID')
        const userSess = getSessionCookie(userID)
        if (userSess.length !== 0) {
            const dataUser = { data_trader: userSess.data_trader, username: userSess.user_name, number: userSess.user_number, password: userSess.user_password }
            delSessionCookie()
            localStorage.setItem('userConnected', 'no')
            // saveSessionCookie(userSess, userSess.user_number, null)
            toast.success('Déconnexion')
            checkAuth()
        }
        console.log("userSess", userSess);
    }

    const Become_Trader = async () => {
        try {
            const BTrader = await axios.get('/auth/become_trader', { withCredentials: true })
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
        return;

        // console.log('userSess', getSessionCookie(localStorage.getItem('userID')), localStorage.getItem('userID'));
        const userSess = getSessionCookie(localStorage.getItem('userID'))

        if (userSess.length !== 0) {
            const dataUser = { username: userSess.user_name, number: userSess.user_number, password: userSess.user_password }
            saveSessionCookie(dataUser, dataUser.number, true)
            toast.success('Vous êtes désormais un Trader !!!')
            checkAuth()
        }
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated, login, logout, loginErrors, isLoggingLoad, isLogging, userSession, Become_Trader, Register, isRegisterLoad, registerErrors, setLoginErrors, setRegisterErrors
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

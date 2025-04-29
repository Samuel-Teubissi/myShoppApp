import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
// import { toast, ToastContainer } from "react-toastify"
import { API_href as reqAPI } from "../App.json";
import InputField, { SoundNotif } from "../components/AppComp";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const [LoginForm, setLoginForm] = useState({ number: '', password: '' })
    const navigate = useNavigate()
    const location = useLocation()
    const { login, isLogging, loginErrors, setLoginErrors } = useAuth()
    const from = location.state?.from || '/user';
    const search = location.state?.search || '';

    const HandleChange = (e) => {
        // new FormData([e.target.name], e.target.value)
        setLoginForm({ ...LoginForm, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setLoginErrors({})
    }, []);

    const submitLogin = async (e) => {
        e.preventDefault()
        SoundNotif()
        const LoginData = new FormData(e.target)
        const res = await login(LoginData)
        if (res?.success) {
            if (from !== '/') navigate(from, { replace: true })
            if (res?.role === 'user') {
                // queryClient.invalidateQueries({ predicate: (query) => query.queryKey.includes('articles') })
                navigate("/user", { replace: true })
            }
            if (res?.role === 'admin') {
                navigate("/admin", { replace: true })
            }
        }
    }

    return (
        <div className="ms_Main mb-16" id='scroll-container'>
            <div className="Main">
                <form className="w-[100%] md:w-8/12 text-gray-600 animO pt-24 pb-12 rounded-xl bg-white/70 shadow border border-app-200 flex justify-center flex-wrap dark:bg-dark dark:text-dark-app-100 dark:border-dark" onSubmit={submitLogin}>
                    <div className="w-9/12">
                        <InputField
                            label="Numéro de téléphone :"
                            type="number"
                            name="number"
                            onChange={HandleChange}
                            error={loginErrors?.number}
                            placeholder="+237 XXXXXXXXX"
                        />
                        <InputField
                            label="Mot de Passe :"
                            type="password"
                            name="password"
                            onChange={HandleChange}
                            error={loginErrors?.password}
                            placeholder="Votre mot de passe"
                        />
                    </div>
                    <div className="text-gray-500"></div>
                    <div className="w-full mt-4">
                        <button type="submit" className={`text-white rounded px-4 py-3 w-40 bg-app-h hover:bg-app transition duration-300 ease-in-out ${isLogging && " text-center text-white cursor-not-allowed"}`} disabled={isLogging}>
                            {isLogging ? '...' : 'Connexion'}
                        </button>
                    </div>
                    <div className="w-full mt-4">
                        Vous n'avez pas encore de compte ?<br />
                        <Link to="/register" className="text-app hover:underline">Inscrivez-vous !</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
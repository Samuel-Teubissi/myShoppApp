import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
// import { toast, ToastContainer } from "react-toastify"
import InputField, { SoundNotif } from "../components/AppComp";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const [LoginForm, setLoginForm] = useState({ number: '', password: '' })
    const navigate = useNavigate()
    const location = useLocation()
    const { login, isLoggingLoad, loginErrors, setLoginErrors } = useAuth()
    const from = location.state?.from || '/user';
    const search = location.state?.search || '';

    const HandleChange = (e) => {
        // new FormData([e.target.name], e.target.value)
        setLoginForm({ ...LoginForm, [e.target.name]: e.target.value })
    }

    const submitLogin = async (e) => {
        e.preventDefault()
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
        <div className="ms_Main mb-16">
            <div className="max-w-full mx-2 md:mx-auto text-center main-about flex flex-col justify-center items-center">
                <form className="w-full md:w-8/12 text-gray-600 pt-24 pb-12 rounded-xl bg-white/70 shadow border border-app-200 flex justify-center flex-wrap dark:bg-dark dark:text-dark-app-100 dark:border-dark" onSubmit={submitLogin}>
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
                    <div className="w-full mt-4 flex justify-center">
                        <button type="submit" className={`animZ text-white flex items-center justify-center rounded px-4 py-3 w-40 bg-app-h hover:bg-app transition duration-300 ease-in-out ${isLoggingLoad && " text-center text-white cursor-not-allowed"}`} disabled={isLoggingLoad}>
                            {!isLoggingLoad
                                ? 'Connexion'
                                : <span className="w-6 h-6 block border-4 border-app-500 border-t-transparent rounded-full animate-spin"></span>
                            }
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
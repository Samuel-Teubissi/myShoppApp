import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
// import { toast, ToastContainer } from "react-toastify"
import InputField, { SoundNotif } from "../components/AppComp";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { InfoIcon } from "lucide-react";

const LoginPage = () => {
    const [LoginForm, setLoginForm] = useState({ number: '', password: '' })
    const navigate = useNavigate()
    const location = useLocation()
    const { login, isLoggingLoad, loginErrors, setLoginErrors } = useAuth()
    const from = location.state?.from || '/user';
    const search = location.state?.search || '';
    const [isLoadingLogin, setIsLoadingLogin] = useState(false);

    // const HandleChange = (e) => {
    //     // new FormData([e.target.name], e.target.value)
    //     setLoginForm({ ...LoginForm, [e.target.name]: e.target.value })
    // }

    useEffect(() => {
        setLoginErrors({})
    }, [location.pathname]);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const LoginSubmit = async (e) => {
        e.preventDefault()
        // setIsLoadingLogin(true)
        const loginData = new FormData(e.target)
        const res = await login(loginData)
        // const res = await login(data)
        if (res?.success) {
            if (from !== '/') navigate(from, { replace: true })
            if (res?.role === 'user') {
                toast.success('Connexion réussie !');
                setTimeout(() => navigate('/user', { replace: true }), 1000);
            }
            if (res?.role === 'admin') {
                setTimeout(() => navigate('/admin', { replace: true }), 1000);
            }
        }
        /* else {
            toast.error('Revérifiez le formulaire.');
        }*/
        // setTimeout(() => {
        //     setIsLoadingLogin(false)
        // }, 300);
    }
    useEffect(() => {
        document.title = "Connexion | MyShop App"
    }, []);

    return (
        <div className="ms_Main main-about flex justify-center items-center">
            <div className="text-center overflow-hidden relative md:w-8/12 md:h-min flex justify-center items-center rounded-xl md:border dark:border-none md:border-app-200 sm:shadow-md shadow-none">
                <div className="auth-design dsn-1"></div>
                <div className="auth-design dsn-2"></div>
                <div className="auth-design dsn-3 w-36 h-36 opacity-65"></div>
                <form className="w-full text-gray-600 py-10 sm:bg-app-100/5 sm:dark:bg-app-600/10 backdrop-blur flex justify-center flex-wrap dark:text-dark-app-100 overflow-hidden" onSubmit={LoginSubmit}>
                    <div className="flex gap-4 items-center border-2 border-transparent bg-app-h/95 text-white dark:bg-app-900/80 px-6 py-10 mb-10 text-left font-medium sm:w-full sm:text-center sm:border-t-app-700">
                        <div><InfoIcon className="w-14 h-14" /></div>
                        <div className="text-left flex flex-col">
                            <strong className="uppercase">Connectez vous vite !</strong> Des tonnes de commandes vous attendent sûrement.
                        </div>
                    </div>
                    <div className="md:w-9/12 w-full px-5">
                        <InputField
                            label="Numéro de téléphone :"
                            type="number"
                            name="number"
                            icon='user'
                            // onChange={HandleChange}
                            placeholder="+237 XXXXXXXXX"
                            error={errors?.number?.message || loginErrors.number}
                        // {...register('number', { required: 'Numéro requis' })}
                        />
                        <InputField
                            label="Mot de Passe :"
                            type="password"
                            name="password"
                            icon='pswd'
                            // onChange={HandleChange}
                            placeholder="Votre mot de passe"
                            error={errors?.password?.message || loginErrors.password}
                        // {...register('password', { required: 'Mot de passe requis' })}
                        />
                    </div>
                    <div className="text-gray-500"></div>
                    <div className="w-full flex justify-center mt-4">
                        <button type="submit" className={`text-white flex items-center justify-center rounded h-[45px] w-40 bg-app-h hover:bg-app transition duration-300 ease-in-out ${isLoggingLoad && " text-center text-white cursor-not-allowed"}`} disabled={isLoggingLoad}>
                            {!isLoggingLoad
                                ? 'Connexion'
                                : <span className="w-6 h-6 block border-4 border-app-500/50 border-t-transparent rounded-full animate-spin"></span>
                            }
                        </button>
                    </div>
                    <div className="w-full mt-2">
                        Vous n'avez pas encore de compte ?<br />
                        <Link to="/register" className="text-app hover:underline">Inscrivez-vous !</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import InputField, { SoundNotif } from "../components/AppComp"
// import { toast, ToastContainer } from "react-toastify"
import { createRoot } from "react-dom/client";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNotificationsStore } from "../hooks/useNotifications";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { InfoIcon } from "lucide-react";

const RegisterPage = () => {
    const [RegisterForm, setRegisterForm] = useState(
        { number: '', username: '', password: '', confirm_password: '' }
    )
    // const [RegisterErrors, setRegisterErrors] = useState({})
    const [registerLoad, setRegisterLoad] = useState(false)
    const navigate = useNavigate()
    const createNotification = useNotificationsStore((s) => s.createNotification)
    const { Register, isRegisterLoad, registerErrors, setRegisterErrors } = useAuth()

    // const HandleChange = (e) => {
    //     setRegisterForm({ ...RegisterForm, [e.target.name]: e.target.value })
    // }

    // 1. Schéma Yup
    const schema = Yup.object().shape({
        number: Yup.string()
            .required('Le nom est requis')
            .min(9, 'Entrez un numéro valide de 9 chiffres')
            .matches(/^[0-9]+$/, 'Format de numéro incorrect'),
        username: Yup.string()
            .min(3, "Entrez un nom d'au moins 3 caractères")
            .required('Email requis'),
        password: Yup.string()
            .required('Mot de passe requis'),
        // .min(18, 'Tu dois avoir au moins 18 ans'),
        confirm_password: Yup.string()
            .required('Confirmez le mot de passe')
            .oneOf([Yup.ref('password'), null], "La valeur doit être la même que celle du champ Mot de passe")
    });
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });
    // const submitRegister = async (data) => {
    //     setRegisterLoad(true)
    //     SoundNotif()
    //     const res = await Register(data)
    //     if (res?.success) {
    //         setTimeout(() => navigate('/user', { replace: true }), 1000);
    //     }
    //     setRegisterLoad(false)
    // }
    useEffect(() => {
        setRegisterErrors({})
    }, [location.pathname]);
    const submitRegister = async (e) => {
        e.preventDefault()
        const RegisterData = new FormData(e.target)
        const res = await Register(RegisterData)
        if (res?.success) {
            navigate("/user", { replace: true })
        }
    }
    useEffect(() => {
        document.title = "Insctiption | MyShop App"
    }, []);

    return (
        <div className="ms_Main flex justify-center items-center">
            {/* <ToastContainer position="bottom-right" autoClose={3000} /> */}
            <div className="text-center overflow-hidden relative md:w-8/12 h-full md:h-min flex justify-center items-center rounded-xl md:border dark:border-none md:border-app-200 sm:shadow-md shadow-none md:my-4">
                <div className="auth-design dsn-1"></div>
                <div className="auth-design dsn-2"></div>
                <div className="auth-design dsn-3 w-36 h-36 opacity-65"></div>
                <form className="w-full h-full text-gray-600 py-10 sm:bg-app-100/5 sm:dark:bg-app-600/10 backdrop-blur flex justify-center flex-wrap dark:text-dark-app-100 overflow-hidden" onSubmit={submitRegister}>
                    <div className="flex gap-4 items-center border-2 border-transparent bg-app-h/95 text-white dark:bg-app-900/80 px-6 py-10 mb-10 text-left font-medium sm:w-full sm:text-center sm:border-t-app-700">
                        <div><InfoIcon className="w-14 h-14" /></div>
                        <div className="text-left flex flex-col">
                            <strong className="uppercase">Rejoignez notre grande communauté de vendeurs.</strong> Devenez un business man prospère dès aujourd'hui !
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
                            error={errors.number?.message || registerErrors.number}
                            {...register('number')}
                        />
                        <InputField
                            label="Nom d'Utilisateur :"
                            name="username"
                            icon='name'
                            // onChange={HandleChange}
                            error={errors.username?.message || registerErrors.username}
                            placeholder="Bernard Dubois"
                            {...register('username')}
                        />
                        <InputField
                            label="Mot de Passe :"
                            type="password"
                            name="password"
                            icon='pswd'
                            // onChange={HandleChange}
                            error={errors.password?.message || registerErrors.password}
                            placeholder="Utilisez des chiffres et des symboles"
                            {...register('password')}
                        />
                        <InputField
                            label="Confirmez votre Mot de Passe :"
                            type="password"
                            name="confirm_password"
                            icon='pswd'
                            // onChange={HandleChange}
                            error={errors.confirm_password?.message || registerErrors.confirm_password}
                            placeholder="Ressaisissez le mot de passe"
                            {...register('confirm_password')}
                        />
                    </div>
                    <div className="w-full flex justify-center mt-4">
                        <button type="submit" className={`animZ flex items-center justify-center text-white rounded h-[45px] w-40 bg-app-h hover:bg-app transition duration-300 ease-in-out animZ`} disabled={isRegisterLoad}>
                            {!isRegisterLoad
                                ? 'Inscription'
                                : <span className="w-6 h-6 block border-4 border-app-500/50 border-t-transparent rounded-full animate-spin"></span>
                            }
                        </button>
                    </div>
                    <div className="w-full mt-4">
                        Vous avez déjà un compte ?<br />
                        <Link to="/login" className="text-app hover:underline">Connectez-vous !</Link>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default RegisterPage
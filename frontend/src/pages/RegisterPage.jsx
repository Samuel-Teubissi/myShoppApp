import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import InputField, { SoundNotif } from "../components/AppComp"
// import { toast, ToastContainer } from "react-toastify"
import { createRoot } from "react-dom/client";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNotificationsStore } from "../hooks/useNotifications";

const RegisterPage = () => {
    const [RegisterForm, setRegisterForm] = useState(
        { number: '', username: '', password: '', confirm_password: '' }
    )
    // const [RegisterErrors, setRegisterErrors] = useState({})
    const [RegisterLoad, setRegisterLoad] = useState(false)
    const navigate = useNavigate()
    const createNotification = useNotificationsStore((s) => s.createNotification)
    const { Register, isRegisterLoad, registerErrors } = useAuth()

    const HandleChange = (e) => {
        setRegisterForm({ ...RegisterForm, [e.target.name]: e.target.value })
    }
    const submitRegister = async (e) => {
        e.preventDefault()
        const RegisterData = new FormData(e.target)
        const res = await Register(RegisterData)
        if (res?.success) {
            navigate("/user", { replace: true })
        }
    }

    return (
        <div className="ms_Main mb-16">
            {/* <ToastContainer position="bottom-right" autoClose={3000} /> */}
            <div className="max-w-full h-min mx-2 md:mx-auto text-center main-about flex flex-col justify-center items-center">
                <form className="w-full h-min mt-2 px-4 mx md:w-8/12 text-gray-600 py-8 rounded-xl sm:bg-white/70 md:shadow-md md:border border-app-200 flex justify-center flex-wrap sm:dark:bg-dark dark:text-dark-app-100 dark:border-none" onSubmit={submitRegister}>
                    <div className="insc md:w-9/12 w-full">
                        <div className="border-8 border-transparent border-l-app bg-app/10 p-4 py-8 w-full mb-10 text-left font-medium">
                            Rejoignez la grande communauté de personnes qui perçoivent de gros revenus en une année !
                        </div>
                        <InputField
                            label="Numéro de téléphone :"
                            type="number"
                            name="number"
                            onChange={HandleChange}
                            error={registerErrors.number}
                            placeholder="+237 XXXXXXXXX"
                        />
                        <InputField
                            label="Nom d'Utilisateur :"
                            name="username"
                            onChange={HandleChange}
                            error={registerErrors.username}
                            placeholder="Bernard Dubois"
                        />
                        <InputField
                            label="Mot de Passe :"
                            type="password"
                            name="password"
                            onChange={HandleChange}
                            error={registerErrors.password}
                            placeholder="Utilisez des chiffres et des symboles"
                        />
                        <InputField
                            label="Confirmez votre Mot de Passe :"
                            type="password"
                            name="confirm_password"
                            onChange={HandleChange}
                            error={registerErrors.confirm_password}
                            placeholder="Ressaisissez le mot de passe"
                        />
                    </div>
                    <div className="w-full mt-2 flex justify-center">
                        <button type="submit" className={`animZ flex items-center justify-center text-white rounded px-4 py-3 w-40 bg-app-h hover:bg-app transition duration-300 ease-in-out animZ`} disabled={isRegisterLoad}>
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
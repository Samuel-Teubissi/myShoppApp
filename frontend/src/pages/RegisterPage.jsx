import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import InputField, { SoundNotif } from "../components/AppComp"
// import { toast, ToastContainer } from "react-toastify"
import { API_href as reqAPI } from "../App.json";
import { createRoot } from "react-dom/client";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNotificationsStore } from "../hooks/useNotifications";

const RegisterPage = () => {
    const [RegisterForm, setRegisterForm] = useState(
        { number: '', username: '', password: '', confirm_password: '' }
    )
    const [RegisterErrors, setRegisterErrors] = useState({})
    const [RegisterLoad, setRegisterLoad] = useState(false)
    const navigate = useNavigate()
    const createNotification = useNotificationsStore((s) => s.createNotification)
    const { Register, isRegisterLoad, registerErrors } = useAuth()

    const HandleChange = (e) => {
        setRegisterForm({ ...RegisterForm, [e.target.name]: e.target.value })
    }
    const submitRegister = async (e) => {
        e.preventDefault()
        // setRegisterErrors({})
        // setRegisterLoad(true)
        SoundNotif()

        const RegisterData = new FormData(e.target)
        const res = await Register(RegisterData)
        if (res?.success) {
            navigate("/user", { replace: true })
            // if (from !== '/') navigate(from, { replace: true })
            // queryClient.invalidateQueries({ predicate: (query) => query.queryKey.includes('articles') })
        }
    }

    return (
        <div className="ms_Main mb-16">
            {/* <ToastContainer position="bottom-right" autoClose={3000} /> */}
            <div className="Main">
                <form className="w-[100%] md:w-8/12 text-gray-600 pt-16 pb-8 rounded-xl bg-white/70 shadow-md border border-app-200 flex justify-center flex-wrap dark:bg-dark dark:text-dark-app-100 dark:border-dark mt-6" onSubmit={submitRegister}>
                    <div className="insc w-9/12">
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
                    <div className="w-full mt-2">
                        <button type="submit" className={`animZ text-white rounded px-4 py-3 w-40 bg-app-h hover:bg-app transition duration-300 ease-in-out animZ ${isRegisterLoad && "bg-gray-400 text-white cursor-not-allowed"}`} disabled={isRegisterLoad}>
                            {isRegisterLoad ? '...' : 'Inscription'}
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
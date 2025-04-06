import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import InputField, { SoundNotif } from "../components/AppComp"
import { toast, ToastContainer } from "react-toastify"
import { API_href as reqAPI } from "../App.json";
import { createRoot } from "react-dom/client";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
    const [RegisterForm, setRegisterForm] = useState(
        { number: '', username: '', password: '', confirm_password: '' }
    )
    const [RegisterErrors, setRegisterErrors] = useState({})
    const [RegisterLoad, setRegisterLoad] = useState(false)
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    // useEffect(() => {
    //     if (isAuthenticated) { navigate('/user'); console.log("redirect register"); }
    // }, [isAuthenticated, navigate]);

    const HandleChange = (e) => {
        setRegisterForm({ ...RegisterForm, [e.target.name]: e.target.value })
    }
    const submitRegister = async (e) => {
        e.preventDefault()
        setRegisterErrors({})
        setRegisterLoad(true)
        SoundNotif()

        try {
            const response = await axios.post(`${reqAPI}/register`, RegisterForm)
            if (response.data.status === 'success') {
                toast.success(response.data.message)
                // localStorage.setItem("user", JSON.stringify(response.data.user));
                setTimeout(() => {
                    navigate('/user')
                }, 1000);
            } else {
                setRegisterErrors(response.data.errors)
                toast.error('Remplissez correctement tous les champs')
            }
        } catch (error) {
            console.log(error);
            toast.error('Erreur de connexion')
        } finally {
            setTimeout(() => {
                setRegisterLoad(false)
            }, 1000);
        }
    }

    return (
        <div className="ms_Main">
            {/* <ToastContainer position="bottom-right" autoClose={3000} /> */}
            <div className="Main">
                <form className="w-8/12 text-gray-600 insc animO flex justify-center flex-wrap" onSubmit={submitRegister}>
                    <div className="insc w-9/12">
                        <InputField
                            label="Numéro de téléphone :"
                            type="number"
                            name="number"
                            onChange={HandleChange}
                            error={RegisterErrors.number}
                            placeholder="+237 XXXXXXXXX"
                        />
                        <InputField
                            label="Nom d'Utilisateur :"
                            name="username"
                            onChange={HandleChange}
                            error={RegisterErrors.username}
                            placeholder="Exemple : Bernard Dubois"
                        />
                        <InputField
                            label="Mot de Passe :"
                            type="password"
                            name="password"
                            onChange={HandleChange}
                            error={RegisterErrors.password}
                            placeholder="Mettez un mot de passe complexe"
                        />
                        <InputField
                            label="Confirmez votre Mot de Passe :"
                            type="password"
                            name="confirm_password"
                            onChange={HandleChange}
                            error={RegisterErrors.confirm_password}
                            placeholder="Ressaisissez le mot de passe"
                        />
                    </div>
                    <div className="w-full">
                        <button type="submit" className={`btn animZ ${RegisterLoad && "bg-gray-400 text-white cursor-not-allowed"}`} disabled={RegisterLoad}>
                            {RegisterLoad ? 'Chargement...' : 'Inscription'}
                        </button>
                    </div>
                    <div className="w-full mt-4">
                        Vous avez déjà un compte ?<br />
                        <Link to="/login" className="text-purple-900 hover:underline">Connectez-vous !</Link>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default RegisterPage
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { API_href as reqAPI } from "../App.json";
import InputField, { SoundNotif } from "../components/AppComp";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const [LoginForm, setLoginForm] = useState({ number: '', password: '' })
    // const [LoginLoad, setLoginLoad] = useState(false)
    // const [LoginErrors, setLoginErrors] = useState({})
    const navigate = useNavigate()
    const { login, isLoading, loginErrors } = useAuth()

    const HandleChange = (e) => {
        // new FormData([e.target.name], e.target.value)
        setLoginForm({ ...LoginForm, [e.target.name]: e.target.value })
    }

    const submitLogin = async (e) => {
        e.preventDefault()
        SoundNotif()
        const LoginData = new FormData()
        LoginData.append('number', LoginForm.number)
        LoginData.append('password', LoginForm.password)
        const res = await login(LoginData)
        if (res?.success) {
            navigate("/user")
        }

        return (
            <div className="ms_Main">
                {/* <ToastContainer position="bottom-right" autoClose={1000} /> */}
                <div className="Main">
                    <form className="w-8/12 text-gray-600 insc animO flex justify-center flex-wrap h-full items-center" onSubmit={submitLogin}>
                        <div className="conn w-9/12">
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
                        <div className="w-full">
                            <button type="submit" className={`btn animZ ${isLoading && " w-60 text-center bg-gray-400 text-white cursor-not-allowed"}`} disabled={isLoading}>
                                {isLoading ? '...' : 'Connexion'}
                            </button>
                        </div>
                        <div className="w-full mt-4">
                            Vous n'avez pas encore de compte ?<br />
                            <Link to="/register" className="text-purple-900 hover:underline">Inscrivez-vous !</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    export default LoginPage
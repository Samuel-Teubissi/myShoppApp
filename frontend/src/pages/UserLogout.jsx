import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const UserLogout = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    logout(() => navigate('/login'))
}
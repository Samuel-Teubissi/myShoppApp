import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { clearCartCookie } from "../context/useCookie"
import { useModal } from "../context/useModal"
import { queryClient } from "../main"
import ModalAddComp from "../modals/ModalAddComp"
import { useCart } from "../context/useCart"
import ModalCart from "../modals/ModalCart"
import ModalNotifs from "../modals/ModalNotifs"

export const useLinks = () => {
    const { userSession, logout, Become_Trader } = useAuth()
    const { openModal, closeModal } = useModal()
    const { clearCart, newsItems } = useCart()
    const navigate = useNavigate()

    const handleAdd = () => {
        openModal(<ModalAddComp onClose={closeModal} />, 'Ajouter Un Article')
    }
    const handleCart = () => {
        openModal(<ModalCart onClose={closeModal} redirect={() => navigate('/login')} />, 'Votre Panier')
    }
    const handleNotifs = () => {
        openModal(<ModalNotifs onClose={closeModal} />, 'Vos Notifications')
    }
    const handleLogout = async () => {
        await logout()
        clearCart()
        clearCartCookie()
        // queryClient.clear();
        queryClient.invalidateQueries({ predicate: (query) => query.queryKey.includes('articles') })
        navigate('/login')
    }

    // const BecomeTrader = async () => {
    //     Become_Trader()
    // }

    return {
        handleAdd,
        handleLogout,
        handleCart,
        handleNotifs,
        // BecomeTrader
    }
}
export default useLinks
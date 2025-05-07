import { faCartShopping, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../context/useCart";
import _ from "lodash";
import ItemCartComp from "../components/ItemCartComp";
// import { toast } from "react-toastify";
import { toast } from "sonner";
import ConnectToCart from "./ConnectToCart";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/useModal";
import { clearCartCookie } from "../context/useCookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../hooks/api";
import axios from "axios";
import ModalEmpty from "./ModalEmpty";
import { SoundNotif } from "../components/AppComp";
import { useNotificationsStore } from "../hooks/useNotifications";

const ModalCart = ({ onClose, redirect }) => {
    const { cartItems, removeFromCart, clearCart, totalCart } = useCart()
    const { isAuthenticated, userSession } = useAuth()
    const { openModal, closeModal } = useModal()
    const queryClient = useQueryClient()
    const createNotification = useNotificationsStore((s) => s.createNotification)

    const { mutate, isLoading: isSaving } = useMutation({
        mutationKey: ['cart', 'addCommand'],
        mutationFn: async (data) => {
            const res = axios.post('/command/add', data)
            return res.data
        },
        onSuccess: async (response) => {
            // Recharge la liste des articles sur le site après ajout
            if (response.status === "success") {
                SoundNotif()
                toast.success('Nouvelle commande générée')
                await createNotification(userSession.user_id, 'addCommand')
                queryClient.invalidateQueries({ predicate: (query) => query.queryKey.includes('articles') })
            } else {
                SoundNotif()
                toast.success(response.message)
                console.log('Une erreur est survenue : ', response.message)
            }
        }, onError: (error) => {
            toast.success('Erreur de sauvegarde de la commande.')
            console.log('Erreur de sauvegarde de la commande : ', error.message)
        }
    });
    const handleCommand = () => {
        if (isAuthenticated) {
            // console.log({ total: totalCart, cartItems: cartItems, user: userSession.user_id });
            // mutate({ total: totalCart, cartItems: cartItems, user: userSession.user_id })
            clearCart()
            clearCartCookie(userSession?.user_id)
        } else {
            openModal(<ConnectToCart onClose={closeModal} redirect={redirect} />, 'Connectez-vous pour commander')
        }
    }

    // SI rien à afficher
    if (cartItems.length < 1) return (<ModalEmpty modal='cart' onClose={onClose} />)

    // Si contenu présent
    return <>
        <div className="w-full pr-2">
            <div className="hidden md:grid grid-cols-5 gap-4 bg-gray-100 text-gray-700 dark:bg-app-600/20 dark:text-white/90 text-sm px-4 py-5 border-b rounded-tr-xl rounded-tl-xl">
                <div>Article</div>
                <div>Prix</div>
                <div>Quantité</div>
                {/* <div>Stock</div> */}
                <div>Prix Total</div>
            </div>
            <div className="cart-content">
                {cartItems.map((item, key) => (
                    <ItemCartComp key={item.id_articles} item={item} />
                ))}
            </div>
            <div className="cart-footer">
                <div className="flex justify-end items-center gap-4 my-2">
                    <span className="text-gray-600 dark:text-white/90">Total à payer :</span>
                    <span className="bg-green-300 cart--item-box min-w-28 dark:text-black/70">{totalCart.toLocaleString('fr-FR', { style: 'currency', currency: 'XAF' })}</span>
                    <div className="w-7"></div>
                </div>
                <div className="btn-modal-container">
                    <button className="btn-modal-confirm capitalize" onClick={clearCart}>vider le panier</button>
                    <button className="btn-modal-cancel capitalize order-3 xl:order-2" onClick={onClose}>Fermer</button>
                    <button className="btn-modal-submit disabled:opacity-50 order-2 xl:order-3" onClick={handleCommand} disabled={isSaving}>Commander</button>
                </div>
            </div>
        </div>
    </>
}
export default ModalCart
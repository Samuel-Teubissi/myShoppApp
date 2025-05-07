import { faBell, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalEmpty = ({ modal, onClose }) => {
    return (
        <>
            <div className="flex justify-center items-center px-7 py-20 border bg-gray-50 dark:bg-app-600/5 border-gray-100 dark:border-app-600/10 rounded-xl gap-4 capitalize">
                <div className="animate-pulse">
                    {modal === 'cart' && <FontAwesomeIcon icon={faCartShopping} size="" className="w-14 h-14 text-gray-400" />}
                    {modal === 'notif' && <FontAwesomeIcon icon={faBell} size="" className="w-14 h-14 text-gray-400" />}
                </div>
                <div className="text-lg text-gray-900 tracking-wide dark:text-white/70">
                    <div className="w-1/2 mb-2 py-1 bg-gray-400 rounded animate-pulse"></div>
                    <div>
                        {modal === 'cart' && 'Aucun article dans votre panier'}
                        {modal === 'notif' && 'Aucune notification'}
                    </div>
                    <div className="w-full mt-2 py-1 bg-gray-400 rounded animate-pulse"></div>
                </div>
            </div>
            <div className="">
                <button className="btn-modal-cancel capitalize" onClick={onClose}>Fermer</button>
            </div>
        </>
    );
}
export default ModalEmpty
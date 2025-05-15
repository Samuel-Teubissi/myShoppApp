import { faBell, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalEmpty = ({ modal, onClose }) => {
    return (
        <>
            <div className="md:flex justify-center items-center px-7 py-20 border bg-gray-50 dark:bg-app-600/5 border-gray-300 dark:border-app-600/10 rounded-xl gap-4 capitalize">
                <div className="animate-pulse">
                    {modal === 'cart' && <FontAwesomeIcon icon={faCartShopping} size="" className="w-28 h-28 text-gray-600" />}
                    {modal === 'notif' && <FontAwesomeIcon icon={faBell} size="" className="w-28 h-28 text-gray-600" />}
                </div>
                <div className="text-lg text-gray-900 tracking-wide dark:text-white/70 flex flex-col items-center">
                    <div className="w-3/4 mb-2 py-0.5 bg-gray-500 rounded animate-pulse"></div>
                    <div className="text-center">
                        {modal === 'cart' && 'Aucun article dans votre panier'}
                        {modal === 'notif' && 'Aucune notification'}
                    </div>
                    <div className="w-2/3 mt-2 py-0.5 bg-gray-500 rounded animate-pulse"></div>
                </div>
            </div>
            <div className="btn-modal-container">
                <button className="btn-modal-cancel capitalize" onClick={onClose}>Fermer</button>
            </div>
        </>
    );
}
export default ModalEmpty
import { faBell, faCheck, faCheckToSlot, faCreditCard, faEnvelope, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoaderComp from "../components/LoaderComp";
import { useAuth } from "../context/AuthContext";
import { useNotificationsStore } from "../hooks/useNotifications";
import { formatElapsedTime } from "../components/AppComp";
import { Check, CheckCheck, MessageSquareIcon } from "lucide-react";
import ModalEmpty from "./ModalEmpty";

const ModalNotifs = ({ onClose }) => {
    const { userSession } = useAuth()
    const isLoadingNotifs = useNotificationsStore((s) => s.isLoadingNotifs)
    const notifs = useNotificationsStore((s) => s.notifications)
    const markNotifRead = useNotificationsStore((s) => s.markNotifRead)
    // const markAllNotifRead = useNotificationsStore((s) => s.markAllNotifRead)
    const unreadNotifs = notifs.filter(n => n.notif_status === 'unread')
    const disableReadAll = unreadNotifs.length > 1
    const handleAllReadNotif = async () => {
        for (const notif of unreadNotifs) await markNotifRead(notif.notif_id)
    }

    if (isLoadingNotifs) return <LoaderComp />

    if (notifs?.length < 1) return (<ModalEmpty modal='notif' onClose={onClose} />)
    return (
        <>
            <div className="">
                <div className="motif-block">
                    {notifs?.map((notif, key) => (
                        <div className='motif-item flex mb-2' key={key}>
                            <div className="w-12 h-12 p-4 hidden sm:flex justify-center items-center bg-app-800 shadow rounded-full">
                                <FontAwesomeIcon icon={faEnvelope} className="text-2xl text-white" />
                            </div>
                            <div className={`bg-transparent rounded rounded-s-none p-4 border-b sm:border-l-4 border-app-h flex-grow text-left pb-6 tracking-wide ${notif.notif_status != 'read' && 'bg-app-500/20 dark:bg-app-300/10'}`}>
                                <div>{notif.notif_message}
                                    &nbsp;<span className="text-gray-500 float-end dark:text-gray-300">{formatElapsedTime(notif.notif_date)}</span>
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                {notif.notif_status === 'unread'
                                    ?
                                    <button title="Marquer comme lu" onClick={() => markNotifRead(notif.notif_id)}>
                                        <FontAwesomeIcon icon={faSquareCheck} className="text-2xl text-app-800 w-8 h-8 p-2 rounded-xl hover:text-app hover:dark:text-white btn-trans" />
                                    </button>
                                    :
                                    <CheckCheck className="text-2xl w-10 h-10 p-2 text-app rounded-xl btn-trans" />
                                }
                            </div>
                        </div>
                    ))}
                </div>
                <div className="btn-modal-container">
                    <button className="btn-modal-confirm capitalize w-auto" onClick={handleAllReadNotif} disabled={!disableReadAll}>Tout Marquer Comme Lu</button>
                    <button className="btn-modal-cancel capitalize" onClick={onClose}>Fermer</button>
                </div>
            </div>
        </>
    );
}
export default ModalNotifs
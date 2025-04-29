import { useEffect, useMemo, useState } from "react";
import { api } from "./api";
import { useAuth } from "../context/AuthContext";

export const useNotifications = (userId) => {
    const [isFetchingNotifs, setIsFetchingNotifs] = useState(false);
    const [notifs, setNotifs] = useState([]);
    // const [countNotifs, setCountNotifs] = useState(0);
    const { userSession } = useAuth()

    const fetchNotifications = async () => {
        setIsFetchingNotifs(true);
        try {
            const response = await api.get(`/notifs/fetch/${userId}`)
            setNotifs(response.data.dataNotifs)
            // setCountNotifs(response.data.countNotifs)
        } catch (error) {
            console.error('Erreur en récupérant les notifications:', error);
        } finally {
            setIsFetchingNotifs(false)
        }
    }

    useEffect(() => {
        if (userId) fetchNotifications()
    }, [userId]);


    const readNotification = async (notifId) => {
        console.log('/notifs/read/' + notifId);
        await api.get('/notifs/read/' + notifId);
        setNotifs((prev) => prev.map((n) => n.notif_id === notifId ? { ...n, notif_status: 'read' } : n))
    }
    // Ajouter une nouvelle notification (optionnel, selon ton besoin)
    const createNotification = async (type) => {
        try {
            const formPost = new FormData()
            formPost.append('userId', userId)
            formPost.append('type', type)
            await api.post('/notifs/create', formPost);
            fetchNotifications(); // Refresh
        } catch (error) {
            console.error('Erreur lors de la création de notification', error);
        }
    }

    const unreadNotifs = notifs.filter(n => n.notif_status === 'unread').length;
    // const unreadNotifs = useMemo(
    //     () => notifs.filter((n) => n.notif_status === 'unread').length,
    //     [notifs]
    // );

    return {
        notifs,
        isFetchingNotifs,
        unreadNotifs,
        readNotification,
        createNotification
    }
}

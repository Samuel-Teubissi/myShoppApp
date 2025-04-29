import { create } from "zustand"
import { api } from "./api"
import { SoundNotif } from "../components/AppComp"

export const useNotificationsStore = create((set, get) => ({
    notifications: [],
    isLoadingNotifs: false,

    fetchNotifications: async (userId) => {
        set({ isLoadingNotifs: true })
        try {
            const resNotif = await api.get(`/notifs/fetch/${userId}`)
            set({ notifications: resNotif.data.dataNotifs })
        } catch (error) {
            console.log('Erreur fetch articles', error);
        } finally {
            set({ isLoadingNotifs: false })
        }
    },
    markNotifRead: async (notifId) => {
        await api.get('/notifs/read/' + notifId)
        set((state) => ({
            notifications: state.notifications.map((n) => n.notif_id === notifId ? { ...n, notif_status: 'read' } : n)
        }))
    },
    createNotification: async (userId, type) => {
        try {
            const formPost = new FormData()
            formPost.append('userId', userId)
            formPost.append('type', type)
            await api.post('/notifs/create', formPost)
            SoundNotif()
            // const { fetchNotifications } = get()
            // await get().fetchNotifications() // Refresh
        } catch (error) {
            console.error('Erreur lors de la création de notification', error);
        }
    },
    // markAllNotifRead: async() => {
    //     const { notifications, markNotifRead } = get()
    //     const unread = notifications.filter((n) => n.notif_status === 'unread')
    //     for (const notif of unread) await markNotifRead(notif.notif_id)
    // },
    unreadNotifs: () => get().notifications.filter((n) => n.notif_status === 'unread').length
}))
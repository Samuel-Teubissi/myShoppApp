import { create } from "zustand"
import { persist } from "zustand/middleware"
import { api } from "./api"
import { randomIP, SoundNotif } from "../components/AppComp"
import { getSessionCookie } from "../context/useCookie"

export const useSessionStore = create(persist(
    (set) => ({
        sessionUser: null,
        createSession: (dataUser) => {
            const userCookie = getSessionCookie(localStorage.getItem('userID'))
            set({ sessionUser: dataUser })
        }
    }), {
    name: 'user-storage', // + randomIP(),
    storage: sessionStorage
}
))
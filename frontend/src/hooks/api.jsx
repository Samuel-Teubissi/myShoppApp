// src/api/axios.js
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const API_BASE_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Nécessaire pour envoyer les cookies (refresh_token)
})

api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('accessToken')

    if (token) {
        const decoded = jwtDecode(token)
        const isExpired = decoded.exp * 1000 < Date.now()
        if (isExpired) {
            try {
                const res = await axios.get('/auth/refresh', { withCredentials: true })
                const newToken = res.data.accessToken
                localStorage.setItem('accessToken', newToken)
                config.headers.Authorization = `Bearer ${newToken}`
            } catch (error) {
                localStorage.removeItem('accessToken')
                window.location.href = '/login'
                return Promise.reject(error)
            }
        } else {
            config.headers.Authorization = `Bearer ${token}`
        }
    }

    return config
})

export default api

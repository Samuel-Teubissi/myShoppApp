// api.js
import axios from 'axios'

// Récupérer le token JWT depuis localStorage (ou sessionStorage)
const getToken = () => localStorage.getItem('accessToken')
const API_BASE_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: API_BASE_URL, // ton backend
  withCredentials: true, // pour envoyer cookies/credentials si nécessaire
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
})

// Intercepteur pour attacher le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Intercepteur pour gérer les erreurs globalement (401, 403, etc.)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('⚠️ Non autorisé - Token invalide ou expiré')
        // Exemple : rediriger vers login
        // window.location.href = "/login";
      }
      if (error.response.status === 403) {
        console.error('⚠️ Accès refusé - Permissions insuffisantes')
      }
    }
    return Promise.reject(error)
  },
)

export default api

// api.js - Service pour les appels API avec Axios
import axios from 'axios';
import { API_href } from "../App.json";
import { APP_Articles } from '../App.json'
import { redirect } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    // headers: {
    //     // 'Content-Type': 'multipart/form-data'
    //     'Content-Type': 'application/json',
    // },
    withCredentials: true
})
// Flag pour éviter les multiples refresh en parallèle
let isRefreshing = false;
let failedQueue = [];
const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Intercepter les erreurs 401 pour refresh automatiquement
api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axios(originalRequest);
                });
            }
            originalRequest._retry = true;
            isRefreshing = true;
            try {
                const res = await axios.post('auth/refresh-token');

                const newToken = res.data.accessToken;
                localStorage.setItem('accessToken', newToken);
                api.defaults.headers.Authorization = `Bearer ${newToken}`;
                processQueue(null, newToken);
                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);

export { api }

export const searchArticles = async ({ search_article, search_categ, page = 1, controllerLink = 'home' }) => {
    const params = new URLSearchParams();

    // if (endpoint) params.append('search_controller', endpoint);
    if (search_article) params.append('search_article', search_article);
    if (search_categ) params.append('search_categ', search_categ);

    params.append('page', page);
    params.append('controller', controllerLink);

    const response = await api.get(`/articles/search?${params.toString()}`);
    // console.log(params.toString(), response.data);
    return response.data;

    let perPage = 3
    // const articles = { isLoading: false }
    const visiblesArticles = APP_Articles.filter(n => n.art_visible > 0)
    const filteredArticles = visiblesArticles.filter(art => {
        const matchName = art.article.toLowerCase().includes(search_article.toLowerCase());
        const matchCategory = search_categ === '0' || art.category === parseInt(search_categ);
        return matchName && matchCategory;
    })

    let total_articles = filteredArticles.length
    let total_pages = Math.ceil(Number(total_articles) / perPage)
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const dataArticles = filteredArticles.slice(start, end);
    const articles = {
        // ...articles,
        // isLoading: false,
        articlesData: dataArticles,
        total_pages: total_pages,
        total_articles: total_articles
    }
    return articles
}

export const getDefaultArticles = async ({ controllerLink, page = 1 }) => {
    // console.log('controllerLink, page ', `/articles/${controllerLink}/?page=${page}&controller=${controllerLink}`);

    // if (controllerLink === 'trader') {
    //     const response = await api.get(`/articles/${controllerLink}/?page=${currentPage}`)
    // } else {
    //     const response = await api.get('/articles/home')
    // }
    const response = await api.get(`/articles/${controllerLink}/?page=${page}&controller=${controllerLink}`)
    return response.data

    let perPage = 3
    // const articlesData = []
    let userID = localStorage.getItem('userId')
    const visiblesArticles = APP_Articles.filter(n => n.art_visible > 0)
    const filteredArticles = visiblesArticles.filter(prevArticle => {
        const matchUser = controllerLink === 'home' ? prevArticle.number !== userID : prevArticle.number === userID
        return matchUser
    })
    let total_articles = filteredArticles.length
    let total_pages = Math.ceil(Number(total_articles) / perPage)
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const dataArticles = filteredArticles.slice(start, end);
    const articles = {
        articlesData: dataArticles,
        total_pages: total_pages,
        total_articles: total_articles
    }
    return articles
}

export const getDataArticle = async ({ id }) => {
    try {
        const response = await api.get(`/article/${id}`)
        return response.data
    } catch (error) {
        console.log('getDataArticle :' + error)
        return null
    }
}

export const updateArticle = async ({ id, editData }) => {
    try {
        const response = await api.put(`/article/${id}`, editData)
        return response.data
    } catch (error) {
        console.log('updateArticle :' + error)
        return null
    }
}

export const deleteArticle = async ({ artId }) => {
    try {
        const response = await api.get(`/article/delete/${artId}`)
        return response.data
    } catch (error) {
        console.log('deleteArticle :' + error)
        return null
    }
}

export const getUsers = async () => {
    try {
        const response = await api.get('/admin/all_users')
        return response.data
    } catch (error) {
        console.log('getUsers Error :' + error)
        return null
    }
}

export const getDashboard = async () => {
    try {
        const response = await api.get('/admin/dashboard')
        return response.data
    } catch (error) {
        console.log('getDashboard Error :' + error)
        return null
    }
}

export const AppCategories = async () => {
    try {
        const response = await api.get(`/articles/categories`)
        return response.data.data
    } catch (error) {
        console.log('Erreur dans la requête des catégories', error)
    }
}

export const getArticlesAdmin = async () => {
    try {
        const response = await api.get('/admin/articles')
        return response.data
    } catch (error) {
        console.log('getArticlesAdmin Error :' + error)
        return null
    }
}

export const saveNotif = async (type) => {
    try {
        const response = await api.get('/notif/add?type=' + type)
        return response.data
    } catch (error) {
        console.log('save Notification Error :' + error)
        return null
    }
}
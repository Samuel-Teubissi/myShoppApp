// api.js - Service pour les appels API avec Axios
import axios from 'axios';
import { API_href } from "../App.json";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: API_BASE_URL,
    // headers: {
    //     // 'Content-Type': 'multipart/form-data'
    //     'Content-Type': 'application/json',
    // },
    withCredentials: true,
})

export const searchArticles = async ({ search_article, search_categ, page = 1, controllerLink = 'home' }) => {
    //  /articles/search
    const params = new URLSearchParams();

    // if (endpoint) params.append('search_controller', endpoint);
    if (search_article) params.append('search_article', search_article);
    if (search_categ) params.append('search_categ', search_categ);

    params.append('page', page);
    params.append('controller', controllerLink);

    const response = await api.get(`/articles/search?${params.toString()}`);
    // console.log(`/articles/search?${params.toString()}`, response);
    return response.data;
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
        const response = await api.post(`/article/update/${id}`, editData)
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
import Cookies from 'js-cookie';
import { randomIP } from '../components/AppComp';

// Récupérer le panier
export const getCartFromCookie = (userId = null) => {
    const key = userId ? `user_cart_${userId}` : 'user_cart';
    const cookieValue = Cookies.get(key);
    return cookieValue ? JSON.parse(cookieValue) : [];
}

// Sauvegarder le panier
export const saveCartToCookie = (cart, userId = null) => {
    const key = userId ? `user_cart_${userId}` : 'user_cart';
    const atDate = userId ? `cartCreatedAt_${userId}` : 'cartCreatedAt';
    // console.log(cart);
    const cookieCart = cart.map(({ id_articles, price, article, quantity, category, id_trader, orderedQty }) => ({
        id_articles, price, article, quantity, category, id_trader, orderedQty
    }))
    Cookies.set(key, JSON.stringify(cookieCart), {
        expires: 3, // jours avant expiration
        path: '/',  // accessible partout dans l'app
        secure: true, // recommandé en production
        sameSite: 'Lax' // ou 'Strict' selon le cas
    });
    Cookies.set(atDate, new Date().toISOString(), {
        expires: 3,
        path: '/',
        secure: true,
        sameSite: 'Lax'
    });
}

export const AlreadyHadCookie = (userId) => {
    const key = userId ? `user_cart_${userId}` : 'user_cart';
    return Cookies.get(key) !== undefined
}

export const clearCartCookie = (userId = null) => {
    const key = userId ? `user_cart_${userId}` : 'user_cart';
    const atDate = userId ? `cartCreatedAt_${userId}` : 'cartCreatedAt';
    Cookies.remove(key);
    Cookies.remove(atDate);
}

export const mergeCartsAndSave = (userId) => {
    const localCart = getCartFromCookie();
    const userCart = getCartFromCookie(userId);
    // 1. Crée une Map vide pour gérer les articles avec leur ID comme clé
    const mergedMap = new Map();
    // 2. Ajoute chaque article existant dans la Map
    userCart.forEach(item => {
        mergedMap.set(item.id_articles, { ...item })
    })
    // 3. Ajoute ou met à jour chaque nouvel article
    localCart.forEach(item => {
        if (mergedMap.has(item.id_articles)) {
            // Article déjà présent → on cumule les quantités
            const existingItem = mergedMap.get(item.id_articles)
            const updatedItem = {
                ...existingItem,
                orderedQty: existingItem.orderedQty + (item.orderedQty),
            }
            mergedMap.set(item.id_articles, updatedItem);
        } else {
            // Nouvel article → on l'ajoute
            mergedMap.set(item.id_articles, { ...item })
        }
    })
    // console.log('mergedMap.values()', localCart, userCart, mergedMap, mergedMap?.values());

    // 4. Convertit la Map en tableau
    const mergedCart = Array.from(mergedMap.values())
    saveCartToCookie(mergedCart, userId)
    clearCartCookie()
}


/**
 * Gestion des Session
 */

// Récupérer de session
export const getSessionCookie = (number) => {
    const key = `session_${number}`;
    const cookieValue = Cookies.get(key);
    if (cookieValue) return JSON.parse(cookieValue)
    return [];
}
// Sauvegarder la session
export const saveSessionCookie = (dataUser, data_trader, connexion) => {
    // const newIP = randomIP()
    const { username, number, password } = dataUser
    const key = `session_${number}`;
    const session = {
        "data_trader": data_trader,
        "user_id": number,
        "user_name": username,
        "user_number": number,
        "user_password": password,
        "role": "user",
        "connected": !!connexion
    }
    Cookies.set(key, JSON.stringify(session), {
        expires: 1, // jours avant expiration
        path: '/',  // accessible partout dans l'app
        secure: true, // recommandé en production
        sameSite: 'Lax' // ou 'Strict' selon le cas
    });
}


export const getNotifsCookie = () => {
    const userId = localStorage.getItem('userID')
    const key = `notifs_${userId}`;
    const cookieValue = Cookies.get(key);
    if (cookieValue) return JSON.parse(cookieValue)
    return []
}

export const saveNotifications = (type) => {
    const notifs = getNotifsCookie()

    let message = ''
    let role = ''
    switch (type) {
        case 'addCommand':
            message = 'Vous avez validé une nouvelle commande';
            role = 'user';
            break;
        case 'addUser':
            message = 'Un nouvel utilisateur inscrit sur la plateforme';
            role = 'admin';
            break;
        case 'addArticle':
            message = 'Vous avez ajouté un nouveau produit sur la plateforme';
            role = 'user';
            break;
        case 'updateArticle':
            message = 'Vous avez mis à jour un produit';
            role = 'user';
            break;
        case 'deleteArticle':
            message = 'Vous avez supprimé un produit du site';
            role = 'user';
            break;
        default:
            message = 'default';
            role = 'default';
            break;
    }
    const dataNotif = {
        notif_id: notifs.length + 1,
        notif_message: message,
        notif_user: userId,
        notif_type: type,
        notif_status: 'unread'
    }
    // Ajouter la new value si pas déjà présent
    if (notifs) {
        notifs.push(dataNotif);
    }
    Cookies.set(key, JOSN.stringify(notifs), {
        expires: 7, // jours avant expiration
        path: '/',  // accessible partout dans l'app
        // secure: true, // recommandé en production
        // sameSite: 'Lax' // ou 'Strict' selon le cas
    });
}

export const getArticlesCookie = () => {
    const userId = localStorage.getItem('userID')
    const key = `articles_${userId}`;
    const cookieValue = Cookies.get(key);
    if (cookieValue) return JSON.parse(cookieValue)
    return []
}
export const saveArticles = (dataArticles) => {
    const userId = localStorage.getItem('userID')
    const key = `articles_${userId}`;
    const articles = getArticlesCookie()
    if (articles) {
        articles.push(dataArticles);
    }
    Cookies.set(key, JOSN.stringify(articles), {
        expires: 7, // jours avant expiration
        path: '/',  // accessible partout dans l'app
    });
}

export const delSessionCookie = () => {
    let userID = localStorage.getItem('userID')
    Cookies.remove('session_' + userID);
}
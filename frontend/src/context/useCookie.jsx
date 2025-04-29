import Cookies from 'js-cookie';

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
    // console.log(cookieCart);

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

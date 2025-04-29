import { createContext, useContext, useEffect, useState } from 'react';
import { useModal } from './useModal';
// import { toast } from 'react-toastify';
import { toast } from "sonner";
import { throttle } from 'lodash';
import { AlreadyHadCookie, clearCartCookie, getCartFromCookie, saveCartToCookie } from './useCookie';
import { useAuth } from './AuthContext';

// 1. Création du contexte
const CartContext = createContext();

// 2. Provider
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [newsItems, setNewsItems] = useState(0)
    const { userSession } = useAuth()

    useEffect(() => {
        if (AlreadyHadCookie(userSession?.user_id)) {
            const initialCart = getCartFromCookie(userSession?.user_id)
            setCartItems(initialCart)
        }
        // saveCartToCookie(newCart, userSession?.user_id)
    }, [userSession])
    useEffect(() => {
        setNewsItems(cartItems.length)
    }, [cartItems.length]);

    const addToCart = throttle(async (item) => {
        // const res = await addToCart(product.id);
        const existingItem = cartItems.find((i) => i.id_articles === item.id_articles)
        if (!existingItem) {
            let newCart = [...cartItems, { ...item, orderedQty: 1 }]
            setCartItems(newCart)
            saveCartToCookie(newCart, userSession?.user_id)
            toast.success('Article ajouté au panier', { toastId: `cart-add-${item.id_articles}` })
        }
    }, 300)

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id_articles !== id))
        toast.info('Article retiré du panier', { toastId: `cart-remove-${id}` })
    }

    const isInCart = (id) => {
        return cartItems.some((item) => item.id_articles === id)
    }

    const updateCartQty = (idItem, newQty) => {
        setCartItems((prevCart) => prevCart.map((item) => item.id_articles === idItem ? { ...prevCart, ...item, orderedQty: newQty } : item))
    }

    const totalCart = cartItems.reduce((acc, item) => acc + item.price * item.orderedQty, 0)

    const clearCart = () => {
        setCartItems([])
        setNewsItems(0)
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, isInCart, clearCart, totalCart, updateCartQty, newsItems }}
        >
            {children}
        </CartContext.Provider>
    );
};

// 3. Hook personnalisé
export const useCart = () => useContext(CartContext);

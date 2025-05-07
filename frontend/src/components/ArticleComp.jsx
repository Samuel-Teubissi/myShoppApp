
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_href } from "../App.json";
import { faBoxOpen, faClock, faPencil, faPhone, faPlusMinus, faRecycle, faShapes, faShoppingCart, faTools, faTrash, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../context/useModal";
import EditArticleForm from "../modals/EditArticleForm";
import DeleteArticleForm from "../modals/DeleteArticleForm";
import { useEffect } from "react";
import { useCart } from "../context/useCart";
import ConnectToCart from "../modals/ConnectToCart";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { formatElapsedTime } from "./AppComp";
import { BoxIcon, ClockIcon, PhoneIcon } from "lucide-react";
import Aos from "aos";
import 'aos/dist/aos.css';
import { APP_Categories as articlesCategories } from '../App.json'

const ArticleComp = ({ art, articleRef, controller }) => {
    const imgLink = import.meta.env.VITE_IMG_URL + '/assets/img/articles/' + art.file_name
    // const imgLink = '/public/img/articles/' + art.file_name
    // const imgLink = API_href + '/assets/img/articles/' + art.file_name
    // const imgLink = `${import.meta.env.VITE_PUBLIC_URL}/images/articles/${art.file_name}`;
    const artID = art.id_articles
    const { openModal, closeModal } = useModal();
    const { addToCart, removeFromCart, isInCart } = useCart();
    // const { handleEdit, handleDelete } = useLinks()
    const handleEdit = () => {
        openModal(<EditArticleForm id={artID} onClose={closeModal} />, 'Editer un article')
    }
    const handleDelete = () => {
        openModal(<DeleteArticleForm artId={artID} artName={art.article} onClose={closeModal} />, 'Supprimer un article')
    }

    const inCart = isInCart(artID);
    const handleAddCart = () => {
        if (inCart) {
            removeFromCart(artID);
        } else {
            const article = art
            addToCart(article);
        }
    }
    const artPrice = Number(art.price)
    const articlePrice = artPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'XAF' })
    const articleNumber = Number(art.number).toLocaleString('fr-FR')
    const rest = art.quantity > 1 ? ' restants' : ' restant'
    // console.log('formatElapsedTime(art.date)', formatElapsedTime(art.date));

    useEffect(() => {
        Aos.init({
            duration: 800,
            once: true
        })
    }, []);

    return (
        <div className="border border-app-050 w-80 bg-app-050 rounded-xl overflow-hidden dark:bg-app-600/5 dark:text-white/90 dark:border-none" ref={articleRef} data-aos='fade-right'>
            <div className="w-full h-60 mx-auto rounded-br-[60px] relative">
                {/* <img src={imgLink} alt="Image de l'article" className="w-full h-full object-cover rounded-full border-2 border-gray-300" /> */}
                <img src={imgLink} alt="Image de l'article" className="w-full h-full object-cover" />
                <div className="cart-price font-medium bg-app rounded-3xl rounded-bl-none text-white box-border absolute bottom-0.5 right-0.5 py-1 px-4 shadow">
                    <span className="text-lg">{articlePrice}</span>
                </div>
            </div>
            <div className="p-5 pb-3">
                <div className="flex items-center h-[70px] text-left capitalize line-clamp-2 text-app overflow-ellipsis pb-4">
                    <span className="text-xl font-medium" title={art.article}>{art.article}</span>
                </div>
                <div className="text-sm text-black/70 dark:text-white/70">
                    <div className="flex flex-col gap-2 px-2">
                        {controller !== 'trader' && <>
                            <div className="flex gap-2 items-center text-gray-900 dark:text-white/90 uppercase">
                                <span className="bg-app p-1 flex justify-center items-center rounded-full"></span>
                                <span className="text-base">{art.name}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className="text-app-500 justify-center items-center rounded-full"><PhoneIcon className="w-4 h-4" /></span>
                                <span className="text-sm">{articleNumber}</span>
                            </div>
                        </>}
                        <div className="flex items-center text-center uppercase">
                            <span title={art.content} className="border rounded-full border-app-500 py-0.5 px-3 text-sm text-app-500">{articlesCategories[art.category]}</span>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex gap-2 items-center">
                                <span className="text-app-500 flex justify-center items-center">
                                    {/* <FiPackage className="inline-block" /> */}
                                    <BoxIcon className="w-4 h-4" />
                                </span>
                                <span className="text-sm">{art.quantity > 0 ? art.quantity + rest : 'Epuisé'}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className="text-app-500 flex justify-center items-center">
                                    <ClockIcon className="w-4 h-4" />
                                </span>
                                <span className="text-sm">Il y a {formatElapsedTime(art.date)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full mt-3">
                        {art.quantity > 0 && controller !== 'trader' && <>
                            {
                                inCart ? <button onClick={handleAddCart} title="Retirer du panier" className="flex items-center justify-center p-3 text-white bg-gray-500 w-full rounded-xl gap-2 hover:bg-gray-600 btn-trans">
                                    <MdRemoveShoppingCart className="w-5 h-5" />
                                    <span>Retirer du panier</span>
                                </button>
                                    : <button onClick={handleAddCart} title="Ajouter au panier" className="flex items-center justify-center p-3 text-white bg-app-700 hover:bg-app btn-trans w-full rounded-xl gap-2">
                                        <MdAddShoppingCart className="w-5 h-5" />
                                        <span>Ajouter au panier</span>
                                    </button>
                            }
                        </>}
                        {controller !== 'trader' && art.quantity < 1 && <button onClick={handleAddCart} title="Ajouter au panier" className="flex items-center justify-center p-3 text-white bg-app-700 hover:bg-app btn-trans w-full rounded-xl gap-2 capitalize" disabled>
                            <MdAddShoppingCart className="w-5 h-5" />
                            <span>épuisé</span>
                        </button>}
                    </div>
                </div>
                {/* bg-opacity-11 */}
                <div className="flex justify-end gap-1 rounded-bl-xl rounded-br-xl">
                    {controller === 'trader' && <>
                        <button onClick={handleEdit} title="Modifier l'article">
                            <FontAwesomeIcon icon={faPencil} size="" className="w-8 h-8 box-border bg-app-900 p-2 shadow rounded-full flex items-center transition duration-300 ease-out transform hover:scale-105 text-white hover:bg-app hover:text-white" />
                        </button>
                        <button onClick={handleDelete} title="Supprimer l'article">
                            <FontAwesomeIcon icon={faTrash} size="" className="w-8 h-8 box-border bg-app-900 p-2 shadow rounded-full flex items-center transition duration-300 ease-out transform hover:scale-105 text-white hover:bg-red-500 hover:text-white" />
                        </button>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}

export default ArticleComp
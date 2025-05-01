import { useEffect, useState } from "react";
import { APP_Categories as categories } from "../App.json";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import PaginateComponent from "../components/PaginateComp";
import { Select_categories } from "../components/AppComp";
import ModalAddComp from "../modals/ModalAddComp";
import { useModal } from "../context/useModal";
import SearchBar from "../components/SearchBar";
import LoaderComp from "../components/LoaderComp";
import ModalCart from "../modals/ModalCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHandHoldingHand, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { ShoppingCartIcon, SquarePlusIcon } from "lucide-react";
import useLinks from "../hooks/useLinks";
import { mergeCartsAndSave } from "../context/useCookie";

const UserPage = () => {
    const { userSession, Become_Trader, isLogging } = useAuth()
    const { openModal, closeModal } = useModal();
    const { handleAdd, handleCart } = useLinks()

    useEffect(() => {
        document.title = 'Dashboard | MyShop App'
    }, []);
    useEffect(() => {
        if (userSession.user_id) {
            mergeCartsAndSave(userSession.user_id)
        }
    }, [userSession])
    const canAddArticles = !!userSession.data_trader

    if (isLogging) return <LoaderComp />
    return (
        <div id='scroll-container'>
            {/* <ToastContainer position="bottom-right" autoClose={3000} /> */}
            <div className="">
                <div className="pt-40 text-white pb-1 bg-red-500 w-full banner_trader text-center">
                    <h1 className="mb-2">Bienvenue {userSession?.user_name} !</h1>
                    <div className="text-xl xl:text-3xl font-semibold">Votre numéro est le +237 {userSession?.user_number}</div>
                    <div className="m-4 p-1 xl:px-5 py-4">
                        {isLogging
                            ? <LoaderComp />
                            : canAddArticles
                                ? <>
                                    {/* <h3 className="p-4">Espace Marchand</h3> */}
                                    <div className="flex gap-x-2 text-white justify-center trader-block">
                                        <button onClick={handleAdd} className="btn-trade">
                                            <SquarePlusIcon className="h-5 w-5" />
                                            <span>Ajouter un article</span>
                                        </button>
                                        <button onClick={handleCart} className="btn-trade">
                                            <ShoppingCartIcon className="h-5 w-5" />
                                            <span>Votre panier</span>
                                        </button>
                                    </div>
                                </>
                                : <div className="bg-app-h/50 pt-8 p-3 xl:pt-4 xl:pr-6 w-full xl:w-[60%] rounded-xl mx-auto flex flex-col xl:flex-row justify-center items-center gap-3 xl:gap-6">
                                    {/* <button onClick={BecomeTrader} className="">Devenir Trader ?</button> */}
                                    <div className="text-center xl:text-right tracking-wider">
                                        <h3 className="mb-3">Commencez cette <span className="border-b-2 border-dashed border-app-700 text-xl text-app capitalize">nouvelle aventure</span> avec nous !
                                            {/* <div className="border-b border-white border-spacing-1 border w-1/3 float-end"></div> */}
                                        </h3>
                                        <p>Vous pourrez ajouter des articles sur le site et être contacté par des clients intéressés.</p>
                                    </div>
                                    <button onClick={() => Become_Trader()} className="w-[180px] px-2 py-5 rounded-3xl btn-trade">
                                        <FontAwesomeIcon icon={faHandHoldingHand} className="w-full h-10 mb-2" />
                                        <div>Devenir Trader ?</div>
                                    </button>
                                </div>
                        }
                    </div>
                </div>
                <div className="w-full h-full">
                    <SearchBar endpoint='/articles/search' defaultEndpoint='trader' placeholder="Rechercher dans vos articles..." />
                </div>
            </div>
        </div>
    )
}
export default UserPage
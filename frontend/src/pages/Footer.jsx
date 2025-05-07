import { NavLink } from "react-router-dom";
import LogoLink from '../assets/img/LOGO_MyShop.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCartShopping, faHandHoldingHand, faHouse, faInfoCircle, faParagraph, faRightToBracket, faUser, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../context/AuthContext";
import ModalAddComp from "../modals/ModalAddComp";
import ModalCart from "../modals/ModalCart";
import ModalNotifs from "../modals/ModalNotifs";
import { useModal } from "../context/useModal";
import useLinks from "../hooks/useLinks";
import { MdLocalGroceryStore, MdLogin, MdLogout } from 'react-icons/md';
import { Bell, BookIcon, HelpCircleIcon, HomeIcon, KeyIcon, ShoppingCartIcon, SquarePlusIcon, UserPlus } from "lucide-react";

const Footer = () => {
    const { userSession, Become_Trader } = useAuth()
    const { openModal, closeModal } = useModal()
    const { handleAdd, handleLogout, handleCart, handleNotifs } = useLinks()

    return (
        <>
            <footer className="text-black/70 text-xl dark:text-dark-app-100 dark:border-dark-app-600">
                <div className=" flex flex-col lg:flex-row gap-8 px-10 py-14 md:py-20 md:pb-28 md:px-36 md:gap-36">
                    <div className="order-2 md:order-1">
                        <NavLink to='/' className='border-0 text-center flex flex-col justify-center items-center'>
                            <img src={LogoLink} alt="Logo MyShopAPP" className="" width={120} height={120} />
                            <h3>MyShop App</h3>
                        </NavLink>
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="footer_body flex flex-col md:flex-row gap-8 md:gap-16">
                            <ul className="">
                                <li>
                                    <h3>MyShop App</h3>
                                    <span></span>
                                </li>
                                <li>
                                    <NavLink to='/home'>
                                        <HomeIcon />Acceuil
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/about'>
                                        <HelpCircleIcon />A propos
                                    </NavLink>
                                </li>
                            </ul>
                            <ul className="">
                                <li>
                                    <h3>Espace compte</h3>
                                    <span></span>
                                </li>
                                {!userSession?.user_id
                                    ? <>
                                        <li>
                                            <NavLink to='/login'>
                                                {/* <FontAwesomeIcon icon={faUser} className="mr-2" /> */}
                                                <KeyIcon /> Se Connecter
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to='/register'>
                                                <UserPlus />
                                                {/* <MdLocalGroceryStore className="text-3xl" /> */}
                                                S'inscire
                                            </NavLink>
                                        </li>
                                    </>
                                    : <>
                                        <li>
                                            <NavLink to={'/' + userSession?.role}>
                                                <BookIcon />
                                                Dashboard
                                            </NavLink>
                                        </li>
                                        <li>
                                            <button onClick={handleCart}>
                                                <ShoppingCartIcon className="" />Consulter votre panier</button>
                                        </li>
                                        {userSession?.data_trader
                                            ? <li>
                                                <button onClick={handleAdd}>
                                                    <SquarePlusIcon />Ajouter un article</button>
                                            </li>
                                            : <li>
                                                <button onClick={() => Become_Trader()}>
                                                    <FontAwesomeIcon icon={faHandHoldingHand} className="mr-2" />Devenir Trader</button>
                                            </li>
                                        }
                                        <li>
                                            <button onClick={handleNotifs}>
                                                <Bell />Voir vos notifications</button>
                                        </li>
                                        <li>
                                            <button onClick={handleLogout}>
                                                <MdLogout className="text-2xl" />Se déconnecter</button>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="py-7 border-t border-white justify-center mx-14">
                    <div className="text-sm">© 2025 MyShop App, Version 1.4 ~ All rights reserved.</div>
                </div>
            </footer>
        </>
    );
}
export default Footer
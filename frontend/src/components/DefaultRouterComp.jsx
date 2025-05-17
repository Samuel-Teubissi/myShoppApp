import { Link, NavLink, Outlet, useLocation, useNavigate, useNavigation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"
// import { toast } from "react-toastify"
import LogoLink from '../assets/img/LOGO_MyShop.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faRightToBracket, faRightFromBracket, faMoon, faSun, faUserAlt, faXmark } from '@fortawesome/free-solid-svg-icons'; // Version solid
import { faSquarePlus as faRegularSquarePlus, faArrowAltCircleUp as faRegularRightBracket, faBell } from '@fortawesome/free-regular-svg-icons'; // Version regular
import ModalAddComp from "../modals/ModalAddComp"
import { useRef } from "react"
import { useModal } from "../context/useModal"
import ModalCart from "../modals/ModalCart"
import ModalNotifs from "../modals/ModalNotifs"
import { clearCartCookie } from "../context/useCookie"
import { useCart } from "../context/useCart"
// import { useNotifications } from "../hooks/useNotifications old"
import { useNotificationsStore } from "../hooks/useNotifications"
import Footer from "../pages/Footer"
import { queryClient } from "../main"
import useLinks from "../hooks/useLinks"
import { MdLocalGroceryStore, MdLogin, MdLogout, MdPhoneAndroid, MdWbSunny } from 'react-icons/md';
import { HomeIcon, BookIcon, Bell, ShoppingCartIcon, User, SquarePlus, SquarePlusIcon, HelpCircleIcon, UserPlus, UserMinus, MoonIcon, SunIcon, UserCheck, KeyIcon, XIcon, Sidebar, SearchIcon, MenuIcon } from 'lucide-react';
import { setThemeApp } from "./AppComp"
import useCloseOutsideModal from "../hooks/useCloseOutsideModal"
import Aos from "aos";
import 'aos/dist/aos.css';
import ScrollToTop from "../hooks/useScrollToTop";
import LoaderComp from "./LoaderComp";
import useShowSearchBar from "../hooks/useShowSearchBar";

export default function DefaultRouterComp() {
    const { isAuthenticated, logout, userSession } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isHoverLogout, setIsHoverLougout] = useState(false);
    const [showMenu, setshowMenu] = useState(false);
    // const menu_nav = useRef(null)
    // const menu_bar = useRef(null)
    // const menu_line = useRef([])
    const { openModal, closeModal } = useModal();
    const { clearCart, newsItems } = useCart()
    const { handleAdd, handleLogout, handleCart, handleNotifs } = useLinks()
    const [openSubmenu, setOpenSubmenu] = useState(false);
    const [openHeader, setOpenHeader] = useState(false);
    const SidebarRef = useRef(null)
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const location = useLocation();
    const toggleShowSearchBar = useShowSearchBar((s) => s.ToggleShowBar)
    const resetShowSearchBar = useShowSearchBar((s) => s.resetShowBar)
    const showSearchBar = useShowSearchBar((s) => s.showSearchBar)
    const [visibleSearchBar, setVisibleSearchBar] = useState(false);

    // const navigation = useNavigation();

    // const isLoadingPage = navigation.state === "loading";
    useEffect(() => {
        // Quand l'URL change, on arrête le loading
        resetShowSearchBar()
        setIsLoadingPage(false);
        setVisibleSearchBar(location.pathname === '/home' || location.pathname === '/user')
    }, [location.pathname]);
    // useEffect(() => {
    // }, [isLoadingPage]);


    const toggleNav = () => {
        setshowMenu(!showMenu)
        if (menu_nav.current) {
            menu_nav.current.classList.toggle('open')
            menu_bar.current.classList.toggle('open')
            menu_line.current.forEach(line => {
                line.classList.toggle('open')
            })
        }
    }

    // const showNav = (elt) => {
    //     const parentLi = elt.parentElement
    //     parentLi.classList.toggle('showNav')
    // }

    // Fonction pour gérer le hover
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    // const handleMouseLogoutEnter = () => setIsHoverLougout(true);
    // const handleMouseLogoutLeave = () => setIsHoverLougout(false);

    const fetchNotifications = useNotificationsStore((s) => s.fetchNotifications)
    const unreadNotifs = useNotificationsStore((s) => s.unreadNotifs())
    useEffect(() => {
        if (userSession?.user_id) fetchNotifications(userSession.user_id)
    }, [userSession?.user_id]);

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, []);

    const handleDarkMode = () => {
        const isDark = document.documentElement.classList.contains('dark')
        setTimeout(() => {
            setThemeApp(isDark ? 'light' : 'dark')
            setIsLoadingPage(false);
        }, 200);
    }

    // Fermer la Sidebar si onclique à l'extérieur
    useCloseOutsideModal(SidebarRef, () => setOpenHeader(false))
    const handleCloseSidebar = (e) => {
        if (e.target.tagName === 'A' || e.target.tagName === 'SPAN' || e.target.tagName === 'BUTTON') {
            // Fermer *avec un petit délai*
            // setTimeout(() =>
            // if (e.target.href !== location.pathname) {
            //     setIsLoadingPage(true);
            // }
            setOpenHeader(false)
            // , 50);
        }
    }

    // document.querySelectorAll('.header-modal ul li a').forEach(link => {
    //     link.addEventListener('click', () => setOpenHeader(false))
    // })

    useEffect(() => {
        Aos.init({
            // duration: 800,
            // once: true
        })
    }, []);

    return <>
        <ScrollToTop />
        <header className="fixed w-full h-auto top-0 left-0 z-50 pointer-events-none">
            <nav>
                <div className="animT pointer-events-auto">
                    <NavLink to='/' className='flex items-center'>
                        <img src={LogoLink} alt="Logo MyShopAPP" className="" width={50} height={50} />
                        <h4 className="hidden md:block">MyShop App</h4>
                    </NavLink>
                </div>
                <ul className="nav-link pointer-events-auto">
                    {visibleSearchBar &&
                        <li className={`btn-trans nav-search relative ${showSearchBar ? 'active' : ''}`}>
                            <button onClick={toggleShowSearchBar} title="Effectuer une recherche">
                                <SearchIcon className="" />
                            </button>
                        </li>
                    }
                    <li className="btn-trans nav-trans relative">
                        <button onClick={handleCart} title="Consulter le panier">
                            {/* <FontAwesomeIcon icon={faCartPlus} color="rgba(190, 24, 93)" /> */}
                            <span>Panier</span>
                            <ShoppingCartIcon className="" />
                        </button>
                        {newsItems > 0 &&
                            <span className="--icon-notif">{newsItems}</span>
                        }
                    </li>
                    {userSession?.data_trader && <>
                        <li className="btn-trans nav-trans" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <button onClick={handleAdd} title="Ajouter un article">
                                <span>Ajouter un article</span>
                                <SquarePlusIcon />
                                {/* <FontAwesomeIcon icon={isHovered || isModalOpen ? faSquarePlus : faRegularSquarePlus} color="rgba(190, 24, 93)" /> */}
                            </button>
                        </li>
                    </>
                    }
                    {userSession?.user_id && <>
                        <li className="btn-trans nav-trans relative">
                            <button onClick={handleNotifs} title="Notifications">
                                <span>Notifications</span>
                                <Bell />
                            </button>
                            {unreadNotifs > 0 &&
                                <span className="--icon-notif">{unreadNotifs}</span>
                            }
                        </li>
                    </>
                    }
                    <li>
                        <button onClick={() => setOpenHeader(true)} >
                            <span>Mon Compte</span>
                            <User className="hidden md:block" />
                            <MenuIcon className="md:hidden" />
                        </button>
                    </li>
                </ul>
                {/* <div ref={menu_bar} onClick={toggleNav} className="menu rounded">
                    {[...Array(3)].map((_, key) => (
                        <div ref={menu_line.current[key]} key={key}></div>
                    ))} */}
                {/* <div ref={(el) => menu_line.current[0] = el} className="line"></div>
                    <div ref={(el) => menu_line.current[1] = el} className="line"></div>
                    <div ref={(el) => menu_line.current[2] = el} className="line"></div> */}
                {/* </div> */}
            </nav>
        </header >
        <div className={`inset-0 z-50 modal-overlay fixed top-0 left-0 w-full h-screen backdrop-blur-sm flex justify-center items-center btn-trans  transition-opacity duration-250 ease-in ${openHeader ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className={`modal-Sidebar w-4/5 min-w-[25%] sm:w-96 transition-transform duration-300 ease-out ${openHeader ? 'translate-x-0' : 'translate-x-full'}`} ref={SidebarRef}>
                <XIcon className="absolute top-11 right-4 w-8 h-8 rounded-full hover:bg-app transition duration-300 text-gray-500 hover:text-white" onClick={() => setOpenHeader(false)} title="Fermer" />
                <div className="">
                    <NavLink to='/' className='flex items-center' onClick={handleCloseSidebar}>
                        <img src={LogoLink} alt="Logo MyShopAPP" className="" width={70} height={70} />
                        <h3>MyShop App</h3>
                    </NavLink>
                </div>
                <ul className={`--nav_submenu mt-4 ${openSubmenu ? 'showNav' : ''}`} onClick={handleCloseSidebar}>
                    <li>
                        <NavLink to='/home'>
                            <HomeIcon />
                            <span>Acceuil</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/about'>
                            <HelpCircleIcon />
                            <span>à Propos</span>
                        </NavLink>
                    </li>
                    {isAuthenticated
                        ? <>
                            <li>
                                <NavLink to={'/' + userSession?.role}>
                                    <BookIcon />
                                    <span>Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="" title="Se déconnecter">
                                    {/* <FontAwesomeIcon icon={isHoverLogout ? faRightToBracket : faRightFromBracket} className="text-white text-lg" /> */}
                                    <MdLogout className="text-2xl" />
                                    <span className="--nav-sub_span">Se déconnecter</span>
                                    {/* <FontAwesomeIcon icon={faRightFromBracket} className="" /> */}
                                </button>
                            </li>
                        </>
                        : <>
                            <li>
                                <NavLink to='/login'>
                                    <KeyIcon />
                                    <span>Se Connecter</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/register'>
                                    <UserPlus />
                                    <span>S'inscrire</span>
                                </NavLink>
                            </li>
                        </>
                    }
                </ul>
                <div className="btn-trans nav-trans switchDark">
                    <input type="checkbox" onChange={handleDarkMode} id="switchDark" />
                    <label htmlFor="switchDark">
                        <MoonIcon className="inline dark:hidden" />
                        <SunIcon className="hidden dark:inline" />
                    </label>
                    <span className="inline dark:hidden">Dark Mode</span>
                    <span className="hidden dark:inline">Light Mode</span>
                </div>
                {isAuthenticated && <div className="online-user">
                    <div className="">
                        <span className="inline-block bg-green-500 h-4 w-4 rounded-full"></span> Vous êtes connecté !
                        <div className="w-1/2 border-b border-gray-400 dark:border-gray-200/20 pt-2"></div>
                    </div>
                    <div className="text-sm mt-2">
                        <ul>
                            <li>Session : <span className="text-app">{userSession?.user_name}</span></li>
                            <li>Numéro : <span className="text-app">{userSession?.user_number}</span></li>
                        </ul>
                    </div>
                </div>
                }
            </div>
        </div>
        <div className="ms_Main">
            {isLoadingPage
                ? <LoaderComp />
                : <Outlet />
            }
            {/* <Outlet /> */}
        </div>
        <Footer />
    </>
}
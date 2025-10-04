import { NavLink } from 'react-router-dom'
import LogoLink from '../assets/img/LOGO_MyShop.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell,
  faCartShopping,
  faHandHoldingHand,
  faHouse,
  faInfoCircle,
  faParagraph,
  faRightToBracket,
  faUser,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons'
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons'
import { useAuth } from '../context/AuthContext'
import ModalAddComp from '../modals/ModalAddComp'
import ModalCart from '../modals/ModalCart'
import ModalNotifs from '../modals/ModalNotifs'
import { useModal } from '../context/useModal'
import useLinks from '../hooks/useLinks'
import { MdLocalGroceryStore, MdLogin, MdLogout } from 'react-icons/md'
import {
  Bell,
  BookIcon,
  HelpCircleIcon,
  HomeIcon,
  KeyIcon,
  ShoppingCartIcon,
  SquarePlusIcon,
  UserPlus,
} from 'lucide-react'
import LogoApp from '../components/LogoApp'

const Footer = () => {
  const { userSession, Become_Trader } = useAuth()
  const { openModal, closeModal } = useModal()
  const { handleAdd, handleLogout, handleCart, handleNotifs } = useLinks()
  const optionTrader = userSession?.data_trader ? (
    <li>
      <button onClick={handleAdd}>
        <SquarePlusIcon className="w-5 h-5" />
        Ajouter un article
      </button>
    </li>
  ) : (
    <li>
      <button onClick={() => Become_Trader()}>
        <FontAwesomeIcon icon={faHandHoldingHand} className="mr-2 w-5 h-5" />
        Devenir Trader
      </button>
    </li>
  )

  return (
    <>
      <footer className="text-black/70 text-xl dark:text-dark-app-100 dark:border-dark-app-600">
        <div className=" flex flex-col gap-4 px-10 py-14 md:px-36">
          {/* <div className="order-2 md:order-1 hidden md:block">
            <NavLink
              to="/"
              className="border-0 text-center flex flex-col md:justify-center md:items-center"
            >
              <img
                src={LogoLink}
                alt="Logo MyShopAPP"
                className=""
                width={120}
                height={120}
              />
              <h3>MyShop App</h3>
            </NavLink>
          </div> */}
          <div className="animT">
            <LogoApp />
          </div>
          <div className="order-1 md:order-2">
            <div className="footer_body w-full flex flex-col md:flex-row gap-4 md:gap-8">
              <ul>
                <li>
                  <h3>Liens Utiles</h3>
                  <span></span>
                </li>
                <li>
                  <NavLink to="/home">
                    <HomeIcon className="w-5 h-5" />
                    Acceuil
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about">
                    <HelpCircleIcon className="w-5 h-5" />A propos
                  </NavLink>
                </li>
              </ul>
              <ul>
                <li>
                  <h3>Espace compte</h3>
                  <span></span>
                </li>
                {!userSession?.user_id ? (
                  <>
                    <li>
                      <NavLink to="/login">
                        {/* <FontAwesomeIcon icon={faUser} className="mr-2" /> */}
                        <KeyIcon className="w-5 h-5" /> Se Connecter
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/register">
                        <UserPlus className="w-5 h-5" />
                        {/* <MdLocalGroceryStore className="text-3xl" /> */}
                        S'inscire
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink to={'/' + userSession?.role}>
                        <BookIcon className="w-5 h-5" />
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <button onClick={handleCart}>
                        <ShoppingCartIcon className="w-5 h-5" />
                        Consulter votre panier
                      </button>
                    </li>
                    {userSession?.role != 'admin' && optionTrader}
                    <li>
                      <button onClick={handleNotifs}>
                        <Bell className="w-5 h-5" />
                        Voir vos notifications
                      </button>
                    </li>
                    <li>
                      <button onClick={handleLogout}>
                        <MdLogout className="text-2xl w-5 h-5" />
                        Se déconnecter
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="py-7 border-t border-white justify-center flex mx-14">
          <div className="text-sm w-full text-center">
            © 2025 MyShop App, Version 3.0 ~ All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}
export default Footer

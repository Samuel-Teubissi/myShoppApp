import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"
import { toast } from "react-toastify"
import LogoLink from '../assets/img/LOGO_MyShop.png'
// import '../assets/js/index'

export default function DefaultRouterComp() {
    // const location = 'http://localhost/MyShopI/'
    // const link = location + "assets/img/LOGO MyShop.png"
    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout();
        console.log('deconnexion Header');
        navigate('/login')
        // navigate('/login')
    };

    // className="fixed w-full bg-white h-auto"
    return <>
        <header >
            <nav>
                <div className="logo animT">
                    <NavLink to='/' className='border-0'><img src={LogoLink} alt="Logo MyShopAPP" /> My ShopAPP</NavLink>
                </div>
                <div className="etc">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <ul className="nav-link">
                    <li>
                        <NavLink to='/'>Acceuil</NavLink>
                    </li>
                    <li>
                        <NavLink to='/about'>à Propos</NavLink>
                    </li>
                    <li>
                        {isAuthenticated
                            ? <>
                                <NavLink to='/user'>Mon compte</NavLink>
                                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded ml-4 hover:bg-red-600" >Déconnexion</button>
                            </>
                            : <NavLink to='/login'>Mon compte</NavLink>
                        }
                    </li>
                </ul>
            </nav>
        </header>
        <div className="text-center">
            <Outlet />
            <br /><br />
        </div>
    </>
}
import { NavLink } from 'react-router-dom'
import LogoLink from '../assets/img/logo-B.png'
import LogoLinkDark from '../assets/img/logo-W.png'

const LogoApp = () => {
  return (
    <NavLink to="/" className="flex items-center w-fit">
      <img
        src={LogoLink}
        alt="Logo MyShopAPP"
        className="inline-block dark:hidden"
        width={120}
        // height={50}
      />
      <img
        src={LogoLinkDark}
        alt="Logo MyShopAPP"
        className="hidden dark:inline-block"
        width={120}
        // height={50}
      />
      {/* <h4 className="hidden md:block">MyShop App</h4> */}
    </NavLink>
  )
}
export default LogoApp

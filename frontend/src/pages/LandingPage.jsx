import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player'
import Lottie from 'lottie-react'
import animationData from '../assets/img/shopping-cart.json'

const LandingPage = () => {
  const navigate = useNavigate()

  const openHome = () => {
    navigate('/home')
  }
  useEffect(() => {
    document.title = 'Bienvenue sur MyShop App'
  }, [])
  return (
    <>
      {/* <div className="ms_Main"></div> */}
      <div className="h-fit min-h-svh box-border bg-app-h banner_home text-white relative grid grid-cols-1 md:grid-rows-1 md:grid-cols-2 gap-0">
        <div className="animT pl-0 sm:pl-14 font-bold flex justify-center sm:justify-start md:justify-center text-center md:text-left items-center md:items-start flex-col gap-y-2">
          {/* <div className="pt-20 hidden sm:block md:hidden"></div> */}
          <div className="w-[90%] lg:w-full">
            <h1 className="tracking-tighter font-black heroTitle pt-20 md:pt-0">
              Bienvenue sur My&nbsp;Shop
            </h1>
            <h3 className="mt-3">
              Votre site e-commerce pour la vente d'articles sans intermédiaires
            </h3>
          </div>
          <p className="font-normal text-base/tight md:text-lg mt-6 w-[90%] lg:w-full">
            Un article dans la liste ci-dessous vous interresse vous n'avez qu'à
            joindre le numéro en dessous et discuter des détails de la
            transaction avec le marchand.{' '}
            <span className="text-app-400 min-w-fit inline-block">
              Rien de plus simple !
            </span>
          </p>
          <p className="flex justify-center lg:justify-normal">
            <button
              onClick={openHome}
              className="landing-btn mt-6 bg-app-h py-3 px-5 rounded-[4px] flex items-center gap-2 hover:gap-3 hover:bg-app transition duration-300 font-normal text-sm md:text-base"
            >
              Notre liste de produits{' '}
              <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
            </button>
          </p>
        </div>
        <div className="flex items-start sm:items-center justify-center">
          {/* <Player
            autoplay
            loop
            src={animationData}
            style={{ height: '120px', width: '120px' }}
          /> */}
          <Lottie
            animationData={animationData}
            loop={true}
            className="w-[65%] sm:h-[60%] md:w-auto xl:h-[100%]"
          />
        </div>
      </div>
      {/* <Lottie
        animationData={animationData}
        loop={true}
        className="w-[55%] h-[55%] md:w-[60%] md:h-[60%]  absolute bottom-0 right-2 hidden sm:block lg:hidden"
        // w-[60%] h-[60%] xl:h-[100%] absolute
      /> */}
    </>
  )
}
export default LandingPage

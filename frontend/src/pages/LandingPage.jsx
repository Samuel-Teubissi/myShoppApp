import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate()

    const openHome = () => {
        navigate('/home')
    }
    useEffect(() => {
        document.title = 'Bienvenue sur MyShop App'
    }, []);
    return (
        <>
            <div className="ms_Main bg-app-h banner_home text-white">
                <div className="animT text-center font-bold flex justify-center items-center flex-col h-full gap-y-2">
                    <div className="w-[90%] md:w-[70%]">
                        <h1 className="">Bienvenue sur My ShopAPP</h1>
                        <h2 className="mt-2">
                            Site Numéro 1 de la vente d'articles sans intermédiaires
                        </h2>
                    </div>
                    <p className="font-normal text-base md:text-lg mt-4 w-[90%] md:w-[40%]">
                        Un article dans la liste ci-dessous vous interresse vous n'avez qu'à joindre le numéro en dessous et discuter des détails de la transaction avec le marchand ! Rien de plus simple !
                    </p>
                    <p>
                        <button onClick={openHome} className="landing-btn mt-8 bg-app-h py-4 px-5 rounded-3xl hover:bg-app transition duration-300 font-normal flex items-center mx-auto gap-2">Découvrez notre liste de produits <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
}
export default LandingPage
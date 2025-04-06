import { useEffect, useState } from "react";
import { APP_Categories as categories } from "../App.json";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PaginateComponent from "../components/PaginateComp";

const HomePage = () => {
    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()
    const actualPage = window.location.search
    const [reloadPaginate, setReloadPaginate] = useState('')

    useEffect(() => {
        if (actualPage.search('page') > 0) setReloadPaginate(actualPage); console.log('reloadPaginate : ' + reloadPaginate);
    }, [actualPage]);

    return (
        <div className="ms_Main">
            {/* <ToastContainer position="bottom-right" autoClose={3000} /> */}
            <br />
            <h1 className="Header text-2xl font-bold animT text-center">Bienvenue sur My ShopAPP</h1>
            <h2 className="Header2 text-xl font-bold animT text-center">
                Site Numéro 1 de la vente d'articles sans intermédiaires
            </h2>
            <br />
            <p className="hT animT">
                Un article dans la liste ci-dessous vous interresse vous n'avez qu'à joindre le numéro en dessous et discuter des détails de la transaction avec le marchand ! Rien de plus simple !
            </p>
            <div className="lnd_add animZ">
                <a href="admin/cart" className="btn">Accéder au panier</a>
            </div>
            <div className="articlesH animT">Articles En Vente</div>
            <br />
            <div className="search text-center ">
                <form method="GET">
                    <input type="search" name="s" placeholder="Recherchez un article ?" className='inpt-f' />
                    <select name="categ" className="slct">
                        {categories.map((categ, index) => (
                            <option value={index} key={index}>{categ}</option>
                        ))}
                    </select>
                    <button type="submit" className='confirm'>Rechercher</button>
                </form>
            </div>
            <div className="articlesH">Vos articles</div>
            <div className="main articles justify-center mt-4">
                <PaginateComponent link='home' reload={reloadPaginate} />
            </div>
        </div>
    )
}

export default HomePage
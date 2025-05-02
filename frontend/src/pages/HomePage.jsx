import { useEffect } from "react";
import SearchBar from "../components/SearchBar";
// import { FaSearch } from "react-icons/fa";

const HomePage = () => {
    useEffect(() => {
        document.title = "Page d'acceuil | MyShop App"
    }, []);
    return (
        <>
            <div className="xl:w-1/2 mx-auto text-center pt-10">
                <h2 className="font-semibold dark:text-white/90">
                    Derniers produits en vente
                </h2>
                <span className="border-b-2 border-app-500 pt-4 block w-1/2 mx-auto"></span>
            </div>
            <SearchBar endpoint='/articles/search' defaultEndpoint='home' placeholder="Rechercher des articles sur le site" />
        </>
    )
}

export default HomePage
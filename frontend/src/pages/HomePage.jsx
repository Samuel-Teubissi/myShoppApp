import { useEffect } from "react";
import SearchBar from "../components/SearchBar";
// import { FaSearch } from "react-icons/fa";

const HomePage = () => {
    useEffect(() => {
        document.title = "Page d'acceuil | MyShop App"
    }, []);
    return (
        <>
            <SearchBar endpoint='/articles/search' defaultEndpoint='home' placeholder="Rechercher des articles sur le site" />
        </>
    )
}

export default HomePage
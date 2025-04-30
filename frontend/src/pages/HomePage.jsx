import SearchBar from "../components/SearchBar";
// import { FaSearch } from "react-icons/fa";

const HomePage = () => {
    return (
        <>
            <SearchBar endpoint='/articles/search' defaultEndpoint='home' placeholder="Rechercher des articles sur le site" />
        </>
    )
}

export default HomePage
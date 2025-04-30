import SearchBar from "../components/SearchBar";
// import { FaSearch } from "react-icons/fa";

const HomePage = () => {
    return (
        <>
            <div className="mt-24 mb-14">
                <div className="w-full">
                    <SearchBar endpoint='/articles/search' defaultEndpoint='home' placeholder="Rechercher des articles sur le site" />
                </div>
            </div>
        </>
    )
}

export default HomePage
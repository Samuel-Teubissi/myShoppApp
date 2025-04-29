import { useEffect, useState } from "react";
import { APP_Categories as categories } from "../App.json";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
import { toast } from "sonner";
import PaginateComponent from "../components/PaginateComp";
import { Select_categories } from "../components/AppComp";
import { API_href } from "../App.json";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCartPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import ListArticlesComp from "../components/ListArticlesComp";
import SearchPaginate from "../components/SearchPaginate";
// import { FaSearch } from "react-icons/fa";

const HomePage = () => {
    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()
    // const actualPage = window.location.search
    const [reloadPaginate, setReloadPaginate] = useState('')
    // const [searchResultsDatas, setSearchResultsDatas] = useState('')
    const [searchDatas, setSearchDatas] = useState('')
    const [searchResultsTotal, setSearchResultsTotal] = useState('')
    const [searchResultsMessage, setSearchResultsMessage] = useState('')
    const [searchForm, setSearchForm] = useState({ search: '', categ: '' });

    const paramsGet = new URLSearchParams()
    const location = useLocation()
    const paramSearch = new URLSearchParams(location.search)
    const currentPage = parseInt(paramSearch.get('page')) || 1
    axios.defaults.baseURL = API_href;

    // const handleSearch = (e) => {
    //     setSearchForm({ ...searchForm, [e.target.name]: e.target.value })
    // }
    // const handleSubmitSearch = (e) => {
    //     e.preventDefault()
    //     // const searchDatas = e.target.elements
    //     setSearchDatas(e.target.elements)

    //     // Data de début de recherche
    //     paramsGet.set('search_article', searchDatas.search_article.value)
    //     paramsGet.set('search_categ', searchDatas.search_categ.value)
    //     paramsGet.set('page', currentPage)

    //     const queryKey = ['search']
    //     const { isLoading: isSearching, data, isFetching } = useQuery(queryKey, axios.get(`/articles/search?${paramsGet.toString()}`).then((r) => r.data.data), {
    //         refetchOnWindowFocus: false
    //     })
    //     // try {
    //     //     const searchResults = await axios.get(`/articles/search?${paramsGet.toString()}`)

    //     //     if (searchResults?.data?.success) {
    //     //         setSearchResultsDatas(searchResults?.data?.articles)
    //     //         setSearchResultsTotal(searchResults?.data?.total_articles)
    //     //         setSearchResultsMessage(searchResults?.data?.message)
    //     //     }
    //     // } catch (error) {
    //     //     toast.error('Erreur dans la requête de recherche')
    //     //     console.log('Erreur dans la requête de recherche :', error)
    //     // }
    // }

    return (
        <div className="ms_Main">
            <br />
            <h1 className="Header text-2xl font-bold animT text-center">Bienvenue sur My ShopAPP</h1>
            <h2 className="Header2 text-xl font-bold animT text-center">
                Site Numéro 1 de la vente d'articles sans intermédiaires
            </h2>
            <br />
            <p className="hT animT">
                Un article dans la liste ci-dessous vous interresse vous n'avez qu'à joindre le numéro en dessous et discuter des détails de la transaction avec le marchand ! Rien de plus simple !
            </p>
            <div className="articlesH animT">Articles En Vente</div>
            <br />
            <div className="search text-center ">
                <form onSubmit={handleSubmitSearch}>
                    <input type="search" name="search_article" placeholder="Recherchez un article ?" className='px-4 py-3.5 border-1 border-gray-400 rounded shadow-md' />
                    <Select_categories classData='hover:bg-gray-300 shadow-md' name="search_categ" />
                    <button type="submit" className='confirm'>
                        <FontAwesomeIcon icon={faSearch} size="x" className="text-white" />
                    </button>
                </form>
            </div>
            {isSearchParams
                ?
                // <>
                //     <div className="text-xl p-1 font-bold border-b-2 border-black w-1/2 mt-4 mx-auto">Résultats de votre recherche</div>
                //     <div className="main articles justify-center mt-4">
                //         {searchResultsTotal > 0
                //             ? <div className="bg-green-700 w-1/2 py-5 rounded text-white">
                //                 Votre recherche à renvoyée au total " {searchResultsTotal} " article(s)
                //             </div>
                //             : <div className="bg-gray-400 w-1/2 py-5 rounded text-white">'Aucun résultat pour cette recherche :-/'</div>
                //         }
                //         {searchResultsTotal > 0 &&
                //             <ListArticlesComp articles={searchResultsDatas} />
                //         }
                //     </div>
                // </>
                <>
                    <SearchPaginate searchDatas={searchDatas} />
                </>
                : <>
                    <div className="main articles justify-center mt-4">
                        <div className="articlesH">Vos articles</div>
                        <PaginateComponent link='home' />
                    </div>
                </>
            }
        </div>
    )
}

export default HomePage
import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Select_categories } from "./AppComp"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import PaginateComponent from "./PaginateComp"
import SearchPaginate from "./SearchPaginate"
import { useSearch } from "../hooks/useSearch"
import { useScrollAfterSearch } from "../hooks/useScrollAfterSearch"
import LoaderComp from "./LoaderComp"
import { useAuth } from "../context/AuthContext"
import ErrorComp from "./ErrorComp"
import { DeleteIcon, RecycleIcon, SearchIcon, XIcon } from "lucide-react"
import LoaderSkeletonArticle from "./LoaderSkeletonArticle"
import useShowSearchBar from "../hooks/useShowSearchBar"
import { APP_Categories as articlesCategories } from '../App.json'


const SearchBar = ({ endpoint, defaultEndpoint, placeholder = "Rechercher..." }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const resultsRef = useRef(null);
    const { userSession } = useAuth()
    const showSearchBar = useShowSearchBar((s) => s.showSearchBar)
    const resetShowSearchBar = useShowSearchBar((s) => s.resetShowBar)

    // useScrollAfterSearch(resultsRef, !!searchQuery)

    // Récupération des paramètres de l'URL
    const searchParams = new URLSearchParams(location.search);
    let cancelSearch = searchParams.size > 0
    // console.log('cancelSearch', cancelSearch);


    const [searchValues, setSearchValues] = useState({
        search_article: searchParams.get('search_article') || '',
        search_categ: searchParams.get('search_categ') || 0,
        page: searchParams.get('page') || 1,
    })

    // Gestion du changement dans les inputs
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target
    //     setSearchValues(prev => ({ ...prev, [name]: value }))
    // }
    // const handleInputChangeSelect = (e) => {
    //     const params = new URLSearchParams()
    //     if (searchValues.search_categ) params.set('search_categ', searchValues.search_categ)
    //     setSearchValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
    //     navigate({
    //         pathname: location.pathname,
    //         search: params.toString()
    //     })
    // }
    // Mise à jour de l'URL lors de la soumission du formulaire
    const handleSubmitSearch = (e) => {
        e.preventDefault()
        // const params = new URLSearchParams()
        // // Ajout des paramètres non-vides uniquement
        // if (searchValues.search_article) params.set('search_article', searchValues.search_article)
        // if (searchValues.search_categ) params.set('search_categ', searchValues.search_categ)
        // // Mise à jour de l'URL avec les nouveaux paramètres
        // resetShowSearchBar()
        // navigate({
        //     pathname: location.pathname,
        //     search: params.toString()
        // })
    }
    // Fonction pour effacer la recherche
    const clearSearch = () => {
        setSearchValues({ search_article: '', search_categ: '', page: 1 });
        navigate({
            pathname: location.pathname,
            search: ''
        })
        resetShowSearchBar()
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSearchValues(prev => ({ ...prev, [name]: value }))
    }
    useEffect(() => {
        const params = new URLSearchParams()
        // Ajout des paramètres non-vides uniquement
        if (searchValues.search_article) params.set('search_article', searchValues.search_article)
        if (searchValues.search_categ) params.set('search_categ', searchValues.search_categ)
        // Mise à jour de l'URL avec les nouveaux paramètres
        // resetShowSearchBar()
        navigate({
            pathname: location.pathname,
            search: params.toString()
        })
    }, [searchValues]);
    // Extraction des paramètres de recherche
    const params = {
        search_article: searchParams.get('search_article') || '',
        search_categ: searchParams.get('search_categ') || 0,
        page: parseInt(searchParams.get('page') || '1'),
        controllerLink: defaultEndpoint
    }
    const searchArticle = params.search_article
    const searchCateg = params.search_categ >= 1

    // Utilisation du hook personnalisé pour gérer la recherche
    const { searchQuery, defaultQuery, hasSearchParams } = useSearch(params)

    if (searchQuery?.error) { console.log(searchQuery?.error) }
    if (searchQuery.isError) return (<ErrorComp message="Erreur d'accès à la base de donnée du site" />)
    if (defaultEndpoint === 'trader' && !userSession?.data_trader) return <ErrorComp type="empty" message="Vous n'avez encore aucun article exposé sur notre site !" />

    return (
        <>
            {/* pt-12 sm:max-w-[90%] */}
            <form id="container-search" onSubmit={handleSubmitSearch} className={`h-32 py-1.5 w-full bg-deg-light dark:bg-deg-dark fixed top-[58px] md:top-[65px] left-0 z-10 backdrop-blur-[60px] overflow-hidden transition-transform duration-300 ease-in-out ${showSearchBar ? 'translate-y-0 pointer-events-auto' : '-translate-y-full pointer-events-none'}`} >
                <div className="max-w-[95%] mx-auto flex flex-col gap-4 justify-center items-center">
                    <div className="h-11 w-full md:w-1/2 flex justify-center items-center gap-2">
                        <div className="h-full w-full flex justify-center items-center gap-2 relative">
                            <input type="search" name="search_article" placeholder={placeholder} className='h-full bg-white text-black/70 py-6 pl-10 pr-12 outline-none border border-app-300/70 w-full' value={searchValues.search_article} onChange={handleInputChange} />
                            <button type="submit" className='absolute top-3.5 right-3' title="Rechercher">
                                <SearchIcon className="transition duration-300 text-gray-400 hover:text-app-600 w-8 h-8 dark:text-app-400" />
                            </button>
                        </div>
                        {cancelSearch && (
                            <button
                                onClick={clearSearch}
                                title="Effacer la recherche" className="h-4" >
                                <DeleteIcon className="w-8 h-8 box-border bg-app-900 p-2 shadow rounded-full flex items-center transition duration-300 ease-out transform hover:scale-105 text-white hover:bg-app hover:text-white" />
                            </button>
                        )}
                    </div>
                    <div className="dark:text-white/90 max-w-[70%] w-full text-center">
                        <span className="text-black/70 dark:text-white/90 font-semibold hidden">Trier les résultats par :</span>
                        <Select_categories classData='hover:bg-gray-100 bg-white p-2.5 rounded-xl border border-app-300/70 w-3/4 md:w-40 dark:bg-dark-div dark:text-white/90 dark:hover:bg-app-600/80' name="search_categ" valueProp={searchValues.search_categ} onChange={handleInputChange} />
                    </div>
                </div>
            </form>
            <div className=" w-full flex flex-col items-center main-search pt-4" ref={resultsRef}>
                {
                    searchQuery.isLoading
                        ? <LoaderComp />
                        :
                        hasSearchParams ? (<>
                            <div className="xl:w-1/2 mx-auto text-left my-5">
                                <h3 className="font-semibold dark:text-white/90">
                                    Résultats de votre recherche
                                </h3>
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    Votre recherche à renvoyée au total <span className="font-bold text-lg">{searchQuery.data?.total_articles}</span> article{searchQuery.data?.total_articles > 1 && 's'}
                                </div>
                                <div className="mt-1 space-x-1">
                                    {searchArticle && <span className="border rounded-full border-app-500 py-0.5 px-3 text-sm text-app-500">article: "{params.search_article}"</span>
                                    }
                                    {searchCateg && <span className="border rounded-full border-app-500 py-0.5 px-3 text-sm text-app-500">catégorie: "{articlesCategories[params.search_categ]}"</span>
                                    }
                                </div>
                                <span className="border-b border-gray-500 pt-4 block"></span>
                            </div>
                            <SearchPaginate
                                results={searchQuery.data?.articlesData || []}
                                currentPage={params.page}
                                totalItems={searchQuery.data?.total_articles || 0}
                                totalPages={searchQuery.data?.total_pages || 0}
                                isLoading={searchQuery.isLoading}
                                controller={defaultEndpoint}
                            // onPageChange={handlePageChange}
                            />
                        </>)
                            : (
                                <PaginateComponent defaultQuery={defaultQuery} controller={defaultEndpoint} />
                            )}
            </div>
        </>
    )
}
export default SearchBar
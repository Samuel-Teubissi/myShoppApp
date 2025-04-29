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


const SearchBar = ({ endpoint, defaultEndpoint, placeholder = "Rechercher..." }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const resultsRef = useRef(null);
    const { userSession } = useAuth()

    // useScrollAfterSearch(resultsRef, !!searchQuery)

    // Récupération des paramètres de l'URL
    const searchParams = new URLSearchParams(location.search);
    let cancelSearch = searchParams.size > 1
    // console.log('cancelSearch', cancelSearch);


    const [searchValues, setSearchValues] = useState({
        search_article: searchParams.get('search_article') || '',
        search_categ: searchParams.get('search_categ') || 0,
        page: searchParams.get('page') || 1,
    })

    // Gestion du changement dans les inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSearchValues(prev => ({ ...prev, [name]: value }))
    }
    // Mise à jour de l'URL lors de la soumission du formulaire
    const handleSubmitSearch = (e) => {
        e.preventDefault()
        const params = new URLSearchParams()
        // Ajout des paramètres non-vides uniquement
        if (searchValues.search_article) params.set('search_article', searchValues.search_article)
        if (searchValues.search_categ) params.set('search_categ', searchValues.search_categ)
        // Mise à jour de l'URL avec les nouveaux paramètres
        navigate({
            pathname: location.pathname,
            search: params.toString()
        })
    }
    // Fonction pour effacer la recherche
    const clearSearch = () => {
        setSearchValues({ search_article: '', search_categ: '' });
        navigate({
            pathname: location.pathname,
            search: ''
        })
    }
    // Extraction des paramètres de recherche
    const params = {
        search_article: searchParams.get('search_article') || '',
        search_categ: searchParams.get('search_categ') || 0,
        page: parseInt(searchParams.get('page') || '1', 10),
        controllerLink: defaultEndpoint
    }

    // Utilisation du hook personnalisé pour gérer la recherche
    const { searchQuery, defaultQuery, hasSearchParams } = useSearch(params);

    if (searchQuery?.error) { console.log(searchQuery?.error) }
    if (searchQuery.isError) return (<div className="mt-10" ref={resultsRef}><ErrorComp message="Erreur d'accès à la base de donnée du site" /></div>)
    if (defaultEndpoint === 'trader' && !userSession?.data_trader) return <div className="mt-10" ref={resultsRef}><ErrorComp type="nothing" message="Vous n'avez encore aucun article exposé sur notre site !" /></div>

    return (
        <>
            <form id="container-search" onSubmit={handleSubmitSearch}>
                <div className="h-11 relative flex justify-center gap-2">
                    <div className="h-full relative w-[40rem] max-w-[90%]">
                        <input type="search" name="search_article" placeholder={placeholder} className='h-full bg-white dark:bg-app-300/30 rounded-full pl-10 pr-12 outline-app border border-app-300/70 w-full' value={searchValues.search_article} onChange={handleInputChange} />
                        <button type="submit" className='absolute top-1.5 right-3' title="Rechercher">
                            <SearchIcon className="transition duration-300 text-gray-400 hover:text-app-600 w-8 h-8 dark:text-app-400" />
                        </button>
                    </div>
                    {cancelSearch && (
                        <button
                            onClick={clearSearch}
                            title="Effacer la recherche" >
                            <DeleteIcon className="w-8 h-8 box-border bg-app-900 p-2 shadow rounded-full flex items-center transition duration-300 ease-out transform hover:scale-105 text-white hover:bg-app hover:text-white" />
                        </button>
                    )}
                </div>
                <div className="dark:text-white/90 max-w-[90%] mx-auto flex flex-col xl:flex-row gap-1 items-center justify-center mt-2">
                    <span className="text-black/70 dark:text-white/90">Trier les résultats par :</span>
                    <Select_categories classData='hover:bg-gray-100 bg-white p-2.5 rounded-xl border border-app-300/70 xl:w-40 dark:bg-dark-div dark:text-white/90 dark:hover:bg-app-600/80' name="search_categ" valueProp={searchValues.search_categ} onChange={handleInputChange} />
                </div>
            </form>
            <div className="mt-3 flex flex-col items-center" ref={resultsRef}>
                {searchQuery.isLoading
                    ? <LoaderSkeletonArticle />
                    : hasSearchParams ? (<>
                        <div className="xl:w-1/2 mx-auto text-left my-5">
                            <h2 className="font-semibold dark:text-white/90">
                                Résultats de votre recherche
                            </h2>
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                Votre recherche à renvoyée au total <span className="font-bold text-lg">{searchQuery.data?.total_articles}</span> article{searchQuery.data?.total_articles > 1 && 's'}
                            </div>
                            <div className="mt-1">
                                {params.search_article && <span className="border rounded-full border-app-500 py-0.5 px-3 text-sm text-app-500">article: "{params.search_article}"</span>
                                }
                            </div>
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
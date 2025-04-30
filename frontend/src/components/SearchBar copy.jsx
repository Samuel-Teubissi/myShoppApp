import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Select_categories } from "./AppComp"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import PaginateComponent from "./PaginateComp"
import { API_href } from "../App.json";
import { useQuery } from "@tanstack/react-query"
import SearchPaginate from "./SearchPaginate"
import axios from "axios"


const SearchBar = ({ endpoint, defaultEndpoint, placeholder = "Rechercher..." }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const getParam = new URLSearchParams(location.search)
    // const url = new URL(window.location)
    const url = new URLSearchParams()
    const [defaultCateg, setDefaultCateg] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [searchDataForm, setSearchDataForm] = useState({ search_article: '', search_categ: '' });
    const [searchForm, setSearchForm] = useState({ search_article: '', search_categ: '' });
    // const [searchName, setSearchName] = useState('');
    // const [searchCateg, setSearchCateg] = useState('');

    useEffect(() => {
        const search_article = getParam.get('search_article') || ''
        const search_categ = getParam.get('search_categ') || ''
        const search_page = parseInt(getParam.get('page')) || 1
        if (search_article || search_categ) {
            setCurrentPage(search_page);
            // setSearchDataForm((prev) => ({ ...prev, search_article: search_article }))
            // setSearchDataForm((prev) => ({ ...prev, search_categ: search_article }))
            setShowResults(true);
            // Construire les paramètres de recherche
            const params = {};
            for (const [key, value] of getParam.entries()) {
                params[key] = value;
            }
            setSearchParams(params);
        }
    }, [window.location.search]);

    const handleSubmitSearch = (e) => {
        e.preventDefault()
        const { elt, value } = e.target.elements
        setSearchForm((prev) => ({ ...prev, [name]: value }))
        // setSearchForm((prev) => ({ ...prev, [elt.search_article]: elt.search_article.value }))
        // setSearchForm((prev) => ({ ...prev, [elt.search_categ]: elt.search_categ.value }))
        console.log(searchForm);
        // const search_article = searchDataForm.search_article.trim()
        // const search_categ = parseInt(searchDataForm.search_categ.trim())
        const search_article = searchDataForm.search_article
        const search_categ = parseInt(searchDataForm.search_categ)
        const paramsGet = new URLSearchParams()
        // const search_page = parseInt(getParam.get('page')) || 1

        // Fonction pour rediriger avec les paramétres du formulaire
        // const url = new URLSearchParams()
        if (search_article || search_categ > 0) {
            url.set('search_article', search_article)
            url.set('search_categ', search_categ)
            url.set('page', 1)

            setShowResults(true)
            navigate(`${location.pathname}?${url.toString()}`);
        } else {
            url.delete('search_article', search_article)
            url.delete('search_categ', search_categ)
            url.delete('page', 1)

            setShowResults(false)
            navigate(`${location.pathname}?${url.toString()}`);
        }

        const params = { search_article: search_article, search_categ: search_categ, search_page: 1 }
        setSearchParams(params)
    }

    const handleSearchChange = (e) => {
        const { name, value } = e.target
        setSearchDataForm((prev) => ({ ...prev, [name]: value }))
    }

    // Requête pour les résultats de recherche avec React Query
    const searchQuery = useQuery({
        queryKey: ['search-articles', endpoint, searchDataForm, currentPage],
        queryFn: async () => {
            // console.log('endpoint', endpoint, 'searchDataForm', JSON.stringify(searchForm), 'currentPage', currentPage);
            if (!showResults || !searchDataForm) return { dataArticles: [], totalArticles: 0 }
            axios.defaults.baseURL = import.meta.env.VITE_API_URL;
            // axios.defaults.baseURL = API_href;
            axios.defaults.withCredentials = true;
            const response = await axios.get(`${endpoint}?${url.toString()}`, {
                params: {
                    ...searchParams,
                    search_article: searchDataForm.search_article,
                    search_categ: searchDataForm.search_categ,
                    page: currentPage
                }
            })
            return {
                dataArticles: response.data.articlesData || [],
                totalArticles: response.data.total_articles || 0,
                totalPages: response.data.total_pages || 0
            }
        },
        enabled: showResults || !!searchDataForm,
        keepPreviousData: true,
        // refetchOnMount: false,        // Empêche la revalidation lors du montage du composant
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,   // Option de ne pas refaire la requête lors du regain de focus
        staleTime: 1000 * 60 * 5,      // Les données sont considérées fraîches pendant 5 minutes
        cacheTime: 1000 * 60 * 60,
    })
    // Fonction pour changer de page
    const handlePageChange = (page) => {
        const newPage = page + 1
        setCurrentPage(newPage)
        // Mettre à jour l'URL avec le numéro de page
        const url = new URLSearchParams()
        url.searchParams.set('page', newPage)
        console.log(url);
        // Mettre à jour les paramètres
        const updatedParams = { ...searchParams, newPage }
        setSearchParams(updatedParams)
        console.log('location', `${location.pathname}?${url.toString()}`);
        navigate(`${location.pathname}?${url.toString()}`);
    }
    // Fonction pour effacer la recherche
    const clearSearch = () => {
        setSearchDataForm({ search_article: '', search_categ: '' });
        setShowResults(false);

        // Nettoyer les paramètres de l'URL
        const url = new URL(window.location);
        url.searchParams.delete('search');
        url.searchParams.delete('page');
        window.history.pushState({}, '', url);
    };

    if (searchQuery?.error) { console.log(searchQuery?.error) }
    if (searchQuery.isError) return <div className="w-1/2 h-4 bg-gray-500 text-black mx-auto">Erreur dans le sytème de recherche</div>
    return (
        <>
            <form onSubmit={handleSubmitSearch} className="flex justify-center ">
                {!!searchDataForm && (
                    <button type="button"
                        onClick={clearSearch}
                        className="clear-search text-xl bg-gray-400 py-3 px-4 hover:bg-app hover:text-white rounded-l-xl" >&times;</button>
                )}
                <input type="search" name="search_article" placeholder="Recherchez un article ?" className='px-4 py-3.5 border-1 border-gray-400' value={searchDataForm.search_article} onChange={handleSearchChange} />
                <Select_categories classData='hover:bg-gray-300 border-l-2 border-gray-100 bg-gray-200 pl-1' name="search_categ" value={searchDataForm.search_categ} onChange={handleSearchChange} />
                <button type="submit" className='bg-gray-400 p-4 hover:bg-pink-600 rounded-r-xl'>
                    <FontAwesomeIcon icon={faSearch} size="x" className="text-white" />
                </button>
            </form>
            <div id="container-search" className=" flex justify-center mt-4 flex-wrap">
                {searchQuery.isLoading ? <div className="w-full"><div className="w-1/2 bg-gray-500 text- mx-auto p-4">Chargement de données en cours...</div></div>
                    : showResults ? (<>
                        <div className="w-full">
                            <div className="text-xl p-2 font-bold border-b-2 border-black w-1/2 mt-4 mx-auto">
                                Résultats de votre recherche
                            </div>
                        </div>
                        {searchQuery.data?.totalArticles > 0 && <div className="w-full">
                            <div className="bg-green-700 w-1/2 py-5 rounded text-white mt-2 mx-auto">
                                Votre recherche à renvoyée au total " {searchQuery.data?.totalArticles} " article(s)
                            </div>
                        </div>}
                        <SearchPaginate
                            results={searchQuery.data?.dataArticles || []}
                            currentPage={currentPage}
                            totalItems={searchQuery.data?.totalArticles || 0}
                            totalPages={searchQuery.data?.totalPages || 0}
                            onPageChange={handlePageChange}
                            isLoading={searchQuery.isLoading}
                        />
                    </>)
                        : (
                            <PaginateComponent link={defaultEndpoint} />
                        )}
            </div>
        </>
    )
}
export default SearchBar
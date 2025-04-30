import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import axios from "axios"
import { API_href } from "../App.json";
import { useLocation, useNavigate } from "react-router-dom";
import ListArticlesComp from "./ListArticlesComp";
import LoaderComp from "./LoaderComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import ErrorComp from "./ErrorComp";
import { useSearch } from "../hooks/useSearch";
import LoaderSkeletonArticle from "./LoaderSkeletonArticle";

export default function PaginateComponent({ defaultQuery, controller }) {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const initialPage = parseInt(searchParams.get('page')) || 1
    const [currentPage, setCurrentPage] = useState(initialPage)

    const handlePageClick = (seletedItem) => {
        const selectedPage = seletedItem.selected + 1
        setCurrentPage(selectedPage)
        // Mettre à jour l'URL en fonction de la page sélectionnée
        navigate(`${location.pathname}?page=${selectedPage}`);
        // ScrollOnTop()
    }
    // const scrollToPagination = () => {
    //     const scrollSearch = document.getElementById("article-container-search");
    //     if (scrollSearch) {
    //         scrollSearch.scrollIntoView({ behavior: "smooth", block: "start" });
    //     }
    // }


    if (defaultQuery?.error) { console.log(defaultQuery?.error) }
    if (defaultQuery?.isLoading) return <div className="mt-1"><LoaderSkeletonArticle /></div>
    if (defaultQuery?.isError) return <ErrorComp message="Erreur de récupération des articles de la page d'acceuil." />
    if (!defaultQuery.data?.articlesData || defaultQuery.data?.total_pages < 1) return <ErrorComp type="nothing" message="Vous n'avez aucun article exposé sur notre site !" />
    return (
        <>
            <div className="">
                {/* <h2 className="text-3xl dark:border-app-400/30 mx-auto cursor-default mt-24 mb-5 dark:text-dark-app-50">Articles En Vente</h2> */}
            </div>
            <div id='scroll-container'></div>
            <ListArticlesComp articles={defaultQuery.data?.articlesData || []} controller={controller} />
            <div id="endSearch" >
                <ReactPaginate
                    breakLabel='...'
                    nextLabel='>'
                    onPageChange={handlePageClick}
                    marginPagesDisplayed={1} // Nombre de pages à afficher au début et à la fin
                    pageRangeDisplayed={3}
                    pageCount={defaultQuery.data?.total_pages}
                    previousLabel='<'
                    renderOnZeroPageCount={null}
                    containerClassName={"pagination flex select-none"}
                    activeClassName={"active"}
                    forcePage={currentPage - 1}
                />
            </div>
        </>
    )
}
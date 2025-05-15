import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import axios from "axios"
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
    const initialPage = parseInt(searchParams.get('page'))
    const [currentPage, setCurrentPage] = useState(initialPage)

    useEffect(() => {
        setCurrentPage(initialPage || 1)
    }, [initialPage]);
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
    if (defaultQuery?.isError) return <ErrorComp message="Petit soucis technique avec la base de données." />
    if (!defaultQuery.data?.articlesData || defaultQuery.data?.total_pages < 1) return <ErrorComp type="empty" message="Vous n'avez aucun article exposé sur notre site !" />
    return (
        <>
            <ListArticlesComp articles={defaultQuery.data?.articlesData || []} controller={controller} />
            <div id="endSearch" >
                <ReactPaginate
                    breakLabel='...'
                    nextLabel='>'
                    onPageChange={handlePageClick}
                    marginPagesDisplayed={1} // Nombre de pages à afficher au début et à la fin
                    pageRangeDisplayed={1}
                    pageCount={defaultQuery.data?.total_pages}
                    previousLabel='<'
                    renderOnZeroPageCount={null}
                    containerClassName={"pagination flex justify-center select-none"}
                    activeClassName={"active"}
                    forcePage={currentPage - 1}
                />
            </div>
        </>
    )
}
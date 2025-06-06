import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom";
import ListArticlesComp from "./ListArticlesComp";
import { useQuery } from "@tanstack/react-query";
import LoaderComp from "./LoaderComp";
import ErrorComp from "./ErrorComp";
import LoaderSkeletonArticle from "./LoaderSkeletonArticle";

const SearchPaginate = ({ results, currentPage, totalItems, isLoading, totalPages, controller }) => {

    //onPageChange, 
    const navigate = useNavigate();
    const location = useLocation();

    const handlePageChange = ({ selected }) => {
        const searchParams = new URLSearchParams(location.search);
        // Page indexée à 1 pour l'utilisateur
        const newPage = selected + 1;
        searchParams.set('page', newPage);

        navigate({
            pathname: location.pathname,
            search: searchParams.toString()
        });
    };
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    // const articles = Object.entries(results)

    // if (isLoading) return <LoaderSkeletonArticle />
    if (totalItems < 1) return <ErrorComp type='empty' message='Aucun résultat pour cette recherche.' />

    return (
        <div className=''>
            <div className="">
                <ListArticlesComp articles={results} controller={controller} />
            </div>
            {totalPages > 1 && <>
                <div className="">
                    <ReactPaginate
                        breakLabel='...'
                        nextLabel='>'
                        onPageChange={handlePageChange}
                        marginPagesDisplayed={1} // Nombre de pages à afficher au début et à la fin
                        pageRangeDisplayed={2}
                        pageCount={totalPages}
                        previousLabel='<'
                        containerClassName={"pagination flex justify-center select-none mt-2"}
                        activeClassName={"active"}
                        forcePage={currentPage - 1}
                        renderOnZeroPageCount={null}
                    />
                </div>
            </>
            }
        </div>
    )
}
export default SearchPaginate
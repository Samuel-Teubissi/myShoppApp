import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import Article from "./ArticleComp"
import axios from "axios"
import { API_href } from "../App.json";
import { useLocation, useNavigate } from "react-router-dom";
import ListArticlesComp from "./ListArticlesComp";
import { toast, ToastContainer } from "react-toastify";

export default function PaginateComponent(link, reload) {
    // const { data } = props
    const [articles, setArticles] = useState([])
    const [messageErr, setMessageErr] = useState('')
    const [totalPages, setTotalPages] = useState(1)
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const urlPage = parseInt(searchParams.get('page'))
    const initialPage = parseInt(searchParams.get('page')) || 1
    const [currentPage, setCurrentPage] = useState(initialPage)
    const linkComp = link.link


    const LoadArticles = (page) => {
        /*
        axios.get(`${API_href}/API_controller/get_API_Articles/?page=${page}`)
            .then(resp => {
                console.log(resp)
                setArticles(resp.data.articles)
                setTotalPages(resp.data.total_pages)
            })
            .catch(err => {
                console.error("Erreur de récupération des articles.", err)
            })
        */

        // console.log('page :' + `${API_href}/articles/${linkComp}/?page=${page}`)
        fetch(`${API_href}/articles/${linkComp}/?page=${page}`)
            .then(response => response.json())
            .then(
                data => {
                    setArticles(data.articles)
                    setTotalPages(data.total_pages)
                }
            )
            .catch(error => {
                const messageErr = "Erreur de récupération des articles."
                setMessageErr(messageErr)
                console.error(messageErr, error)
                toast.error('Erreur de récupération des articles paginés')
            })
    }

    useEffect(() => {
        LoadArticles(currentPage)
        const interval = setInterval(async () => {
            const res = await axios.get("articles/total");
            if (res.data.total !== totalPages) {
                setTotalPages(res.data.total); console.log('articles rechargés'); //LoadArticles(currentPage); 
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentPage, totalPages])

    const handlePageClick = (seletedItem) => {
        const selectedPage = seletedItem.selected + 1
        setCurrentPage(selectedPage)

        // Mettre à jour l'URL en fonction de la page sélectionnée
        navigate(`/?page=${selectedPage}`);
    }

    const validPage = Math.min(currentPage - 1, totalPages - 1)

    return (
        <>
            {/* <ToastContainer position="bottom-right" /> */}
            {!messageErr
                ? (<>

                    <ReactPaginate
                        breakLabel='...'
                        nextLabel='>'
                        onPageChange={handlePageClick}
                        marginPagesDisplayed={1} // Nombre de pages à afficher au début et à la fin
                        pageRangeDisplayed={3}
                        pageCount={totalPages}
                        previousLabel='<'
                        renderOnZeroPageCount={null}
                        containerClassName={"pagination flex select-none"}
                        activeClassName={"active"}
                        forcePage={validPage}
                    />
                    <ListArticlesComp articles={articles} />
                </>)
                : <div className="p-4 bg-red-400 w-1/2 mt-1 text-center text-white rounded-md capitalize">{messageErr}</div>}
        </>
    )
}
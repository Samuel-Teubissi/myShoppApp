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

export default function PaginateComponent(link, scrollRef) {
    // const { data } = props
    const [articles, setArticles] = useState([])
    const [paginateErr, setPaginateErr] = useState('')
    const [errorReload, setErrorReload] = useState(false)
    const [isLoadingPaginate, setIsLoadingPaginate] = useState(false)
    const [totalPages, setTotalPages] = useState(1)
    const [newArticles, setNewArticles] = useState(0)
    const [totalArticles, setTotalArticles] = useState(null)
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    // const urlPage = parseInt(searchParams.get('page'))
    const initialPage = parseInt(searchParams.get('page')) || 1
    const [currentPage, setCurrentPage] = useState(initialPage)
    const linkComp = link.link
    axios.defaults.baseURL = API_href;

    // const LoadArticles = (page) => {
    // console.log('page :' + `${API_href}/articles/${linkComp}/?page=${page}`)
    const LoadDataPaginate = async () => {
        setIsLoadingPaginate(true)
        try {
            const resp = await axios(`/articles/${linkComp}/?page=${currentPage}`, { withCredentials: true })
            const articlesData = resp.data
            // console.log(articlesData);
            if (articlesData?.articles?.length > 0) {
                setArticles(articlesData.articles)
                setTotalPages(articlesData.total_pages)
                setTotalArticles(articlesData.total_articles)
            }
        } catch (error) {
            setErrorReload(true)
            setPaginateErr("Erreur de récupération des articles.")
            console.log('articlesData : ' + error);
        } finally {
            setIsLoadingPaginate(false)
        }
    }
    // }
    const checkNewArticles = async () => {
        try {
            const res = await axios.get(`/articles/total/${linkComp}`, { withCredentials: true });
            if (res.data.success) {
                if (res.data.latest_total_articles !== totalArticles) {
                    let newValue = Math.abs(res.data.latest_total_articles - totalArticles)
                    setNewArticles(newValue)
                    console.log('articles rechargés');
                } else setNewArticles(0)
            }
        } catch (error) {
            setErrorReload(true)
            console.log('Accès à la recharge empêchée : ' + error);
        }
    }

    useEffect(() => {
        LoadDataPaginate()
    }, [currentPage]);

    useEffect(() => {
        if (!errorReload) {
            const interval = setInterval(async () => {
                checkNewArticles()
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [errorReload, totalArticles])

    useEffect(() => {
        if (newArticles > 0) {
            LoadDataPaginate()
        }
    }, [newArticles]);

    const handlePageClick = (seletedItem) => {
        const selectedPage = seletedItem.selected + 1
        setCurrentPage(selectedPage)

        // Mettre à jour l'URL en fonction de la page sélectionnée
        navigate(`${location.pathname}?page=${selectedPage}`);
        // scrollToPagination()
    }

    // const scrollToPagination = () => {
    //     const scrollSearch = document.getElementById("article-container-search");
    //     if (scrollSearch) {
    //         scrollSearch.scrollIntoView({ behavior: "smooth", block: "start" });
    //     }
    // }

    const validPage = Math.min(currentPage - 1, totalPages - 1)

    if (isLoadingPaginate) return <LoaderComp />
    if (paginateErr) return <ErrorComp message={paginateErr} />

    if (!articles || articles.length === 0) return <ErrorComp type="nothing" message="Rien à afficher pour le moment !" />

    return (
        <>
            <div id="endSearch" ref={scrollRef}>
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
            </div>
            <ListArticlesComp articles={articles} controller={linkComp} />
        </>
    )
}
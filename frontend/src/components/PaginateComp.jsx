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
    const [newArticles, setNewArticles] = useState(0)
    const [totalArticles, setTotalArticles] = useState(null)
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const urlPage = parseInt(searchParams.get('page'))
    const initialPage = parseInt(searchParams.get('page')) || 1
    const [currentPage, setCurrentPage] = useState(initialPage)
    const linkComp = link.link
    axios.defaults.baseURL = API_href;

    // const LoadArticles = (page) => {
    // console.log('page :' + `${API_href}/articles/${linkComp}/?page=${page}`)
    const LoadDataPaginate = async () => {
        // fetch(`${API_href}/articles/${linkComp}/?page=${page}`, { credentials: 'include' })
        //     .then(response => response.json())
        //     .then(
        //         data => {
        //             setArticles(data.articles)
        //             setTotalPages(data.total_pages)
        //             setTotalArticles(data.total_articles)
        //             console.log('data.articles : ' + data.articles);
        //             console.log('data.total_pages : ' + data.total_pages);
        //             console.log('data.total_articles : ' + data.total_articles);
        //         }
        //     ) .catch(error => {
        //         const messageErr = "Erreur de récupération des articles."
        //         setMessageErr(messageErr)
        //         console.error(messageErr, error)
        //         toast.error('Erreur de récupération des articles paginés')
        //     })
        try {
            const resp = await axios(`/articles/${linkComp}/?page=${currentPage}`, { withCredentials: true })
            const articlesData = resp.data
            setArticles(articlesData.articles)
            setTotalPages(articlesData.total_pages)
            setTotalArticles(articlesData.total_articles)
        } catch (error) {
            console.log('articlesData : ' + error);
        }
    }
    // }
    const checkNewArticles = async () => {
        const res = await axios.get(`/articles/total_${linkComp}`, { withCredentials: true });
        if (!res.data.error) {
            if (res.data.latest_total_articles > totalArticles) {
                setNewArticles(res.data.latest_total_articles - totalArticles)
                console.log('articles rechargés');
            } else setNewArticles(0)
        } else console.log('recharge articles error : ' + res.data.error);
    }

    useEffect(() => {
        LoadDataPaginate()
    }, [currentPage]);

    useEffect(() => {
        const interval = setInterval(async () => {
            checkNewArticles()
        }, 5000);
        return () => clearInterval(interval);
    }, [totalArticles])

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
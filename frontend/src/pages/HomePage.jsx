import { useEffect, useState } from "react";
import { APP_Categories as categories } from "../App.json";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import PaginateComponent from "../components/PaginateComp";
import { Select_categories } from "../components/AppComp";
import { API_href } from "../App.json";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCartPlus, faSearch, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import ListArticlesComp from "../components/ListArticlesComp";
import SearchPaginate from "../components/SearchPaginate";
import SearchBar from "../components/SearchBar";
import Banner_HomeImg from "../assets/img/default_banner.jpg"
import Footer from "./Footer";
// import { FaSearch } from "react-icons/fa";

const HomePage = () => {
    return (
        <>
            <div className="mt-24 mb-14">
                <div className="w-full">
                    <SearchBar endpoint='/articles/search' defaultEndpoint='home' placeholder="Rechercher des articles sur le site" />
                </div>
            </div>
        </>
    )
}

export default HomePage
import { useEffect, useState } from "react";
import { APP_Categories as categories } from "../App.json";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PaginateComponent from "../components/PaginateComp";
import ModalAddComp from "../components/ModalAddComp";

const UserPage = () => {
    const { isAuthenticated, logout, userSession } = useAuth()
    const navigate = useNavigate()
    // const user_token = JSON.parse(localStorage.getItem("user_token"));
    // const user_token = userSession;
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="ms_Main">
            {/* <ToastContainer position="bottom-right" autoClose={3000} /> */}
            <br />
            <div className="Main"><br /><br />
                <h1>Bienvenue {userSession?.user_name} !</h1>
                <h2>Votre numéro est le +237 {userSession?.user_number}</h2>
                {
                    userSession?.data_trader?.id_trader && <div className="m-4 bg-gray-200 p-5 rounded w-full">
                        <h3>Espace Marchand</h3><br />
                        <button onClick={() => setIsModalOpen(true)} className="p-3 bg-pink-700 text-white rounded m-1 cursor-pointer transition duration-300 ease-in-out hover:bg-pink-500">Ajouter un article</button>
                        <a href="user/stock" className="p-3 bg-pink-700 text-white rounded m-1">Modifier les stocks</a>
                    </div>
                }
                <br />
                <div className="search text-center ">
                    <form method="GET">
                        <input type="search" name="s" placeholder="Recherchez un article ?" className='inpt-f' />
                        <select name="categ" className="slct">
                            {categories.map((categ, index) => (
                                <option value={index} key={index}>{categ}</option>
                            ))}
                        </select>
                        <button type="submit" className='confirm'>Rechercher</button>
                    </form>
                </div>
                <div className="articlesH">Vos articles</div>
                <div className="articles mt-4"> <br />
                    <PaginateComponent link='trader' />
                </div>
            </div>
            <ModalAddComp isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}
export default UserPage
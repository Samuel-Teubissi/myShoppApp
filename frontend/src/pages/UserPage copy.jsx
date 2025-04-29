import { useEffect, useState } from "react";
import { APP_Categories as categories } from "../App.json";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import PaginateComponent from "../components/PaginateComp";
import { Select_categories } from "../components/AppComp";
import ModalAddComp from "../modals/ModalAddComp";
import { useModal } from "../context/useModal";

const UserPage = () => {
    const { isAuthenticated, logout, userSession, Become_Trader } = useAuth()
    const navigate = useNavigate()
    const { openModal, closeModal } = useModal();
    // const [isModalOpen, setIsModalOpen] = useState(false);

    const BecomeTrader = async () => {
        Become_Trader()
    }
    const handleAdd = () => {
        openModal(<ModalAddComp onClose={closeModal} />)
    }

    return (
        <div className="ms_Main">
            {/* <ToastContainer position="bottom-right" autoClose={3000} /> */}
            <br />
            <div className="Main"><br /><br />
                <h1>Bienvenue {userSession?.user_name} !</h1>
                <h2>Votre numéro est le +237 {userSession?.user_number}</h2>
                <div className="m-4 bg-gray-200 p-5 rounded w-1/2">
                    {
                        userSession?.data_trader ? <>
                            <h3 className="text-lg font-medium">Espace Marchand</h3>
                            <button onClick={handleAdd} className="p-3 bg-app-h text-white rounded m-1 cursor-pointer transition duration-300 ease-in-out hover:bg-app">Ajouter un article</button>
                            <button onClick={() => setIsModalOpen(true)} className="p-3 bg-app-h text-white rounded m-1 cursor-pointer transition duration-300 ease-in-out hover:bg-app">Votre panier</button>
                        </>
                            : <>
                                <button onClick={BecomeTrader} className="text-blue-600 hover:underline hover:text-blue-400">Devenir Trader ?</button>
                                &nbsp;Ainsi vous pourrez ajouter des articles sur le site et être contacté par des clients intéressés !
                            </>
                    }
                </div>
                <br />
                <div className="search text-center ">
                    <form method="GET">
                        <input type="search" name="s" placeholder="Recherchez un article ?" className='px-4 py-3.5 border-1 border-gray-400 rounded shadow-md' />
                        <Select_categories classData='hover:bg-gray-300 shadow-md' name="search_categ" />
                        <button type="submit" className='confirm'>Rechercher</button>
                    </form>
                </div>
                <div className="articlesH">Vos articles</div>
                <div className="articles mt-4"> <br />
                    <PaginateComponent link='trader' />
                </div>
            </div>
        </div>
    )
}
export default UserPage
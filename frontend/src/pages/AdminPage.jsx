import { faBox, faDollarSign, faSpaceShuttle, faUser, faUserFriends, faUsersLine, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SeparatorHorizontal } from "lucide-react";
import { Separator } from "../components/ui/separator";
import { useAdmin } from "../hooks/useAdmin";
import { useEffect } from "react";
import _ from "lodash";
// import { API_href } from "../App.json";
// import { Separator } from "@/components/ui/separator"

let API_href = import.meta.env.VITE_API_URL
const AdminPage = () => {
    const { dataUsers, dataDashboard, dataArticles } = useAdmin();

    return (
        <>
            <div className="">
                <div className="pt-32 pb-4 text-white bg-red-500 w-full banner_trader px-4 sm:max-w-[90%] rounded-xl mx-auto">
                    <h1 className="">Bienvenue Administrateur !</h1>
                    <div className="bg-white/90 backdrop-blur-2xl p-4 rounded-3xl mt-3 text-app-h">
                        <h2 className="admin-header">Dernières informations globales du site</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-2">
                            <div className="admin-block-dataBox">
                                <div className="admin-block-dataBox_title flex items-center gap-1">Ventes
                                    <FontAwesomeIcon icon={faBox} className="admin-block-dataBox_item" />
                                </div>
                                <div className="px-4 py-5">
                                    <span className="text-[45px] font-mono font-bold">{_.padStart(String(dataDashboard?.data?.total_sales), 2, '0')}</span>
                                </div>
                                <Separator orientation='vertical' />
                            </div>
                            <div className="admin-block-dataBox">
                                <div className="admin-block-dataBox_title flex items-center gap-1">Inscriptions
                                    <FontAwesomeIcon icon={faUserFriends} className="admin-block-dataBox_item" />
                                </div>
                                <div className="px-4 py-5">
                                    <span className="text-[45px] font-mono font-bold">{_.padStart(String(dataDashboard?.data?.total_users), 2, '0')}</span>
                                </div>
                                <Separator orientation='vertical' />
                            </div>
                            <div className="admin-block-dataBox col-span-2 lg:col-auto">
                                <div className="admin-block-dataBox_title flex items-center gap-1">Chiffre d'affaire
                                    <FontAwesomeIcon icon={faDollarSign} className="admin-block-dataBox_item __item-price" />
                                </div>
                                <div className="px-4 py-5">
                                    <span className="text-[45px] __item-price font-mono font-bold">{Number(dataDashboard?.data?.turnover).toLocaleString('fr-FR')}</span>
                                </div>
                                <Separator orientation='vertical' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-2 max-w-[90%] mx-auto rounded-2xl p-4 dark:text-white/90 text-black/70">
                    <div className="mb-4">
                        <h3 className="admin-block-dataBox_title admin-header">Dernières Inscriptions</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-start gap-2 bg-dark p-4 rounded">
                            {dataUsers?.data?.usersData?.map((user, key) => (
                                <div key={key + 1} value={key + 1} className="bg-white/90 rounded-xl px-7 py-9 flex gap-3 border border-gray-200 hover:bg-app-050 transform transition duration-300 cursor-default text-black/90">
                                    <div>
                                        <FontAwesomeIcon icon={faUser} className="admin-block-dataBox_icon" />
                                    </div>
                                    <div className="text-left space-y-1 tracking-wide">
                                        <div className="text-lg font-medium">{user.name}</div>
                                        <div className="text-gray-600 space-x-2 font-light">
                                            <span>{Number(user.number).toLocaleString('fr-FR')}</span><span>|</span><span>{user.date}</span>
                                        </div>
                                        <div className="text-gray-900 font-light">{user.trader_name ? 'Trader' : 'User'}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <h3 className="admin-block-dataBox_title admin-header">Derniers Produits Ajoutés</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-start gap-2 bg-dark p-4 rounded">
                            {dataArticles?.data?.articlesData.map((article, i) => (
                                <div key={i + 1} value={i + 1} className="bg-white/90 rounded-xl px-7 py-9 flex gap-3 border border-gray-100 hover:bg-app-050 transform transition duration-300 cursor-defaulttext-black/90">
                                    <div className="bg-gray-50 w-32 h-32 rounded-full overflow-hidden border border-gray-300 shadow">
                                        <img src={API_href + '/assets/img/articles/' + article.file_name} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="text-left">
                                        <div className="capitalize text-lg font-medium py-4">{article.article}</div>
                                        <div className="text-gray-600 font-light">
                                            <div className="capitalize">{article.content}</div>
                                            <div>{article.article_date}</div>
                                        </div>
                                        <span className="bg-app-f text-white px-4 py-2 inline-block rounded-[5px] shadow-inner mx-auto mt-3 float-end font-semibold tracking-wide">
                                            {Number(article.price).toLocaleString('fr-FR')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default AdminPage
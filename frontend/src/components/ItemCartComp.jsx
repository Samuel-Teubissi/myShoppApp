import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { useCart } from "../context/useCart";
import { useState } from "react";
import numeral from "numeral";

const ItemCartComp = ({ item, num }) => {
    const price = item.price
    const cart_total = price * item.orderedQty
    const [errorQty, setErrorQty] = useState(false);
    const { updateCartQty, removeFromCart } = useCart()

    const handleNewQuantity = (e) => {
        let newQty = parseInt(e.target.value) || 1;
        let stockAvailable = item.quantity
        if (newQty > stockAvailable) newQty = stockAvailable;//setErrorQty(true);
        if (newQty < 1) newQty = 1;//setErrorQty(true);
        updateCartQty(item.id_articles, newQty)
        setErrorQty(false);
    }

    // return (
    //     <>
    //         <div key={item.id_articles} className="cart--item btn-trans hover:bg-gray-100 dark:hover:bg-app/10 h-20">
    //             <div className="bg-gray-400 h-4 w-4 mr-1 rounded-full"></div>
    //             <div className="flex justify-between flex-grow gap-x-2">
    //                 <span className="text-left my-auto min-w-[85px]">{item.article}</span>
    //                 <span className="cart--item-box w-28">{price.toLocaleString('fr-FR')}</span>
    //             </div>
    //             <div className="">
    //                 <input type="number" name="quantity"
    //                     className={`w-20 py-3 px-2 border rounded pl-4 dark:bg-app-300/30 dark:text-white flex-grow ${errorQty ? "border-red-500" : "border-gray-300"}`}
    //                     placeholder="Quantité"
    //                     value={item.orderedQty}
    //                     min={1}
    //                     max={item.quantity}
    //                     onChange={handleNewQuantity}
    //                 />
    //                 {/* <select name="quantity" id="">
    //                         {[...Array(Number(item.quantity))].map((_, i) => (
    //                             <option key={i + 1} value={i + 1}>{i + 1}</option>
    //                         ))}
    //                     </select> */}
    //             </div>
    //             <div className="w-10 text-left">/{_.padStart(String(item.quantity), 2, '0')}</div>
    //             <div className="min-w-28 hidden xl:block">
    //                 <span className="cart--item-box bg-app-h bg-opacity-30 w-full block">{cart_total.toLocaleString('fr-FR')}</span>
    //             </div>
    //             <div className="">
    //                 <FontAwesomeIcon icon={faTrashCan} size="" className="w-7 h-7 text-app-h cursor-pointer hover:text-app btn-trans transform hover:scale-110" onClick={() => { removeFromCart(item.id_articles) }} title="Supprimer" />
    //             </div>
    //         </div>
    //     </>
    // );
    return <>
        <div class="space-y-2">
            <div class="grid grid-cols-1 text-left justify-start md:grid-cols-6 gap-4 px-8 md:px-4 pt-10 pb-4 md:py-2 bg-gray-50 mt-2 space-y-2 md:bg-white shadow rounded items-center">
                <div className="flex justify-start items-center text-left gap-2 space-x-3">
                    <span>
                        <span className="hidden md:block bg-gray-400 h-4 w-4 rounded-full"></span>
                        <span class="md:hidden font-bold">Article: </span>
                    </span>
                    <span>{item.article}</span>
                </div>
                <div className="space-x-3">
                    <span class="md:hidden font-bold">Prix: </span>
                    <span>{price.toLocaleString('fr-FR')}</span>
                </div>
                <div className="space-x-3">
                    <span class="md:hidden font-bold">Quantité: </span>
                    <input type="number" name="quantity"
                        className={`w-20 py-3 px-2 border rounded pl-4 bg-white dark:bg-app-300/30 dark:text-white flex-grow ${errorQty ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Quantité"
                        value={item.orderedQty}
                        min={1}
                        max={item.quantity}
                        onChange={handleNewQuantity}
                    />
                </div>
                <div className="space-x-3">
                    <span class="md:hidden font-bold">Stock restant: </span>
                    <span>{_.padStart(String(item.quantity), 2, '0')}</span>
                </div>
                <div className="space-x-3">
                    <span class="md:hidden font-bold">Prix total: </span>
                    <span className="hidden cart--item-box bg-app-h bg-opacity-30 w-full md:block">{cart_total.toLocaleString('fr-FR')}</span>
                    <span class="md:hidden font-bold">{cart_total.toLocaleString('fr-FR')}</span>
                </div>
                <div className="flex justify-center items-center bg-gray-700 sm:bg- sm:bg-transparent sm:hover:bg-transparent hover:bg-red-700 hover:text-white transition duration-300 text-white/90 gap-4 py-3 rounded-xl">
                    <span className="md:hidden">Effacer</span>
                    <FontAwesomeIcon icon={faTrashCan} size="" className="w-7 h-7 text-app md:text-app-h cursor-pointer hover:text-app btn-trans transform hover:scale-110" onClick={() => { removeFromCart(item.id_articles) }} title="Supprimer" />
                </div>
            </div>
        </div>
    </>
}
export default ItemCartComp
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
    // numeral(5).format('00');     // "05"
    // numeral(1234).format('0,0');
    // const itemPrice = 

    return (
        <>
            <div className="cart--item btn-trans hover:bg-gray-100 dark:hover:bg-app/10 h-20">
                <div className="bg-gray-400 h-4 w-4 mr-1 rounded-full"></div>
                <div className="flex justify-between flex-grow gap-x-2">
                    <span className="text-left my-auto min-w-[85px]">{item.article}</span>
                    <span className="cart--item-box w-28">{price.toLocaleString('fr-FR')}</span>
                </div>
                <div className="">
                    <input type="number" name="quantity"
                        className={`w-20 py-3 px-2 border rounded-xl pl-4 dark:bg-app-300/30 dark:text-white flex-grow ${errorQty ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Quantité"
                        value={item.orderedQty}
                        min={1}
                        max={item.quantity}
                        onChange={handleNewQuantity}
                    />
                    {/* <select name="quantity" id="">
                            {[...Array(Number(item.quantity))].map((_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select> */}
                </div>
                <div className="w-10 text-left">/{_.padStart(String(item.quantity), 2, '0')}</div>
                <div className="min-w-28 hidden xl:block">
                    <span className="cart--item-box bg-app-h bg-opacity-30 w-full block">{cart_total.toLocaleString('fr-FR')}</span>
                </div>
                <div className="">
                    <FontAwesomeIcon icon={faTrashCan} size="" className="w-7 h-7 text-app-h cursor-pointer hover:text-app btn-trans transform hover:scale-110" onClick={() => { removeFromCart(item.id_articles) }} title="Supprimer" />
                </div>
            </div>
        </>
    );
}
export default ItemCartComp
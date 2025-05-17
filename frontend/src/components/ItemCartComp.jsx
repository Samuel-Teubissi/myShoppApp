import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _, { debounce } from "lodash";
import { useCart } from "../context/useCart";
import { useCallback, useEffect, useState } from "react";
import numeral from "numeral";
import { MinusCircleIcon, MinusIcon, PlusCircleIcon, PlusIcon } from "lucide-react";

const ItemCartComp = ({ item, num }) => {
    const price = item.price
    const cart_total = price * item.orderedQty
    const [errorQty, setErrorQty] = useState(false);
    const [orderQty, setOrderQty] = useState(1);
    const { updateCartQty, removeFromCart } = useCart()

    const increase = () => {
        setOrderQty(prev => (prev < item.quantity ? prev + 1 : item.quantity))
        // setOrderQty(prev => prev + 1)
    }
    const decrease = () => {
        setOrderQty(prev => (prev > 1 ? prev - 1 : 1))
    }
    useEffect(() => {
        updateCartQty(item.id_articles, orderQty)
        // useCallback(
        // debounce(() => updateCartQty(item.id_articles, orderQty), 500)
        // , [])
    }, [orderQty]);

    // const handleNewQuantity = (type) => {
    //     let newQty = parseInt(e.target.value) || 1;
    //     let stockAvailable = item.quantity
    //     if (orderQty > stockAvailable) orderQty = stockAvailable;//setErrorQty(true);
    //     if (orderQty < 1) orderQty = 1;//setErrorQty(true);
    //     updateCartQty(item.id_articles, orderQty)
    //     setErrorQty(false)
    // }

    return <>
        <div className="space-y-2" key={item.id_articles}>
            <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-5 md:grid-rows-1 text-left lg:text-center justify-start gap-3 gap-x-5 md:gap-4 px-8 md:px-4 pt-10 pb-4 md:py-2 dark:text-white/90 items-center dark:border-none md:border-none border-app-300 dark:border-app-900">
                <div className="flex sm:justify-start justify-center items-center text-left gap-2 col-span-2 md:col-span-1 h-full border-b border-app-400">
                    <span>
                        <span className="hidden md:block bg-gray-400 h-4 w-4 rounded-full"></span>
                    </span>
                    <span className="text-xl font-bold text-app-600">{item.article}</span>
                </div>
                <div>
                    <span className="md:hidden font-bold">Prix: </span>
                    <span>{price.toLocaleString('fr-FR')} F</span>
                </div>
                <div>
                    {/* <span className="md:hidden font-bold">Quantité: </span>
                    <input type="number" name="quantity"
                        className={`w-20 p-2 border rounded pl-4 bg-white text-black/70 flex-grow ${errorQty ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Quantité"
                        value={item.orderedQty}
                        min={1}
                        max={item.quantity}
                        onChange={handleNewQuantity}
                    /> */}
                    <div className="flex md:justify-center justify-end items-center mt-2">
                        <div className="flex w-fit gap-2 md:justify-center justify-end items-center bg-gray-100/70 dark:bg-app-600/5 rounded-full">
                            <button onClick={decrease} className="text-app hover:bg-app border border-gray-300 hover:text-white/90 rounded-full btn-trans" disabled={orderQty <= 1}><MinusIcon className="h-8 w-8" /></button>
                            <span className="">{_.padStart(String(orderQty), 2, '0')}/{_.padStart(String(item.quantity), 2, '0')}</span>
                            <button onClick={increase} className="text-app hover:bg-app border border-gray-300 hover:text-white/90 rounded-full btn-trans" disabled={orderQty >= item.quantity}><PlusIcon className="h-8 w-8" /></button>
                        </div>
                    </div>
                </div>
                {/* <div>
                    <span className="md:hidden font-bold">Stock restant: </span>
                    <span>{_.padStart(String(item.quantity), 2, '0')}</span>
                </div> */}
                <div className="col-span-2 sm:col-span-1">
                    <span className="md:hidden font-bold">Prix total: </span>
                    <span className="hidden cart--item-box bg-app-h bg-opacity-30 w-full md:block">{cart_total.toLocaleString('fr-FR')}</span>
                    <span className="md:hidden">{cart_total.toLocaleString('fr-FR')} F</span>
                </div>
                <div className="col-span-2 md:col-span-1 flex justify-center items-center bg-red-800 md:bg-transparent lg:hover:bg-transparent hover:bg-red-700 hover:text-white transition duration-300 text-white/90 gap-4 py-4 rounded-[5px]" onClick={() => { removeFromCart(item.id_articles) }}>
                    <span className="md:hidden">Effacer</span>
                    <FontAwesomeIcon icon={faTrashCan} size="" className="w-7 h-7 text-white md:text-app-h cursor-pointer hover:text-app btn-trans transform hover:scale-110" title="Supprimer" />
                </div>
            </div>
        </div>
    </>

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
}
export default ItemCartComp
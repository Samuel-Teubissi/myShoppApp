import { useAuth } from "../context/AuthContext"
import InputField, { InputFieldAdd } from "./AppComp"
import { API_href, APP_Categories as categories } from "../App.json";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";


const ModalAddComp = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    axios.defaults.baseURL = import.meta.env.VITE_API_URL;
    // axios.defaults.baseURL = API_href;
    const { login } = useAuth()
    const formRef = useRef(null)
    const [addFormError, setAddFormError] = useState({})
    const [isAddSubmitting, setIsAddSubmitting] = useState(false)
    const [addFormData, setAddFormData] = useState(
        { article: '', price: '', quantity: '', userfile: null, category: '' }
    )

    const HandleChange = (e) => {
        setAddFormData({ ...addFormData, [e.target.name]: e.target.value })
    }
    const handleFileChange = (e) => {
        // console.log(e);
        setAddFormData({ ...addFormData, [e.target.name]: e.target.files[0] })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsAddSubmitting(true)
        try {
            // `${API_href}/user/add`
            const addData = new FormData()
            addData.append('article', addFormData.article)
            addData.append('price', addFormData.price)
            addData.append('quantity', addFormData.quantity)
            addData.append('userfile', addFormData.userfile)
            addData.append('category', addFormData.category)

            const response = await axios.post('/user/add', addData,
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            )
            if (response.data.status === 'success') {
                toast.success('Article Ajouté')
                setAddFormError({})
                formRef.current.reset()
            } else {
                // toast.error(response.data.message || {})
                // console.log('response.data.errors : ' + JSON.stringify(response.data.errors));
                setAddFormError(response.data.errors || {})
                if (!addFormData.userfile) {
                    setAddFormError(prev => ({ ...prev, userfile: 'Un fichier visuel est requis' }))
                }
            }
        } catch (error) {
            toast.error("Erreur avec l'envoi de données")
            console.error("Erreur lors de l'envoi de l'article: ", error)
        } finally {
            setIsAddSubmitting(false);
        }
    }

    return (
        <div className="modal-overlay fixed top-0 left-0 w-full h-screen flex justify-center items-center z-20">
            <form className="flex justify-center w-1/2 bg-white rounded-lg p-6 min-w-min text-center shadow-sm overflow-y-auto relative" onSubmit={handleSubmit} ref={formRef}>
                <button className="absolute top-3.5 right-4 bg-red-700 text-white border-none px-4 py-2 text-base cursor-pointer rounded-lg hover:bg-pink-500 transition duration-300" onClick={onClose} title="Fermer">X</button>
                <div className="add">
                    <InputFieldAdd
                        label="Nom de l'article :"
                        type="text"
                        name="article"
                        onChange={HandleChange}
                        error={addFormError?.article}
                        placeholder='Saisissez un nom'
                    />
                    <InputFieldAdd
                        label="Prix de l'article :"
                        type="text"
                        name="price"
                        onChange={HandleChange}
                        error={addFormError?.price}
                        placeholder='Saisissez un Prix'
                    />
                    <InputFieldAdd
                        label="Quantité :"
                        type="text"
                        name="quantity"
                        onChange={HandleChange}
                        error={addFormError?.quantity}
                        placeholder='Saisissez une quantité'
                    />
                    <InputFieldAdd
                        label="Photo de l'article :"
                        type="file"
                        name="userfile"
                        onChange={handleFileChange}
                        error={addFormError?.userfile}
                        placeholder='Saisissez un nom'
                    />
                    <div className="inpt categ">
                        <span className="block text-gray-700 font-semibold mb-1 text-left">Catégorie de l'article :</span>
                        <span>
                            <select name="category" className={`slct border rounded-full hover:bg-gray-300 ${addFormError?.category ? "border-red-500" : "border-gray-300"}`} onChange={HandleChange} title="category">
                                {categories.map((categ, index) => (
                                    <option value={index} key={index}>{categ}</option>
                                ))}
                            </select>
                        </span>
                        <i className="file fa fa-upload"></i>
                        {addFormError?.category && <div className="text-red-500 text-sm mt-1">{addFormError?.category}</div>}
                    </div>
                    <button type="submit" className="btn mt-4" disabled={isAddSubmitting}>
                        {isAddSubmitting ? "..." : "Ajouter"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ModalAddComp
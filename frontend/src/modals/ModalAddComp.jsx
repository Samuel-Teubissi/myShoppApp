import { useAuth } from "../context/AuthContext"
import { InputFieldAdd, SelectField_categories } from "../components/AppComp"
import { API_href } from "../App.json";
import { useRef, useState } from "react";
// import { toast } from "react-toastify";
import { toast } from "sonner";
import axios from "axios";
import { api } from "../hooks/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "../hooks/useNotifications old";
import { useNotificationsStore } from "../hooks/useNotifications";
import { queryClient } from "../main";
import { ArrowDown, ArrowDown01Icon, ChevronDownIcon } from "lucide-react";


const ModalAddComp = ({ isOpen, onClose }) => {
    // if (!isOpen) return null;

    axios.defaults.baseURL = import.meta.env.VITE_API_URL;
    // axios.defaults.baseURL = API_href;
    const { login, userSession } = useAuth()
    const formRef = useRef(null)
    const fileRef = useRef(null)
    const [addFormError, setAddFormError] = useState({})
    const [addFormData, setAddFormData] = useState(
        { article: '', price: '', quantity: '', userfile: null, category: '' }
    )
    const createNotification = useNotificationsStore((s) => s.createNotification)
    const fetchNotifications = useNotificationsStore((s) => s.fetchNotifications)
    // const [isAddSubmitting, setIsAddSubmitting] = useState(false)

    const HandleChange = (e) => {
        setAddFormData({ ...addFormData, [e.target.name]: e.target.value })
    }
    const handleFileChange = (e) => {
        // console.log(e);
        setAddFormData({ ...addFormData, [e.target.name]: e.target.files[0] })
    }

    // const queryClient = useQueryClient();
    const { isLoading: isAddSubmitting, mutate } = useMutation({
        mutationFn: async (e) => {
            e.preventDefault();
            const addData = new FormData(e.target)
            const response = await api.post('/article/add', addData)
            return response.data
        },
        onSuccess: async (response) => {
            if (response.status === 'success') {
                toast.success('Article Ajouté')
                await createNotification(userSession.user_id, 'addArticle')
                fetchNotifications(userSession.user_id)
                setAddFormError({})
                formRef.current.reset()
                queryClient.invalidateQueries(['articles', 'default'])
                // queryClient.invalidateQueries({ predicate: (query) => query.queryKey.includes('articles') })
            } else {
                setAddFormError(response.errors || {})
                if (!fileRef.current.files[0]) {
                    setAddFormError(prev => ({ ...prev, userfile: 'Un fichier visuel est requis' }))
                }
            }
        },
        onError: (error) => {
            toast.error("Erreur avec l'envoi de données")
            console.error("Erreur lors de l'envoi de l'article: ", error)
        }
    })

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // setIsAddSubmitting(true)
    //     mutate({})
    //     try {
    //         const addData = new FormData(e.target)
    //         const response = await api.post('/article/add', addData, { headers: { 'Content-Type': 'multipart/form-data' } })

    //         if (response.data.status === 'success') {
    //             toast.success('Article Ajouté')
    //             setAddFormError({})
    //             formRef.current.reset()
    //         } else {
    //             setAddFormError(response.data.errors || {})
    //             console.log(e.target.elements);

    //             if (!e.target.elements.userfile) {
    //                 setAddFormError(prev => ({ ...prev, userfile: 'Un fichier visuel est requis' }))
    //             }
    //         }
    //     } catch (error) {
    //         toast.error("Erreur avec l'envoi de données")
    //         console.error("Erreur lors de l'envoi de l'article: ", error)
    //     } finally {
    //         // setIsAddSubmitting(false);
    //     }
    // }

    return (
        <form onSubmit={mutate} ref={formRef} className="contents">
            <div className="pt-4 px-2">
                <InputFieldAdd
                    label="Nom de l'article :"
                    type="text"
                    name="article"
                    onChange={HandleChange}
                    error={addFormError?.article}
                    placeholder='T Shirt Louis Vuitton'
                />
                <InputFieldAdd
                    label="Prix de l'article :"
                    type="number"
                    name="price"
                    onChange={HandleChange}
                    error={addFormError?.price}
                    placeholder='12 000 Fcfa'
                />
                <InputFieldAdd
                    label="Quantité :"
                    type="number"
                    name="quantity"
                    onChange={HandleChange}
                    error={addFormError?.quantity}
                    placeholder='24'
                />
                <InputFieldAdd
                    label="Photo de l'article :"
                    type="file"
                    name="userfile"
                    onChange={handleFileChange}
                    error={addFormError?.userfile}
                    placeholder='Saisissez un nom'
                    ref={fileRef}
                />
                <div className="relative">
                    <SelectField_categories
                        onChange={HandleChange}
                        error={addFormError?.category} classData='w-full px-5 py-2.5 transition duration-200 cursor-pointer border rounded-full appearance-none'
                    />
                    <ChevronDownIcon className="w-6 h-6 text-black/70 dark:text-white absolute top-9 right-5 pointer-events-none" />
                </div>
                <div className="btn-modal-container">
                    <button type="button" onClick={onClose} className="btn-modal-cancel" disabled={isAddSubmitting}>
                        Annuler
                    </button>
                    <button type="submit" className=" btn-modal-submit" disabled={isAddSubmitting}>
                        {isAddSubmitting ? "..." : "Ajouter"}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default ModalAddComp
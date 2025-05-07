import { useEffect, useRef, useState } from "react";
import { api, getDataArticle, updateArticle } from "../hooks/api";
import { InputFieldAdd, InputFieldFile, SelectField_categories } from "../components/AppComp";
// import { toast } from "react-toastify";
import { toast } from "sonner";
import LoaderComp from "../components/LoaderComp";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../hooks/useNotifications old";
import { useNotificationsStore } from "../hooks/useNotifications";
import { queryClient } from "../main";
import axios from "axios";
import { ChevronDownIcon } from "lucide-react";

export const EditArticleForm = ({ id, onClose }) => {
    const [article, setArticle] = useState({ name: '' });
    // const [isEditSubmitting, setIsEditSubmitting] = useState(false);
    const [editFormError, setEditFormError] = useState({})
    const formRef = useRef(null)
    const { userSession } = useAuth()
    // const { createNotification } = useNotifications(userSession.user_id)
    const createNotification = useNotificationsStore((s) => s.createNotification)
    const fetchNotifications = useNotificationsStore((s) => s.fetchNotifications)
    axios.defaults.baseURL = import.meta.env.VITE_API_URL;

    // useQuery({
    //     queryKey: ['post', id],
    //     queryFn: async () => {
    //         return await getDataArticle({ id })
    //     },
    //     onSuccess: (response) => {
    //         setArticle(response)
    //     }
    //     // cacheTime: 0
    // })

    const { data: dataArticle, isLoading } = useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            return await getDataArticle({ id })
        }
    })

    useEffect(() => {
        setArticle(dataArticle)
    }, [dataArticle]);

    const { isLoading: isEditSubmitting, mutate } = useMutation({
        mutationKey: ['article', 'edit'],
        mutationFn: async (e) => {
            e.preventDefault()
            const editData = new FormData(e.target)
            // editData.append('user_id', )
            // editData.append('user_id', userSession.user_id)
            // const updateData = await updateArticle({ id, editData })
            const response = await api.post(`/article/${id}`, editData)
            // const response = await axios.post(`/article/${id}`, editData, { withCredentials: true })
            return response.data
        },
        onSuccess: async (response) => {
            if (response?.status === 'success') {
                toast.success(response?.message)
                await createNotification(userSession.user_id, 'updateArticle')
                fetchNotifications(userSession.user_id)
                setEditFormError({})
                queryClient.invalidateQueries(['articles', 'default'])
                onClose()
                if (formRef.current) formRef.current.reset()
            } else {
                toast.error(response?.message)
                setEditFormError(response?.errors || {})
            }
        }
    })

    // useEffect(() => {
    //     setArticle(dtArticle)

    //     // setIsEditSubmitting(true)
    //     // const fetchArticle = async () => {
    //     //     const dataArticle = await getDataArticle({ id })
    //     //     if (dataArticle) {
    //     //         setArticle(dataArticle)
    //     //     }
    //     // }
    //     // fetchArticle()

    //     // setIsEditSubmitting(isLoading);
    //     // setTimeout(() => {
    //     //     setIsEditSubmitting(!!isLoading);
    //     // }, 500);
    // }, [dtArticle]);

    // Gestion du changement dans les inputs
    const handleInputChange = (e) => {
        setArticle({ ...article, [e.target.name]: e.target.value })
    }
    const handleFileChange = (e) => {
        setArticle({ ...article, [e.target.name]: e.target.files[0] })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        // setIsEditSubmitting(true)

        // try {
        //     const editData = new FormData(e.target)
        //     // for (let pair of editData.entries()) {
        //     //     console.log(`${pair[0]}: ${pair[1]}`);
        //     // }
        //     const updateData = await updateArticle({ id, editData })

        // } finally {
        //     // setIsEditSubmitting(false)
        // }
    }

    if (isEditSubmitting || isLoading) return <LoaderComp />
    return (
        <form onSubmit={mutate} className="contents" ref={formRef}>
            <div className="pt-4 px-2">
                <InputFieldAdd
                    label="Nom de l'article :"
                    type="text"
                    name="article"
                    onChange={handleInputChange}
                    value={article?.article}
                    error={editFormError?.article}
                    placeholder='Saisissez un nom'
                />
                <InputFieldAdd
                    label="Prix de l'article :"
                    type="text"
                    name="price"
                    onChange={handleInputChange}
                    value={article?.price}
                    error={editFormError?.price}
                    placeholder='Saisissez un Prix'
                />
                <InputFieldAdd
                    label="Quantité :"
                    type="text"
                    name="quantity"
                    onChange={handleInputChange}
                    value={article?.quantity}
                    error={editFormError?.quantity}
                    placeholder='Saisissez une quantité'
                />
                <InputFieldFile
                    label="Photo de l'article :"
                    type="file"
                    name="userfile"
                    onChange={handleFileChange}
                    // value={article?.userfile}
                    error={editFormError?.userfile}
                    placeholder='Saisissez un nom'
                />
                <div className="relative">
                    <SelectField_categories
                        onChange={handleInputChange}
                        valueProp={article?.category}
                        error={editFormError?.category}
                        classData='w-full px-5 py-2.5 transition duration-200 cursor-pointer border rounded-full appearance-none'
                    />
                    <ChevronDownIcon className="w-6 h-6 text-black/70 dark:text-white absolute top-9 right-5 pointer-events-none" />
                </div>
                <div className="space-x-2">
                    <button type="button" onClick={onClose} className="btn-modal-cancel" disabled={isEditSubmitting}>
                        Annuler
                    </button>
                    <button type="submit" className="btn-modal-submit" disabled={isEditSubmitting}>
                        {isEditSubmitting ? "..." : "Mettre à jour"}
                    </button>
                </div>
            </div>
        </form>
    )
}
export default EditArticleForm
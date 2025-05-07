import { useAuth } from "../context/AuthContext"
import { InputFieldAdd, SelectField_categories } from "../components/AppComp"
import { API_href, API_SUPPORTED_FORMATS } from "../App.json";
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
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { saveArticles } from "../context/useCookie";
import { format } from 'date-fns';


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

    // const HandleChange = (e) => {
    //     setAddFormData({ ...addFormData, [e.target.name]: e.target.value })
    // }
    // const handleFileChange = (e) => {
    //     // console.log(e);
    //     setAddFormData({ ...addFormData, [e.target.name]: e.target.files[0] })
    // }


    // 1. Schéma Yup
    const schemaFormAdd = Yup.object().shape({
        article: Yup.string()
            .required("Nom de l'article requis"),
        // .min(9, 'Entrez un numéro valide de 9 chiffres')
        // .matches(/^[0-9]+$/, 'Format de numéro incorrect'),
        price: Yup.string()
            .required("Prix de l'article requis"),
        // .min(1, "Au moins 2 chiffres")
        // .positive("Entrez une valeur correcte"),
        quantity: Yup.string()
            // .positive("Entrez une valeur correcte")
            .required("Quantité requise"),
        userfile: Yup.mixed()
            .test('required', "Une image est requise", (value) => {
                return value && value.length > 0;
            }),
        // userfile: Yup.mixed()
        //     .test('required', "Une image est requise", (value) => {
        //         return value && value.length > 0;
        //     })
        //     .test(
        //         "fileSize",
        //         "Le fichier volumineux (max 2Mo)",
        //         (value) => {
        //             if (!value || value.length === 0) return true; // Laisser required gérer l'absence
        //             return value[0]?.size <= 2 * 1024 * 1024;
        //         })
        //     .test(
        //         "fileFormat",
        //         "Formats supportés (jpg, jpeg, png )",
        //         (value) => {
        //             if (!value || value.length === 0) return true;
        //             return ['image/jpeg', 'image/png'].includes(value[0]?.type);
        //         }),//fileType
        category: Yup.string()
            .required("Catégorie l'article est requis")
        // .min(1, "Sélectionnez une catégorie")
    })
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schemaFormAdd),
        // mode: 'onChange'
    });

    const FormSubmitAdd = async (data) => {
        console.log('dataFormSubmitAdd', data)
        const file = data.userfile[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            toast.success('Article Ajouté')
            // Sauvegarde en base64 dans localStorage
            const articlesDB = getArticlesCookie()
            const userArticles = {
                "id_articles": articlesDB.length + 1,
                "name": userSession.user_name,
                "number": userSession.user_number,
                "price": data.price,
                "article": data.article,
                "quantity": data.quantity,
                "category": data.category,
                "file_name": reader.result,
                "art_visible": 1,
                "date": format(new Date(), 'yyyy-MM-dd HH:mm:ss')
            }
            saveArticles(userArticles)
            //   localStorage.setItem('article_image', reader.result)
            conosole.log('Formulaire validé. Image sauvegardée dans localStorage.')
        }

        reader.readAsDataURL(file)
        // createNotification(userSession.user_id, 'addArticle')
        createNotification('addArticle')
        // fetchNotifications(userSession.user_id)
        fetchNotifications()
        // setAddFormError({})
        formRef.current.reset()
        // queryClient.invalidateQueries(['articles', 'default'])
    }

    // const queryClient = useQueryClient();
    // const { isLoading: isAddSubmitting, mutate } = useMutation({
    //     mutationFn: async (e) => {
    //         e.preventDefault();
    //         const addData = new FormData(e.target)
    //         const response = await api.post('/article/add', addData)
    //         return response.data
    //     },
    //     onSuccess: async (response) => {
    //         if (response.status === 'success') {
    //             toast.success('Article Ajouté')
    //             await createNotification(userSession.user_id, 'addArticle')
    //             fetchNotifications(userSession.user_id)
    //             setAddFormError({})
    //             formRef.current.reset()
    //             queryClient.invalidateQueries(['articles', 'default'])
    //             // queryClient.invalidateQueries({ predicate: (query) => query.queryKey.includes('articles') })
    //         } else {
    //             setAddFormError(response.errors || {})
    //             if (!fileRef.current.files[0]) {
    //                 setAddFormError(prev => ({ ...prev, userfile: 'Un fichier visuel est requis' }))
    //             }
    //         }
    //     },
    //     onError: (error) => {
    //         toast.error("Erreur avec l'envoi de données")
    //         console.error("Erreur lors de l'envoi de l'article: ", error)
    //     }
    // })

    return (
        <form onSubmit={handleSubmit(FormSubmitAdd)} className="contents">
            <div className="pt-4 px-2">
                <InputFieldAdd
                    label="Nom de l'article :"
                    type="text"
                    // name="article"
                    // onChange={HandleChange}
                    placeholder='T Shirt Louis Vuitton'
                    error={errors.article?.message}
                    {...register('article')}
                />
                <InputFieldAdd
                    label="Prix de l'article :"
                    type="number"
                    // name="price"
                    // onChange={HandleChange}
                    placeholder='12 000 Fcfa'
                    error={errors.price?.message}
                    {...register('price')}
                />
                <InputFieldAdd
                    label="Quantité :"
                    type="number"
                    // name="quantity"
                    // onChange={HandleChange}
                    placeholder='24'
                    error={errors.quantity?.message}
                    {...register('quantity')}
                />
                <InputFieldAdd
                    label="Photo de l'article :"
                    type="file"
                    // name="userfile"
                    // onChange={handleFileChange}
                    placeholder='Saisissez un nom'
                    ref={fileRef}
                    error={errors.userfile?.message}
                    {...register('userfile')}
                />
                <div className="relative">
                    <SelectField_categories
                        // onChange={HandleChange}
                        classData='w-full px-5 py-2.5 transition duration-200 cursor-pointer border rounded-xl appearance-none'
                        error={errors.category?.message}
                        {...register('category')}
                    />
                    <ChevronDownIcon className="w-6 h-6 text-black/70 dark:text-white absolute top-9 right-5 pointer-events-none" />
                </div>
                <div className="btn-modal-container">
                    <button type="button" onClick={onClose} className="btn-modal-cancel">
                        Annuler
                    </button>
                    {/* disabled={isAddSubmitting} */}
                    <button type="submit" className=" btn-modal-submit">
                        {/* {isAddSubmitting ? "..." : "Ajouter"} */}
                        Ajouter
                    </button>
                </div>
            </div>
        </form>
    )
}

export default ModalAddComp
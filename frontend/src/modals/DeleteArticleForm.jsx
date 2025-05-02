import { useEffect, useRef, useState } from "react";
// import { toast } from "react-toastify";
import { toast } from "sonner";
import { api, deleteArticle } from "../hooks/api";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../hooks/useNotifications old";
import { useNotificationsStore } from "../hooks/useNotifications";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";

const DeleteArticleForm = ({ artId, artName, onClose }) => {
    const [article, setArticle] = useState({ name: '' });
    // const [isDeleting, setIsDeleting] = useState(false);
    const [editFormError, setEditFormError] = useState({})
    const { userSession } = useAuth()
    // const { createNotification } = useNotifications(userSession.user_id)
    const createNotification = useNotificationsStore((s) => s.createNotification)
    const fetchNotifications = useNotificationsStore((s) => s.fetchNotifications)

    // Gestion du changement dans les inputs
    const { mutate, isLoading: isDeleting } = useMutation({
        mutationFn: async (e) => {
            e.preventDefault()
            const deleteData = await api.delete(`/article/${artId}`)
            return deleteData.data
        },
        onSuccess: async (response) => {
            if (response.status === 'success') {
                await createNotification(userSession.user_id, 'deleteArticle')
                toast.success(response.message)
                fetchNotifications(userSession.user_id)
                queryClient.invalidateQueries(['articles', 'default'])
                onClose()
            } else toast.error(response.message)
        },
        onError: (error) => {
            toast.error("Erreur lors de la suppression de l'article")
            console.error("Erreur lors de la suppression de l'article: ", error)
        }
    })

    // const handleDelete = async (e) => {
    //     e.preventDefault()
    //     // setIsDeleting(true)
    //     const deleteData = await deleteArticle({ artId })
    //     if (deleteData?.status === 'success') {
    //         await createNotification(userSession.user_id, 'deleteArticle')
    //         toast.success(deleteData?.message)
    //         onClose()
    //     } else toast.error(deleteData?.message)
    //     // setIsDeleting(false)
    // }

    return (
        <form onSubmit={mutate} className="contents">
            <div className="">
                <div className="modal-body">Êtes vous sûr de vouloir supprimer l'article <span className="text-app">{artName}</span> de votre catalogue ?</div>
                <div className="modal-footer">
                    <button type="button" onClick={onClose} className="btn-modal-cancel" disabled={isDeleting}>
                        Annuler
                    </button>
                    <button type="submit" className="btn-modal-confirm" disabled={isDeleting}>
                        {isDeleting ? "..." : "Supprimer"}
                    </button>
                </div>
            </div>
        </form>
    )
}
export default DeleteArticleForm
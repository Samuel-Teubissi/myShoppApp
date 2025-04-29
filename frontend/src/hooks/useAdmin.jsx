import { useQuery } from "@tanstack/react-query"
import { getArticlesAdmin, getDashboard, getUsers, searchArticles } from "./api"
import { useEffect } from "react";

export const useAdmin = () => {
    //Requête pour récupérer tous les derniers utilisateurs 
    const dataUsers = useQuery({
        queryKey: ['users', 'admin'],
        queryFn: () => getUsers(),
        enabled: true
        // staleTime: 5 * 60 * 1000, // 5 minutes
    })
    //Requête pour récupérer les valeurs du dashboard
    const dataDashboard = useQuery({
        queryKey: ['dashboard', 'admin'],
        queryFn: () => getDashboard()   //,
        // enabled: true
        // staleTime: 5 * 60 * 1000, // 5 minutes
    })
    //Requête pour récupérer les valeurs des articles 
    const dataArticles = useQuery({
        queryKey: ['articles', 'admin'],
        queryFn: () => getArticlesAdmin()   //,
        // enabled: true
        // staleTime: 5 * 60 * 1000, // 5 minutes
    })

    return {
        dataUsers,
        dataDashboard,
        dataArticles
    }
}
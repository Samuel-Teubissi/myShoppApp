import { useQuery } from '@tanstack/react-query';
import { searchArticles, getDefaultArticles } from './api';
import { useAuth } from '../context/AuthContext';

export const useSearch = (params) => {
    const { userSession } = useAuth()
    const { search_article, search_categ, page = 1, controllerLink } = params || {}

    const hasSearchParams = !!(search_article || search_categ > 0)

    // Requête de recherche (uniquement si des paramètres sont présents)
    const searchQuery = useQuery({
        queryKey: ['articles', 'search', userSession?.user_id ? userSession?.user_id : 'visitor', { search_article, search_categ, page, controllerLink }],
        queryFn: () => searchArticles({ search_article, search_categ, page, controllerLink }),
        enabled: hasSearchParams,
        staleTime: 5 * 60 * 1000, // 5 minutes
    })

    // Requête par défaut (uniquement si aucun paramètre de recherche n'est présent)
    const defaultQuery = useQuery({
        queryKey: ['articles', 'default', userSession?.user_id ? userSession?.user_id : 'visitor', { controllerLink, page }],
        queryFn: () => getDefaultArticles({ controllerLink, page }),
        enabled: !hasSearchParams,
        // refetchOnMount: 'always',
        staleTime: 5 * 60 * 1000, // 5 minutes
    })

    return {
        searchQuery,
        defaultQuery,
        hasSearchParams,
    }
}
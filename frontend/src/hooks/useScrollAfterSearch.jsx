import { useEffect, useRef, useState } from "react";

export const useScrollAfterSearch = (ref, shouldScrollToResults) => {
    // const resultsRef = useRef(null);
    // const [shouldScrollToResults, setShouldScrollToResults] = useState(false);

    // // Fonction pour déclencher le défilement
    // const triggerScroll = () => {
    //     setShouldScrollToResults(true)
    // }
    // Effet pour effectuer le défilement
    useEffect(() => {
        if (shouldScrollToResults && ref?.current) {
            // Court délai pour s'assurer que le rendu est complet
            const timeoutId = setTimeout(() => {
                ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100)
            return () => clearTimeout(timeoutId)
        }
    }, [ref, shouldScrollToResults])
}
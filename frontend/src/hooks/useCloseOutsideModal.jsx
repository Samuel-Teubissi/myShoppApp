import { useEffect } from "react";

const useCloseOutsideModal = (ref, callback) => {
    useEffect(() => {
        const HandleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback()
            }
        }
        document.addEventListener('mousedown', HandleClickOutside)
        return () => {
            document.removeEventListener('mousedown', HandleClickOutside)
        }
    }, [ref, callback]);
}
export default useCloseOutsideModal
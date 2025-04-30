import { faXmark, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import LoaderComp from '../components/LoaderComp';
import { XIcon } from 'lucide-react';
import useCloseOutsideModal from '../hooks/useCloseOutsideModal';
import Aos from "aos";
import 'aos/dist/aos.css';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalContent, setModalContent] = useState(null);
    const [titleContent, setTitleContent] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const ModalRef = useRef(null)

    const openModal = (content, title = '') => {
        setModalContent(content);
        setTitleContent(title);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => setModalContent(null), 300); // Laisse l'animation se terminer
    };

    useEffect(() => {
        Aos.init()
    }, []);
    // Fermer la modale si onclique à l'extérieur
    useCloseOutsideModal(ModalRef, closeModal)

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {modalContent && (<div className="inset-0 z-50 modal-overlay backdrop-blur-sm fixed top-0 left-0 w-full h-screen flex justify-center items-center btn-trans">
                <div className="bg-white modal-parent dark:text-dark-app-100 dark:border-app-900 p-2 md:px-5 pb-8 text-center shadow-sm relative btn-trans max-h-[90vh] max-w-[98%] w-[90%] xl:w-min xl:min-w-[50%] rounded-xl dark:bg-dark" ref={ModalRef} data-aos='zoom-in' data-aos-duration='100' data-aos-easing='ease-in-out'>
                    <h2 className='pt-14 pb-8'>{titleContent}</h2>
                    <div className='modal-content pt-1'>
                        <XIcon className="absolute top-7 right-3 w-8 h-8 rounded-full hover:bg-app transition duration-300 text-gray-500 dark:text-white/70 hover:text-white" onClick={closeModal} title="Fermer" />
                        {modalContent}
                    </div>
                </div>
            </div>
            )}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);

import { ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const SliderAbout = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesContainerRef = useRef(null);
    const slideRef = useRef(null);
    const totalSlides = 5;
    const autoSlideInterval = 3000;

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    }

    // useEffect(() => {
    //     if (!slideRef.current) return;
    //     const container = slidesContainerRef.current;
    //     const slideWidth = slideRef.current.offsetWidth;
    //     // const slideWidth = '528';
    //     const offset = (container.parentElement.offsetWidth - slideWidth) / 2;
    //     container.style.transform = `translateX(calc(${offset}px - ${currentIndex * slideWidth}px))`;
    // }, [currentIndex]);
    useEffect(() => {
        const container = slidesContainerRef.current;
        const wrapper = container.parentElement;
        const slide = slideRef.current;

        if (!container || !slide || !wrapper) return;

        const marginRight = parseFloat(window.getComputedStyle(slide).marginRight);
        const slideWidth = slide.offsetWidth + marginRight;
        const offset = (wrapper.offsetWidth - slide.offsetWidth) / 2;

        container.style.transform = `translateX(${offset - currentIndex * slideWidth}px)`;
    }, [currentIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, autoSlideInterval);
        return () => clearInterval(interval)
    }, [currentIndex]);

    const slidesAbout = [
        {
            'h3': "Gestion dynamique du panier",
            'li': ['Ajout/supprimer des articles', "Modifier les quantités", "Calcul automatique des totaux unitaires et globaux"]
        },
        {
            'h3': "📁 Persistance de données",
            'li': ["Conservation du panier dans un cookie sécurisé", "Sauvegarde locale des données non sensibles"]
        },
        {
            'h3': "🧠 Synchronisation intelligente",
            'li': ["Panier disponible hors connexion", "Gestion en temps réel du stock restant"]
        },
        {
            'h3': "🤳 Expérience utilisateur fluide",
            'li': ["Affichage en temps réel des articles ajoutés au panier", "Affichage en temps réel des articles ajoutés sur le site"]
        },
        {
            'h3': "🔧 Optimisations techniques",
            'li': ["Lodash-debounce pour limiter les appels API", "Sécurité du traitement des données en backend", "React Query pour les communications serveur"]
        }
    ]

    return <>
        <div className="slider">
            <div className="about-balance text-white/90 slides" ref={slidesContainerRef} style={{ '--total-slide': 5 }}>
                {slidesAbout.map((slide, index) => (
                    <div key={index} ref={index === 0 ? slideRef : null} className={`slide ${index === currentIndex ? 'active-slide' : ''}`}
                        style={{ "--position-slide": index + 1 }}>
                        {/* ${index === slidesAbout.length && 'flex'} */}
                        <h3 className='font-semibold'>{slide.h3}</h3>
                        <ul>
                            {slide.li.map((li_content, li_key) => (
                                <li key={li_key}>{li_content}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <button className="next btn-slide" onClick={handleNext}><ChevronsRightIcon /></button>
            <button className="prev btn-slide" onClick={handlePrev}><ChevronsLeftIcon /></button>

            {/* <div className="about-left" data-aos='fade-right' data-aos-delay={0}>
                        <h3>🛒 Gestion dynamique du panier&nbsp;:</h3>
                        <ul>
                            <li>Ajout, suppression, modification de la quantité des articles.</li>
                            <li>Calcul automatique du total par article et du total général du panier.</li>
                        </ul>
                    </div>
                    <div data-aos='fade-left' data-aos-delay={0}>
                        <h3>💾 Persistance de données&nbsp;:</h3>
                        <ul>
                            <li>Conservation du panier dans un cookie sécurisé.</li>
                            <li>Protection des données sensibles en ne sauvegardant que les informations nécessaires.</li>
                        </ul>
                    </div>
                    <div className="about-left" data-aos='fade-right' data-aos-delay={0}>
                        <h3>🧠 Synchronisation intelligente&nbsp;:</h3>
                        <ul>
                            <li>Fusion automatique d'un panier existant avec un panier temporaire lors de la reconnexion.</li>
                            <li>Gestion de la mise à jour du stock en temps réel avec retour d'erreur si la quantité disponible change.</li>
                        </ul>
                    </div>
                    <div className="about-left" data-aos='fade-left' data-aos-delay={0}>
                        <h3>🤳 Expérience utilisateur fluide&nbsp;:</h3>
                        <ul>
                            <li>Affichage en temps réel des articles ajoutés au panier.</li>
                            <li>Affichage en temps réel des articles ajoutés sur le site</li>
                        </ul>
                    </div>
                    <div className="col-span-2 justify-center" data-aos='fade-up' data-aos-delay={0}>
                        <h3>🔧 Optimisations techniques&nbsp;:</h3>
                        <ul>
                            <li>Utilisation de lodash pour certaines opérations (comme debounce pour limiter les appels API).</li>
                            <li>Utilisation de React Query pour les communications serveur sans coûts supplémentaires, avec une licence open-source MIT.</li>
                            <li>Application sécurisée grâce à une bonne pratique du traitement des données en backend.</li>
                        </ul>
                    </div> */}
        </div>
    </>
};

export default SliderAbout;

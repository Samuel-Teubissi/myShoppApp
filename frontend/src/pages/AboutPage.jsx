import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';
import link from '../assets/img/Tayz PortFolioLast.png'
import linkMsg from '../assets/img/about-msg.png'
import linkMartin from '../assets/img/MartinLuther.png'
import quote from '../assets/img/quote.png'
import techImg0 from '../assets/img/tech_reactjs.svg'
import techImg1 from '../assets/img/tech_js.webp'
import techImg2 from '../assets/img/tech_tailwind.webp'
import techImg3 from '../assets/img/tech_php.webp'
import techImg4 from '../assets/img/tech_css3.webp'
import techImg5 from '../assets/img/tech_mysql.webp'
import techImg6 from '../assets/img/tech_github.webp'
import techImg7 from '../assets/img/tech_typescript.webp'
import techImg8 from '../assets/img/tech_next.webp'
import { Github } from "lucide-react";
import { MdWhatsapp } from "react-icons/md";
import { Link } from "react-router-dom";
import { SiWhatsapp, SiGmail, SiGithub } from 'react-icons/si'
// import { SiReact, SiTailwindcss, SiPhp, SiCss3, SiMysql } from 'react-icons/si'

const AboutPage = () => {
    // const location = 'http://localhost/MyShopI/'
    // const link = "assets/img/tayz.jpg"
    let technoImgs = [
        { icon: techImg0, title: 'React' }, { icon: techImg2, title: 'TailwindCss' },
        { icon: techImg1, title: 'JS' }, { icon: techImg3, title: 'Php' }, { icon: techImg4, title: 'Css3' },
        { icon: techImg5, title: 'MySql' }, { icon: techImg7, title: 'Typescript', now: true },
        { icon: techImg8, title: 'NextJS', now: true }]
    let contacts = [{ icon: SiWhatsapp, label: 'Whatsapp', color: '#25D366', link: 'https://wa.me/237696771089' },
    { icon: SiGmail, label: 'Gmail', color: '#D14836', link: 'mailto:samtebs07@gmail.com' },
    { icon: SiGithub, label: 'GitHub', color: '#181717', link: 'https://github.com/Samuel-Teubissi/' }]
    useEffect(() => {
        Aos.init({
            duration: 200,
            once: true
        })
    }, []);

    return <div id='scroll-container' className="ms_Main">
        <div className="flex flex-col xl:flex-row justify-center items-start gap-2 xl:gap-8 px-2 py-2 xl:p-8 bg-white/30 dark:bg-dark mt-2 dark:text-dark-app-100 border dark:border-transparent">
            <div className="about_img flex flex-col justify-center items-center pt-4 sm:pt-0 xl:w-2/3 w-full main-about overflow-hidden">
                {/* <img src={linkMsg} alt="Author" className="rounded object-cover block absolute top-[8%] left-[8%] xl:top-[-3px] xl:left-[55px] scale-95 hover:scale-100 max-w-full z-0 w-[400px] sm:w-[350px] lg:w-[500px] xl:w-[400px]" data-aos='fade-up' data-aos-delay={0} data-aos-duration={1000} /> */}
                <div className="relative">
                    <img src={linkMsg} alt="Author" className="rounded object-cover block absolute -top-[64px] left-0 scale-95 hover:scale-100 max-w-full z-0 w-[400px] xl:hidden" data-aos='fade-up' data-aos-delay={0} data-aos-duration={1000} />
                    <img src={link} alt="Author" className="max-w-full rounded object-cover z-10 hover-rotate-y transition-transform duration-300" width={430} height={430} />
                </div>
                <div className="flex items-center gap-1 text-dark-app-100 mt-2">
                    {contacts.map((contact, key) => (
                        <Link key={key} to={contact.link} className="flex items-center bg-dark-div rounded-xl py-1 px-3 gap-1 hover:bg-app-800 font-medium btn-trans shadow-xl border border-app-700" target="_blank" data-aos='fade-up' data-aos-delay={50 * key} data-aos-duration={800} data-aos-offset={50}>
                            {contact.label} <contact.icon className="w-[20px] h-[20px]" style={{ color: contact.color }} />
                        </Link>
                    ))}
                </div>
            </div>
            <div className="text-left pt-8 xl:pt-0 pb-20 sm:pr-10 flex flex-col justify-center sm:justify-start">
                <h1 className="text-gray-600 dark:text-gray-300 px-5">Hello World, moi c'est Sam !</h1>
                <div>
                    <div className="py-4 px-10">
                        Bienvenue sur mon portfolio, donne moi 2 minutes pour te résumer cette app, et mes compétences au passage 😁
                    </div>
                    <div className="rounded-xl overflow-hidden mt-4 mx-auto" data-aos='fade-up' data-aos-delay={0} data-aos-offset={100}>
                        <div className="bg-gray-800 px-3 py-2 rounded-t-lg flex gap-2 items-center">
                            <span className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-300 cursor-pointer"></span>
                            <span className="w-3 h-3 bg-yellow-400 rounded-full hover:bg-yellow-200 cursor-pointer"></span>
                            <span className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-300 cursor-pointer"></span>
                            <span className="bg-gray-500 px-4 rounded-xl py-1 text-white/70">Prouving.jsx</span>
                        </div>
                        <div className="bg-[#1e1e1e] text-gray-300 p-4 rounded-b-lg font-mono text-sm leading-relaxed overflow-x-auto max-w-full">
                            <pre>
                                <code>
                                    {'setTimeout(() => {\n  DestroyDocument(this)\n}, 120000); \n//Ce document s\'autodétruira dans 2 minutes 💣'}
                                </code>
                            </pre>
                        </div>
                    </div>
                    <div className="mt-6 px-10">
                        <h2 className="text-gray-600 dark:text-gray-300">À propos de moi</h2>
                        <div className="mt-2 text-justify">
                            Je suis <span className="highlight">Teubissi Samuel</span>, <span className="highlight">développeur web fullstack</span> et <span className="highlight">dinfographiste passionné</span>, spécialisé dans la création de sites web modernes et l'optimisation d'expériences visuelles.🌐<br />
                            J'utilise des technologies comme <span className="highlight">React.js</span> et <span className="highlight">Tailwind CSS</span> pour développer des interfaces dynamiques et performantes. <br />
                            En parallèle, j'apporte mon expertise en <span className="highlight">infographie</span> pour concevoir des visuels attrayants, que ce soit pour des sites web ou des campagnes promotionnelles. <br />
                            Mon approche combine design et fonctionnalité, garantissant des solutions web adaptées aux besoins de mes clients. <br />
                            En utilisant <span className="highlight">CodeIgniter</span>, je suis en mesure de développer des backends <i>solides et évolutifs</i>. Mon objectif est de créer des projets qui allient esthétique, performance et simplicité d'utilisation
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="about-detail about bg-white/30 dark:bg-dark mt-6 p-6 sm:px-8 mb-3">
            <h1 className="mt-10 xl:max-w-[70%] xl:mx-auto">Détails sur le projet <span className="text-app text-5xl">`MyShop App`</span></h1>
            <p className="mt-5 about-block">J'ai pendant 2 mois travaillé sur le développement de cette <span className="highlight">application e-commerce en React</span>, avec pour objectif de créer une expérience utilisateur <span className="highlight">fluide et fiable</span> autour de la gestion du panier.</p>
            <div className="mt-10">
                <h2 className="my-4 whitespace-nowrap">Fonctionnalités principales :</h2>
                <div className="about-balance sm:grid grid-cols-2 text-white/90">
                    <div className="about-left" data-aos='fade-right' data-aos-delay={0}>
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
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <h2 className="p-4">Technologies Utilisées ou Acquises <span className="text-base">(📌: En cours)</span></h2>
                <div className="flex justify-center gap-2 lg:gap-6 flex-wrap">
                    {technoImgs.map((techno, key) => (
                        <div key={key} className="bg-gray-800 rounded-xl p-4 flex justify-center items-center relative" data-aos='fade-up' data-aos-duration={300} data-aos-delay={50 * (key + 1)} data-aos-easing='ease-in-back'>
                            <img src={techno.icon} className="w-20 h-20" title={techno.title} />
                            {techno.now && <span className="absolute top-0 left-1">📌</span>}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-10 about-block">
                <h1 className="py-4">Conclusion</h1>
                <div className="">Ce projet a été un vrai défi, entre la gestion du panier en frontend, l'optimisation de la persistance des données, et l'architecture modulaire que j'ai adoptée (useCart, useCookie) pour rendre le code <span className="text-app-500">évolutif et maintenable</span>. <br />
                    L'utilisation d'un backend en <span className="text-app-500">PHP</span> est en fait un renouement avec le language qui m'a fait entrer pleinement dans ce qui est aujourd'hui ma passion, j'ai nommé <span className="text-app-500">la programmation</span>. <br /><br />
                    Et 2 minutes plus tard c'est sur cette déclaration très personnelle et profonde que je pense vous avoir convaincu de débuter une nouvelle aventure de création avec moi ! 🤝 <br />
                    <h3>Venez on travaille un projet ensemble, ça va être <span className="highlight text-xl tracking-wide">GRANDIOSE</span> !</h3>
                </div>
            </div>
            <div className="dream sm:full mx-auto flex flex-col sm:flex-row gap-5 pb-5 px-10 justify-center items-center rounded-xl mt-8 bg-gray-800 overflow-hidden shadow-inner bg-no-repeat" style={{ backgroundImage: `url(${quote})`, backgroundPosition: "-8% 83%", backgroundSize: '150px 150px' }}>
                <div className="text-center sm:text-right order-2 sm:order-1 min-w-[200px] md:max-w-[65%]" data-aos='zoom-in-up' data-aos-duration={600}>
                    <blockquote className="sm:border-r-4 border-app-500 p-4 pt-0 italic text-xl font-serif text-pretty text-white/90">"J'ai fait un rêve, je codais la meilleure appli de l'année et <span className="highlight text-xl">c'était la vôtre</span> !"</blockquote>
                    <div className="text-gray-400 text-sm">Martin Luther King</div>
                </div>
                <div className="order-1 sm:order-2">
                    <img src={linkMartin} alt="Author" className="max-w-full rounded object-cover" width={230} height={230} data-aos='fade-up' data-aos-duration={600} />
                </div>
            </div>
            <div className="mt-10 about-block">
                <h2 className="py-4">Remerciements</h2>
                <p className="">
                    Je vais être très bref dans cette section, merci à
                    <ul>
                        <li><span className="highlight">Monsieur Akono Nkolo</span> pour l'accompagnement tant sur le plan moral que technique avec ses conseils avisés pour la conception du backend de ce projet</li>
                        <li><span className="highlight">Njikam Salim Mohamed</span> celui qui se s'auto-surnomme le <code className="highlight">GOAT du CSS</code> (très humble le mec) m'a épaulé tant sur la partie design et surtout sur le frontend de cette app</li>
                    </ul>
                </p>
            </div>
            <div className="bg-gray-800 mt-10 py-8 text-center text-white/90 rounded-xl trigger-links" data-aos='zoom-in' data-aos-delay={0} data-aos-duration={200}>
                <h2 className="p-2">Bossons ensemble dès maintenant.</h2>
                <div className="flex justify-center items-center gap-2 flex-wrap">
                    {contacts.map((contact, key) => (
                        <Link key={key} to={contact.link} className="flex items-center bg-dark-div rounded-xl py-1 px-3 gap-1 hover:bg-app-800 font-medium btn-trans shadow-xl border border-app-700" target="_blank">
                            {contact.label} <contact.icon className="w-[20px] h-[20px]" style={{ color: contact.color }} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </div>
}

export default AboutPage
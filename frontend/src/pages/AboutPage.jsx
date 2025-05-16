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
import techImg3 from '../assets/img/tech-express.png'
import techImg4 from '../assets/img/tech_css3.webp'
import techImg5 from '../assets/img/tech_sqlite.png'
import techImg6 from '../assets/img/tech_github.webp'
import techImg7 from '../assets/img/tech_typescript.webp'
import techImg8 from '../assets/img/tech_next.webp'
import { ChevronsLeftIcon, ChevronsRightIcon, Github } from "lucide-react";
import { MdWhatsapp } from "react-icons/md";
import { Link } from "react-router-dom";
import { SiWhatsapp, SiGmail, SiGithub } from 'react-icons/si'
import SliderAbout from "../components/SliderAbout";
// import { SiReact, SiTailwindcss, SiPhp, SiCss3, SiMysql } from 'react-icons/si'

const AboutPage = () => {
    useEffect(() => {
        document.title = "Mon portfolio | MyShop App"
    }, []);
    // const location = 'http://localhost/MyShopI/'
    // const link = "assets/img/tayz.jpg"
    let technoImgs = [
        { icon: techImg0, title: 'React' }, { icon: techImg2, title: 'TailwindCss' },
        { icon: techImg1, title: 'JS' }, { icon: techImg3, title: 'Express JS' }, { icon: techImg4, title: 'Css3' },
        { icon: techImg5, title: 'SQLite' }, { icon: techImg7, title: 'Typescript', now: true },
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

    return <div id='scroll-container'>
        <div className="flex flex-col xl:flex-row justify-start lg:justify-center items-start gap-2 xl:gap-8 px-2 py-2 xl:p-8 md:bg-white/10 dark:bg-transparent mt-2 dark:text-dark-app-100 pb-8 md:pb-0">
            <div className="about_img flex flex-col justify-center items-center mt-3 sm:pt-0 xl:w-2/3 w-full main-about">
                {/* <img src={linkMsg} alt="Author" className="rounded object-cover block absolute top-[8%] left-[8%] xl:top-[-3px] xl:left-[55px] scale-95 hover:scale-100 max-w-full z-0 w-[400px] sm:w-[350px] lg:w-[500px] xl:w-[400px]" data-aos='fade-up' data-aos-delay={0} data-aos-duration={1000} /> */}
                <div className="relative">
                    <img src={linkMsg} alt="Author" className="rounded object-cover block absolute -top-[64px] left-0 scale-95 hover:scale-100 max-w-full z-0 w-[400px]" data-aos='fade-up' data-aos-delay={0} data-aos-duration={1000} />
                    <img src={link} alt="Author" className="max-w-full rounded object-cover z-10 hover-rotate-y transition-transform duration-300 about-img" width={430} height={430} />
                </div>
                <div className="flex items-center gap-1 text-dark-app-100 mt-2">
                    {contacts.map((contact, key) => (
                        <Link key={key} to={contact.link} className="flex items-center bg-dark-div rounded-xl py-1 px-3 gap-1 hover:bg-app-800 font-medium btn-trans shadow-xl border border-app-700" target="_blank" data-aos='fade-up' data-aos-delay={50 * key} data-aos-duration={800} data-aos-offset={50}>
                            {contact.label} <contact.icon className="w-[20px] h-[20px]" style={{ color: contact.color }} />
                        </Link>
                    ))}
                </div>
                <div className="text-left xl:hidden mt-2">
                    <h1 className="text-gray-600 dark:text-gray-300 px-4">Hello World, moi c'est <span className="text-app-500 text-4xl md:text-6xl">Sam</span>&nbsp;!</h1>
                    <div className="px-4 sm:px-10 mt-2">
                        Bienvenue sur mon portfolio, donne moi 2 minutes pour te résumer cette app, et mes compétences au passage 😁
                    </div>
                </div>
            </div>
            <div className="text-left xl:pt-0 max-w-[100%] sm:pr-10 flex flex-col justify-center sm:justify-start">
                <div className="hidden xl:block">
                    <h1 className="text-gray-600 dark:text-gray-300 px-4">Hello World, moi c'est Sam&nbsp;!</h1>
                    <div className="py-4 px-4 sm:px-10">
                        Bienvenue sur mon portfolio, donne moi 2 minutes pour te résumer cette app, et mes compétences au passage 😁
                    </div>
                </div>
                <div>
                    <div className="rounded-xl overflow-hidden mt-4 mx-auto max-w-full border-2 dark:border-gray-800" data-aos='fade-up' data-aos-delay={0} data-aos-offset={100}>
                        <div className="bg-gray-800 px-3 py-2 rounded-t-lg flex gap-2 items-center">
                            <span className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-300 cursor-pointer"></span>
                            <span className="w-3 h-3 bg-yellow-400 rounded-full hover:bg-yellow-200 cursor-pointer"></span>
                            <span className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-300 cursor-pointer"></span>
                            <span className="bg-gray-500 px-4 rounded-xl py-1 text-white/70">Prouving.jsx</span>
                        </div>
                        <div className="bg-[#1e1e1e] text-gray-300 p-4 rounded-b-lg font-mono text-sm leading-relaxed overflow-x-auto max-w-full">
                            <pre>
                                <code>
                                    {'setTimeout(() => {\n  DestroyDocument(this)\n}, 120000); \n'}
                                </code>
                                <div className="about-text-appear">//Ce document s\'autodétruira dans 2 minutes 💣</div>
                            </pre>
                        </div>
                    </div>
                    <div className="px-4 lg:px-10 mt-8">
                        <h2 className="text-gray-600 dark:text-gray-300">À propos de moi</h2>
                        <div className="mt-2">
                            Je suis <span className="highlight">Teubissi Samuel</span>, <span className="highlight">développeur web fullstack</span> et <span className="highlight">dinfographiste passionné</span>, spécialisé dans la création de sites web modernes et l'optimisation d'expériences visuelles.🌐<br />
                            J'utilise des technologies comme <span className="highlight">React.js</span> et <span className="highlight">Tailwind CSS</span>  concevoir des interfaces dynamiques, fluides et performantes. <br /><br />
                            Parallèlement, je mets à profit mes compétences en <span className="highlight">infographie</span> pour créer des visuels percutants, adaptés aussi bien au web qu'à la communication promotionnelle. 🎨 <br />
                            Mon approche allie design et fonctionnalité, afin de proposer des solutions sur mesure, esthétiques et efficaces, qui répondent pleinement aux besoins de mes clients. <br /><br />
                            En utilisant <span className="highlight">CodeIgniter</span>, je suis en mesure de développer des backends <i>solides et évolutifs</i>. Mon objectif est de créer des projets qui allient esthétique, performance et simplicité d'utilisation
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className=" dark:text-white/90 dark:bg-transparent mt-4 py-6">
            <div className="about-detail w-full md:w-[90%] mx-auto">
                <div>
                    <h1 className="mt-10 xl:max-w-[70%] xl:mx-auto">Détails sur le projet <span className="text-app text-5xl">`MyShop App`</span></h1>
                    <p className="mt-5 about-block">J'ai pendant 2 mois travaillé sur le développement de cette <span className="highlight">application e-commerce en React</span>, avec pour objectif de créer une expérience utilisateur <span className="highlight">fluide et fiable</span> autour de la gestion du panier.</p>
                </div>
                <nav className="mt-10">
                    <h2 className="m-6 mb-0 whitespace-nowrap">Fonctionnalités principales :</h2>
                    <SliderAbout />
                </nav>
                <div className="mt-10">
                    <h2>Technologies Utilisées ou Acquises</h2>
                    <div className="mt-5 grid grid-cols-3 sm:flex justify-center gap-2 lg:gap-6 flex-wrap">
                        {technoImgs.map((techno, key) => (
                            <div key={key} className="bg-gray-900 rounded-xl p-4 flex justify-center items-center relative transform hover:scale-105" data-aos='fade-up' data-aos-duration={300} data-aos-delay={50 * (key + 1)} data-aos-easing='ease-in-back'>
                                <img src={techno.icon} className="w-20 h-20" title={techno.title} />
                                {techno.now && <span className="absolute top-0 left-1">📌</span>}
                            </div>
                        ))}
                    </div><br />
                    <span className="text-base text-gray-500">(📌: En cours)</span>
                </div>
                <div className="mt-10 about-block">
                    <h1 className="py-4">Conclusion</h1>
                    <div className="">Ce projet a été un vrai défi, entre la gestion du panier en frontend, l'optimisation de la persistance des données, et l'architecture modulaire que j'ai adoptée (useCart, useCookie) pour rendre le code <span className="text-app-500">évolutif et maintenable</span>. <br />
                        L'utilisation d'un backend en <span className="text-app-500">PHP</span> est en fait un renouement avec le language qui m'a fait entrer pleinement dans ce qui est aujourd'hui ma passion, j'ai nommé <span className="text-app-500">la programmation</span>. <br /><br />
                        Et 2 minutes plus tard c'est sur cette déclaration très personnelle et profonde que je pense vous avoir convaincu de débuter une nouvelle aventure de création avec moi ! 🤝 <br /><br />
                        <h3>Venez on travaille un projet ensemble, ça va être <span className="highlight text-xl tracking-wide">GRANDIOSE</span> !</h3>
                    </div>
                </div>
                <div className="dream sm:full mx-auto flex flex-col sm:flex-row gap-5 pb-5 px-10 justify-center items-center md:rounded-xl mt-8 bg-gray-800 overflow-hidden shadow-inner bg-no-repeat" style={{ backgroundImage: `url(${quote})`, backgroundPosition: "-8% 83%", backgroundSize: '150px 150px' }}>
                    <div className="text-center sm:text-right order-2 sm:order-1 min-w-[200px] md:max-w-[65%]" data-aos='zoom-in-up' data-aos-duration={600}>
                        <blockquote className="sm:border-r-4 border-app-500 p-4 pt-0 italic text-xl font-serif text-pretty text-white/90">"J'ai fait un rêve, je codais la meilleure appli de l'année et <span className="highlight text-xl">c'était la vôtre</span> !"</blockquote>
                        <div className="text-gray-400 text-sm">Martin Luther King</div>
                    </div>
                    <div className="order-1 sm:order-2">
                        <img src={linkMartin} alt="Author" className="max-w-full rounded object-cover hover-rotate-y" width={230} height={230} data-aos='fade-up' data-aos-duration={600} />
                    </div>
                </div>
                <div className="mt-10 about-block">
                    <h2 className="py-4">Remerciements</h2>
                    <div className="">
                        Je vais être très bref dans cette section, merci à : <br /><br />
                        <ul className="list-disc ml-5">
                            <li><span className="highlight">Monsieur Akono Nkolo</span> pour l'accompagnement tant sur le plan moral que technique avec ses conseils avisés pour la conception du backend de ce projet</li>
                            <li><span className="highlight">Njikam Salim Mohamed</span> celui qui se s'auto-surnomme le <code className="highlight">GOAT du CSS</code> (très humble le mec) m'a épaulé tant sur la partie design et surtout sur le frontend de cette app</li>
                        </ul>
                    </div>
                </div>
                <div className="bg-gray-800 mt-10 py-8 text-center text-white/90 trigger-links" data-aos='zoom-in' data-aos-delay={0} data-aos-duration={50} data-aos-offset={50}>
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
    </div>
}

export default AboutPage
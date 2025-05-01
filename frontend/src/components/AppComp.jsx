import SoundLink from "../assets/sound/App_Notif.wav"
import axios from "axios";
import { forwardRef, useEffect, useState } from "react";
import { api } from "../hooks/api";

export const SoundNotif = () => {
    const audio = new Audio(SoundLink)
    audio.volume = 0.05
    audio.play()
}

export function waitSync(duration) {
    const t = Date.now()
    while (true) {
        if (Date.now() - t > duration) {
            return true
        }
    }
}

// export const ScrollOnTop = () => {
//     const scrollSearch = document.getElementById("scroll-container");
//     scrollSearch.scrollIntoView({ behavior: "smooth", block: "start" });
// }

export const setThemeApp = (theme) => {
    const root = document.documentElement
    if (theme === 'dark') {
        root.classList.add('dark')
    } else {
        root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
}

export const formatElapsedTime = (rawDateStr) => {
    // Transforme "2024-11-08 17:19:16" → "2024-11-08T17:19:16"
    const pastDate = new Date(rawDateStr.replace(" ", "T"));
    const now = new Date();
    const diffMs = now - pastDate;

    if (isNaN(diffMs)) return "Date invalide";

    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return `${diffSec} sec`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} min`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `${diffH} h`;
    const diffD = Math.floor(diffH / 24);
    if (diffD < 30) return `${diffD} j`;
    const months =
        (now.getFullYear() - pastDate.getFullYear()) * 12 +
        (now.getMonth() - pastDate.getMonth());

    if (months < 12) return `${months} mois`;

    const years = Math.floor(months / 12);
    return `${years} an${years > 1 ? "s" : ""}`;
}

export const InputField = ({ label, type = "text", name, value, onChange, error, placeholder }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1 text-sm text-left dark:text-dark-app-100" htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                defaultValue={value}
                // onChange={onChange}
                placeholder={placeholder}
                className={`w-full ${type !== 'file' ? "py-2 px-5" : "cursor-pointer"} border-2 rounded-full ${error ? "border-red-400" : "border-app-300"}`}
            />
            <i className='fa fa-lock'></i>
            {error && <div className="input-alert">{error}</div>}
        </div>
    )
}

export const InputFieldAdd = forwardRef(({ label, type = "text", name, value = '', onChange, error, placeholder }, ref) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1 text-left text-sm dark:text-white/90" htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                defaultValue={value}
                // onChange={onChange}
                {...(type === 'file' ? { ref } : {})}
                placeholder={placeholder}
                className={`w-full ${type !== 'file' ? "px-5 py-2.5" : "transition duration-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-app-600/30"} border rounded-full ${error ? "border-red-500" : "border-gray-300"}`}
            />
            <i className='fa fa-lock'></i>
            {error && <div className="input-alert">{error}</div>}
        </div>
    )
})

export const InputFieldFile = ({ label, type = "text", name, value = '', onChange, error, placeholder }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1 text-left text-xs" htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                defaultValue={value}
                // onChange={onChange}
                placeholder={placeholder}
                className={`w-full ${type !== 'file' ? "px-5 py-2.5" : "transition duration-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-app-600/30"} border rounded-full ${error ? "border-red-500" : "border-gray-300"}`}
            />
            <i className='fa fa-lock'></i>
            {error && <div className="input-alert">{error}</div>}
        </div>
    )
}

export const Select_categories = ({ onChange, error, name = '', id = '', classData, valueProp }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api.get(`/articles/categories`)
            .then(response => {
                setCategories(response.data.data)
            })
            .catch(err => {
                console.log('Erreur dans la requête des catégories');
            })
    }, []);

    const categoriesData = Object.values(categories);

    if (categoriesData.length < 1) return null
    return (
        <select name={name}
            value={valueProp}
            className={`${classData} ${error ? "border-red-500" : ''}`}
            onChange={onChange}
            title="category" id={id}
        >
            {categoriesData.map((categ, index) => (
                <option value={index} key={index}>{categ}</option>
            ))}
        </select>
    )
}
export const SelectField_categories = ({ onChange, error, classData, valueProp }) => {
    return (
        <>
            <div className="inpt categ">
                <label htmlFor='category' className="block text-gray-700 font-semibold mb-1 text-left text-sm dark:text-white/90">Catégorie de l'article :</label>
                <span>
                    <Select_categories
                        onChange={onChange} error={error} name='category' id='category' classData={classData} valueProp={valueProp} />
                </span>
                <i className="file fa fa-upload"></i>
                {error && <div className="input-alert">{error}</div>}
            </div>
        </>
    );
}


export default InputField;

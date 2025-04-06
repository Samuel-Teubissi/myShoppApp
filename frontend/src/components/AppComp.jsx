import SoundLink from "../assets/sound/App_Notif.wav"

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

export const InputField = ({ label, type = "text", name, value, onChange, error, placeholder }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1 text-left" htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                // value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full ${type !== 'file' ? "py-3 px-5" : "cursor-pointer"} border rounded-full ${error ? "border-red-500" : "border-gray-300"}`}
            />
            <i className='fa fa-lock'></i>
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
};

export const InputFieldAdd = ({ label, type = "text", name, value, onChange, error, placeholder }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1 text-left" htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                // value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full ${type !== 'file' ? "px-5 py-3" : "cursor-pointer"} border rounded-full ${error ? "border-red-500" : "border-gray-300"}`}
            />
            <i className='fa fa-lock'></i>
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
};

export default InputField;

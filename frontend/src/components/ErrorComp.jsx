import { faFaceFrown, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ErrorComp = ({ type = 'default', message }) => {
    return (
        <div className="flex flex-col justify-center pt-20 pb-36 w-full">
            <div className="py-20 px-10 tracking-wider bg-white/90 border border-app-200 w-[95%] sm:w-3/4 lg:w-1/2 mt-1 text-center text-gray-900 flex justify-center items-center gap-3 rounded-xl mx-auto dark:bg-app-600/10 dark:text-dark-app-100 dark:border-app-900">
                <div>
                    {type === 'default' && <FontAwesomeIcon icon={faTriangleExclamation} className="w-14 h-14 text-app-900 dark:text-app-600" />}
                    {type === 'nothing' && <FontAwesomeIcon icon={faFaceFrown} className="w-14 h-14 text-app-900 dark:text-dark-app-100" />}
                </div>
                <div>{message}</div>
            </div>
        </div>
    );
}
export default ErrorComp
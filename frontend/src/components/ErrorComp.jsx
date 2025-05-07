import { faFaceFrown, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Ghost } from "lucide-react";

const ErrorComp = ({ type = 'default', message }) => {
    return (
        <div className="pt-20 pb-36 w-full">
            <div className="flex flex-col justify-center py-16 sm:py-20 px-10 tracking-wider bg-white/90 border border-app-100 w-[95%] sm:w-3/4 lg:w-1/2 mt-1 text-center text-gray-900 items-center gap-3 rounded mx-auto dark:bg-app-600/10 dark:text-dark-app-100 dark:border-dark">
                <div>
                    {type === 'default' && <FontAwesomeIcon icon={faTriangleExclamation} className="w-20 h-20 lg:w-14 lg:h-14 text-app-900 dark:text-app-600" />}
                    {type === 'nothing' && <FontAwesomeIcon icon={faFaceFrown} className="w-20 h-20 lg:w-14 lg:h-14 text-app-900 dark:text-dark-app-100" />}
                    {type === 'empty' && <Ghost className="w-20 h-20 lg:w-14 lg:h-14 text-app-900 dark:text-dark-app-100" />}
                </div>
                <div>{message}</div>
            </div>
        </div>
    );
}
export default ErrorComp
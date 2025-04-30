import { BoxIcon, ClockIcon, PhoneIcon } from "lucide-react";

const LoaderSkeletonArticle = () => {
    return (
        <div className="flex justify-center gap-2">
            {[...Array(3)].map((_, key) => (
                <div key={key} className="border border-app-200 shadow-md w-80 bg-app-050 rounded-xl overflow-hidden dark:bg-dark-div dark:border-app-800">
                    <div className="w-full h-60 mx-auto bg-gray-500 animate-pulse">
                        <div className="">
                        </div>
                    </div>
                    <div className="">
                        <div className="flex items-center h-[70px] m-2 bg-gray-300 animate-pulse rounded">
                            <div className="text-base"></div>
                        </div>
                        <div className="text-sm pt-0 p-5 pb-3">
                            <div className="flex flex-col gap-2 px-2">
                                <div className="flex gap-2 items-center text-gray-900 uppercase">
                                    <span className="bg-app p-1 flex justify-center items-center rounded-full"></span>
                                    <div className="text-base w-1/2 h-4 bg-gray-300 rounded-full animate-pulse"></div>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <span className="text-app-500 justify-center items-center rounded-full"><PhoneIcon className="w-4 h-4" /></span>
                                    <div className="text-base w-1/2 h-4 bg-gray-300 rounded-full animate-pulse"></div>
                                </div>
                                <div className="flex items-center text-center uppercase">
                                    <div className="text-app-300 w-2/3 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                                </div>
                                <div className="flex justify-between gap-2">
                                    <div className="flex gap-2 items-center w-1/2 h-4">
                                        <span className="text-app-300 flex justify-center items-center">
                                            <BoxIcon className="w-4 h-4" />
                                        </span>
                                        <div className="bg-gray-300 rounded-full animate-pulse w-full h-full"></div>
                                    </div>
                                    <div className="flex gap-2 items-center w-1/2 h-4">
                                        <span className="text-app-300 flex justify-center items-center">
                                            <ClockIcon className="w-4 h-4" />
                                        </span>
                                        <div className="bg-gray-300 rounded-full animate-pulse w-full h-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center w-full mt-3">
                                <div className="flex items-center justify-center h-12 text-white bg-gray-300 w-full rounded-xl gap-2 capitalize animate-pulse">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default LoaderSkeletonArticle
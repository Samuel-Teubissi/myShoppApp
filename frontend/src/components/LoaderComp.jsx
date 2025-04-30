import React from "react";
// import { TailSpin } from "react-loader-spinner";
import { ScaleLoader } from "react-spinners";


const LoaderComp = () => {
    let color = "#ce39b6";
    return (//<div className="inset-0 z-50 bg-app-950/85 backdrop-blur-sm fixed top-0 left-0 w-full h-screen flex justify-center items-center btn-trans">
        <div className="flex justify-center items-center py-14 main-about">
            <ScaleLoader
                color={color}
                loading={true}
                // cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
        //</div>
    )
}

export default LoaderComp;

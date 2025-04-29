import React from "react";
// import { TailSpin } from "react-loader-spinner";
import { ScaleLoader } from "react-spinners";


const LoaderComp = () => {
    let color = "#ce39b6";
    return (
        <div className="flex justify-center items-center py-14">
            <ScaleLoader
                color={color}
                loading={true}
                // cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default LoaderComp;

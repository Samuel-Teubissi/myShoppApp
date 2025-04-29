import ErrorComp from "../components/ErrorComp";

const Unauthorized = () => {
    return (
        <div className="mt-40 mb-20">
            <ErrorComp message="Vous n'avez pas le droit d'accéder à cette page" />
        </div>
    );
}
export default Unauthorized
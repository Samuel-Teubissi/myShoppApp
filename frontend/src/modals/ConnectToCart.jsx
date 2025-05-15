
const ConnectToCart = ({ onClose, redirect }) => {
    const handleRedirect = () => {
        onClose()
        redirect()
    }
    return (
        <>
            <div>
                <div className="modal-body">Vous devez <span className="text-app">vous connecter</span> pour passer des commandes</div>
                <div className="btn-modal-container">
                    <button type="button" onClick={onClose} className="btn-modal-cancel">
                        Annuler
                    </button>
                    <button onClick={handleRedirect} className="btn-modal-submit" >
                        Se Connecter
                    </button>
                </div>
            </div>
        </>
    );
}
export default ConnectToCart
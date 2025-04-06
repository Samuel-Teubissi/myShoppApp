
import { API_href } from "../App.json";

const ArticleComp = ({ art, articleRef }) => {

    const imgLink = API_href + '/assets/img/articles/' + art.file_name
    // const imgLink = `${import.meta.env.VITE_PUBLIC_URL}/images/articles/${art.file_name}`;
    const artLink = art.id_articles

    return (
        <div className="article animO shadow" ref={articleRef}>
            <div className="art_H">
                <img src={imgLink} alt="Image de l'article" className="art_P" />
            </div>
            <div className="art_D text-left">
                <div className="title py-3 capitalize truncate text-app">
                    <span className="merch" title={art.article}>{art.article}</span>
                    <span className="price font-medium"><span className="px-4 flex content-center">{art.price} FCFA</span></span>
                </div>
                <div className="merch name">
                    <span className="merch lbl">Vendeur :</span>
                    <span>{art.name}</span>
                </div>
                <div className="merch num">
                    <span className="merch lbl">Tél : </span>
                    <span>{art.number}</span>
                </div>
                <div className="merch date">
                    <span className="merch lbl">Ajouté(e) le : </span>
                    <span>{art.date}</span>
                </div>
                <div className="merch date">
                    <span className="merch lbl">Catégorie : </span>
                    <span alt={art.content}>{art.content}</span>
                </div>
                <div className="merch date">
                    <span className="merch lbl">Stock restant : </span>
                    <span>{art.quantity > 0 ? art.quantity : 'Epuisé'}</span>
                </div>
                {art.quantity > 0 && <div className="merch date">
                    <span className="merch">
                        <a href={artLink}>Ajouter au Panier</a>
                    </span>
                </div>}
            </div>
        </div>
    )
}

export default ArticleComp
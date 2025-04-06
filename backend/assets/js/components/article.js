// art.name ==> <?= $art['article']; ?>
// art.file_name ==> <?= url_img().$art['file_name']; ?>
// art.price ==> <?= format_price($art['price']); ?>
// art.vendor ==> <?= $art['name']; ?>
// art.number ==> <?= $art['number']; ?>
// art.date ==> <?= $art['date']; ?>
// art.categ ==> <?= Uppercase($art['content']); ?>
// art.qty ==> <?= stateStock($art['quantity']); ?>
// art.id ==> $art['id_articles']
// Link : "<?= super_link(" admin /addcart/".$art['id_articles']); ?>"


const Article = ({ art }) => {
    const artLink = window.location.href + art.id
    return (
        <div className="article animO">
            <div className="art_H">
                <img src="{art.file_name}" alt="Image de l'article" className="art_P" />
            </div>
            <div className="art_D">
                <div className="title">
                    <span className="merch">{art.name}</span>
                    <span className="price">{art.price} FCFA</span>
                </div>
                <div className="merch name">
                    <span className="merch lbl">Vendeur :</span>
                    <span>{art.vendor}</span>
                </div>
                <div className="merch num">
                    <span className="merch lbl">Tél :</span>
                    <span>{art.number}</span>
                </div>
                <div className="merch date">
                    <span className="merch lbl">Ajouté(e) le :</span>
                    <span>{art.date}</span>
                </div>
                <div className="merch date">
                    <span className="merch lbl">Catégorie :</span>
                    <span>{art.categ}</span>
                </div>
                <div className="merch date">
                    <span className="merch lbl">État :</span>
                    <span>{art.qty}</span>
                </div>
                {art.qty > 0 && <div className="merch date">
                    <span className="merch">
                        <a href="{artLink}">Ajouter au Panier</a>
                    </span>
                </div>}
            </div>
        </div>
    )
}

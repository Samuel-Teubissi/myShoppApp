const Article = () => {
    return (
        <div>
            <div className="article animO">
                <div className="art_H">
                    <img src="<?= url_img().$art['file_name']; ?>" alt="Image de l'article" className="art_P" />
                </div>
                <div className="art_D">
                    <div className="title">
                        <span className="merch"><?= $art['article']; ?></span>
                        <span className="price"><span><?= format_price($art['price']); ?> FCFA</span></span>
                    </div>
                    <div className="merch name">
                        <span className="merch lbl">Vendeur :</span>
                        <span><?= $art['name']; ?></span>
                    </div>
                    <div className="merch num">
                        <span className="merch lbl">Tél :</span>
                        <span><?= $art['number']; ?></span>
                    </div>
                    <div className="merch date">
                        <span className="merch lbl">Ajouté(e) le :</span>
                        <span><?= $art['date']; ?></span>
                    </div>
                    <div className="merch date">
                        <span className="merch lbl">Catégorie :</span>
                        <span><?= Uppercase($art['content']); ?></span>
                    </div>
                    <div className="merch date">
                        <span className="merch lbl">État :</span>
                        <?= stateStock($art['quantity']); ?>
                    </div>
                    {/* <?php
                        if ($art['quantity'] > 0) {
                    ?>
                            <div className="merch date">
                                <span className="merch">
                                    <a href="<?= super_link(" admin /addcart/".$art['id_articles']); ?>">Ajouter au Panier</a>
                            </span>
                        </div>
                <?php
                        }
                    ?> */}
                </div>
                );
}

                export default Article;
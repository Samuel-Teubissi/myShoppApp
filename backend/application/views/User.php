<?php
    $id = $this->session->id_user;
    $id_trader = $this->session->id_trader;
    $SName = $this->session->name;
    $SNum = $this->session->number;
//    $articles = $this->Article->get_StockArticles($id);
    $Trade = $this->Trade->VerifyTrader($id_trader);

?>

<div class="ms_Main">
        <div class="Main"><br><br>
        <h1>Bienvenue <?= $SName; ?> !</h1>
        <h2>Votre numéro est le +237 <?= $SNum; ?></h2>
        <div class="lnd_add animZ">
    <?php if (count($Trade) > 0) : ?>
        <div>
            <h3>Espace Marchand</h3><br>
            <a href="user/add" class="btn">Ajouter un article</a>
            <a href="user/stock" class="btn">Modifier les stocks</a>
        </div>
    <?php endif; ?>
        </div>

        <div class="articlesH">Vos articles</div>
        <div class="articles">
<?php 
    if (!empty($Trade)) : 
        $articles = $this->Article->get_StockArticles($id_trader);
        if (isset($articles) && count($articles) > 0) : 
            foreach($articles as $art): 
                
            /*    $rupture['error'] = 'green';
                $rupture['message'] = 'Suffisant';
                    if ($art['quantity'] <= 5) {
                        $rupture['error'] = 'red';
                        $rupture['message'] = 'Faible';
                    }*/
?>
                <div class="article">
                    <div class="art_H">
                        <img src="<?= super_link('assets/img/articles/'.$art['file_name']); ?>" alt="Image de l'article" class="art_P"/>
                    </div>
                    <div class="art_D">
                        <div class="title">
                            <span class="merch"><?= $art['article']; ?></span>
                            <span class="price"><span><?= $art['price']; ?> FCFA</span></span>
                        </div>
                        <div class="merch date">
                            <span class="merch lbl">Ajouté le :</span>
                            <span><?= $art['date']; ?></span>
                        </div>
                        <div class="merch date">
                            <span class="merch lbl">Quantité :</span>
                            <span><?= $art['quantity']; ?></span>
                        </div>
                        <div class="merch date">
                            <span class="merch lbl">Catégorie :</span>
                            <span><?= $art['content']; ?></span>
                        </div>
                        <div class="merch date">
                            <span class="merch lbl">État de stock :</span>
                            <!--<span class="<?= $rupture['error']; ?>"><?= $rupture['message']; ?></span>-->
                            <?= stateStock($art['quantity']); ?>
                        </div>
                    </div>
                </div>
        <?php endforeach; else: ?>
        <div class="artV">Aucun Article dans la base de données pour le moment</div>
    <?php endif; else: ?>
    <div class="artV"><br>
        Cliquez sur le lien suivant et vous pourrez désormais ajouter des articles sur le site.
        <a href="<?= super_link('user/trader'); ?>">Devenir Trader !</a>
    </div>
<?php endif; ?>
        </div>
    </div>
</div>
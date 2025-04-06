<?php

?>

<div class="Main">
    <br>
    <h1 class="Header animT">Bienvenue sur My ShopAPP</h1>
    <h2 class="Header2 animT">Site Numéro 1 de la vente d'articles sans intermédiaires</h2>
    <br>
    <p class="hT animT">Un article dans la liste ci-dessous vous interresse vous n'avez qu'à joindre le numéro en dessous et discuter des détails de la transaction avec le marchand ! Rien de plus simple !</p>
    <?php
    if (!empty($this->session->AddCart)) {
    ?>
        <div class="artV flash">
            <?= $this->session->AddCart; ?>
        </div>
    <?php
        $this->session->set_userdata('AddCart', '');
    }
    ?>
    <div class="lnd_add animZ">
        <a href="admin/cart" class="btn">Accéder au panier</a>
    </div>
    <div class="articlesH animT">Articles En Vente</div>
    <br>
    <div class="search">
        <form method="GET">
            <input type="search" name="s" placeholder="Recherchez un article ?" value="<?= $search; ?>" class='inpt-f'>
            <?= form_dropdown('categ', $categories, $categ, 'class="slct"'); ?>
            <input type="submit" value="Rechercher" class='confirm'>
        </form>
    </div>
    <div class='pagination'><br><?php echo $paginate; ?></div>
    <div class="articles"></div>
    <!--
    <div class="articles">
        <?php
        //    var_dump($article);
        if ($article && count($article) > 0) {
            foreach ($article as $art) :
        ?>
                <div class="article animO">
                    <div class="art_H">
                        <img src="<?= url_img() . $art['file_name']; ?>" alt="Image de l'article" class="art_P" />
                    </div>
                    <div class="art_D">
                        <div class="title">
                            <span class="merch"><?= $art['article']; ?></span>
                            <span class="price"><span><?= format_price($art['price']); ?> FCFA</span></span>
                        </div>
                        <div class="merch name">
                            <span class="merch lbl">Vendeur :</span>
                            <span><?= $art['name']; ?></span>
                        </div>
                        <div class="merch num">
                            <span class="merch lbl">Tél :</span>
                            <span><?= $art['number']; ?></span>
                        </div>
                        <div class="merch date">
                            <span class="merch lbl">Ajouté(e) le :</span>
                            <span><?= $art['date']; ?></span>
                        </div>
                        <div class="merch date">
                            <span class="merch lbl">Catégorie :</span>
                            <span><?= Uppercase($art['content']); ?></span>
                        </div>
                        <div class="merch date">
                            <span class="merch lbl">État :</span>
                            <?= stateStock($art['quantity']); ?>
                        </div>
                        <?php
                        if ($art['quantity'] > 0) {
                        ?>
                            <div class="merch date">
                                <span class="merch">
                                    <a href="<?= super_link("admin/addcart/" . $art['id_articles']); ?>">Ajouter au Panier</a>
                                </span>
                            </div>
                        <?php
                        }
                        ?>
                    </div>
                </div>
            <?php
            endforeach;
        } else {
            ?>
            <div class="artV hT"><?= $emptyArticle; ?></div>
        <?php
        }
        ?>
    </div>
    -->
    <br><br><br><br>
    <!--
            <select name="">
                <optgroup label='Yessoh'>Yessoh</optgroup>
                    <option value="">waaar</option>
                    <option value="">weeer</option>
                <optgroup label='Yessah'>Yessoh</optgroup>
                    <option value="">waaar</option>
                    <option value="">weeer</option>
            </select>
            -->
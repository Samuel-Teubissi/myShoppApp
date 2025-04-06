<?php
    //$categories = $this->Article->get_Categories(TRUE);
?>

<div class="ms_Main">
    <div>
        <?php
            if ($this->session->WelcomeTrade) {
        ?>
            <h1><?= $this->session->WelcomeTrade; ?></h1>
        <?php
            }
        ?>
        <h2>Ajoutez un nouvel article sur le site !</h2>
    </div>
    <form class="Main Cform animO" enctype="multipart/form-data" action="" method="post">
        <div class="add">
            <div class="inpt name">
                <span>Nom de l'article :</span>
                <span><input type="text" name="article" required placeholder='Saisissez un nom' value="<?= set_value('article'); ?>"></span>
                <i class="fa fa-id-card"></i>
                <div class='err'><?= form_error('article'); ?></div>
            </div>
            <div class="inpt price">
                <span>Prix de l'article :</span>
                <span><input type="text" name="price" required placeholder='Saisissez un Prix' value="<?= set_value('price'); ?>"></span>
                <i class="file fa fa-eur" aria-hidden="true"></i>
                <div class='err'><?= form_error('price'); ?></div>
            </div>
            <div class="inpt qty">
                <span>Quantité :</span>
                <span><input type="text" name="quantity" required placeholder='Saisissez une quantité' value="<?= set_value('quantity'); ?>"></span>
                <i class="file fa fa-eur" aria-hidden="true"></i>
                <div class='err'><?= form_error('quantity'); ?></div>
            </div>
            <div class="inpt file">
                <span>Photo de l'article :</span>
                <span><input type="file" name="userfile" accept='image/*'  placeholder='Saisissez un nom'></span>
                <i class="file fa fa-upload"></i>
                <div class='err'><?= $this->session->errFile; ?></div>
            </div>
            <div class="inpt categ">
                <span>Catégorie de l'article :</span>
                <span><?= form_dropdown('category', $categories, set_value('category'),"class='slct'"); ?></span>
                <i class="file fa fa-upload"></i>
                <div class='err'><?= form_error('category'); ?></div>
            </div>
        </div>
    <div class="ver"><?= $this->session->ValidFile; ?></div>
    <div class="err"><?= $this->session->errForm; ?></div>
    <div class="subm">
        <input type="submit" class="btn animZ" value="Ajouter" name="submC" />
    </div>
        <div class="ins">
            <a href="<?= base_url(); ?>admin">Revenir à l'espace administration</a>
        </div>
    </form>
</div>
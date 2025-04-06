<?php

?>

<div class="ms_Main">
    <div class="Main">
    <form class="Cform animO" method="post" action="">
        <div class="conn">
            <div class="inpt name">
                <span>Numéro de téléphone :</span>
                <span><input type="number" name="number" placeholder='+237 XXXXXXXXX' value="<?= set_value('number'); ?>"></span>
                <i class="fa fa-phone" aria-hidden="true"></i>
            </div>
            <div class="inpt pswd">
                <span>Mot de Passe :</span>
                <span><input type="password" name="pswd" placeholder='Votre mot de passe'></span>
                <i class='fa fa-lock'></i>
            </div>
        </div>
    <div class="err"><?= $this->session->ErrLogin; ?>
    <?= validation_errors(); ?></div>
    <div class="subm">
        <input type="submit" class="btn animZ" value="Connexion" name="submC" />
    </div>
        <div class="ins">
            Vous n'avez pas encore de compte ?<br>
            <a href="register">Inscrivez-vous !</a>
        </div>
    </form>
    </div>
</div>
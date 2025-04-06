<?php

?>

<div class="ms_Main">
<div class="Main">
    <form class="Cform insc animO" method="post" action="">
        <div class="insc">
            <div class="inpt number">
                <span>Numéro de téléphone :</span>
                <span><input type="number" name="number" class="f_inpt" placeholder='+237 XXXXXXXXX' value='<?= set_value('number'); ?>'></span>
                <i class='fa fa-phone'></i>
                <div class='err'><?= form_error('number'); ?></div>
            </div>
            <div class="inpt name">
                <span>Nom d'Utilisateur :</span>
                <span><input type="text" name="username" class="f_inpt" value='<?= set_value('username'); ?>'placeholder="Exemple : Bernard Dubois"></span>
                <i class='fa fa-user'></i>
                <div class='err'><?= form_error('username'); ?></div>
            </div>
            <div class="inpt pswd">
                <span>Mot de Passe :</span>
                <span><input type="password" name="pswd" class="f_inpt" autocomplete="off" placeholder="Mettez un mot de passe complexe"></span>
                <i class='fa fa-lock'></i>
                <div class='err'><?= form_error('pswd'); ?></div>
            </div>
            <div class="inpt pswd">
                <span>Confirmez votre Mot de Passe :</span>
                <span><input type="password" name="Cpswd" class="f_inpt" autocomplete="off" placeholder="Mettez un mot de passe complexe"></span>
                <i class='fa fa-lock'></i>
                <div class='err'><?= form_error('Cpswd'); ?></div>
            </div>
        </div>
        <div class="subm">
            <input type="submit" class="btn animZ" value="Inscription" name="submI" />
        </div>
        <div class='err'><span><?php if(isset($error_d) && $error_d === true) { echo 'Veillez remplir tous les champs'; } ?></span></div>
        <div class="ins">
            Vous avez déjà un compte ?<br>
            <a href="login">Connectez-vous !</a>
        </div>
    </form>
</div>
</div>
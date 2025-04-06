

<div class="ms_Main">
<div class="Main">
    <form class="Cform insc animO" method="post" action="">
        <div class="insc">
            <div class="inpt number">
                <span>Numéro de téléphone :</span>
                <span><input type="number" name="number" required="required" class="f_inpt" placeholder='+237 XXXXXXXXX' autocomplete='off'></span>
                <i class='fa fa-phone'></i>
                <div class='err'><?php if(isset($error_nu)) { echo $error_nu; } ?></div>
            </div>
            <div class="inpt name">
                <span>Nom d'Utilisateur :</span>
                <span><input type="text" name="name" required="required" class="f_inpt" autocomplete="off" placeholder="Exemple : Bernard Dubois"></span>
                <i class='fa fa-user'></i>
                <div class='err'><?php if(isset($error_na)) { echo $error_na; } ?></div>
            </div>
            <div class="inpt pswd">
                <span>Mot de Passe :</span>
                <span><input type="password" name="pswd" required="required" class="f_inpt" autocomplete="off" placeholder="Mettez un mot de passe complexe"></span>
                <i class='fa fa-lock'></i>
                <div class='err'><?php if(isset($error_p)) { echo $error_p; } ?></div>
            </div>
            <div class="inpt pswd">
                <span>Confirmez votre Mot de Passe :</span>
                <span><input type="password" name="Cpswd" required="required" class="f_inpt" autocomplete="off" placeholder="Mettez un mot de passe complexe"></span>
                <i class='fa fa-lock'></i>
                <div class='err'><?php if(isset($error_cp)) { echo $error_cp; } ?></div>
            </div>
        </div>
        <div class="subm">
            <input type="submit" class="btn animZ" value="Inscription" name="submI" />
        </div>
        <div class='err'><span><?php if(isset($error_d) && $error_d === true) { echo 'Veillez remplir tous les champs'; } ?></span></div>
        <div class="ins">
            Vous avez déjà un compte ?<br>
            <a href="Login">Connectez-vous !</a>
        </div>
    </form>
</div>
</div>
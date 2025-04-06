<?php 
    //var_dump($this->cart->contents());
 ?>

<div class="ms_Main">
    <div class="Main"><br><br>
        <h1><?= $this->session->name; ?>, votre Commande est prête !</h1>
        <div class="ins">
            <a href="<?= base_url() ?>admin">Revenir à l'espace administration</a>
        </div>
        <?= form_open(base_url().'admin/command'); ?>
        <table cellpadding="15" cellspacing="30" style="width:100%" border="0">
            <tr>
                <th>Quantité</th>
                <th>Description</th>
                <th style="text-align:right">Prix unitaire</th>
                <th style="text-align:right">Total</th>
            </tr>
            <?php foreach($dataCommand as $Command): ?>
            <tr>
                <td><?= $Command['quantity']; ?></td>
                <td><?= $Command['name']; ?></td>
                <td style="text-align:right"><?= format_price($Command['price']); ?></td>
                <td style="text-align:right"><?= format_price($Command['price'] * $Command['quantity']); ?></td>
            </tr>
            <?php endforeach; ?>
            <tr>
                <td colspan="2"> </td>
                <td style="text-align:right"><strong>Total (FCFA)</strong></td>
                <td style="text-align:right"><?= format_price($total); ?></td>
            </tr>
            <tr>
                <td colspan="4" style="text-align:center">
                    <input type="submit" class="btn animZ" value="Procéder au Paiement" name="submCommand" />
                </td>
            </tr>
        </table>
    </div>
</div>
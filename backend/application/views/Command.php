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
            <?php if (empty($this->cart->contents())) : ?>
                <tr>
                    <td colspan="4" style="text-align:center"><strong>Aucun article dans votre panier !</strong></td>
                </tr>
            <?php endif; ?>
            <?php foreach($this->cart->contents() as $item): ?>
            <?= form_hidden($i.'[cid]', $item['rowid']); ?>
            <tr>
                <td><?= $item['qty']; ?></td>
                <td><?= $item['name']; ?></td>
                <td style="text-align:right"><?= format_price($item['price']); ?></td>
                <td style="text-align:right"><?= format_price($item['subtotal']); ?></td>
            </tr>
            <?php $i++; endforeach; ?>
            <tr>
                <td colspan="2"> </td>
                <td style="text-align:right"><strong>Total (FCFA)</strong></td>
                <td style="text-align:right"><?= format_price($this->cart->total()); ?></td>
            </tr>
            <tr>
                <td colspan="4" style="text-align:center">
                    <input type="submit" class="btn animZ" value="Procéder au Paiement" name="submCommand" />
                </td>
            </tr>
        </table>
    </div>
</div>
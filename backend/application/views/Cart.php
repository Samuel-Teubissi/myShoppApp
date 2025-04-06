<?php 
    //var_dump($this->cart->contents());
    $i = 1;
 ?>

<div class="ms_Main">
    <div class="Main"><br><br>
        <h1>Bienvenue dans votre panier <?= $this->session->name; ?> !</h1>
        <div class="ins">
            <a href="<?= base_url() ?>admin">Revenir à l'espace administration</a>
        </div>
        <?= form_open(base_url().'admin/command'); ?>
        <table cellpadding="15" cellspacing="30" style="width:100%" border="0">
            <tr>
                <th>Quantité</th>
                <th>Description</th>
                <th>Catégorie</th>
                <th style="text-align:right">Prix unitaire</th>
                <th style="text-align:right">Total</th>
            </tr>
            <?php foreach($this->cart->contents() as $item): ?>
            <?= form_hidden($i.'[rowid]', $item['rowid']); ?>
            <tr>
                <td><?= form_input(array('name'=>$i.'[qty]','value' => $item['qty'],'maxlength' => '3','size' => '5')); ?></td>
                <td><?= $item['name']; ?></td>
                <td><?= Uppercase($item['categ']); ?></td>
                <td style="text-align:right"><?= format_price($item['price']); ?></td>
                <td style="text-align:right"><?= format_price($item['subtotal']); ?></td>
            </tr>
            <?php $i++; endforeach; ?>
            <tr>
                <td colspan="3"> </td>
                <td style="text-align:right"><strong>Total (FCFA)</strong></td>
                <td style="text-align:right"><?= format_price($this->cart->total()); ?></td>
            </tr>
            <?php if (!empty($this->session->ErrCart)) : ?>
            <tr>
                <td colspan="5" style="text-align:center">
                    <?= $this->session->ErrCart; ?>
                </td>
            </tr>
            <?php endif; ?>
            
            <?php if (empty($this->cart->contents())) : ?>
                <tr>
                    <td colspan="5" style="text-align:center"><strong>Aucun article dans votre panier !</strong></td>
                </tr>
            <?php endif; ?>

            <tr>
                <td colspan="5" style="text-align:center">
                    <input type="submit" class="btn animZ" value="Valider la commande" name="submCommand" />
                    <br><a href="<?= super_link('admin/addcart/delete'); ?>">Vider le pannier</a>
                </td>
            </tr>
        </table>
    </div>
</div>
<?php 
    $emptyStock = (!empty($dataStock)) ? '' : 'Aucun article dans votre stock';
    $i = 1;
?>

<div class="ms_Main">
    <div class="Main"><br><br>
        <h1>Bienvenue dans votre stock ><?= $this->session->name; ?>< !</h1>
        <div class="ins">
            <a href="<?= base_url() ?>Admin">Revenir à l'espace administration</a>
        </div>
        <?= form_open(base_url().'admin/stock'); ?>
        <table cellpadding="15" cellspacing="30" style="width:100%" border="0">
            <tr>
                <th>Quantité</th>
                <th>Description</th>
                <th style="text-align:right">Prix unitaire</th>
                <th style="text-align:right">Modifier/Supprimer</th>
            </tr>
            <?php foreach($dataStock as $item):
                    $subtotal = $item['quantity'] * $item['price'];
            ?>
            <?= form_hidden($i.'[id]', $item['id_articles']); ?>
            <tr>
                <td>
                    <?= form_input(array('name'=>$i.'[quantity]','value' => $item['quantity'],'maxlength' => '3','size' => '5')); ?>
                </td>
                <td>
                    <?= form_input(array('name'=>$i.'[article]','value' => $item['article'],'size' => '15')); ?>
                </td>
                <td>
                    <?= form_input(array('name'=>$i.'[price]'.'','value' => $item['price'],'size' => '5')); ?>
                </td>
                <td>
                    <a href="<?= super_link('admin/stock?ref='.'&qty='.'&') ?>">Modifier</a>
                </td>
            </tr>
            <?php $i++; endforeach; ?>
            <tr>
                <td colspan="4" style="text-align:center"><?= $emptyStock; ?></td>
            </tr>
            <tr>
                <td colspan="4" style="text-align:center">
                    <input type="submit" class="btn animZ" value="Valider" name="submCommand" />
                </td>
            </tr>
        </table>
    </div>
</div>
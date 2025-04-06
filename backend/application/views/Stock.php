<?php 
    //$emptyStock = (!empty($dataStock)) ? '' : 'Aucun article dans votre stock';
    $i = 1;
?>

<div class="ms_Main">
    <div class="Main"><br><br>
        <h1>Bienvenue dans votre stock ><?= $this->session->name; ?>< !</h1>
        <div class="ins">
            <a href="<?= base_url() ?>Admin">Revenir à l'espace administration</a>
        </div>
        <?= form_open(base_url().'admin/stock');// cellpadding="15" ?>
        <table cellspacing="10" style="width:100%" border="0">
            <tr>
                <th>N°</th>
                <th style="text-align:left">Quantité</th>
                <th style="text-align:left">Description</th>
                <th>Catégorie</th>
                <th style="text-align:right">Prix unitaire</th>
                <th style="text-align:right"></th>
            </tr>
            <?php foreach($dataStock as $item):
                    $subtotal = $item['quantity'] * $item['price'];
            ?>
            <?= form_hidden('id[]', $item['id_articles']); ?>
            <tr>
                <td><?= $i; ?></td>
                <td>
                    <?= form_input(array('name'=>'quantity[]','value' => $item['quantity'],'type' => 'number','class' => 'inpt-f'));//'maxlength' => '3', ?>
                </td>
                <td>
                    <?= form_input(array('name'=>'article[]','value' => $item['article'],'size' => '15','class' => 'inpt-f')); ?>
                </td>
                <td>
                    <?= form_dropdown('category[]', $categories, $item['category'], 'class="slct"'); ?>
                </td>
                <td>
                    <?= form_input(array('name'=>'price[]'.'','value' => $item['price'],'type' => 'number','class' => 'inpt-f')); ?>
                </td>
                <td>
                    <a href="<?= super_link('admin/stock?del='.$item['id_articles']) ?>">Supprimer</a>
                </td>
            </tr>
            <!--<tr>
                <td colspan="6" style="text-align:center">
                    <?= form_error('quantity[]'); ?>
                    <?= form_error('article[]'); ?>
                    <?= form_error('category[]'); ?>
                    <?= form_error('price[]'); ?>
                </td>
            </tr>-->
            <?php $i++; endforeach; ?>
            <tr>
                <td colspan="6" style="text-align:center">
                <div><?php echo $this->session->msgUpdate;$this->FormD->Flash('msgUpdate','') ?></div>
                    <?php
                        if (isset($errUpdate) && count($errUpdate) > 2) {
                            for ($i=1; $i <= count($errUpdate); $i++) { 
                                echo '<div>'.$errUpdate[$i].'</div>';
                            }
                        }
                    ?>
                </td>
            </tr>
            <?php
                if (!empty($dataStock)) {
            ?>
                <tr>
                    <td colspan="6" style="text-align:center">
                        <input type="submit" class="btn animZ" value="Valider" name="submCommand" />
                    </td>
                </tr>
            <?php
                } else {
            ?>
                <tr>
                    <td colspan="6" style="text-align:center">Aucun article dans votre stock</td>
                </tr>
            <?php
                }
            ?>
        </table>
    </div>
</div>
<?php
    $users = $this->Admin_model->A_ListUser();

?>

<div class="ms_Main">
    <div class="Main"><br><br>
    <h2>Bienvenue Administrateur</h2>
    <div class="users">
        <br>
        <p>Utilisateurs la plateforme (<?= count($users); ?>)</p>
    </div>
        <table cellspacing="10">
            <tr>
                <th>N°</th>
                <th>Nom d'utilisateur</th>
                <th>Numéro de téléphone</th>
                <th>Date D'inscription</th>
                <th>État</th>
            </tr>
                <?php
                    $n = 0;
                    foreach ($users as $user) {
                        $n++;
                        $ifTrader = $this->Trade->dataTrader($user->number);
                        $trader = (count($ifTrader) == 1) ? 'Trader' : 'Client';
                ?>
                <tr>
                    <td><?= $n; ?></td>
                    <td><?= $user->name; ?></td>
                    <td><?= $user->number; ?></td>
                    <td><?= $user->date; ?></td>
                    <td><?= $trader; ?></td>
                </tr>
                <?php
                    }
                ?>
        </table>
    </div>
</div>

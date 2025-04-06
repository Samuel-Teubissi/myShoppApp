<?php
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
<!-- 
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?= base_url() ?>assets/css/boxicons.min.css" type="text/css">
    <link rel="stylesheet" href="<?= base_url() ?>assets/css/all.min.css" type="text/css">
    <link rel="stylesheet" href="<?= base_url() ?>assets/css/index.css" type="text/css">
    <link rel="stylesheet" href="<?= base_url() ?>assets/css/conn.css" type="text/css">-->
    <?= meta('viewport', 'width=device-width, initial-scale=1.0'); ?>
    <?= link_tag('assets/css/all.min.css'); ?>
    <?= link_tag('assets/css/conn.css'); ?>
    <?= link_tag('assets/css/index.css'); ?>
    <!--<?= link_tag('assets/js/jquery-3.6.0.min.js'); ?>-->
    <!--<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js" defer></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" defer></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js" defer></script>-->
    <script type='module' src="<?= base_url().'assets/js/react.development.js'; ?>" defer></script>
    <script type='module' src="<?= base_url().'assets/js/react-dom.development.js'; ?>" defer></script>
    <script src="<?= base_url().'assets/js/babel.min.js'; ?>" defer></script>
    <title>Bienvenue sur MyShop App</title>
</head>
<body>
<div id="appJS"></div>
<div id="appJS2"></div>
    <nav>
        <div class="logo animT">
            <a href="<?= base_url() ?>"><img src="<?= base_url() ?>assets/img/LOGO MyShop.png" alt="" /> My ShopAPP</a>
        </div>
        <div class="etc">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
        <ul class="nav-link">
            <li><a href="<?= base_url() ?>" <?php if ($home) { echo 'class="active"'; } ?>>Acceuil</a></li>
            <li><a href="<?= base_url() ?>about" <?php if ($about) { echo 'class="active"'; } ?>>à Propos</a></li>
        <?php if (!isset($this->session->name)) {
        ?>
            <li><a href="<?= base_url() ?>form/login" <?php if ($form) { echo 'class="active"'; } ?>>Connexion</a></li>
        <?php }else{ ?>
            <li><a href="<?= base_url() ?>user" <?php if ($admin) { echo 'class="active"'; } ?>>Mon compte</a></li>
            <li><a href="<?= base_url() ?>user/disconnect">Déconnexion</a></li>
        <?php } ?>
        </ul>
    </nav>
    <script type='module' src="<?= base_url() ?>assets/js/index.js"></script>
    <script type='text/babel' src="<?= base_url() ?>assets/js/app.jsx"></script>
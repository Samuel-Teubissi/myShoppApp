<?php
//Vérification des Paramètres d'en-tête
    if (!isset($home) ) { $home = '';  }
    if (!isset($form) ) { $form = '';  }
    if (!isset($about)) { $about = ''; }
    if (!isset($admin)) { $admin = ''; }
//Chargement Header
    $this->load->view('Header', array('home' => $home,'about' => $about,'form' => $form,'admin' => $admin));

//Affichage ue Passée en paramètre
    echo $view;
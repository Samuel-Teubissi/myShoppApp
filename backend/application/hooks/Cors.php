<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cors {
    public function handle() {
        // Définir la ou les origines autorisées
        $allowed_origins = ['http://localhost:5173', 'http://localhost:5175', 'https://myshoppapp.onrender.com', 'https://my-shopp-app-virid.vercel.app'];
        
        // Récupérer l'origine de la requête
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
        
        if (in_array($origin, $allowed_origins)) {
            header("Access-Control-Allow-Origin: $origin");
            header("Access-Control-Allow-Credentials: true");
        }
        
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
        
        // Gérer les requêtes préliminaires OPTIONS
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit(0);
        }
    }
}

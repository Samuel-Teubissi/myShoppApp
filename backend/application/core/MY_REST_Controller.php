<?php
require APPPATH . '/libraries/REST_Controller.php';
require APPPATH . '/libraries/Format.php';
require APPPATH . '../vendor/autoload.php';

use chriskacerguis\RestServer\RestController;

/**
 * @property CI_DB_query_builder db
 * @property CI_Input input
 * @property CI_Session session
 * @property CI_Email email
 * @property Nom_model $Nom_model
 */

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class MY_REST_Controller extends REST_Controller
{
    public $Token;

    public function __construct()
    {
        parent::__construct();
        $allowed_origins = ['http://localhost:5173', 'http://localhost:5175', 'https://myshoppapp.onrender.com', 'https://my-shopp-app-virid.vercel.app', 'https://my-shopp-app-git-feature-no-backend-samuel-teubissis-projects.vercel.app'];

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

        // Lecture des headers
        $headers = $this->input->request_headers();

        if (!isset($headers['Authorization'])) {
            $this->response(['message' => 'Token manquant'], 401);
        }

        $token = str_replace('Bearer ', '', $headers['Authorization']);

        try {
            $this->Token = JWT::decode($token, new Key('votre_cle_access', 'HS256'));
        } catch (Exception $e) {
            $this->response(['message' => 'Token invalide ou expiré'], 401);
        }
    }
}

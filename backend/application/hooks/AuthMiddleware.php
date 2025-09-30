<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware {
    public function checkAuth() {
        $CI =& get_instance();
        $headers = $CI->input->request_headers();

        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? null;

        if (!$authHeader) return;

        list($type, $token) = explode(" ", $authHeader, 2);

        try {
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
            $CI->userId = $decoded->user_id; // injecter l’utilisateur dans le controller
        } catch (Exception $e) {
            header('Content-Type: application/json');
            http_response_code(401);
            echo json_encode(['error' => $e->getMessage()]);
            exit;
        }
    }
}

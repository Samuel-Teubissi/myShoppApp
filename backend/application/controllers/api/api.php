<?php
require APPPATH . 'libraries/REST_Controller.php';
require_once FCPATH . 'vendor/autoload.php';

use Firebase\JWT\JWT;

class api extends REST_Controller
{
    public function index_get()
    {
        echo 'API Root';
    }

    public function test_get()
    {
        $token = JWT::encode(['foo' => 'bar'], 'secret', 'HS256');
        echo json_encode(['test endpoint' => true]);
        echo $token;
    }
}

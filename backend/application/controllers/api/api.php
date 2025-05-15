<?php
require APPPATH . 'libraries/REST_Controller.php';

class api extends REST_Controller
{
    public function index_get()
    {
        echo 'API Root';
    }

    public function test()
    {
        echo json_encode(['test endpoint' => true]);
    }
}

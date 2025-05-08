<?php

class api extends CI_Controller
{
    public function index()
    {
        echo 'API Root';
    }

    public function test()
    {
        echo json_encode(['test endpoint' => true]);
    }
}

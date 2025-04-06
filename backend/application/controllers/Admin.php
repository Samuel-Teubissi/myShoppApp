<?php

class Admin extends CI_Controller
{
    public function index(){
        if (empty($this->session->name)) {
            redirect(base_url().'user/disconnect');
        }
        //Chargement du Template View Admin    
        $this->load->view('templateForm',['admin' => true, 'view' => $this->load->view('Admin', [], true)]);
    }
}

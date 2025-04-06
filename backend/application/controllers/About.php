<?php
class About extends CI_Controller
{
    public function index()
    {
        //Chargement du Template View About     
        $limit['start'] = 0;
        $limit['per_page'] = 7;
        $this->load->model('Article');
        // echo $this->Article->get_Articles_testJSON($limit);
        $this->load->view('templateForm', ['about' => true, 'view' => $this->load->view('About', [], true)]);
    }
}

<?php

require APPPATH . 'libraries/REST_Controller.php';

class adminController extends REST_Controller
{

    public function __construct()
    {

        parent::__construct();
        //load database
        $this->load->database();
        $this->load->model(array("api/adminModel"));
    }
    public function API_dataListUsers_get()
    {
        $users = $this->adminModel->API_ListUsers();
        $this->response(array(
            'statut' => 'success',
            'usersData' => $users,
            'usersTotal' => count($users)
        ), REST_Controller::HTTP_OK);
    }

    public function API_dataDashboard_get()
    {
        $total_users = count($this->adminModel->API_Users());
        $total_sales = count($this->adminModel->API_Selling());
        $turnover = $this->adminModel->API_TurnOver();

        $this->response(array(
            'statut' => 'success',
            'total_users' => $total_users,
            'total_sales' => $total_sales,
            'turnover' => $turnover
        ), REST_Controller::HTTP_OK);
    }

    public function API_dataArticles_get()
    {
        $articles = $this->adminModel->API_ListArticles();
        $this->response(array(
            'statut' => 'success',
            'articlesData' => $articles
        ), REST_Controller::HTTP_OK);
    }
}

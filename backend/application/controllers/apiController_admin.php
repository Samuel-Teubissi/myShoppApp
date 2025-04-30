<?php
defined('BASEPATH') or exit('No direct script access allowed');

class apiController_admin extends CI_Controller
{
    public function API_dataListUsers()
    {
        $users = $this->apiModel_admin->API_ListUsers();
            echo json_encode([
                'statut' => 'success',
                'usersData' => $users,
                'usersTotal' => count($users)
            ]);
    }

    public function API_dataDashboard()
    {
        $total_users = count($this->apiModel_admin->API_Users());
        $total_sales = count($this->apiModel_admin->API_Selling());
        $turnover = $this->apiModel_admin->API_TurnOver();

        echo json_encode([
            'statut' => 'success',
            'total_users' => $total_users,
            'total_sales' => $total_sales,
            'turnover' => $turnover
        ]);
    }

    public function API_dataArticles()
    {
        $articles = $this->apiModel_admin->API_ListArticles();
            echo json_encode([
                'statut' => 'success',
                'articlesData' => $articles
            ]);
    }

}
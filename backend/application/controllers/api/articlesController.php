<?php

require APPPATH . 'libraries/REST_Controller.php';

class articlesController extends REST_Controller
{

    public function __construct()
    {

        parent::__construct();
        //load database
        $this->load->database();
        $this->load->model(array("api/articlesModel"));
        $this->load->model(array("api/articleModel"));
        // Variables de pagination
        $this->pagination_limit = 3;
        $this->pagination_search = 2;
    }


    public function API_Home_Articles_get()
    {

        // Pagination
        $per_page = $this->pagination_limit;
        $currentPage = (int)($this->input->get('page') ?? 1) ?: 1;
        $offset = ($currentPage - 1) * $per_page;

        // Récupérer les articles paginés 
        $limit["start"] = $offset;
        $limit["per_page"] = $per_page;
        $articles = $this->articlesModel->API_get_Articles($limit);
        $total_articles = count($this->articlesModel->API_get_Articles(0));

        // Calcal des pages totales 
        $total_pages = ceil($total_articles / $per_page);

        $this->response(array(
            "status" => 'success',
            'articlesData' => $articles,
            'total_pages' => $total_pages,
            'total_articles' => $total_articles
        ), REST_Controller::HTTP_OK);
    }

    public function API_Trader_Articles_get()
    {
        $id_trader = $this->session->data_trader;
        if ($id_trader && $this->session->role !== 'admin') {
            // Pagination
            $per_page = $this->pagination_limit;
            $currentPage = (int)($this->input->get('page') ?? 1) ?: 1;
            $offset = ($currentPage - 1) * $per_page;

            // Récupérer les articles paginés 
            $limit["start"] = $offset;
            $limit["per_page"] = $per_page;
            $articles = $this->articlesModel->API_get_StockArticles($id_trader, $limit);
            $total_articles = count($this->articlesModel->API_get_StockArticles($id_trader, []));

            // Calcal des pages totales 
            $total_pages = ceil($total_articles / $per_page);
            $this->response(array(
                "status" => 'success',
                'articlesData' => $articles,
                'total_pages' => $total_pages,
                'total_articles' => $total_articles
            ), REST_Controller::HTTP_OK);
        }
    }


    public function API_count_Articles_get($dataType)
    {
        switch ($dataType) {
            case 'home':
                $per_page = $this->pagination_limit;
                $total_articles = count($this->articlesModel->API_get_Articles(0));
                $total_pages = ceil($total_articles / $per_page);
                $this->response(array(
                    "status" => true,
                    'latest_total_pages' => $total_pages,
                    'latest_total_articles' => $total_articles
                ), REST_Controller::HTTP_OK);
                break;

            case 'trader':
                $id_trader = $this->session->data_trader;
                if ($id_trader) {
                    $per_page = $this->pagination_limit;
                    $total_articles = count($this->articlesModel->API_get_StockArticles($id_trader));
                    $total_pages = ceil($total_articles / $per_page);

                    $this->response(array(
                        "status" => true,
                        'latest_total_pages' => $total_pages,
                        'latest_total_articles' => $total_articles
                    ), REST_Controller::HTTP_OK);
                }
                break;

            default:
                $this->response(array(
                    "error" => true
                ), REST_Controller::HTTP_UNAUTHORIZED);
                break;
        }
    }


    public function API_categories_get()
    {
        $this->response(array(
            "status" => true,
            "data" => $this->articlesModel->API_get_Categories(true)
        ), REST_Controller::HTTP_OK);
    }

    public function API_Search_get()
    {
        $search = $this->input->get('search_article', TRUE);
        $categ = (int) $this->input->get('search_categ', TRUE);
        $controller = $this->input->get('controller', TRUE);
        if ($search || $categ > 0) {
            $DBcategories = $this->articlesModel->API_get_Categories(FALSE);
            // Gestion de la pagination
            $per_page = $this->pagination_search;
            $currentPage = max(1, (int) $this->input->get('page'));

            // Récupérer les articles paginés 
            $limit_pag["start"] = ($currentPage - 1) * $per_page;
            $limit_pag["per_page"] = $per_page;

            $count_articles = count($this->articlesModel->API_get_Search_Articles($search, $categ, [], $controller));
            $articles = $this->articlesModel->API_get_Search_Articles($search, $categ, $limit_pag, $controller);
            // $count_results = count($articles);
            $count_pages = ($count_articles > 0) ? ceil($count_articles / $per_page) : 0;
            // if (empty($articles)) {
            //     $count_articles = $count_pages = 0;
            // }
            $this->response(array(
                "status" => "success",
                "articlesData" => $articles,
                'total_articles' => $count_articles,
                'total_pages' => $count_pages,
                'trader' => $controller
            ), REST_Controller::HTTP_OK);
        } else {
            $this->response(array(
                'success' => 'error'
            ), REST_Controller::HTTP_OK);
        }
    }

    public function addCommand_post()
    {
        $datas = json_decode(file_get_contents("php://input"), true);
        $totalCommand = $datas['total'];
        $CartCommand = $datas['cartItems'];
        $user = $datas['user'];

        if ($totalCommand && $CartCommand && $user) {
            $id_command = $this->articleModel->saveCommand($user, $totalCommand);
            if ($id_command) {
                foreach ($CartCommand as $dataCart) {
                    $bdQty = (int) $this->articleModel->get_qtyArticles($dataCart['id_articles']);
                    if ($bdQty) {
                        $newQty = $bdQty - $dataCart['orderedQty'];
                        if ($newQty >= 0) {
                            $this->db->where('id_articles', $dataCart['id_articles']);
                            $this->db->update('articles', ['quantity' => $newQty]);
                            $dataContent = [
                                'id_command' => $id_command,
                                'id_article' => $dataCart['id_articles'],
                                'name' => $dataCart['article'],
                                'price' => $dataCart['price'],
                                'quantity' => $dataCart['orderedQty']
                            ];
                            $this->articleModel->saveCart($dataContent);
                            $this->response(array(
                                'status' => 'success',
                                "message" => 'Command saved'
                            ), REST_Controller::HTTP_OK);
                        } else {
                            $this->response(array(
                                'status' => 'error',
                                "message" => "Stock insuffisant pour certains articles"
                            ), REST_Controller::HTTP_BAD_REQUEST);
                        }
                    } else {
                        $this->response(array(
                            'status' => 'error',
                            "message" => 'Erreur de récupération de quantité'
                        ), REST_Controller::HTTP_BAD_REQUEST);
                    }
                }
            }
        } else {
            $this->response(array(
                'status' => 'error',
                "message" => 'Need a ressource for save command'
            ), REST_Controller::HTTP_UNAUTHORIZED);
        }
    }
}

<?php
defined('BASEPATH') or exit('No direct script access allowed');

class apiController_articles extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->pagination_limit = 3;
        $this->pagination_search = 2;
    }

    public function API_Home_Articles()
    {

        // Pagination
        $per_page = $this->pagination_limit;
        $currentPage = (int)($this->input->get('page') ?? 1) ?: 1;
        $offset = ($currentPage - 1) * $per_page;

        // Récupérer les articles paginés 
        $limit["start"] = $offset;
        $limit["per_page"] = $per_page;
        $articles = $this->API_Model->API_get_Articles($limit);
        $total_articles = count($this->API_Model->API_get_Articles(0));

        // Calcal des pages totales 
        $total_pages = ceil($total_articles / $per_page);
        echo json_encode([
            'articlesData' => array_values($articles),
            'total_pages' => $total_pages,
            'total_articles' => $total_articles
        ]);
    }
    public function API_Trader_Articles()
    {
        $id_trader = $this->session->data_trader;
        if ($id_trader && $this->session->role !== 'admin') {
            // $id_trader = $trader['id_trader'];
            // Pagination
            $per_page = $this->pagination_limit;
            $currentPage = (int)($this->input->get('page') ?? 1) ?: 1;
            $offset = ($currentPage - 1) * $per_page;

            // Récupérer les articles paginés 
            $limit["start"] = $offset;
            $limit["per_page"] = $per_page;
            $articles = $this->apiModel_trader->API_get_StockArticles($id_trader, $limit);
            $total_articles = count($this->apiModel_trader->API_get_StockArticles($id_trader, []));
            // return var_dump($articles);

            // Calcal des pages totales 
            $total_pages = ceil($total_articles / $per_page);
            echo json_encode([
                'articlesData' => array_values($articles),
                'total_pages' => $total_pages,
                'total_articles' => $total_articles
            ]);
        }
    }

    public function API_count_Articles($dataType)
    {
        switch ($dataType) {
            case 'home':
                $per_page = $this->pagination_limit;
                $total_articles = count($this->API_Model->API_get_Articles(0));
                $total_pages = ceil($total_articles / $per_page);
                echo json_encode([
                    'success' => true,
                    'latest_total_pages' => $total_pages,
                    'latest_total_articles' => $total_articles
                ]);
                break;

            case 'trader':
                $id_trader = $this->session->data_trader;
                if ($id_trader) {
                    $per_page = $this->pagination_limit;
                    $total_articles = count($this->apiModel_trader->API_get_StockArticles($id_trader));
                    $total_pages = ceil($total_articles / $per_page);
                    echo json_encode([
                        'success' => true,
                        'latest_total_pages' => $total_pages,
                        'latest_total_articles' => $total_articles
                    ]);
                }
                break;

            default:
                echo json_encode(['error' => 'Accès Non Autorisé. ' . $dataType]);
                break;
        }
    }

    public function API_Search() //( $search, $categ, $currentPage )
    {
        $search = $this->input->get('search_article', TRUE);
        $categ = (int) $this->input->get('search_categ', TRUE);
        $controller = $this->input->get('controller', TRUE);
// return var_dump ($search, $categ );
        if ($search || $categ > 0) {
            $DBcategories = $this->API_Model->API_get_Categories(FALSE);
            // Gestion de la pagination
            $per_page = $this->pagination_search;
            $currentPage = max(1, (int) $this->input->get('page'));

            // Récupérer les articles paginés 
            $limit_pag["start"] = ($currentPage - 1) * $per_page;
            $limit_pag["per_page"] = $per_page;

            // if (isset($DBcategories[$categ])) 
            // {
            //     $prefix = (!empty($search)) ? ' et ' : '';
            //     $message .= $prefix.'catégorie "'.$DBcategories[$categ].'"';
            // }

            $count_articles = count($this->API_Model->API_get_Search_Articles($search, $categ, [], $controller));
            $articles = $this->API_Model->API_get_Search_Articles($search, $categ, $limit_pag, $controller);
            $count_results = count($articles);
            $count_pages = ceil($count_articles / $per_page);
            if (empty($articles)) {
                $count_articles = $count_pages = 0;
            }

            echo json_encode([
                'success' => "success",
                'articlesData' => array_values($articles),
                'total_articles' => $count_articles,
                'total_pages' => $count_pages, 
                'trader' => $controller
                // 'categ_article' => $DBcategories[$categ] ?: '',
                // 'total_results' => $count_results,
                // 'result_name' => $search,
                // 'result_categ' => $categ,
            ]);
        } else {
            echo json_encode([
                'success' => 'error'
            ]);
        }
    }

    public function API_Trader_Article($id)
    {
        if ($this->session->has_userdata('data_trader')) {
            $article = $this->apiModel_trader->getArticle($id, $this->session->data_trader);
            echo json_encode($article ?: ['error' => 'Article non trouvé']);
        }
    }

    
    //Fonction Ajout d'articles        
    public function API_add_Article()
    {
        // var_dump('test data : ', $this->session->has_userdata('data_trader'));
        // return var_dump($this->session);
                    // return var_dump ($this->input->post());
        if ($this->session->has_userdata('data_trader')) {
            $addData['categories'] = $this->API_Model->API_get_Categories(true);
            unset($addData['categories'][0]);
            $categ_list = implode(',', array_keys($addData['categories']));

            $trader = $this->session->data_trader;

            if (!isset($trader) && empty($this->API_Model->API_VerifyTrader($trader))) {
                echo json_encode([
                    "status" => "error",
                    "message" => "Le tradeur n'est pas connecté"
                ]);
                return;
            }
            //Gestion inputs
            $this->form->set_rules('article', "Nom de l'article", 'required|min_length[3]|trim|is_unique[articles.article]|regex_match[/^[\p{L}\p{N} ]+$/u]');
            $this->form->set_rules('price', "Prix de l'article", 'required|min_length[2]|trim|numeric|greater_than[0]');
            $this->form->set_rules('quantity', "Quantité", 'required|numeric|greater_than[0]|trim');
            $this->form->set_rules('category', "Catégorie de l'article", 'required|trim|in_list[' . $categ_list . ']');
            $this->form->set_message('in_list', "Sélectionnez une catégorie dans la liste");

            if ($this->form->run()) {
                //Récupération des données envoyées
                $article = $this->input->post('article', TRUE);
                $price   = $this->input->post('price', TRUE);
                $qty     = $this->input->post('quantity', TRUE);
                $categ   = $this->input->post('category', TRUE);


                //Gestion fichiers FILES
                //  $data = $this->upload->data();
                $config['upload_path']   = './assets/img/articles';
                $config['allowed_types'] = 'jpeg|jpg|png|JPEG|JPG|PNG';
                $config['max_size']      = 2048;
                // $config['max_width']     = 0;
                // $config['max_height']    = 0;
                //$config['file_name'] = 'file'.'_'.$data['file_name'].'_'.date('YmdHis');
                $config['file_ext_tolower'] = true;
                $this->load->library('upload', $config);

                if (!$this->upload->do_upload('userfile')) {
                    echo json_encode(
                        [
                            'status' => "error",
                            "message" => "Remplissez correctement tous les champs",
                            "errors" => ['userfile' => strip_tags($this->upload->display_errors())]
                        ]
                    );
                } else {
                    $dataFile = $this->upload->data();
                    $this->API_Model->add_Article($trader, $price, $article, $qty, $categ, $dataFile['file_name']);

                    echo json_encode( [ 'status' => "success", "message" => "L'article a été ajouté avec succès" ]
                    );
                }
            } else {
                echo json_encode([
                    'status' => "error",
                    "message" => "Remplissez correctement tous les champs",
                    "errors" => $this->form->error_array()
                ]);
            }
        } else {
            echo json_encode([
                'status' => "error",
                "message" => "Pas d'utilisateur connecté !"
            ]);
        }
    }

    public function API_categories()
    {
        echo json_encode([
            'status' => TRUE,
            "data" => $this->API_Model->API_get_Categories(true)
        ]);
    }

    public function API_update_Article($id)
    {
        if ($this->session->has_userdata('data_trader')) {
            $data = [];
            $fieldRule = false;
            $addData['categories'] = $this->API_Model->API_get_Categories(true);
            unset($addData['categories'][0]);
            $categ_list = implode(',', array_keys($addData['categories']));

            $trader = $this->session->data_trader;

            if (!isset($trader) && empty($this->API_Model->API_VerifyTrader($trader))) {
                echo json_encode([
                    "status" => "error",
                    "message" => "Le tradeur n'est pas connecté"
                ]);
                return;
            }

            // Préparer les données à mettre à jour (seulement les champs valides et non vides)
            $article = $this->input->post('article', TRUE);
            $price   = $this->input->post('price', TRUE);
            $qty     = $this->input->post('quantity', TRUE);
            $categ   = $this->input->post('category', TRUE);
// print_r($_POST);
// print_r($_FILES);
// exit;
            // var_dump ($this->input->post());
            //Gestion inputs
            if (!empty($article)) {
                $this->form->set_rules('article', "Nom de l'article", 'min_length[3]|trim|regex_match[/^[\p{L}\p{N} ]+$/u]');//is_unique[articles.article]|
                $data['article'] = $article;
                $fieldRule = true;
            }
            if (!empty($price)) {
                $this->form->set_rules('price', "Prix de l'article", 'min_length[2]|trim|numeric|greater_than[0]');
                $data['price'] = $price;
                $fieldRule = true;
            }
            if (!empty($qty)) {
                $this->form->set_rules('quantity', "Quantité", 'numeric|greater_than[0]|trim');
                $data['quantity'] = $qty;
                $fieldRule = true;
            }
            if (!empty($categ)) {
                $this->form->set_rules('category', "Catégorie de l'article", 'trim|in_list[' . $categ_list . ']');
                $this->form->set_message('in_list', "Sélectionnez une catégorie dans la liste");
                $data['category'] = $categ;
                $fieldRule = true;
            }
            // Gestion d'images 
            if (!empty($_FILES['userfile']['name'])) {
                $this->load->library('fileUploader');
                $result = $this->fileuploader->upload('userfile', 'image');
                if (isset($result['error'])) {
                    echo json_encode(
                        [
                            'status' => "error",
                            "message" => "Remplissez correctement tous les champs",
                            "errors" => ['userfile' => strip_tags($result['error'])]
                        ]
                    );
                    return;
                } else {
                    $data['file_name'] = $result['upload_data'];
                    $fieldRule = true;
                }
            }

            if (!$fieldRule) {
                echo json_encode( [ 'status' => "error", "message" => "Aucune donnée à mettre à jour !" ] );
                return;
            }
            if ($this->form->run()) {
                // Faire la mise à jour uniquement si $data n’est pas vide
                if (!empty($data)) {
                    $this->db->where('id_articles', $id); // par exemple
                    $this->db->update('articles', $data);
                    echo json_encode(['status' => 'success', "message" => 'Produit mis à jour !']);
                    // $this->API_Model->saveNotification($this->session->user_id, 'updateArticle');
                } else {
                    echo json_encode( [ 'status' => "error", "message" => "Aucune donnée à mettre à jour." ] );
                }
            } else {
                // Affiche les erreurs
                echo json_encode([
                    'status' => "error",
                    // "message" => "Remplissez correctement les champs",
                    "errors" => $this->form->error_array()
                ]);
                // return;
            }
        } else {
            echo json_encode([
                'status' => "error",
                "message" => "Pas d'utilisateur connecté !"
            ]);
        }
    }
    
    public function API_deleteArticle ($id)
    {
        if ($this->session->has_userdata('data_trader')) {
            $deleted = $this->apiModel_trader->deleteArticle($id, $this->session->data_trader);
            echo json_encode(['status' => 'success', 'message' => "Article supprimé"]);
            // $this->API_Model->saveNotification($this->session->user_id, 'deleteArticle');
        } else {
            echo json_encode(['status' => 'error', 'message' => "Pas d'utilisateur connecté"]);
        }
    }
}

<?php

require APPPATH . 'libraries/REST_Controller.php';

class articleController extends REST_Controller
{

    public function __construct()
    {

        parent::__construct();
        //load database
        $this->load->database();
        $this->load->model(array("api/articleModel"));
        $this->load->model(array("api/articlesModel"));
        $this->load->model(array("api/traderModel"));
        $this->load->library("session");
        // Variables de pagination
        $this->pagination_limit = 3;
        $this->pagination_search = 2;
    }

    // Devenir Trader 
    public function API_BTrader_get()
    {
        if ($this->session->user_id) {
            $id = $this->session->data_trader;
            if (empty($this->traderModel->API_VerifyTrader($id))) {
                $data = [
                    "number" => $this->session->user_number,
                    "name" => $this->session->user_name
                ];
                $this->db->insert('trader', $data);
                $this->session->set_userdata('data_trader', $this->db->insert_id());
                $this->response(array(
                    'status' => true,
                    "message" => "Vous êtes désormais un Trader !!!"
                ), REST_Controller::HTTP_OK);
            } else {
                $this->response(array(
                    'status' => false,
                    "message" => '',
                    "errors" => "Vous êtes déjà un trader !"
                ), REST_Controller::HTTP_OK);
            }
        } else {
            $this->response(array(
                'status' => false,
                "message" => '',
                "errors" => "Veuillez vous connecter d'abord !"
            ), REST_Controller::HTTP_OK);
        }
    }
    //Fonction Ajout d'articles        
    public function API_add_Article_post()
    {
        if ($this->session->has_userdata('data_trader')) {
            $addData['categories'] = $this->articlesModel->API_get_Categories(true);
            unset($addData['categories'][0]);
            $categ_list = implode(',', array_keys($addData['categories']));

            $trader = $this->session->data_trader;

            if (!isset($trader) && empty($this->traderModel->API_VerifyTrader($trader))) {
                $this->response(array(
                    "status" => "error",
                    "message" => "Trader not connected"
                ), REST_Controller::HTTP_UNAUTHORIZED);
                return;
            }
            //Gestion inputs
            $this->form_validation->set_rules('article', "Nom de l'article", 'required|min_length[3]|trim|is_unique[articles.article]|regex_match[/^[\p{L}\p{N} ]+$/u]');
            $this->form_validation->set_rules('price', "Prix de l'article", 'required|min_length[2]|trim|numeric|greater_than[0]');
            $this->form_validation->set_rules('quantity', "Quantité", 'required|numeric|greater_than[0]|trim');
            $this->form_validation->set_rules('category', "Catégorie de l'article", 'required|trim|in_list[' . $categ_list . ']');
            $this->form_validation->set_message('in_list', "Sélectionnez une catégorie dans la liste");

            if ($this->form_validation->run()) {
                //Récupération des données envoyées
                $article = $this->input->post('article', TRUE);
                $price   = $this->input->post('price', TRUE);
                $qty     = $this->input->post('quantity', TRUE);
                $categ   = $this->input->post('category', TRUE);

                //Gestion fichiers FILES
                $config['upload_path']   = './assets/img/articles';
                $config['allowed_types'] = 'jpeg|jpg|png|JPEG|JPG|PNG';
                $config['max_size']      = 2048;
                // $config['max_width']     = 0;
                // $config['max_height']    = 0;
                //$config['file_name'] = 'file'.'_'.$data['file_name'].'_'.date('YmdHis');
                $config['file_ext_tolower'] = true;
                $this->load->library('upload', $config);

                if (!$this->upload->do_upload('userfile')) {
                    $this->response(array(
                        'status' => "error",
                        "message" => "Remplissez correctement tous les champs",
                        "errors" => ['userfile' => strip_tags($this->upload->display_errors())]
                    ), REST_Controller::HTTP_OK);
                } else {
                    $dataFile = $this->upload->data();
                    $this->articleModel->add_Article($trader, $price, $article, $qty, $categ, $dataFile['file_name']);

                    $this->response(array(
                        "status" => "success",
                        "message" => "L'article a été ajouté avec succès"
                    ), REST_Controller::HTTP_OK);
                }
            } else {
                $this->response(array(
                    'status' => "error",
                    "message" => "Remplissez correctement tous les champs",
                    "errors" => $this->form_validation->error_array()
                ), REST_Controller::HTTP_OK);
            }
        } else {
            $this->response(array(
                'status' => "error",
                "message" => "Need a trader to add articles !"
            ), REST_Controller::HTTP_UNAUTHORIZED);
        }
    }

    public function API_Trader_Article_get($id)
    {
        if ($this->session->has_userdata('data_trader')) {
            $article = $this->traderModel->getArticle($id, $this->session->data_trader);
            echo json_encode($article ?: ['error' => 'Article non trouvé']);
        }
    }

    public function API_Trader_Article_post($id)
    {
        // var_dump($this->session);
        if ($this->session->has_userdata('data_trader')) {
            // if ($this->input->post('user_id')) {
            $data = [];
            $fieldRule = false;
            $addData['categories'] = $this->articlesModel->API_get_Categories(true);
            unset($addData['categories'][0]);
            $categ_list = implode(',', array_keys($addData['categories']));

            $trader = $this->session->data_trader;
            // $trader = $this->input->post('user_id');

            if (!isset($trader) && empty($this->traderModel->API_VerifyTrader($trader))) {
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
            //Gestion inputs
            if (!empty($article)) {
                $this->form_validation->set_rules('article', "Nom de l'article", 'min_length[3]|trim|regex_match[/^[\p{L}\p{N} ]+$/u]'); //is_unique[articles.article]|
                $data['article'] = $article;
                $fieldRule = true;
            }
            if (!empty($price)) {
                $this->form_validation->set_rules('price', "Prix de l'article", 'min_length[2]|trim|numeric|greater_than[0]');
                $data['price'] = $price;
                $fieldRule = true;
            }
            if (!empty($qty)) {
                $this->form_validation->set_rules('quantity', "Quantité", 'numeric|greater_than[0]|trim');
                $data['quantity'] = $qty;
                $fieldRule = true;
            }
            if (!empty($categ)) {
                $this->form_validation->set_rules('category', "Catégorie de l'article", 'trim|in_list[' . $categ_list . ']');
                // $this->form_validation->set_message('in_list', "Sélectionnez une catégorie dans la liste");
                $data['category'] = $categ;
                $fieldRule = true;
            }
            // Gestion d'images 
            if (!empty($_FILES['userfile']['name'])) {
                $this->load->library('fileUploader');
                $result = $this->fileuploader->upload('userfile', 'image');
                if (isset($result['error'])) {
                    $this->response(array(
                        'status' => "error",
                        "message" => "Remplissez correctement tous les champs",
                        "errors" => ['userfile' => strip_tags($result['error'])]
                    ), REST_Controller::HTTP_OK);
                    return;
                } else {
                    $data['file_name'] = $result['upload_data'];
                    $fieldRule = true;
                }
            }
            if (!$fieldRule) {
                $this->response(array(
                    'status' => "error",
                    "message" => "Aucune donnée à mettre à jour."
                ), REST_Controller::HTTP_OK);
                return;
            }
            if ($this->form_validation->run()) {
                // Faire la mise à jour uniquement si $data n’est pas vide
                if (!empty($data)) {
                    $this->db->where('id_articles', $id); // par exemple
                    $this->db->update('articles', $data);
                    $this->response(array(
                        'status' => 'success',
                        "message" => 'Produit mis à jour !'
                    ), REST_Controller::HTTP_OK);
                } else {
                    $this->response(array(
                        'status' => "error",
                        "message" => "Aucune donnée à mettre à jour."
                    ), REST_Controller::HTTP_OK);
                }
            } else {
                $this->response(array(
                    'status' => "error",
                    "errors" => [$this->form_validation->error_array()]
                ), REST_Controller::HTTP_OK);
            }
        } else {
            $this->response(array(
                'status' => "error",
                "message" => "Pas d'utilisateur connecté !"
            ), REST_Controller::HTTP_UNAUTHORIZED);
        }
    }

    public function API_Trader_Article_delete($id)
    {
        if ($this->session->has_userdata('data_trader')) {
            $deleted = $this->traderModel->deleteArticle($id, $this->session->data_trader);
            $this->response(array(
                'status' => 'success',
                'message' => "Article supprimé"
            ), REST_Controller::HTTP_OK);
        } else {
            $this->response(array(
                'status' => 'error',
                'message' => "Pas d'utilisateur connecté"
            ), REST_Controller::HTTP_UNAUTHORIZED);
        }
    }

    //Création de la commande
    public function saveCommand($user, $totalCommand)
    {
        $dataCommand = array(
            'id_user' => $user,
            'total' => $totalCommand
        );
        $this->db->insert('db_command_cart', $dataCommand);
        return $this->db->insert_id();
    }
    //Insertion de la carte en BD
    public function saveCart($datas)
    {
        $this->db->insert('db_content_cart', $datas);
        return $this->db->insert_id();
    }
    public function get_qtyArticles($id)
    {
        $article = $this->db->query('SELECT articles.quantity FROM articles WHERE id_articles = ? AND art_visible != 0', array($id));
        return $article->row()->quantity;
    }
}

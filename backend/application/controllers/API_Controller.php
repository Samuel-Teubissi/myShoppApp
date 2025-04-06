<?php
class API_Controller extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        // Model responsable des données à traiter
        $this->load->model('API_Model');
        // $this->load->library('form_validation');
        // $this->load->library('Cors');
        // $this->cors->allow();  // Autoriser CORS

        
        // 🔥 Autorisation CORS avec credentials
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
        $allowed_origins = ['http://localhost:5173'];

        if (in_array($origin, $allowed_origins)) {
            header("Access-Control-Allow-Origin: $origin");
            header("Access-Control-Allow-Credentials: true");
        }

        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

        // Répondre directement aux requêtes OPTIONS (prévol)
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;
        }
    }


    public function API_Home_Articles()
    {

        // Pagination
        $per_page = 3;
        $currentPage = (int)($this->input->get('page') ?? 1) ?: 1;
        $offset = ($currentPage - 1) * $per_page;
        $limit["start"] = $offset;
        $limit["per_page"] = $per_page;

        // Récupérer les articles paginés 
        $articles = $this->API_Model->API_get_Articles($limit);
        $total_articles = count($this->API_Model->API_get_Articles(0));

        // Calcal des pages totales 
        $total_pages = ceil($total_articles / $per_page);
        echo json_encode([
            'articles' => $articles,
            'total_pages' => $total_pages
        ]);
    }

    public function API_count_Home_Pages () {
        $per_page = 3;
        $total_articles = count($this->API_Model->API_get_Articles(0));
        $total_pages = ceil($total_articles / $per_page);
        echo json_encode(['total' => $total_pages]);
    }

    //fonction LOGIN
    public function API_Login()
    {
        // $_POST = json_decode(file_get_contents("php://input"), true);
        //Gestion inputs

        $this->form->set_rules('number', "Numéro de l'utilisateur", 'required|min_length[9]');
        $this->form->set_rules('password', "Mot de passe de l'utilisateur", 'required');

        if ($this->form->run()) {
            $number = $this->security->xss_clean($this->input->post('number'));
            $pswd = $this->input->post('password');
            if ($number == '000000000' and $pswd == 'admin') {
                // Création de l'id Trader pr récup les data dans l'espace admin
                $userData = [
                    'id_trader' => null,
                    'user_id' => '0',
                    'user_name' => 'admin',
                    'user_number' => '000000000'
                ];
                $this->session->set_userdata($userData);

                echo json_encode(['status' => "success", "message" => "Administrateur connecté", "user_token" => $this->session->userdata()]);
            } else {
                $req = $this->API_Model->API_checkUser($number);
                if (!empty($req)) {
                    $pswd = hash('sha256', $pswd);
                    if ($req[0]['password'] == $pswd) {

                        // Vérification de l'existence d'un Trader
                        $dataTrader = $this->Trade->dataTrader($req[0]['number']);
                        $userData = [
                            'data_trader' => $dataTrader[0],
                            'user_id' => $req[0]['id_user'],
                            'user_name' => $req[0]['name'],
                            'user_number' => $req[0]['number']
                        ];

                        // Création de l'id Trader pr récup les data dans l'espace admin
                        // var_dump("session", $this->session);
                        $this->session->set_userdata($userData);

                        echo json_encode(['status' => "success",
                        "message" => "Connexion Réussie",
                        "user_token" => $this->session->userdata()]);
                    } else {
                        echo json_encode(['status' => "error",
                        "message" => '',
                        'errors' => ['password' => "Mot de passe saisi incorrect"]]);
                    }
                } else {
                    echo json_encode(['status' => "error",
                    "message" => '',
                    'errors' => ['number' => "Numéro saisi incorrect ou sans compte"]]);
                }
            }
        } else {
            echo json_encode(['status' => "error",
            "message" => "Remplissez correctement tous les champs",
            "errors" => $this->form->error_array()]);
        }
    }
    //Fonction Register        
    public function API_Register()
    {
        $_POST = json_decode(file_get_contents("php://input"), true);

        // Processing Inscription

        // $this->form->set_rules('name','nom','required');
        $this->form->set_rules('number', "Numéro de l'utilisateur", 'required|min_length[9]|is_unique[user.number]');
        $this->form->set_rules('username', "Nom de l'utilisateur", 'required|min_length[3]');
        $this->form->set_rules('password', "Mot de passe de l'utilisateur", 'required');
        $this->form->set_rules('confirm_password', "Confirmation de Mot de passe", 'matches[password]');

        if ($this->form->run()) {
            $number = $this->security->xss_clean($this->input->post('number'));
            $name = $this->security->xss_clean($this->input->post('username'));
            $pswd = hash('sha256', $this->input->post('password'));
            $data = array(
                'name' => $name,
                'number' => $number,
                'password' => $pswd
            );

            if ($this->db->insert('user', $data)) {
                $this->session->set_userdata('id_user', $this->db->insert_id());
                $this->session->set_userdata('name', $name);
                $this->session->set_userdata('number', $number);

                echo json_encode(['status' => "success", "message" => "Inscription réussie"]);
            } else {
                echo json_encode(['status' => "error", "message" => "Echec de l'enregistrement"]);
            }
        } else {
            echo json_encode(['status' => "error", "message" => "", "errors" => $this->form->error_array()]);
        }
    }

    public function API_logout()
    {
        $this->session->sess_destroy();
        $this->cart->destroy();
        echo json_encode(["status" => "success", "message" => "Déconnexion réussie"]);
    }

    public function API_logged()
    {
        // var_dump($this->session);
        // var_dump($this->session);
        if ($this->session->has_userdata('user_id')) {
            $dataUser = $this->session->userdata();
            echo json_encode(
                ["status" => "success",
                "message" => "Utilisateur connecté",
                'dataUser' => $dataUser]);
        }else {
            // http_response_code(401);
            echo json_encode(["status" => "error",
                "message" => "Utilisateur non connecté"
            ]);
        }
    }

    //Fonction Ajout d'articles        
    public function API_add_Article()
    {
        // var_dump('test data : ', $this->session->has_userdata('data_trader'));
        if ($this->session->has_userdata('data_trader')) {
            $addData['categories'] = $this->API_Model->API_get_Categories(true);
            unset($addData['categories'][0]);
            $categ_list = implode(',', array_keys($addData['categories']));

            $trader = $this->session->data_trader['id_trader'];

            if (!isset($trader) && empty($this->API_Model->API_VerifyTrader($trader))) {
                echo json_encode(["status" => "error",
                "message" => "Le tradeur n'est pas connecté"]);
                return;
            }
            //Gestion inputs
            $this->form->set_rules('article', "Nom de l'article", 'required|min_length[3]|trim|is_unique[articles.article]');
            $this->form->set_rules('price', "Prix de l'article", 'required|min_length[2]|trim|numeric|greater_than[0]');
            $this->form->set_rules('quantity', "Quantité", 'required|numeric|greater_than[0]|trim');
            $this->form->set_rules('category', "Catégorie de l'article", 'required|trim|in_list[' . $categ_list . ']');
            $this->form->set_message('in_list', "Sélectionnez une catégorie dans la liste");
            
            if ($this->form->run()) {
                // echo 'yess connecté';
                //Récupération des données envoyées
                $article = $this->security->xss_clean($this->input->post('article'));
                $price   = $this->security->xss_clean($this->input->post('price'));
                $qty     = $this->security->xss_clean($this->input->post('quantity'));
                $categ   = $this->security->xss_clean($this->input->post('category'));
                
                
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
                
                $regexText = "/^[a-zA-Z0-9 -]+$/i";
                $regexNum = "/^[0-9]+$/";
                if (preg_match($regexText, $article)) {
                    if (!$this->upload->do_upload('userfile')) {
                        echo json_encode(
                            ['status' => "error",
                            "message" => "Remplissez correctement tous les champs",
                            "errors" => ['userfile' => strip_tags($this->upload->display_errors())]]
                        );
                    } else {
                        $dataFile = $this->upload->data();
                        $this->Article->add_Article($trader, $price, $article, $qty, $categ, $dataFile['file_name']);
                        
                        echo json_encode(
                            ['status' => "success",
                            "message" => "L'article a été ajouté avec succès"]);
                    }
                } else {
                    echo json_encode(['status' => "error",
                    "message" => "Remplissez correctement tous les champs",
                    "errors" => ['article' => "Le nom ne doit contenir que des chiffres, lettres, espaces et tirets"]]);
                }
            } else {
                echo json_encode(['status' => "error",
                "message" => "Remplissez correctement tous les champs",
                "errors" => $this->form->error_array()]);
            }
        } else {
            echo json_encode(['status' => "error",
            "message" => "Pas d'utilisateur connecté !"]);
        }
        //Chargement du Template View Add    
        // $this->load->view('templateForm', ['admin' => true, 'view' => $this->load->view('Add', $addData, true)]);
    }
}

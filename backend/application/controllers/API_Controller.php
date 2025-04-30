<?php
defined('BASEPATH') or exit('No direct script access allowed');
/**
 * @property API_Model $API_Model
 */
class API_Controller extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->pagination_limit = 3;
    }

    //fonction LOGIN
    public function API_Login()
    {
        // $_POST = json_decode(file_get_contents("php://input"), true);
        //Gestion inputs

        $this->form->set_rules('number', "", 'required|min_length[3]');//Numéro de l'utilisateur
        $this->form->set_rules('password', "", 'required');//Mot de passe de l'utilisateur

        if ($this->form->run()) {
            $number = $this->input->post('number', true);
            $pswd = $this->input->post('password', true);
            if ($number == '000000000' and $pswd === 'admin') {
                // Création de l'id Trader pr récup les data dans l'espace admin
                $userData = [
                    'id_trader' => null,
                    'user_id' => 'admin',
                    'user_name' => 'admin',
                    'user_number' => 'admin',
                    'role' => 'admin'
                ];
                $this->session->set_userdata($userData);

                echo json_encode(['status' => "success", "message" => "Administrateur connecté", "user_token" => $this->session->userdata()]);
            } else {
                $reqUser = $this->API_Model->API_checkUser($number);
                if (!empty($reqUser)) {
                    $req = $reqUser[0];
                    $pswd = hash('sha256', $pswd);
                    if ($req['password'] == $pswd) {

                        // Vérification de l'existence d'un Trader
                        $dataTrader = $this->apiModel_trader->API_dataTrader($req['number']);
                        $idTrader = null;
                        if (!empty($dataTrader)) {
                            $idTrader = $dataTrader[0]['id_trader'];
                        }
                        // return var_dump($req['number'], $dataTrader, $idTrader);
                        $userData = [
                            'data_trader' => $idTrader,
                            'user_id' => $req['id_user'],
                            'user_name' => $req['name'],
                            'user_number' => $req['number'],
                            'role' => 'user'
                        ];
                        // Création de l'id Trader pr récup les data dans l'espace admin
                        $this->session->set_userdata($userData);
                        echo json_encode([
                            'status' => "success",
                            "message" => "Connexion Réussie",
                            "user_token" => $this->session->userdata()
                        ]);
                    } else {
                        echo json_encode([
                            'status' => "error",
                            "message" => '',
                            'errors' => ['password' => "Mot de passe saisi incorrect"]
                        ]);
                    }
                } else {
                    echo json_encode([
                        'status' => "error",
                        "message" => '',
                        'errors' => ['number' => "Numéro saisi incorrect ou sans compte"]
                    ]);
                }
            }
        } else {
            echo json_encode([
                'status' => "error",
                "message" => "Remplissez correctement tous les champs",
                "errors" => $this->form->error_array()
            ]);
        }
    }
    //Fonction Register        
    public function API_Register()
    {
        // Processing Inscription
        $this->form->set_rules('number', "", 'required|min_length[9]|is_unique[user.number]');//Numéro de l'utilisateur
        $this->form->set_rules('username', "", 'required|min_length[3]');//Nom de l'utilisateur
        $this->form->set_rules('password', "", 'required');//Mot de passe de l'utilisateur
        $this->form->set_rules('confirm_password', "", 'matches[password]');//Confirmation de Mot de passe

        if ($this->form->run()) {
            $number = $this->security->xss_clean($this->input->post('number'));
            $name = $this->security->xss_clean($this->input->post('username'));
            $pswd = hash('sha256', $this->input->post('password'));

            $idUser = $this->db->insert_id();
            $userData = [
                'data_trader' => null,
                'user_id' => $idUser,
                'user_name' => $name,
                'user_number' => $number,
                'role' => 'user'
            ];
            if ($this->db->insert('user', $userData)) {
                // Création de l'id Trader pr récup les data dans l'espace admin
                $this->session->set_userdata($userData);
                // $this->API_Model->saveNotification($idUser, 'addUser');
                echo json_encode(['status' => "success",
                            "message" => "Inscription réussie",
                            "user_token" => $this->session->userdata()]
                    );
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
        // delete_cookie('ci_session');
        $this->cart->destroy();
        echo json_encode(["status" => true, "message" => "Déconnexion..."]);
    }

    public function API_logged()
    {
        // var_dump('session : ', $this->session);
        // $this->session->sess_destroy();
        if ($this->session->userdata('user_id')) {
            echo json_encode([
                "status" => "success",
                "message" => "Utilisateur connecté",
                'dataUser' => $this->session->userdata()
            ]);
        } else {
            // http_response_code(401);
            echo json_encode([
                "status" => "error",
                "message" => "Utilisateur non connecté"
            ]);
        }
    }

    //Fonction Ajout d'articles        
    public function API_add_Article()
    {
        // var_dump('test data : ', $this->session->has_userdata('data_trader'));
        // return var_dump($this->session);
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
                    // $this->API_Model->saveNotification($trader, 'addArticle');

                    echo json_encode(
                        [ 'status' => "success",
                            "message" => "L'article a été ajouté avec succès"
                        ]);
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

    public function addCommand ()
    {
        $datas = json_decode(file_get_contents("php://input"), true);
        $totalCommand = $datas['total'];
        $CartCommand = $datas['cartItems'];
        $user = $datas['user'];

        if ($totalCommand && $CartCommand && $user) {
            $id_command = $this->API_Model->saveCommand($user, $totalCommand);
            if ($id_command) {
                foreach ($CartCommand as $dataCart) {
                    $bdQty = (int) $this->API_Model->get_qtyArticles($dataCart['id_articles']);
                    if ($bdQty) {
                        $newQty = $bdQty - $dataCart['orderedQty'];
                        if ($newQty >= 0) {
                            $this->db->where('id_articles', $dataCart['id_articles']);
                            $this->db->update('articles', [ 'quantity' => $newQty ]);
                            $dataContent = [
                                'id_command' => $id_command,
                                'id_article' => $dataCart['id_articles'],
                                'name' => $dataCart['article'],
                                'price' => $dataCart['price'],
                                'quantity' => $dataCart['orderedQty']
                            ];
                            $this->API_Model->saveCart($dataContent);
                            // $this->API_Model->saveNotification($this->session->user_id, 'addCommand');
                            echo json_encode([
                                'status' => 'success',
                                "message" => 'Command saved'
                            ]);
                        } else {
                            echo json_encode([
                                'status' => 'error',
                                "message" => "Stock insuffisant pour certains articles"]);
                        }
                    } else {
                        echo json_encode([
                            'status' => 'error',
                            "message" => 'Erreur de récupération de quantité' ]);
                    }
                }
            }
        } else {
            echo json_encode([
                'status' => 'error',
                "message" => 'Need a ressource for save command'
            ]);
        }
    }

    // Récupérer les notifications
    public function API_getNotif( $userId )
    {
        // $user = $this->session->user_id;
        echo json_encode([
            'status' => 'success',
            "dataNotifs" => $this->API_Model->API_get_notifications($userId),
            "countNotifs" => $this->API_Model->apiNotif_count_unread($userId)
        ]);
    }
    public function API_readNotif( $notif_id )
    {
        $this->API_Model->apiNotif_mark_as_read($notif_id);
        echo json_encode([
            'status' => 'success',
            "message" => 'Notif read'
        ]);
    }

    public function API_CreateNotif ()
    {
        $userId = $this->input->post('userId');
        $type = $this->input->post('type');
        if ($userId && $type) {
            switch ($type) {
                case 'addCommand':
                    $message = 'Vous avez validé une nouvelle commande';
                    $role = 'user';
                    break;
                case 'addUser':
                    $message = 'Un nouvel utilisateur inscrit sur la plateforme';
                    $role = 'admin';
                    break;
                case 'addArticle':
                    $message = 'Vous avez ajouté un nouveau produit sur la plateforme';
                    $role = 'user';
                    break;
                case 'updateArticle':
                    $message = 'Vous avez mis à jour un produit';
                    $role = 'user';
                    break;
                case 'deleteArticle':
                    $message = 'Vous avez supprimé un produit du site';
                    $role = 'user';
                    break;
                default:
                    $message = 'default';
                    $role = 'default';
                    break;
            }
            $data = array(
                'notif_message' => $message,
                'notif_user' => $userId,
                'notif_type' => $type
            );
            $this->API_Model->saveNotification($data);
        }
    }

    // public function addCommand ()
    // {
    // if ($CartCommand) {
    //         foreach ($CartCommand as $dataCart) {
    //             $VerifQuantity = $this->Article->get_Art_Articles($dataCart['id']);
    //             $BDqty = (int)$VerifQuantity[0]['quantity'];
    //             $updateArticle = [ 'quantity' => $BDqty - $dataCart['qty'] ];
    //             $this->db->update('articles', $updateArticle,"id_articles = ".$dataCart['id']);
    //             $dataContent = [
    //                 'id_command' => $id_command,
    //                 'id_article' => $dataCart['id'],
    //                 'name' => $dataCart['name'],
    //                 'price' => $dataCart['price'],
    //                 'quantity' => $dataCart['qty']
    //             ];
    //             $this->API_Model->saveCart($dataContent);
    //         }
    //         echo json_encode([
    //             'status' => 'success',
    //             "idCommand" => ''
    //         ]);
    //     } else {
    //         echo json_encode([
    //             'status' => 'error',
    //             "message" => 'Need a ressource for save cart'
    //         ]);
    //     }
    // }
}

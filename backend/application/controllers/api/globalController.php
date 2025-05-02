<?php

require APPPATH . 'libraries/REST_Controller.php';

class globalController extends REST_Controller
{

    public function __construct()
    {

        parent::__construct();
        //load database
        $this->load->database();
        $this->load->model(array("api/traderModel"));
        $this->load->model(array("api/globalModel"));
        $this->load->library('session');
    }

    public function API_Login_post()
    {
        // $_POST = json_decode(file_get_contents("php://input"), true);
        //Gestion inputs
        $this->form_validation->set_rules('number', "Numéro d'utilisateur", 'required|min_length[3]'); //Numéro de l'utilisateur
        $this->form_validation->set_rules('password', "Mot de passe d'utilisateur", 'required'); //Mot de passe de l'utilisateur

        if ($this->form_validation->run()) {
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

                $this->response(array(
                    'status' => "success",
                    "message" => "Administrateur connecté",
                    "user_token" => $this->session->userdata()
                ), REST_Controller::HTTP_OK);
            } else {
                $reqUser = $this->globalModel->API_checkUser($number);
                if (!empty($reqUser)) {
                    $req = $reqUser[0];
                    $pswd = hash('sha256', $pswd);
                    if ($req['password'] == $pswd) {

                        // Vérification de l'existence d'un Trader
                        $dataTrader = $this->traderModel->API_dataTrader($req['number']);
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
                        $this->response(array(
                            'status' => "success",
                            "message" => "Connexion Réussie",
                            "user_token" => $this->session->userdata()
                        ), REST_Controller::HTTP_OK);
                    } else {
                        $this->response(array(
                            'status' => "error",
                            "message" => '',
                            'errors' => ['password' => "Mot de passe saisi incorrect"]
                        ), REST_Controller::HTTP_OK);
                    }
                } else {
                    $this->response(array(
                        'status' => "error",
                        "message" => '',
                        'errors' => ['number' => "Numéro saisi incorrect ou sans compte"]
                    ), REST_Controller::HTTP_OK);
                }
            }
        } else {
            $this->response(array(
                'status' => "error",
                "message" => "Remplissez correctement tous les champs",
                "errors" => $this->form_validation->error_array()
            ), REST_Controller::HTTP_OK);
        }
    }
    //Fonction Register        
    public function API_Register_post()
    {
        // Processing Inscription
        $this->form_validation->set_rules('number', "Numéro d'utilisateur", 'required|trim|min_length[9]|is_unique[user.number]'); //Numéro de l'utilisateur
        $this->form_validation->set_rules('username', "Nom d'utilisateur", 'required|trim|min_length[3]'); //Nom de l'utilisateur
        $this->form_validation->set_rules('password', "Mot de passe", 'required'); //Mot de passe de l'utilisateur
        $this->form_validation->set_rules('confirm_password', "Confirmation de Mot de passe", 'matches[password]'); //Confirmation de Mot de passe

        if ($this->form_validation->run()) {
            $number = $this->input->post('number', true);
            $name = $this->input->post('username', true);
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
                $this->response(array(
                    'status' => "success",
                    "message" => "Inscription réussie",
                    "user_token" => $this->session->userdata()
                ), REST_Controller::HTTP_OK);
            } else {
                $this->response(array(
                    'status' => "error",
                    "message" => "Echec de l'enregistrement"
                ), REST_Controller::HTTP_OK);
            }
        } else {
            $this->response(array(
                'status' => "error",
                "message" => "",
                "errors" => $this->form_validation->error_array()
            ), REST_Controller::HTTP_OK);
        }
    }

    public function API_logout_get()
    {
        $this->session->sess_destroy();
        // delete_cookie('ci_session');
        // $this->cart->destroy();
        $this->response(array(
            "status" => true,
            "message" => "Déconnexion..."
        ), REST_Controller::HTTP_OK);
    }

    public function API_logged_get()
    {
        if ($this->session->has_userdata('user_id')) {
            $this->response(array(
                "status" => "success",
                "message" => "Utilisateur connecté",
                'dataUser' => $this->session->userdata()
            ), REST_Controller::HTTP_OK);
        }
    }

    // Récupérer les notifications
    public function API_getNotif_get($userId)
    {
        // $user = $this->session->user_id;
        $this->response(array(
            'status' => 'success',
            "dataNotifs" => $this->globalModel->API_get_notifications($userId),
            "countNotifs" => $this->globalModel->apiNotif_count_unread($userId)
        ), REST_Controller::HTTP_OK);
    }
    public function API_readNotif_get($notif_id)
    {
        $this->globalModel->apiNotif_mark_as_read($notif_id);
        $this->response(array(
            'status' => 'success',
            "message" => 'Notif read'
        ), REST_Controller::HTTP_OK);
    }

    public function API_CreateNotif_post()
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
            $this->globalModel->saveNotification($data);
        }
    }
}

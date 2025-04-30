<?php
defined('BASEPATH') or exit('No direct script access allowed');

    class apiController_trader extends CI_Controller
    {
        // Devenir Trader 
        public function API_BTrader()
        {
            // var_dump($this->session);
            if ($this->session->user_id) {
                $id = $this->session->data_trader;
                if (empty($this->apiModel_trader->API_VerifyTrader($id)))
                {
                    $data = [
                        "number" => $this->session->user_number,
                        "name" => $this->session->user_name
                    ];
                    $this->db->insert('trader', $data);
                    $this->session->set_userdata('data_trader', $this->db->insert_id());
                    echo json_encode(['status' => true,
                    "message" => "Vous êtes désormais un Trader !!!"]);
                } else {
                    echo json_encode(['status' => false,
                    "message" => '',
                    "errors" => "Vous êtes déjà un trader !"]);
                }
            } else {
                echo json_encode(['status' => false,
                "message" => '',
                "errors" => "Veuillez vous connecter d'abord !"]);
            }
        }
    }
    
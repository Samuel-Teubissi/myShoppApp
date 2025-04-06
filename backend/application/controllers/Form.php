<?php
    class Form extends CI_Controller 
    {
        public function __construct()
        {
            parent::__construct();
        }

//Fonction Index
        public function index() 
        {
            redirect(base_url().'/form/login');
        }

//fonction LOGIN
        public function login() 
        {
            //Gestion inputs
            $number=$this->security->xss_clean($this->input->post('number'));
            $pswd=$this->input->post('pswd');

            $this->form->set_rules('number',"Numéro de l'utilisateur",'required|min_length[9]');
            $this->form->set_rules('pswd',"Mot de passe de l'utilisateur",'required');

            if ($this->form->run()) {
                if ($number == '000000000' AND $pswd == 'admin') {
                    // Création de l'id Trader pr récup les data dans l'espace admin
                        $this->session->set_userdata('id_trader', null);
                        $this->session->set_userdata('id_user', '0');
                        $this->session->set_userdata('name', 'admin');
                        $this->session->set_userdata('number', '000000000');
                    redirect(base_url().'admin');
                }
                else {
                    $req = $this->FormD->checkUser($number);
                    if (!empty($req)) {
                        $pswd = hash('sha256', $pswd);
                        if ($req[0]['password'] == $pswd) {

                        // Vérification de l'existence d'un Trader
                            $dataTrader = $this->Trade->dataTrader($req[0]['number']);
                        // Création de l'id Trader pr récup les data dans l'espace admin
                            $this->session->set_userdata('id_trader', $dataTrader[0]['id_trader']);
                            $this->session->set_userdata('id_user',$req[0]['id_user']);
                            $this->session->set_userdata('name',$req[0]['name']);
                            $this->session->set_userdata('number',$req[0]['number']);

                            redirect(base_url().'user');
                        } else {
                            $this->FormD->ErrLogin("Le mot de passe saisi est incorrect");
                        }
                    } else {
                        $this->FormD->ErrLogin("Le numéro saisi est incorrect ou n'a pas de compte");
                    }
                }
            }
    //Chargement du Template View        
            $this->load->view('templateForm',['form' => true, 'view' => $this->load->view('Login', [], true)]);
        }

//Fonction Register        
        public function Register() 
        {

            // Processing Inscription
            $name = $this->security->xss_clean($this->input->post('username'));
            $number = $this->security->xss_clean($this->input->post('number'));
            $pswd = $this->input->post('pswd');
            $Cpswd = $this->input->post('Cpswd');
            
            $this->form->set_rules('name','nom','required');
            $this->form->set_rules('number',"Numéro de l'utilisateur",'required|min_length[9]|is_unique[user.number]');
            $this->form->set_rules('username',"Nom de l'utilisateur",'required|min_length[3]');
            $this->form->set_rules('pswd',"Mot de passe de l'utilisateur",'required');
            $this->form->set_rules('Cpswd',"Confirmation de Mot de passe",'matches[pswd]');

            if ($this->form->run()) {                
                $pswd = hash('sha256', $this->input->post('pswd'));
                $data = array(
                    'name' => $name,
                    'number' => $number,
                    'password' => $pswd
                );
                $this->db->insert('user', $data);

                $this->session->set_userdata('id_user', $this->db->insert_id());
                $this->session->set_userdata('name', $name);
                $this->session->set_userdata('number', $number);
                
                redirect(base_url().'user');
            }
        //Chargement du Template View        
            $this->load->view('templateForm',['form' => true, 'view' => $this->load->view('Register', [], true)]);
        }
    }
    
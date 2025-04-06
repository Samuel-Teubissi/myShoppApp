<?php


    class FormD extends CI_Model 
    {
        public function __construct()
        {
            $this->load->database();
        }
        public function checkUser($number)
        {
            $checkUser = $this->db->query("SELECT * FROM user WHERE number = ?", array($number));
            return $checkUser->result_array();
        }
        public function ErrLogin($message)
        {
            return $this->session->set_flashdata('ErrLogin',$message);
        }
        public function setFlash($name,$message)
        {
            return $this->session->set_flashdata($name,$message);
        }
        public function Flash($name,$message)
        {
            return $this->session->set_userdata($name,$message);
        }
    }

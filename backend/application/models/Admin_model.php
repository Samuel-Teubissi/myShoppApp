<?php

    class Admin_model extends CI_Model 
    {
        public function A_ListUser()
        {
            $req = $this->db->query("SELECT * FROM user");
            return $req->result();
        }
    }
    
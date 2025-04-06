<?php

    class Trade extends CI_Model 
    {
        public function VerifyTrader($id)
        {
            $req = $this->db->query("SELECT * FROM trader WHERE id_trader = ?", $id);
            return $req->result_array();
        }
        public function dataTrader($number)
        {
            $req = $this->db->query("SELECT * FROM trader WHERE number = ? ORDER BY id_trader DESC", $number);
            return $req->result_array();
        }
        public function BecomeTrader($id,$data)
        {
            $req = $this->db->query("INSERT INTO trader WHERE id_trader = ?", $id);
            $this->db->insert('trader', $data);
        }
    }
    
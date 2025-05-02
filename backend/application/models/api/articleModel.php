<?php

class articleModel extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    // Save Article 
    public function add_Article($id, $price, $article, $qty, $categ, $file)
    {
        $data = array(
            'id_trader' => $id,
            'price' => $price,
            'article' => $article,
            'quantity' => $qty,
            'category' => $categ,
            'file_name' => $file,
            'art_visible' => 1
        );
        return $this->db->insert('articles', $data);
    }
}

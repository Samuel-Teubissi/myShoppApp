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

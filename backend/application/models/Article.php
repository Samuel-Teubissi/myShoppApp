<?php

class Article extends CI_Model
{
    public function __construct()
    {
        // $this->load->database();
    }


    public function get_Articles_testJSON($limit)
    {
        //$article = $this->db->query('SELECT * FROM articles  INNER JOIN category ON category = id_categ INNER JOIN trader ON trader.id_trader = articles.id_trader WHERE art_visible != 0 ORDER BY id_articles DESC');
        $sql = 'SELECT * FROM articles  INNER JOIN category ON category = id_categ INNER JOIN trader ON trader.id_trader = articles.id_trader WHERE art_visible != 0 ORDER BY id_articles DESC';
        if (isset($limit) && !empty($limit)) {
            $sql .= ' LIMIT ' . $limit['start'] . ',' . $limit['per_page'];
        }
        $articles = $this->db->query($sql);
        // ->result_array("json")
        return json_encode($articles->result_array());
    }


    public function get_Articles($limit)
    {
        //$article = $this->db->query('SELECT * FROM articles  INNER JOIN category ON category = id_categ INNER JOIN trader ON trader.id_trader = articles.id_trader WHERE art_visible != 0 ORDER BY id_articles DESC');
        $sql = 'SELECT * FROM articles  INNER JOIN category ON category = id_categ INNER JOIN trader ON trader.id_trader = articles.id_trader WHERE art_visible != 0 ORDER BY id_articles DESC';
        if (isset($limit) && !empty($limit)) {
            $sql .= ' LIMIT ' . $limit['start'] . ',' . $limit['per_page'];
        }
        $article = $this->db->query($sql);
        return $article->result_array();
    }

    public function API_countArticles()
    {
        return $this->db->count_all('articles');
    }

    public function get_Command($id)
    {
        $article = $this->db->query('SELECT * FROM command WHERE id_user = ? ORDER BY id_command DESC', array($id));
        return $article->result_array();
    }
    public function get_ContentCommand($id)
    {
        $article = $this->db->query('SELECT * FROM content WHERE id_command = ? ORDER BY id_content DESC', array($id));
        return $article->result_array();
    }
    public function get_StockArticles($id)
    {
        $article = $this->db->query('SELECT * FROM articles INNER JOIN category ON category = id_categ WHERE id_trader = ? AND art_visible != 0 ORDER BY id_articles DESC', array($id));
        return $article->result_array();
    }
    public function get_Categories($param)
    {
        $article = $this->db->query('SELECT * FROM category ORDER BY content');
        $categ = $article->result_array();
        $Categories = ['Toutes les catégories'];
        if ($param == TRUE) {
            $Categories = ["Catégorie de l'article"];
        }
        foreach ($categ as $key => $value) {
            $Categories[$value["id_categ"]] = mb_convert_case($value["content"], MB_CASE_TITLE, 'UTF-8');
        }
        return $Categories;
        //form_dropdown('category', $categories, 'default');
    }
    public function get_Home_Articles($id, $limit)
    {
        $sql = 'SELECT * FROM articles INNER JOIN trader ON trader.id_trader = articles.id_trader INNER JOIN category ON category = id_categ WHERE articles.id_trader != ? AND art_visible != 0 ORDER BY id_articles DESC';
        if (isset($limit) && !empty($limit)) {
            $sql .= ' LIMIT ' . $limit['start'] . ',' . $limit['per_page'];
        }
        $article = $this->db->query($sql, array($id));
        return $article->result_array();
    }
    public function get_Search_Articles($s, $categ, $limit)
    {
        $sql = 'SELECT * FROM articles INNER JOIN trader ON trader.id_trader = articles.id_trader INNER JOIN category ON category = id_categ WHERE article LIKE "%' . $s . '%" AND category LIKE "%' . $categ . '%" AND art_visible != 0 ORDER BY id_articles DESC';
        if (isset($limit) && !empty($limit)) {
            $sql .= ' LIMIT ' . $limit['start'] . ',' . $limit['per_page'];
        }
        $article = $this->db->query($sql);
        //$article = $this->db->query('SELECT * FROM articles INNER JOIN trader ON trader.id_trader = articles.id_trader INNER JOIN category ON category = id_categ WHERE article LIKE "%'.$s.'%" AND category LIKE "%'.$categ.'%" AND art_visible != 0 ORDER BY id_articles DESC');
        return $article->result_array();
    }
    public function get_Art_Articles($id)
    {
        $article = $this->db->query('SELECT * FROM articles INNER JOIN category ON category = id_categ WHERE id_articles = ? AND art_visible != 0 ORDER BY id_articles DESC', array($id));
        return $article->result_array();
    }
    public function Verif_Article($id, $article)
    {
        $article = $this->db->query("SELECT * FROM articles WHERE id_trader = ? AND id_articles = ?", [$id, $article]);
        return count($article->result_array());
    }
    public function Verif_Articles($data)
    {
        $article = $this->db->query("SELECT * FROM articles WHERE id_trader = ?,price = ?,article = ?,file_name = ?", $data);
        return count($article->result_array());
    }
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

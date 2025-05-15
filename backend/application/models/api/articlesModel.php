<?php

class ArticlesModel extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function API_get_Articles($limit)
    {
        $this->db->select('*');
        $this->db->from('articles');
        $this->db->join('category', 'articles.category = category.id_categ', 'inner');
        $this->db->join('trader', 'trader.id_trader = articles.id_trader', 'inner');
        $this->db->where('art_visible !=', 0);
        if ($this->session->data_trader) {
            $this->db->where('articles.id_trader !=', $this->session->data_trader);
        }
        if (!empty($limit)) {
            $this->db->limit($limit['per_page'], $limit['start']);
        }
        $this->db->order_by('id_articles', 'DESC');
        $articles = $this->db->get();
        return $articles->result(); //result_array
    }

    public function API_get_StockArticles($id, $limit = [])
    {
        $sql = 'SELECT * FROM articles
        INNER JOIN category ON category = id_categ 
        INNER JOIN trader ON trader.id_trader = articles.id_trader 
        WHERE articles.id_trader = ? AND art_visible != 0 ORDER BY id_articles DESC';
        if (isset($limit) && !empty($limit)) {
            $sql .= ' LIMIT ' . $limit['start'] . ',' . $limit['per_page'];
        }
        $article = $this->db->query($sql, array($id));
        return $article->result();
    }

    public function API_get_Categories($param)
    {
        $article_categ = $this->db->query('SELECT * FROM category ORDER BY content');
        $categ = $article_categ->result_array();
        $Categories = ['Toutes les catégories'];
        if ($param === true) {
            $Categories = ["Catégorie"];
        }
        foreach ($categ as $key => $value) {
            $Categories[$value["id_categ"]] = mb_convert_case($value["content"], MB_CASE_TITLE, 'UTF-8');
        }
        return $Categories;
    }

    public function API_get_Search_Articles($search, $categ, $limit = [], $controller = 'home')
    {
        // Construire la requête avec Query Builder de CI3
        $this->db->select('*');
        $this->db->from('articles');
        $this->db->join('trader', 'trader.id_trader = articles.id_trader', 'inner');
        $this->db->join('category', 'category.id_categ = articles.category', 'inner');

        // Ajouter les conditions de la requête
        $this->db->where('articles.art_visible !=', 0); // Condition sur la visibilité de l'article
        if ($controller === 'home' && !empty($this->session->data_trader)) {
            $this->db->where('articles.id_trader !=', $this->session->data_trader);
        } elseif ($controller === 'trader') {
            $this->db->where('articles.id_trader', $this->session->data_trader);
        }
        if (!empty($categ) && $categ > 0) {
            $this->db->like('articles.category', $categ);
        }
        if (!empty($search)) {
            $this->db->like('articles.article', $search);
        }
        // Ordonner les résultats
        $this->db->order_by('articles.id_articles', 'DESC');
        if (!empty($limit)) {
            $this->db->limit($limit['per_page'], $limit['start']);
        }
        $articles = $this->db->get();
        return $articles->result();
    }
}

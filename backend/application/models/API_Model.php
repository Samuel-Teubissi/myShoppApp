<?php

class API_Model extends CI_Model
{
    public function API_countArticles()
    {
        return $this->db->count_all('articles');
    }

    public function API_get_Articles($limit)
    {
        //$article = $this->db->query('SELECT * FROM articles  INNER JOIN category ON category = id_categ INNER JOIN trader ON trader.id_trader = articles.id_trader WHERE art_visible != 0 ORDER BY id_articles DESC');
        $sql = 'SELECT * FROM articles  INNER JOIN category ON category = id_categ INNER JOIN trader ON trader.id_trader = articles.id_trader WHERE art_visible != 0 ORDER BY id_articles DESC';
        if (isset($limit) && !empty($limit)) {
            $sql .= ' LIMIT ' . $limit['start'] . ',' . $limit['per_page'];
        }
        $article = $this->db->query($sql);
        return $article->result_array();
    }

    public function API_get_StockArticles($id, $limit)
    {
        $sql = 'SELECT * FROM articles INNER JOIN category ON category = id_categ WHERE id_trader = ? AND art_visible != 0 ORDER BY id_articles DESC';
        if (isset($limit) && !empty($limit)) {
            $sql .= ' LIMIT ' . $limit['start'] . ',' . $limit['per_page'];
        }
        $article = $this->db->query($sql, array($id));

        // $article = $this->db->query('SELECT * FROM articles INNER JOIN category ON category = id_categ WHERE id_trader = ? AND art_visible != 0 ORDER BY id_articles DESC', array($id));
        return $article->result_array();
    }

    public function API_get_Categories($param)
    {
        $article = $this->db->query('SELECT * FROM category ORDER BY content');
        $categ = $article->result_array();
        $Categories = ['Toutes les catégories'];
        if ($param === true) {
            $Categories = ["Catégorie de l'article"];
        }
        foreach ($categ as $key => $value) {
            $Categories[$value["id_categ"]] = mb_convert_case($value["content"], MB_CASE_TITLE, 'UTF-8');
        }
        return $Categories;
        //form_dropdown('category', $categories, 'default');
    }
    public function API_VerifyTrader($id)
    {
        $req = $this->db->query("SELECT * FROM trader WHERE id_trader = ?", $id);
        return $req->result_array();
    }
}

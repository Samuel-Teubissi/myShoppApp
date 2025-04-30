<?php

    class apiModel_trader extends CI_Model 
    {
        public function API_VerifyTrader($id)
        {
            $req = $this->db->query("SELECT * FROM trader WHERE id_trader = ?", $id);
            return $req->result_array();
        }
        public function API_dataTrader($number)
        {
            $req = $this->db->query("SELECT * FROM trader WHERE number = ? ORDER BY id_trader DESC", $number);
            return $req->result_array();
        }
        public function API_BecomeTrader($id, $data)
        {
            $req = $this->db->query("INSERT INTO trader WHERE id_trader = ?", $id);
            $this->db->insert('trader', $data);
        }

        public function API_get_StockArticles($id, $limit=[])
        {
            $sql = 'SELECT * FROM articles
            INNER JOIN category ON category = id_categ 
            INNER JOIN trader ON trader.id_trader = articles.id_trader 
            WHERE articles.id_trader = ? AND art_visible != 0 ORDER BY id_articles DESC';
            if (isset($limit) && !empty($limit)) {
                $sql .= ' LIMIT ' . $limit['start'] . ',' . $limit['per_page'];
            }
            $article = $this->db->query($sql, array($id));

            // $article = $this->db->query('SELECT * FROM articles INNER JOIN category ON category = id_categ WHERE id_trader = ? AND art_visible != 0 ORDER BY id_articles DESC', array($id));
            return $article->result_array();
        }

        public function getArticle ($id, $id_trader)
        {
            // $this->db->select('*');
            // $query = $this->db->get('mytable');
            return $this->db->select('*')
                            ->where(['id_articles' => $id, 'id_trader' => $id_trader])
                            ->get('articles')
                            ->row_array();
        }
        
        public function deleteArticle ($id, $id_trader)
        {
            $this->db->where('id_articles', $id);
            $this->db->where('id_trader', $id_trader);
            return $this->db->update('articles', ['art_visible' => 0]);
        }
    }
    
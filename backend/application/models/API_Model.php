<?php
defined('BASEPATH') or exit('No direct script access allowed');

class API_Model extends CI_Model
{
    public function API_countArticles()
    {
        return $this->db->count_all('articles');
    }

    public function API_get_Articles($limit)
    {
        // $sql = 'SELECT * FROM articles 
        // INNER JOIN category ON category = id_categ
        // INNER JOIN trader ON trader.id_trader = articles.id_trader 
        // WHERE art_visible != 0 ORDER BY id_articles DESC';
        // if (isset($limit) && !empty($limit)) {
        //     $sql .= ' LIMIT ' . $limit['start'] . ',' . $limit['per_page'];
        // }
        // $articles = $this->db->query($sql);
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
        return $articles->result_array();
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
        //form_dropdown('category', $categories, 'default');
    }
    
    public function API_checkUser($number)
    {
        $checkUser = $this->db->query("SELECT * FROM user WHERE number = ?", array($number));
        return $checkUser->result_array();
    }

    public function API_VerifyTrader($id)
    {
        $req = $this->db->query("SELECT * FROM trader WHERE id_trader = ?", $id);
        return $req->result_array();
    }
    
    public function API_get_Search_Articles( $search, $categ, $limit=[], $controller='home' )
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
        //  else {
        //     $this->db->where('articles.id_user !=', $this->session->user_id);
        // }
        if (!empty($categ) && $categ > 0) {
            $this->db->like('articles.category', $categ);
        }
        if (!empty($search)) {
            $this->db->like('articles.article', $search);  // LIKE pour la recherche de l'article
        }
        // Ordonner les résultats
        $this->db->order_by('articles.id_articles', 'DESC');
        if (!empty($limit)) {
            $this->db->limit($limit['per_page'], $limit['start']);
        }
        // Exécuter la requête et récupérer les résultats
        // return var_dump ($this->db->get_compiled_select(), $search, $categ, $limit);;
        // var_dump ($search, $categ, $limit); exit;
        // echo $this->db->last_query(); exit;
        $articles = $this->db->get();
        return $articles->result_array();
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
    public function saveCommand ($user, $totalCommand)
    {
        $dataCommand = array(
            'id_user' => $user,
            'total' => $totalCommand);
        $this->db->insert('db_command_cart', $dataCommand);
        return $this->db->insert_id();
    }
    //Insertion de la carte en BD
    public function saveCart ($datas)
    {
        $this->db->insert('db_content_cart', $datas);
        return $this->db->insert_id();
    }
    public function get_qtyArticles($id)
    {
        $article = $this->db->query('SELECT articles.quantity FROM articles WHERE id_articles = ? AND art_visible != 0', array($id));
        return $article->row()->quantity;
    }

    /**
     * Gestion des Notifications
     */
    // Save des noifications
    public function saveNotification ( $data )
    {
        $this->db->insert('db_notifications', $data);
    }
    
    public function API_get_notifications($user_id) {
        $this->db->select('*');
        $this->db->from('db_notifications');
        $this->db->where('notif_user', $user_id);
        $this->db->order_by('notif_id', 'DESC');
        $results = $this->db->get();
        return $results->result_array();
        // return $this->db->get_where('db_notifications', ['notif_user' => $user_id])->order_by('notif_id', 'DESC')->result_array();
    }

    public function apiNotif_count_unread($user_id) {
        // return $this->db->get_where('db_notifications', ['notif_user' => $user_id, 'notif_status' => 'unread'])->row();
        $article = $this->db->query('SELECT * FROM db_notifications WHERE notif_user = ? AND notif_status = ?', array($user_id, "unread"));
        return $article->num_rows();
    }
    
    public function apiNotif_mark_as_read($notif_id) {
        $this->db->update('db_notifications', ['notif_status' => 'read'], ['notif_id' => $notif_id]);
    }
}

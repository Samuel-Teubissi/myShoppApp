<?php

class adminModel extends CI_Model
{
    public function API_ListUsers()
    {
        // $this->db->query("SELECT * FROM user ORDER BY id_user LIMIT 0,9");
        $this->db->select('user.*, trader.number as trader_number, trader.name as trader_name');
        $this->db->from('user');
        $this->db->order_by('id_user', 'DESC');
        $this->db->limit(6);
        $this->db->join('trader', 'user.number = trader.number', 'left');
        $query = $this->db->get();
        return $query->result_array();
    }

    public function API_ListArticles()
    {
        // $this->db->query("SELECT * FROM user ORDER BY id_user LIMIT 0,9");
        $this->db->select('*');
        $this->db->from('articles');
        $this->db->order_by('id_articles', 'DESC');
        $this->db->limit(6);
        $this->db->join('category', 'articles.category = category.id_categ'); //, 'inner'
        $this->db->join('trader', 'articles.id_trader = trader.id_trader'); //, 'left'
        $query = $this->db->get();
        return $query->result_array();
    }

    public function API_TurnOver()
    {
        $this->db->select_sum('total');
        $this->db->from('db_command_cart');
        $query = $this->db->get();
        return  $query->row()->total;
    }
    public function API_Users()
    {
        $this->db->select('*');
        $this->db->from('user');
        $query = $this->db->get();
        return  $query->result_array();
    }
    public function API_Selling()
    {
        $this->db->select('*');
        $this->db->from('db_command_cart');
        $query = $this->db->get();
        return  $query->result_array();
    }
}

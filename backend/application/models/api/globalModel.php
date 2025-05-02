<?php

class globalModel extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function API_checkUser($number)
    {
        $checkUser = $this->db->query("SELECT * FROM user WHERE number = ?", array($number));
        return $checkUser->result_array();
    }

    /**
     * Gestion des Notifications
     */
    // Save des noifications
    public function saveNotification($data)
    {
        $this->db->insert('db_notifications', $data);
    }

    public function API_get_notifications($user_id)
    {
        $this->db->select('*');
        $this->db->from('db_notifications');
        $this->db->where('notif_user', $user_id);
        $this->db->order_by('notif_id', 'DESC');
        $results = $this->db->get();
        return $results->result_array();
    }

    public function apiNotif_count_unread($user_id)
    {
        $article = $this->db->query('SELECT * FROM db_notifications WHERE notif_user = ? AND notif_status = ?', array($user_id, "unread"));
        return $article->num_rows();
    }

    public function apiNotif_mark_as_read($notif_id)
    {
        $this->db->update('db_notifications', ['notif_status' => 'read'], ['notif_id' => $notif_id]);
    }
}

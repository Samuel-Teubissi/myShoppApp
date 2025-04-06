<?php

    class Addcart extends CI_Controller
    {
        public function addart($id)
        {
            echo 'arrivé 12  ---->'.$id;
            $this->load->view('Addcart', ['id' => $id]);
        }
    }

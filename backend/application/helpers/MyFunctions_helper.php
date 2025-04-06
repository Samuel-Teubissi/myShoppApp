<?php
    if ( ! defined('BASEPATH')) exit('No direct script allowed');

    // Formatage des prix en milliers au format "1 000 000"
    function format_price($data)
    {
        return number_format($data,0,',',' ');
    }

    // Lien depuis le l'URL principale du site
    function super_link($url)
    {
        return base_url().$url;
    }

    function debog($data)
    {
        echo br(1).'<pre>';
        var_dump($data);
        echo br(1).'</pre>';
    }
    
    function Uppercase($data)
    {
        return mb_convert_case($data, MB_CASE_TITLE, 'UTF-8');
    }
    
    function url_img()
    {
        return base_url().'assets/img/articles/';;
    }

    function stateStock($qty)
    {
        $qty = (int)$qty;
        $class = 'red';
        if ($qty <= 0) {
            $stock = 'En rupture';
        } elseif ($qty == 1) {
            $stock = 'Un seul Exemplaire';
        } elseif ($qty < 5) {
            $stock = 'Bientôt en rupture';
        } else {
            $class = 'green';
            $stock = "Suffisant";
        }
        return '<span class="'.$class.'">'.$stock.'</span>';
    }
    
    function Pagination($limit_pag, $dataTotal, $pag_sizeLink)
    {
        // Limites de la pagination
        $pagCurrent = $limit_pag['start']; //Page actuelle
		//$limit_pag['per_page'] = $limit_pag[1]; // Nombre d'éléments par page

		//$limit_pag['start'] = ($pagCurrent - 1) * $limit_pag['per_page'];

        $config['total_rows'] = count($dataTotal);    
        
		$config['base_url'] = base_url();
		$config['use_page_numbers'] = TRUE;
		$config['page_query_string'] = TRUE;
		$config['query_string_segment'] = 'page';
		$config['reuse_query_string'] = TRUE;
		
		$config['num_links'] = $pag_sizeLink; // '5' by example
		$config['per_page'] = ($pagCurrent - 1) * $limit_pag['per_page'];

        return $config;
		/*$this->pagination->initialize($config);
		//debog($this->db->last_query());
		$data['paginate'] = $this->pagination->create_links();*/
    }
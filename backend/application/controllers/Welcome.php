<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/userguide3/general/urls.html
	 */
	// public function __construct()
	// {
	// 	parent::__construct();
	// }
	public function index()
	{
	/*	
		$this->session->set_userdata('id_user','3');
		$this->session->set_userdata('name','Zeus');
		$this->session->set_userdata('number','658585858');
	*/
	/*	$this->load->view('Header', array('home' => $home,'about' => $about,'form' => $form,'admin' => $admin));
	
	*/
		$data['search'] = $data['categ'] = $data['paginate'] = '';
		
		$data['categories'] = $this->Article->get_Categories(FALSE);
		$data['emptyArticle'] = 'Aucun article dans notre base de donnée pour le moment.';
		
		// DEBUT PAGINATION
		$this->load->library('pagination');
		// CONFIG PAGINATION
		
		/*$config['full_tag_open'] = '<div class="paginate">';
		$config['full_tag_close'] = '</div>';
		$config['num_tag_open'] = '<span>';
		$config['num_tag_close'] = '</span>';*/
	/*	
		if (isset($_GET['page']) && !empty($_GET['page']) && $_GET['page'] > 0) {
			//$pagCurrent = intval($_GET['page']);
			$limit_pag[0] = intval($_GET['page']);
		} else $limit_pag[0] = 1;*/
		 
		// Limite Page Courrante
		$limit_pag[0] = (isset($_GET['page']) && !empty($_GET['page']) && $_GET['page'] > 0) 
			? intval($_GET['page']) 
			: 1; 
		// Limite Nombre Par Page
		$limit_pag[1] = 3;
		
		// Limite Page Courrante
		$pagCurrent = (isset($_GET['page']) && !empty($_GET['page']) && $_GET['page'] > 0) 
			? intval($_GET['page']) 
			: 1; 
		// Limite Nombre Par Page
		$limit_pag['per_page'] = 3;
		
		//$pagTotal = count($data['article']);
		$limit_pag['per_page'] = 3;
		$limit_pag['start'] = ($pagCurrent - 1) * $limit_pag['per_page'];
		
		/*if (!empty($this->session->id_trader)) 
		{
			$dataDB = $this->Article->get_Home_Articles($this->session->id_trader,'');
		}else $dataDB = $this->Article->get_Articles('');*/
		
		$dataCount = $this->Article->get_Articles('');
		$data['article'] = $this->Article->get_Articles($limit_pag);

		if (!empty($this->session->id_trader)) 
		{
			$dataCount = $this->Article->get_Home_Articles($this->session->id_trader,'');
			$data['article'] = $this->Article->get_Home_Articles($this->session->id_trader,$limit_pag);
		}
		if (isset($_GET["s"],$_GET["categ"]) && (!empty($_GET["categ"]) OR $_GET["categ"] >= 0)) 
		{
			$search = $data['search'] = $this->security->xss_clean($_GET["s"]);
			$categ = $data['categ'] = intval($this->security->xss_clean($_GET["categ"]));
			$data['emptyArticle'] = "Aucun article dans la base de donnée n'a pour ";

			if (!empty($search)) $data['emptyArticle'] .= 'nom "<span>'.$search.'</span>"';

			if (is_int($categ) && $categ > 0 && isset($data['categories'][$categ])) 
			{
				$prefix = (!empty($search)) ? ' et ' : '';
				$data['emptyArticle'] .= $prefix.'catégorie "<span>'.$data['categories'][$categ].'</span>"';
			} else $categ = '';

			$dataCount = $this->Article->get_Search_Articles($search,$categ,'');
			$data['article'] = $this->Article->get_Search_Articles($search,$categ,$limit_pag);
			if (empty($data['article'])) $data['emptyArticle'] = "<span>Reéssayez votre recherche :-)</span>";
		} 
		
		//Chargement du Template View Home
		$config['total_rows'] = count($dataCount);    
		$config['base_url'] = base_url();
		$config['use_page_numbers'] = TRUE;
		$config['page_query_string'] = TRUE;
		$config['query_string_segment'] = 'page';
		$config['reuse_query_string'] = TRUE;
		
		$config['num_links'] = 5;
		$config['per_page'] = $limit_pag['per_page'];
		
		// CREATION DE LA PAGINATION
		$this->pagination->initialize($config);
		$data['paginate'] = $this->pagination->create_links();

	/*
		$this->pagination->initialize($config);
		$data['paginate'] = $this->pagination->create_links();
	*/
		/*if ($config['total_rows'] < $limit_pag['per_page']) {
			$data['article'] = $this->Article->get_Home_Articles($this->session->id_trader,'');
		}*/
		//debog($this->db->last_query());
		//if (!isset($_GET['s'],$_GET['categ']) && empty($_GET['s']) && empty($_GET['categ'])) $data['paginate'] = '';

		$this->load->view('templateForm',['home'=>true, 'view' => $this->load->view('Home', $data, true)]);
	}
}

<?php
	public function addActualite() 
	{
		$this->form_validation->set_error_delimiters('<i class="text-danger" style="margin-bottom: 0rem; font-size:10px;">','</i>');
		$datePub=date('Y-m-d');
		$categoriActuId=$this->security->xss_clean($this->input->post('categoryList'));
		$titre=$this->security->xss_clean($this->input->post('titre'));
		$content=$this->security->xss_clean($this->input->post('content'));
		$this->form_validation->set_rules('categoryList','Categorie','trim|required|callback_checkCategory');
		$this->form_validation->set_rules('titre','titre','trim|required');
		$this->form_validation->set_rules('content','Contenu','trim|required');
		if($this->form_validation->run()===FALSE){
			$output=array(
				'actuAdded'=>FALSE,
				'categoryListErr'=>form_error('categoryList'),
				'titreErr'=>form_error('titre'),
				'contentErr'=>form_error('content')
			);
		
		}else{
			$config['upload_path'] = './assets/imgs/etablissements';
			$config['allowed_types'] = 'jpeg|jpg|png|JPEG|JPG|PNG';
			$config['max_size']      = 0;
			$config['max_width']     = 0;
			$config['max_height']    = 0;
			$config['file_name'] = $nom.'_'.date('YmdHis').'-'.$id_etab;
			$config['file_ext_tolower'] = true;
			$this->load->library('upload', $config);
			if(!$this->upload->do_upload('userfile')){
				$output=array(
					'actuAdded'=>TRUE,
					'uploadErr'=>TRUE,
					'uploadErrMsg'=>$this->upload->display_errors()
				);
				$this->actualite_model->addActualite($this->session->userdata('idAdh'),$categoriActuId,$titre,$content,'',$datePub);
			}
			else{
				$data=$this->upload->data();
				$output=array('actuAdded'=>TRUE);
				$this->actualite_model->addActualite($this->session->userdata('idAdh'),$categoriActuId,$titre,$content,$data['file_name'],$datePub);
			}
			print(json_encode($output));
		}
	}
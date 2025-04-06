<?php
    class User extends CI_Controller
    {
        
        public function __construct()
        {
            parent::__construct();
            //$trader = $this->session->id_trader;
        }

//Fonction Acceuil        
        public function index(){
            if (empty($this->session->name)) {
                redirect(base_url().'user/disconnect');
            }
            //Chargement du Template View Admin    
            $this->load->view('templateForm',['admin' => true, 'view' => $this->load->view('User', [], true)]);
        }

//Fonction Déconnexion        
        public function disconnect(){
            $this->session->sess_destroy();
            $this->cart->destroy();
            redirect(base_url().'form/login');
        }

//Fonction Ajout d'articles        
        public function add()
        {
            $addData['categories'] = $this->Article->get_Categories(TRUE);
            unset($addData['categories'][0]);
            $categ_list = implode(',', array_keys($addData['categories']));

            $trader = $this->session->id_trader;
            if (!isset($trader) && empty($this->Trade->VerifyTrader($trader))) {
                redirect(base_url().'user');
            }
            //Gestion inputs
            $this->form->set_rules('article',"Nom de l'article",'required|min_length[3]|trim|is_unique[articles.article]');
            $this->form->set_rules('price',"Prix de l'article",'required|min_length[2]|trim|numeric|greater_than[0]');
            $this->form->set_rules('quantity',"Quantité",'required|numeric|greater_than[0]|trim');
            $this->form->set_rules('category',"Catégorie de l'article",'required|trim|in_list['.$categ_list.']');
            $this->form->set_message('in_list',"Erreur sur la catégorie de l'article");

            
            //Gestion fichiers FILES
            //  $data = $this->upload->data();
            $config['upload_path']   = './assets/img/articles';
			$config['allowed_types'] = 'jpeg|jpg|png|JPEG|JPG|PNG';
			$config['max_size']      = 0;
			$config['max_width']     = 0;
			$config['max_height']    = 0;
		    //$config['file_name'] = 'file'.'_'.$data['file_name'].'_'.date('YmdHis');
			$config['file_ext_tolower'] = true;
			$this->load->library('upload', $config);

            if ($this->form->run()) {
                //Récupération des données envoyées
                $article = $this->security->xss_clean($this->input->post('article'));
                $price   = $this->security->xss_clean($this->input->post('price'));
                $qty     = $this->security->xss_clean($this->input->post('quantity'));
                $categ   = $this->security->xss_clean($this->input->post('category'));
                
                $regexText = "/^[a-zA-Z0-9 -]+$/i";
                $regexNum = "/^[0-9]+$/";
                if (preg_match($regexText, $article) /*&& preg_match($regexNum, $price) && preg_match($regexNum, $qty)*/) 
                {
                    if(!$this->upload->do_upload('userfile')){
                        $this->FormD->setFlash('errFile', $this->upload->display_errors());
                    }
                    else{
                        $dataFile = $this->upload->data();
                        $this->Article->add_Article($this->session->id_trader,$price,$article,$qty,$categ,$dataFile['file_name']);
                        //$this->session->set_flashdata('ValidFile',"L'article a été ajouté avec succès");
                        $this->FormD->setFlash('ValidFile',"L'article a été ajouté avec succès");
                        redirect(base_url().'user/add');
                    }
                } else 
                {
                    $this->FormD->setFlash('errForm',"Le nom ne doit contenir que des chiffres, lettres, espaces et tirets");
                }
            }
            //Chargement du Template View Add    
            $this->load->view('templateForm', ['admin' => true, 'view' => $this->load->view('Add', $addData, true)]);
        }

//Fonction Panier       
        public function cart($home='',$about='',$form='',$admin='')
        {
            if (empty($this->session->name)) {
                redirect(base_url().'user/disconnect');
            }
            //Chargement du Template View Cart    
            $this->load->view('templateForm', ['admin' => true, 'view' => $this->load->view('Cart', [], true)]);
        }

//Fonction ajouter un Trader
        public function trader()
        {
            $id = $this->session->id_trader;

            if (empty($this->Trade->VerifyTrader($id)))
            {
                $data = [
                    "number" => $this->session->number,
                    "name" => $this->session->name
                ];
                $this->db->insert('trader', $data);
            //    echo($this->db->last_query());
            //    $this->db->query("INSERT INTO trader (id_user,number,name) VALUES(?,?,?)", $data);
                $this->session->set_userdata('id_trader', $this->db->insert_id());
                $this->session->set_flashdata('WelcomeTrade',"Vous êtes désormais un Trader !!!");
            }
            redirect(base_url().'admin');
        }

//Fonction ajout d'articles dans le panier
        public function addcart($id='')
        {
            if (empty($this->session->id_user)) {
                $this->FormD->ErrLogin("Veuillez vous connecter avant de passer des commandes");
                redirect(base_url().'form/login');
                //die('arrêt');
            }
            if ($id == 'delete') {
                $this->cart->destroy();
                $this->FormD->Flash('AddCart',"<span>Le pannier a été correctement vidé !</span>");
                redirect(base_url().'home');
            }
            $data = [];
            $id = (int)htmlspecialchars($id);
            $articleData = $this->Article->get_Art_Articles($id);
            if (!empty($articleData)) {
                $data = array(
                    'id'      => $id,
                    'qty'     => 1,
                    'price'   => $articleData[0]['price'],
                    'categ'   => $articleData[0]['content'],
                    'name'    => $articleData[0]['article']
                );
            }
            $flag = true;
            foreach ($this->cart->contents() as $item => $value) {
                if ($value['id'] == $id) {
                    $flag = false;
                    break;
                }
            }
            if ($flag) 
            {
                //$this->session->set_userdata('AddCart', "L'article '".$articleData[0]['article']."' a été ajouté à votre panier");
                $this->FormD->Flash('AddCart',"L'article <span>".$articleData[0]['article']."</span> a été ajouté à votre panier");
                $this->cart->insert($data);
                redirect(base_url().'home');
            } else 
            {
                //$this->session->set_userdata('AddCart', "L'article '".$articleData[0]['article']."' est déjà dans votre panier");
                $this->FormD->Flash('AddCart',"L'article <span>".$articleData[0]['article']."</span> est déjà dans votre panier");
                redirect(base_url().'home');
            }
        }

//Fonction Affichage du stock du Trader    
        public function stock()
        {
            $msgUpdate = '';
            $UpdateStatus = true;
            $trader = $this->session->id_trader;

            if (empty($trader)) {
                redirect(base_url().'user');
            }

            $data['categories'] = $this->Article->get_Categories(TRUE);
            $categ_list = implode(',', array_keys($data['categories']));

            if (isset($_GET['del']) && !empty($_GET['del']) && is_numeric($_GET['del'])) {
                $id_del = intval($_GET['del']);
                $verifArticle = $this->Article->Verif_Article($trader,$id_del);
                if (!empty($verifArticle)) {
                    $delData = ['art_visible' => 0];
                    $this->db->update('articles', $delData,"id_articles = ".$id_del);
                }
            }

            if (!empty($this->input->post()) && !isset($_GET['del'])) :

                $this->form->set_rules('article[]',"Nom de l'article",'required|trim|min_length[3]');
                $this->form->set_rules('quantity[]',"Quantité de l'article",'required|trim|numeric');
                $this->form->set_rules('category[]',"Catégorie de l'article",'required|trim|numeric|in_list['.$categ_list.']');
                $this->form->set_rules('price[]',"Prix de l'article",'required|trim|numeric');

                if ($this->form->run()) :
                    $ids = $this->security->xss_clean($this->input->post('id'));
                    $articles = $this->security->xss_clean($this->input->post("article"));
                    $quantity = $this->security->xss_clean($this->input->post("quantity"));
                    $category = $this->security->xss_clean($this->input->post('category'));
                    $prices = $this->security->xss_clean($this->input->post('price'));

                    $verifPost = [
                        'id' => count($ids),
                        'name' => count($articles),
                        'quantity' => count($quantity),
                        'category' => count($category),
                        'price' => count($prices)
                    ];
                    if (count(array_unique($verifPost)) == 1) 
                    {
                        for ($i=0; $i < count($ids); $i++) { 
                            $ii = $i + 1;
                            $id = $ids[$i];
                            $art = $articles[$i];
                            $qty = $quantity[$i];
                            $categ = $category[$i];
                            $price = $prices[$i];
                            $verifArticle = $this->Article->Verif_Article($trader,$id);
                            if (!empty($verifArticle)) {
                                if (!empty($id) && !empty($art) && !empty($qty) && !empty($categ) && !empty($price)) {
                                    $updateArticle = [
                                        'article' => $art,
                                        'quantity' => $qty,
                                        'category' => $categ,
                                        'price' => $price
                                    ];
                                    $this->db->update('articles', $updateArticle,"id_articles = ".$id);
                                } else {
                                    $UpdateStatus = false; 
                                    $data['errUpdate'][$i] = '<div>Des erreurs sur des champs de la ligne '.$ii.' ont empêché sa sauvegarde</div>';
                                }
                            } else {
                                $UpdateStatus = false; 
                                $data['errUpdate'][$i] = '<div>Des erreurs sur des champs de la ligne n°'.$ii.' ont empêché sa sauvegarde</div>';
                            } 
                        }
                    } else $UpdateStatus = false;
                endif;
                if ($UpdateStatus == false) {
                    $msgUpdate = 'Des erreurs sur le formulaire. Certaines données n\'ont pas été enregistrées.';
                } else $msgUpdate = 'Les données valides ont été enregistrées avec succès !';
                $this->FormD->setFlash('msgUpdate', $msgUpdate);
            endif;

            $data['dataStock'] = $this->Article->get_StockArticles($trader);
            $this->load->view('templateForm', ['admin' => true, 'view' => $this->load->view('Stock', $data, true)]);
        }
        
//Fonction Affichage de la commande de l'utilsateur    
        public function command()
        {
            if (empty($this->session)) {
                redirect(base_url().'user/disconnect');
            }
            if (empty($this->cart->contents())) {
                redirect(base_url().'home');
            }
            $SaveCommand = false;
            $this->cart->update($this->input->post());
            
            //Insertion Donnée dans la table des contenus de Commandes
            $dataContent = array();
            $dataCart = $this->cart->contents();
            $ErrCommand = false;

            foreach ($dataCart as $index => $value) {
                $VerifQuantity = $this->Article->get_Art_Articles($value['id']);
                $dataContent['id_article'] = $value['id'];
                $dataContent['quantity'] = $value['qty'];
                $BDqty = (float)$VerifQuantity[0]['quantity'];

                //Si la quantité souhiatée est supérieure à celle en BD
                if ($BDqty > 0 && $value['qty'] > $BDqty)
                {
                    $datamodif = array(
                        'rowid'  => $index,
                        'qty'    => $BDqty
                    );
                    $this->cart->update($datamodif);
                    $dataContent['quantity'] = $BDqty;
                    $ErrCommand = true;
                }
                elseif ($BDqty == 0) 
                {
                    //On supprime l'article du panier car stock insuffisant
                    $this->cart->remove($index);
                    $ErrCommand = true;
                }
                else 
                {
                    $SaveCommand = true;
                }
            }
            if ($ErrCommand === true) {
                $SaveCommand = false;
                $this->session->set_flashdata('ErrCart',"Des quantités de certains articles ont été modifiées ou supprimées dû au stock insuffisant");
                redirect(base_url().'admin/cart');
            }
            if ($SaveCommand === true) {
                $dataCarts = $this->cart->contents();

                //Création de la commande
                $dataCommand = array(
                    'id_user' => $this->session->id_user,
                    'total' => $this->cart->total()
                );
                $this->db->insert('command', $dataCommand);
                $id_command = $this->db->insert_id();

                //Création du contenu de la commande
                foreach ($dataCarts as $index => $dataCart) {
                    $VerifQuantity = $this->Article->get_Art_Articles($dataCart['id']);
                    $BDqty = (float)$VerifQuantity[0]['quantity'];
                    $updateArticle = [
                        'quantity' => $BDqty - $dataCart['qty']
                    ];
                    $this->db->update('articles', $updateArticle,"id_articles = ".$dataCart['id']);

                    $dataContent = [
                        'id_command' => $id_command,
                        'id_article' => $dataCart['id'],
                        'name' => $dataCart['name'],
                        'price' => $dataCart['price'],
                        'quantity' => $dataCart['qty']
                    ];
                    $this->db->insert('content', $dataContent);
                //   $this->db->where('id_articles', $VerifQuantity[0]['id_articles']);
                    
                }

                $this->cart->destroy();
                redirect(base_url().'user/payout/'.$id_command);
                
                //Si tout s'est bien passé alors on charge la vue
                //$this->load->view('templateForm', ['admin' => true, 'view' => $this->load->view('Command', [], true)]);
            }
            //$data['dataStock'] = $this->Article->get_S_Articles($id);

        }
                
//Fonction Affichage de la commande de l'utilsateur    
        public function payout($idCommand = '')
        {
            if (!$idCommand) 
            {
                redirect(super_link('user/cart'));
            }
            $send['total'] = $this->Article->get_Command($this->session->id_user)[0]['total'];
            $send['dataCommand'] = $this->Article->get_ContentCommand($idCommand);
            if (!empty($send['total'])) 
            {
                $this->load->view('templateForm', ['admin' => true, 'view' => $this->load->view('Payout', $send, true)]);
            } else 
            {
                redirect(super_link('user/cart'));
            }
        }
    }
    
?>
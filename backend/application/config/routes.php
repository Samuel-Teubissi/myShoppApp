<?php
defined('BASEPATH') or exit('No direct script access allowed');

// // Autoriser CORS
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
// header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// // Gérer les requêtes OPTIONS (préflight)
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     exit;
// }


/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
$route['default_controller'] = 'welcome';


$route['api/(:any)'] = 'api/$1';
/**
 * TOJOURS AJOUTER ""api/"" AU DEBUT D'UNE ROUTE API REST
 * Routage d'affichage d'articles' ""articles_Controller""
 */
$route['api/articles/home'] = 'api/articlesController/API_Home_Articles';
$route['api/articles/trader'] = 'api/articlesController/API_Trader_Articles';
$route['api/articles/total_home'] = 'api/articlesController/API_count_Articles/home';
$route['api/articles/total_trader'] = 'api/articlesController/API_count_Articles/trader';
$route['api/articles/categories'] = 'api/articlesController/API_categories';
$route['api/articles/search'] = 'api/articlesController/API_Search';
/**
 * Routage de modificcation d'articles ""article_Controller""
 */
$route['api/article/add'] = 'api/articleController/API_add_Article';
$route['api/article/(:num)'] = 'api/articleController/API_Trader_Article/$1';
/**
 * Routage de gestion des commandes
 */
$route['api/command/add'] = 'api/articlesController/addCommand';
/**
 * Routage de gestion des utilisateurs
 */
$route['api/login'] = 'api/globalController/API_Login';
$route['api/register'] = 'api/globalController/API_Register';
$route['api/logout'] = 'api/globalController/API_logout';
$route['api/logged'] = 'api/globalController/API_logged';
$route['api/user/become_trader'] = 'api/globalController/API_BTrader';
/**
 * Routage de gestion des utilisateurs
 */
$route['api/admin/all_users'] = 'api/adminController/API_dataListUsers';
$route['api/admin/dashboard'] = 'api/adminController/API_dataDashboard';
$route['api/admin/articles'] = 'api/adminController/API_dataArticles';
/**
 * Routage de gestion des notifications
 */
$route['api/notifs/fetch/(:num)'] = 'api/globalController/API_getNotif/$1';
$route['api/notifs/fetch/admin'] = 'api/globalController/API_getNotif/admin';
$route['api/notifs/read/(:num)'] = 'api/globalController/API_readNotif/$1';
$route['api/notifs/create'] = 'api/globalController/API_CreateNotif';

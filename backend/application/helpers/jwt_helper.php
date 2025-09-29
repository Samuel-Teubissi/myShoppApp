<?php
// require_once FCPATH . 'vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

define("ACCESS_TOKEN_KEY", 'votre_cle_access');
define("REFRESH_TOKEN_KEY", 'votre_cle_refresh');

function generateAccessToken($user)
{
    $payload = [
        'data_trader' => $user['data_trader'],
        'user_id' => $user['user_id'], //$user['id_user'] || 
        'user_name' => $user['user_name'],
        'user_number' => $user['user_number'],
        'role' => $user['role'],
        'iat' => time(),
        'exp' => time() + (5 * 60) // nbr de minutes
    ];
    return JWT::encode($payload, ACCESS_TOKEN_KEY, 'HS256');
    //getenv('ACCESS_TOKEN_SECRET')
}

function generateRefreshToken($user)
{
    $payload = [
        // 'data_trader' => $user['data_trader'],
        'user_id' => $user['user_id'],
        // 'user_name' => $user['user_name'],
        // 'user_number' => $user['user_number'],
        'role' => $user['role'],
        'iat' => time(),
        'exp' => time() + (1 * 24 * 60 * 60) // nbr de jours
    ];
    return JWT::encode($payload, REFRESH_TOKEN_KEY, 'HS256');
    //getenv('REFRESH_TOKEN_SECRET')
}

function verifyToken($token, $type = 'access')
{
    // $key = $type === 'refresh' ? getenv('REFRESH_TOKEN_SECRET') : getenv('ACCESS_TOKEN_SECRET');
    $key = $type === 'refresh' ? REFRESH_TOKEN_KEY : ACCESS_TOKEN_KEY;

    return JWT::decode($token, new Key($key, 'HS256'));
}

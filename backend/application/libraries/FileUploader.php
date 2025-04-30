<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class FileUploader
{
    protected $CI;

    public function __construct()
    {
        $this->CI =& get_instance();
        $this->CI->load->library('upload');
    }

    public function upload($field, $type = 'image')
    {
        $config = $this->get_config($type);
        $this->CI->upload->initialize($config);

        if (!$this->CI->upload->do_upload($field)) {
            return ['status' => false, 'error' => $this->CI->upload->display_errors()];
        } else {
            return ['upload_data' => $this->CI->upload->data()];
        }
    }

    private function get_config($type)
    {
        switch ($type) {
            case 'image':
                return [
                    'upload_path'   => './assets/img/articles/',
                    'allowed_types' => 'jpeg|jpg|png|JPEG|JPG|PNG',
                    'max_size'      => 2048,
                    'encrypt_name'  => TRUE
                ];
            case 'audio':
                return [
                    'upload_path'   => './assets/img/audio/',
                    'allowed_types' => 'mp3|wav|ogg',
                    'max_size'      => 10000,
                    'encrypt_name'  => TRUE
                ];
            case 'document':
                return [
                    'upload_path'   => './assets/img/docs/',
                    'allowed_types' => 'pdf|doc|docx',
                    'max_size'      => 5000,
                    'encrypt_name'  => TRUE
                ];
            default:
                return [
                    'upload_path'   => './assets/img/other/',
                    'allowed_types' => '*',
                    'max_size'      => 2048,
                    'encrypt_name'  => TRUE
                ];
        }
    }
}

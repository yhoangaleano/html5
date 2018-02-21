<?php

class Response
{
	public $result        = null;
	public $response      = false;
	public $statusCode    = 200;
	public $message       = '¡Oops! Ocurrio un error inesperado. Si los errres persisten, comuniquese con el administrador del sitio';
    public $errors        = [];

	
	public function SetResponse($response, $m = '', $status = 200)
	{
		$this->response = $response;
		$this->message = $m;
		$this->statusCode = $status;

		if(!$response && $m = ''){
			$this->message = '¡Oops! Ocurrio un error inesperado. Si los errres persisten, comuniquese con el administrador del sitio';
			$this->statusCode = 500;
		}
        
        return $this;
	}
}
<?php

class Jornalero extends Controller
{
    private $modelJornalero = null;
    private $response = null;

    public function __construct(){
        $this->modelJornalero = $this->loadModel("modelJornalero");
        $this->response = new Response();
    }

    public function sincronizar($jornaleros)
    {
        $index = 0;
        $jornalerosSincronizados = array();

        try 
        {
            $jornaleros = json_decode($jornaleros);

            foreach ($jornaleros as $jornalero) {

                $this->modelJornalero->__SET('nombres', $jornalero->nombre);
                $this->modelJornalero->__SET('correo', $jornalero->correo);
                $this->modelJornalero->__SET('fechaNacimiento', $jornalero->fecha);
                $this->modelJornalero->__SET('peso', $jornalero->peso);

                if($this->modelJornalero->createJornalero())
                {
                    $jornalerosSincronizados[] = $index;
                }

                $index++;
            }

            if (count($jornaleros) == count($jornalerosSincronizados)) 
            {
                $this->response->result = $jornalerosSincronizados;
                return json_encode($this->response->SetResponse(true));
            }
            else
            {
                $this->response->result = $jornalerosSincronizados;
                $r->SetResponse(false, 'No todos los jornaleros fueron sincronizados. Por favor intente sincronizar mas tarde', 422);
            }
        }
        catch (Exception $e) 
        {
            return json_encode($this->response->SetResponse(false, $e->getMessage(), 500));
        }
    }

    public function createJornalero($nombres, $correo, $fechaNacimiento, $peso){

        $this->modelJornalero->__SET('nombres', $nombres);
        $this->modelJornalero->__SET('correo', $correo);
        $this->modelJornalero->__SET('fechaNacimiento', $fechaNacimiento);
        $this->modelJornalero->__SET('peso', $peso);

        try 
        {
            if($this->modelJornalero->createJornalero())
            {
                return json_encode($this->response->SetResponse(true));
            }
            else
            {

                $r->SetResponse(false, 'El registro no puede ser insertado, intente más tarde. Si los errores persisten, comuníquese con el administrador del sitio.', 500);
            }

        } 
        catch (Exception $e) 
        {
            return json_encode($this->response->SetResponse(false, $e->getMessage(), 500));
        }
    }

    public function readJornaleros(){
        try 
        {
            $this->response->result = $this->modelJornalero->readJornaleros();
            return json_encode($this->response->SetResponse(true));
        } 
        catch (Exception $e) 
        {
            return json_encode($this->response->SetResponse(false, $e->getMessage(), 500));
        }
    }

    public function updateJornalero($idJornalero, $nombres, $correo, $fechaNacimiento, $peso){

        $this->modelJornalero->__SET('idJornalero', $idJornalero);
        $this->modelJornalero->__SET('nombres', $nombres);
        $this->modelJornalero->__SET('correo', $correo);
        $this->modelJornalero->__SET('fechaNacimiento', $fechaNacimiento);
        $this->modelJornalero->__SET('peso', $peso);

        try 
        {
            if($this->modelJornalero->updateJornalero())
            {
                return json_encode($this->response->SetResponse(true));
            }
            else
            {

                $r->SetResponse(false, 'El registro no puede ser modificado, intente más tarde. Si los errores persisten, comuníquese con el administrador del sitio.', 500);
            }

        } 
        catch (Exception $e) 
        {
            return json_encode($this->response->SetResponse(false, $e->getMessage(), 500));
        }
    }

    public function deleteJornalero($idJornalero){

        $this->modelJornalero->__SET('idJornalero', $idJornalero);

        try 
        {
            if($this->modelJornalero->deleteJornalero())
            {
                return json_encode($this->response->SetResponse(true));
            }
            else
            {

                $r->SetResponse(false, 'El registro no puede ser eliminado, intente más tarde. Si los errores persisten, comuníquese con el administrador del sitio.', 500);
            }

        } 
        catch (Exception $e) 
        {
            return json_encode($this->response->SetResponse(false, $e->getMessage(), 500));
        }
    }
}
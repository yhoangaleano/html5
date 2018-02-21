<?php

class ModelJornalero
{

    private $idJornalero;
    private $nombres;
    private $correo;
    private $fechaNacimiento;
    private $peso;

    /**
     * @param object $db A PDO database connection
     */
    function __construct($db)
    {
        try {
            $this->db = $db;
        } catch (PDOException $e) {
            exit('Database connection could not be established.');
        }
    }

    
    public function __SET($atributo, $valor){
        $this->$atributo = $valor;
    }

    public function __GET($atributo){
        return $this->$atributo;
    }

    public function createJornalero()
    {
        $sql = "INSERT INTO tbljornalero (nombres, correo, fechaNacimiento, peso) VALUES (:nombres, :correo, :fechaNacimiento, :peso)";
        $query = $this->db->prepare($sql);

        $query->bindValue(":nombres", $this->__GET("nombres"));
        $query->bindValue(":correo", $this->__GET("correo"));
        $query->bindValue(":fechaNacimiento", $this->__GET("fechaNacimiento"));
        $query->bindValue(":peso", $this->__GET("peso"));

        return $query->execute();
    }

    public function readJornaleros()
    {
        $sql = "SELECT idJornalero, nombres, correo, fechaNacimiento, peso FROM tbljornalero";
        $query = $this->db->prepare($sql);
        $query->execute();
        return $query->fetchAll();
    }

    public function updateJornalero()
    {
        $sql = "UPDATE tbljornalero SET nombres = :nombres, correo = :correo, fechaNacimiento = :fechaNacimiento, peso = :peso WHERE idJornalero = :idJornalero";
        $query = $this->db->prepare($sql);

        $query->bindValue(":nombres", $this->__GET("nombres"));
        $query->bindValue(":correo", $this->__GET("correo"));
        $query->bindValue(":fechaNacimiento", $this->__GET("fechaNacimiento"));
        $query->bindValue(":peso", $this->__GET("peso"));
        $query->bindValue(":idJornalero", $this->__GET("idJornalero"));

        return $query->execute();
    }


    public function deleteJornalero()
    {
        $sql = "DELETE FROM tbljornalero WHERE idJornalero = :idJornalero";
        $query = $this->db->prepare($sql);
        $query->bindValue(":idJornalero", strip_tags($this->__GET("idJornalero")));
        return $query->execute();
    }
    
}

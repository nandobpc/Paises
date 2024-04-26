<?php

require_once('../config/coenxion.php');
class Clase_Paises
{
    public function todos()
    {
        $con = new Clase_Conectar();
        $con = $con->ProcedimientoConectar();
        $sql = "SELECT `PaisId`, `Nombre`, `Poblacion`, `CodigoPostal` FROM `paises`";
        $datos = mysqli_query($con, $sql);
        $con->close();
        return $datos;
    }
    public function uno($PaisId)
    {
        $con = new Clase_Conectar();
        $con = $con->ProcedimientoConectar();
        $sql = "SELECT * FROM `paises` where PaisId=$PaisId";
        $datos = mysqli_query($con, $sql);
        $con->close();
        return $datos;
    }
    //
    public function insertar($Nombre, $Poblacion, $CodigoPostal)
    {
        $con = new Clase_Conectar();
        $con = $con->ProcedimientoConectar();
        $sql = "INSERT INTO `paises`(`Nombre`, `Poblacion`, `CodigoPostal`) VALUES ('$Nombre',$Poblacion,'$CodigoPostal')";
        $datos = mysqli_query($con, $sql);
        $con->close();
        return $datos;
    }
    public function actualizar($PaisId, $Nombre, $Poblacion, $CodigoPostal)
    {
        $con = new Clase_Conectar();
        $con = $con->ProcedimientoConectar();
        $sql = "UPDATE `paises` SET `Nombre`='$Nombre',`Poblacion`='$Poblacion',`CodigoPostal`='$CodigoPostal' WHERE `PaisId`=$PaisId";
        $datos = mysqli_query($con, $sql);
        $con->close();
        return $datos;
    }
    public function eliminar($PaisId)
    {
        $con = new Clase_Conectar();
        $con = $con->ProcedimientoConectar();
        $sql = "DELETE FROM paises WHERE `PaisId`=$PaisId";
        $datos = mysqli_query($con, $sql);
        $con->close();
        return $datos;
    }
    public function contar()
    {
        $con = new Clase_Conectar();
        $con = $con->ProcedimientoConectar();
        $sql = "SELECT COUNT(*) FROM `paises`";
        $datos = mysqli_query($con, $sql);
        $con->close();
        return $datos;
    }
}

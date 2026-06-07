<?php
    session_start();
    require("conexion.php");
    if(!($cn->connect_errno)) {
        $buscar=$cn->query("SELECT DISTINCT TIPO FROM COMIDAS ORDER BY TIPO ASC"); 
        if($buscar){
            $cadena="[";
            $c=0;  
            while($datos = $buscar->fetch_array()){
              $c++;
              $tipo= 'tipo'.$c;
              $cadena.='{"tipo":"'.$datos['TIPO'].'"},';
              $_SESSION[$tipo]=$datos['TIPO'];
            }
            $cadena = substr($cadena, 0, -1);
            $cadena.="]";
            echo ($cadena);
        }
    }
?>
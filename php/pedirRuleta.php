<?php
    session_start();
    require("conexion.php");
    $buscar=$cn->query("SELECT NOMBRE FROM COMIDAS WHERE NOMBRE NOT LIKE 'AGUA_SIMPLE' AND NOMBRE NOT LIKE 'GELATINA' AND NOMBRE NOT LIKE 'REFRESCO' ORDER BY NOMBRE ASC"); 
    if($buscar){
        $cadena="[{";
        $c=0;
        while($registro=$buscar->fetch_array()){
            $c++;
            $cadena.='"NOMBRE":"'.$registro['NOMBRE'].'"},{';
        }
        $largo=strlen($cadena);
        $cadena=substr($cadena,0,($largo-2));
        $cadena.=']';
    }
    echo($cadena);
?>
<?php
    $BUSCADOR=false;
    require("conexion.php");
    if(!($cn->connect_errno)) {
        //SELECT NOMBRE,APELLIDO,EDAD,ESPECIALIDAD,NOMBRE_PUESTO,PAGO_EXTRA FROM cocineros,puestos WHERE ID_PUESTO = puestos.ID
        $buscar=$cn->query("SELECT NOMBRE,APELLIDO,EDAD,ESPECIALIDAD,NOMBRE_PUESTO,PAGO_EXTRA,COCINEROS.ID FROM COCINEROS,PUESTOS WHERE ID_PUESTO = PUESTOS.ID ORDER BY NOMBRE_PUESTO ASC");
        if($buscar){
            $cadena="[{";
            $c=0;
            while($registro=$buscar->fetch_array()){
                $c++;
                $cadena.='"ID":"'.$registro['ID'].'","NOMBRE":"'.$registro['NOMBRE'].'","APELLIDO":"'.$registro['APELLIDO'].'","PUESTO":"'.$registro['NOMBRE_PUESTO'].'","EDAD":'.$registro['EDAD'].',"ESPECIALIDAD":"'.$registro['ESPECIALIDAD'].'","PAGO_EXTRA":"$'.$registro['PAGO_EXTRA'].'"},{';
            }
            $cadena.='"tam":'.$c.'}]';
            echo($cadena);
        }
    }
?>
<?php
    session_start();
    if($_SESSION['TIPO_CHEF']==0)
        $TIPO=$_SESSION['tipo'.$_SESSION['pulsado']];
    else{
        $TIPO=$_SESSION['TIPO_CHEF'];
        $_SESSION['TIPO_CHEF']=0;
    }
    $BUSCADOR=false;
    require("conexion.php");
    if(!($cn->connect_errno)) {
        $buscar=$cn->query("SELECT NOMBRE,PAGO_EXTRA,COCINEROS.ID FROM COCINEROS,PUESTOS WHERE ID_PUESTO = PUESTOS.ID AND ESPECIALIDAD = '".$TIPO."'");
        if($buscar){
            $cadena="[{";
            $c=0;
            while($registro=$buscar->fetch_array()){
                $c++;
                $cadena.='"ID":"'.$registro['ID'].'","NOMBRE":"'.$registro['NOMBRE'].'","PAGO_EXTRA":"$'.$registro['PAGO_EXTRA'].'"},{';
                $BUSCADOR=true;
            }
            if($BUSCADOR)
                $cadena.='"tam":'.$c.'}]';
            else
                $cadena=0;
            echo($cadena);
        }
    }
?>
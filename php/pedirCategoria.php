<?php
    session_start();
    require("conexion.php");
    if($_SESSION['TIPO']==0){
        if($_SESSION['pulsado']!=0){
            $_SESSION['TIPO_CHEF']=0;
            $TIPO=$_SESSION['tipo'.$_SESSION['pulsado']];
            $buscar=$cn->query("SELECT * FROM COMIDAS WHERE TIPO = '".$TIPO."' ORDER BY NOMBRE ASC"); 
            if($buscar){
                $cadena="[{";
                $c=0;
                while($registro=$buscar->fetch_array()){
                    $c++;
                    if($registro['DISPONIBILIDAD'])
                    $DISP="DISPONIBLE";
                    else
                    $DISP="NO DISPONIBLE";
                    $cadena.='"NOMBRE":"'.$registro['NOMBRE'].'","PRECIO":"$'.$registro['PRECIO'].'","TIPO":"'.$registro['TIPO'].'","DISPONIBILIDAD":"'.$DISP.'","ID":'.$registro['ID'].'},{';
                }
                $cadena.='"tam":'.$c.'}]';
            }
        }else
            $cadena=0;
    }else{
        $TIPO=$_SESSION['TIPO'];
        $_SESSION['TIPO']=0;
        $_SESSION['pulsado']=1;
        $buscar=$cn->query("SELECT * FROM COMIDAS WHERE ID = ".$TIPO); 
        if($buscar){
            $cadena="[{";
            $c=0;  
            while($registro=$buscar->fetch_array()){
                $c++;
                if($registro['DISPONIBILIDAD'])
                $DISP="DISPONIBLE";
                else
                $DISP="NO DISPONIBLE";
                $_SESSION['TIPO_CHEF']=$registro['TIPO'];
                $cadena.='"NOMBRE":"'.$registro['NOMBRE'].'","PRECIO":"$'.$registro['PRECIO'].'","TIPO":"'.$registro['TIPO'].'","DISPONIBILIDAD":"'.$DISP.'","ID":'.$registro['ID'].'},{';
            }
            $cadena.='"tam":'.$c.'}]';
        }
    }
    echo($cadena);
?>
<?php
    $busc=$_POST['Envia_busc'];
    $busc=strtoupper($busc);
    $BUSCADOR=false;
    session_start();
    require("conexion.php");
    if(!($cn->connect_errno)) {
        $buscar=$cn->query("SELECT * FROM COMIDAS WHERE NOMBRE LIKE '%".$busc."%' ORDER BY NOMBRE ASC"); 
        $cadena="[{";
        $c=0;  
        while($registro=$buscar->fetch_array()){
            $c++;
            if($registro['DISPONIBILIDAD'])
                $DISP="DISPONIBLE";
            else
                $DISP="NO DISPONIBLE";
            $cadena.='"NOMBRE":"'.$registro['NOMBRE'].'","PRECIO":"$'.$registro['PRECIO'].'","TIPO":"'.$registro['TIPO'].'","DISPONIBILIDAD":"'.$DISP.'","ID":'.$registro['ID'].'},{';
            $BUSCADOR=true;
        }
        if($BUSCADOR)
            $cadena.='"tam":'.$c.'}]';
        else{
            $buscar=$cn->query("SELECT * FROM COMIDAS WHERE TIPO LIKE '%".$busc."%' ORDER BY NOMBRE ASC"); 
            while($registro=$buscar->fetch_array()){
                $c++;
                if($registro['DISPONIBILIDAD'])
                    $DISP="DISPONIBLE";
                else
                    $DISP="NO DISPONIBLE";
                $cadena.='"NOMBRE":"'.$registro['NOMBRE'].'","PRECIO":"$'.$registro['PRECIO'].'","TIPO":"'.$registro['TIPO'].'","DISPONIBILIDAD":"'.$DISP.'","ID":'.$registro['ID'].'},{';
                $BUSCADOR=true;
            }
            if($BUSCADOR)
                $cadena.='"tam":'.$c.'}]';
            else
                $cadena=0;
        }
        $_SESSION['busqueda']=$cadena;
        header("Location: ../busqueda.html");
    }
?>
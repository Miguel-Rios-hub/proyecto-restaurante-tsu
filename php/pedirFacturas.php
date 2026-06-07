<?php
    session_start();
    $ID_US=$_SESSION['id'];
    $BUSCADOR=false;
    require("conexion.php");
    $buscar=$cn->query("SELECT * FROM CLIENTES WHERE ID=".$ID_US);
    while($registro=$buscar->fetch_array()){
        $cadena='[{"NOMBRE":"'.$registro['NOMBRE'].'","APELLIDO_P":"'.$registro['APELLIDO_P'].'"},{';
    }
    //SELECT F.ID 'ID',U.NOMBRES 'NOM_CLIENTE',U.APELLIDOS 'AP_CLIENTE',C.NOMBRE 'NOM_COCINERO',C.APELLIDO 'AP_COCINERO',COM.NOMBRE 'NOM_COMIDA',COM.PRECIO 'PRECIO_COMIDA',P.PAGO_EXTRA 'EXTRA',F.TOTAL 'TOTAL' FROM COMIDAS COM,FACTURA F,CLIENTES U,COCINEROS C,PUESTOS P WHERE F.ID_CLIENTE=U.ID AND F.ID_COCINERO=C.ID AND F.ID_PUESTO = P.ID AND F.ID_COMIDA=COM.ID AND F.PAGADO = FALSE AND U.ID = 1 ORDER BY COM.NOMBRE ASC;
    $buscar=$cn->query("SELECT F.ID 'ID',U.NOMBRE 'NOM_CLIENTE',U.APELLIDO_P 'AP_CLIENTE',C.NOMBRE 'NOM_COCINERO',C.APELLIDO 'AP_COCINERO',COM.NOMBRE 'NOM_COMIDA',COM.PRECIO 'PRECIO_COMIDA',P.PAGO_EXTRA 'EXTRA',F.TOTAL 'TOTAL' FROM COMIDAS COM,FACTURA F,CLIENTES U,COCINEROS C,PUESTOS P WHERE F.ID_CLIENTE=U.ID AND F.ID_COCINERO=C.ID AND F.ID_PUESTO = P.ID AND F.ID_COMIDA=COM.ID AND F.PAGADO = FALSE AND U.ID = ".$ID_US." ORDER BY COM.NOMBRE ASC");
    $c=0;
    while($registro=$buscar->fetch_array()){
        $c++;
        $cadena.='"ID":"'.$registro['ID'].'","NOM_COCINERO":"'.$registro['NOM_COCINERO'].'","AP_COCINERO":"'.$registro['AP_COCINERO'].'","NOM_COMIDA":"'.$registro['NOM_COMIDA'].'","PRECIO_COMIDA":"$'.$registro['PRECIO_COMIDA'].'","PAGO_EXTRA":"$'.$registro['EXTRA'].'","TOTAL":"$'.$registro['TOTAL'].'"},{';
        $BUSCADOR=true;
    }
    if($BUSCADOR)
        $cadena.='"tam":'.$c.'}]';
    else
        $cadena=0;
    echo($cadena);
?>
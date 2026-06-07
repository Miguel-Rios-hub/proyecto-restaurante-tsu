<?php
  session_start();
  $ID_US=$_SESSION['id'];
  $ID_COMIDA=$_POST['ID_COMIDA'];
  $ID_COCINERO=$_POST['ID_COCINERO'];
  $busca=false;
  require("conexion.php");
  if(!($cn->connect_errno)) {
    $buscar1=$cn->query("SELECT ID_PUESTO,PAGO_EXTRA FROM COCINEROS,PUESTOS WHERE ID_PUESTO = PUESTOS.ID AND COCINEROS.ID = ".$ID_COCINERO);
    while($datos1 = $buscar1->fetch_array()){
      $ID_PUESTO=$datos1['ID_PUESTO'];
      $EXTRA=$datos1['PAGO_EXTRA'];
    }
    $buscar2=$cn->query("SELECT PRECIO FROM COMIDAS WHERE ID = ".$ID_COMIDA);
    while($datos2 = $buscar2->fetch_array()){
      $PRECIO=$datos2['PRECIO'];
    }
    $TOTAL=$PRECIO+$EXTRA;
    $buscar=$cn->query("INSERT INTO FACTURA VALUES(NULL,".$ID_US.",".$ID_COMIDA.",".$ID_COCINERO.",".$ID_PUESTO.",".$TOTAL.",FALSE)");
    if($buscar)
      $busca=true;
    if($busca)
      echo("FACTURA CREADA");
    else
      echo("ERROR CON LA FACTURA");
  }
?>
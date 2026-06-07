<?php
    $numeros=$_POST['numeros'];
    $arreglo_numeros = explode(",", $numeros);
    require("conexion.php");
    $pago=false;
    foreach ($arreglo_numeros as $numero) {
        $buscar=$cn->query("UPDATE FACTURA SET PAGADO = TRUE WHERE ID =".$numero);
        $pago=true;
    }
    if($pago)
        echo("Se pagó correctamente");
    else
        echo("Error en el pago");
?>
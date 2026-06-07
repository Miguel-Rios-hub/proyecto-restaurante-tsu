<?php
    session_start();
    $contra=$_POST['contraseña'];
    $conf_contraseña=$_POST['conf_contraseña'];
    if($contra==$conf_contraseña){
        $contra2 =str_replace(' ', '', $contra);
        if($contra2==""){
            $_SESSION['validContra']=3;
        }else{
            require("conexion.php");
            if(!($cn->connect_errno)) {
                $buscador=true;
                $buscar=$cn->query("SELECT CONTRASEÑA FROM CLIENTES WHERE CONTRASEÑA = '".$contra."' AND ID = ".$_SESSION['id']);
                while($registro=$buscar->fetch_array()){
                    $buscador=false;
                }
                if($buscador){
                    $insertar=$cn->query("UPDATE CLIENTES SET CONTRASEÑA = '".$contra."' WHERE ID = ".$_SESSION['id']);
                    if($insertar==1)
                        $_SESSION['validContra']=1;
                }else
                    $_SESSION['validContra']=4;
            }
        }
    }else
        $_SESSION['validContra']=2;
    header("Location: ../contraseña.html");
?>
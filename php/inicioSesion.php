<?php
    session_start();
    $correo=$_POST['correo'];
    $contra=$_POST['contraseña'];
    $D1=false;
    $D2=false;
    require("conexion.php");
    if(!($cn->connect_errno)) {
        $buscar=$cn->query("SELECT * FROM CLIENTES WHERE CORREO = '".$correo."'"); 
        if($buscar){
            while($registro=$buscar->fetch_array()){
                $D1=true;
                if($registro['CONTRASEÑA']==$contra){
                    $D2=true;
                    $nombre=$registro['NOMBRE'];
                    $ID=$registro['ID'];
                }
            }
            if($D1){
                if($D2){
                    $datos='"Correo":"'.$D1.'","Contraseña":"'.$D2.'"';
                    $_SESSION['id']=$ID;
                    $_SESSION['nombre']=$nombre;
                    $_SESSION['TIPO']=0;
                    $_SESSION['login']=true;

                    header("Location: ../principal.html");
                }else{
                    $_SESSION['validInicioSesion']=1;
                    header("Location: ../index.html");
                }
            }else{
                $_SESSION['validInicioSesion']=2;
                header("Location: ../index.html");
            }
        }
    }
?>
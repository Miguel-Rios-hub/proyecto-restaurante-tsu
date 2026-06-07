<?php
    /*Advertencia: archivo tiene SQL injection sin corregir*/
    session_start();
    $nombre=$_POST['nombre'];

    $apellido_p=$_POST['apellido_p'];
    $apellido_m=$_POST['apellido_m'];

    $telefono=$_POST['telefono'];

    $correo=$_POST['correo'];
    $correo_confirm=$_POST['correo_confirm'];
    
    $contra=$_POST['contraseña'];
    $contraseña_confirm=$_POST['contraseña_confirm'];

    if($correo==$correo_confirm){
        if($contra==$contraseña_confirm){
            $nombre2 =str_replace(' ', '', $nombre);
            $apellido_m =str_replace(' ', '', $apellido_m);
            $apellido_p =str_replace(' ', '', $apellido_p);
            $telefono2 =str_replace('+', '', $telefono);
            $contra2 =str_replace(' ', '', $contra);

            if($nombre2==""||$apellido_m==""||$apellido_p==""||$telefono2==""||$contra2==""){
                $_SESSION['validRegistroSesion']=1;
            }else{
                $verif=true;
                require("conexion.php");
                if(!($cn->connect_errno)) {
                    $buscar=$cn->query("SELECT * FROM CLIENTES WHERE CORREO = '".$correo."'"); 
                    if($buscar){
                        while($registro=$buscar->fetch_array()){
                            $verif=false;
                        }
                        if($verif){
                            $insertar=$cn->query("INSERT INTO CLIENTES VALUES(NULL,'".$nombre."','".$apellido_p."','".$apellido_m."','".$telefono."','".$correo."','".$contra."')"); 
                            if($insertar==1){          
                                $_SESSION['validRegistroSesion']=3;//se guarda correctamente    
                            }
                        }else{
                            $_SESSION['validRegistroSesion']=2;
                        }
                    }else
                        $_SESSION['validRegistroSesion']=1;
                }
            }
        }else
            $_SESSION['validRegistroSesion']=4;
    }else
        $_SESSION['validRegistroSesion']=5;
    header("Location: ../registro.html");
?>
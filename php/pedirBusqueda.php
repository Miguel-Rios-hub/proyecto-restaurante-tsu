<?php
    session_start();
    if($_SESSION['busqueda']!=0)
        echo$_SESSION['busqueda'];
    else if ($_SESSION['busqueda']!=-1)
        echo$_SESSION['busqueda'];
    else
        echo-1;
?>
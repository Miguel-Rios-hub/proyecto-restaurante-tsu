<?php
    session_start();
    echo($_SESSION['validContra']);
    $_SESSION['validContra']=0;
?>
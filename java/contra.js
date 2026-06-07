addEvent(window,'load',cargar, false);
function addEvent(ele,eve,fun,cap){
  	if(window.attachEvent)
	  	addAttachEvent('on'+eve,fun);
	else
        ele.addEventListener(eve,fun,cap);
}
function cargar(){
    cajas = document.getElementsByTagName("input");
    addEvent(cajas[0],'keypress',limita1,false);
    addEvent(cajas[1],'keypress',limita2,false);
    conexionServidor();
}
function limita1(){
    if((event.keyCode>=65 && event.keyCode<=90)||(event.keyCode>=97 && event.keyCode<=122)){
        if(cajas[0].value.length<=14)
            event.returnValue=true;
        else
            event.returnValue=false;
    }else
        event.returnValue=false;
}

function limita2(){
    if((event.keyCode>=65 && event.keyCode<=90)||(event.keyCode>=97 && event.keyCode<=122)){
        if(cajas[1].value.length<=14)
            event.returnValue=true;
        else
            event.returnValue=false;
    }else
        event.returnValue=false;
}


function conexionServidor(){
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaRespuesta;
    conexion.open("POST","php/validaCambio.php",true);
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    conexion.send();
}
function esperaRespuesta(){
    if(conexion.readyState == 4){
        dato=parseInt(conexion.responseText);
        switch (dato){
            case 1:
                Swal.fire({
                    title: 'Contraseña cambiada',
                    icon: 'success',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result.isConfirmed)
                        location.href="principal.html";
                });
            break;
            case 2:
                Swal.fire({
                    title: 'Las contraseñas no coinciden',
                    icon: 'error',
                    confirmButtonText: 'Confirmar'
                });
            break;
            case 3:
                Swal.fire({
                    title: 'Error la contraseña está en blanco',
                    icon: 'error',
                    confirmButtonText: 'Confirmar'
                });
            break;
            case 4:
                Swal.fire({
                    title: 'Esa contraseña ya esta en uso',
                    icon: 'error',
                    confirmButtonText: 'Confirmar'
                });
            break;
            default:
        }
    }
}
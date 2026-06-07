addEvent(window,'load',cargar, false);
function addEvent(ele,eve,fun,cap){
  if(window.attachEvent)
	  addAttachEvent('on'+eve,fun);
	else
    ele.addEventListener(eve,fun,cap);
}
function cargar(){
  cajas = document.getElementsByTagName("input");
  addEvent(cajas[1],'keypress',limita,false);
  conexionServidor();
}
function limita(){
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
  conexion.open("POST","php/validaInicio.php",true);
  conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  conexion.send();
}
function esperaRespuesta(){
  if(conexion.readyState == 4){
    dato=parseInt(conexion.responseText);
    switch (dato){
      case 1:
        Swal.fire({
          title: 'Contraseña incorrecta',
          icon: 'error',
          confirmButtonText: 'Confirmar'
        });
        break;
      case 2:
        Swal.fire({
          title: 'Correo no registrado',
          icon: 'error',
          confirmButtonText: 'Confirmar'
        });
        break;
      default:
    }
  }
}

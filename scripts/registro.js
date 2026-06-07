agregarEvento(window,'load',cargar,false);
function agregarEvento(ele,eve,fun,cap){
  if(window.attachEvent)
    addAttachEvent('on'+eve,fun);
  else
	  ele.addEventListener(eve,fun,cap)
}
function cargar(){

  inputs=document.getElementsByTagName('input');
  inputs[5].value="+";
  agregarEvento(inputs[5],'keypress',filtraNumeros,false);//Telefono
  agregarEvento(inputs[3],'keypress',filtraLetras1,false);//Contraseña
  agregarEvento(inputs[7],'keypress',filtraLetras2,false);//Confirma contraseña
  
  agregarEvento(inputs[0],'keypress',filtraLetrasNom,false);//Nombre
  agregarEvento(inputs[1],'keypress',filtraLetras,false);//Apellido materno
  agregarEvento(inputs[4],'keypress',filtraLetras,false);//Apellido paterno
  conexionServidor();
}
function filtraNumeros(){
  if(event.keyCode>=48 && event.keyCode<=57){
    if(inputs[5].value.length<=12)
      event.returnValue=true;
    else
      event.returnValue=false;
    if(inputs[5].value.length<1)
      inputs[5].value="+";//Si se vacia la caja le vuelve a añadir el simbolo
  }else
    event.returnValue=false;
}
function filtraLetras1(){
  if((event.keyCode>=65 && event.keyCode<=90)||(event.keyCode>=97 && event.keyCode<=122)){
    if(inputs[3].value.length<=14)//Limite 15 caracteres contraseña
      event.returnValue=true;
    else
      event.returnValue=false;
  }else
      event.returnValue=false;
}
function filtraLetras2(){
  if((event.keyCode>=65 && event.keyCode<=90)||(event.keyCode>=97 && event.keyCode<=122)){
    if(inputs[7].value.length<=14)//Limite 15 caracteres confirmar contraseña
      event.returnValue=true;
    else
      event.returnValue=false;
  }else
      event.returnValue=false;
}
function filtraLetrasNom(){
  if((event.keyCode>=65 && event.keyCode<=90)||(event.keyCode>=97 && event.keyCode<=122)){
      event.returnValue=true;
  }else{
    if(event.keyCode==32)//Exepcion de usar espacio por si tiene 2 nombres
      event.returnValue=true;
    else
      event.returnValue=false;
  }
}
function filtraLetras(){
  if((event.keyCode>=65 && event.keyCode<=90)||(event.keyCode>=97 && event.keyCode<=122)){
      event.returnValue=true;
  }else
      event.returnValue=false;
}
function conexionServidor(){
  conexion = xmlhttprequest();
  conexion.onreadystatechange = esperaRespuesta;
  conexion.open("POST","php/validaRegistro.php",true);
  conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  conexion.send();
}
function esperaRespuesta(){
  if(conexion.readyState == 4){
    dato=parseInt(conexion.responseText);
    switch (dato){
      case 1:
        Swal.fire({
          title: 'Error con los datos',
          icon: 'error',
          confirmButtonText: 'Confirmar'
        });
        break;
      case 2:
        Swal.fire({
          title: 'Ese correo se encuentra registrado',
          icon: 'error',
          confirmButtonText: 'Confirmar'
        });
        break;
      case 3:
        Swal.fire({
          title: 'Cuenta creada con exito',
          icon: 'success',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.isConfirmed)
            location.href="index.html";
        });
        break;
      case 4:
        Swal.fire({
          title: 'Las contraseñas no coinciden',
          icon: 'error',
          confirmButtonText: 'Confirmar'
        });
        break;
      case 5:
        Swal.fire({
          title: 'Los correos no coinciden',
          icon: 'error',
          confirmButtonText: 'Confirmar'
        });
        break;
      default:
    }
  }
}
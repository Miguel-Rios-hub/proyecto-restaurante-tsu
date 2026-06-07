function conexionLogin(){
  conexion = xmlhttprequest();
  conexion.onreadystatechange = esperaRespuestaLogin;
  conexion.open("POST","php/login.php",true);
  conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  conexion.send();
}
function esperaRespuestaLogin(){
  if(conexion.readyState == 4){
    if(conexion.responseText!=true)
      location.href="index.html";
    conexionUsuario();
  }
}
function conexionUsuario(){
  conexion = xmlhttprequest();
  conexion.onreadystatechange = esperaRespuestaNombre;
  conexion.open("POST","php/pedirNombre.php",true);
  conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  conexion.send();
}

function esperaRespuestaNombre(){
  if(conexion.readyState == 4){
    fragment=document.createDocumentFragment();
    let elm1=document.createElement('a');
    elm1.setAttribute('class','nav-link dropdown-toggle');
    elm1.setAttribute('id','menucategorias');
    elm1.setAttribute('role','button');
    elm1.setAttribute('data-bs-toggle','dropdown');
    elm1.setAttribute('aria-expanded','false');
    
    let iconoUsuario = document.createElement('i');
    iconoUsuario.setAttribute('class', 'fas fa-user');

    elm1.appendChild(iconoUsuario);
    elm1.insertAdjacentHTML('beforeend', ' ' + conexion.responseText);



    let elm2=document.createElement('ul');
    elm2.setAttribute('class','dropdown-menu');
    elm2.setAttribute('aria-labelledby','menucategorias');

    let elm3=document.createElement('div');
    elm3.setAttribute('class','dropdown-item');
    
    let elm4=document.createElement('a');
    elm4.setAttribute('class','nav-link');
    elm4.setAttribute('onclick','cambioContra()');
    elm4.textContent="Cambiar contraseña";

    let elm5=document.createElement('div');
    elm5.setAttribute('class','dropdown-item');

    let elm6=document.createElement('a');
    elm6.setAttribute('class','nav-link');
    elm6.setAttribute('onclick','cerrarSesion()');
    elm6.textContent="Cerrar Sesion";

    elm3.appendChild(elm4);
    elm5.appendChild(elm6);

    elm2.appendChild(elm3);
    elm2.appendChild(elm5);

    fragment.appendChild(elm1);
    fragment.appendChild(elm2);
    document.getElementById("Usuario_li").appendChild(fragment);
    creaCategorias();
  }
}
function cerrarSesion(){
  conexion = xmlhttprequest();
  conexion.onreadystatechange = mandaDestruido;
  conexion.open("POST","php/destructor.php",true);
  conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  conexion.send();
}
function mandaDestruido(){
  if(conexion.readyState == 4){
    location.href="index.html";
  }
}

function creaCategorias(){
  conexion = xmlhttprequest();
  conexion.onreadystatechange = esperaRespuestaCate;
  conexion.open("POST","php/cate.php",true);
  conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  conexion.send(); 
}
function esperaRespuestaCate(){
  if(conexion.readyState == 4){
    dato = eval(conexion.responseText);
    let fragment=document.createDocumentFragment();
    
    for(const tip in dato){
      let env=parseInt(tip);
      let div=document.createElement('div');
      div.setAttribute("class","dropdown-item");
      let a=document.createElement('a');
      a.setAttribute('class','nav-link');
      a.textContent=dato[tip]["tipo"];
      a.onclick = function() {
        enviarTipoPulsado((env+1));
      };

      div.appendChild(a);
      fragment.appendChild(div);
    }
    document.getElementById('ul_Categorias').appendChild(fragment);
    conexionCateg();
  }
}
function enviarTipoPulsado(i){
  conexion = xmlhttprequest();
  conexion.onreadystatechange = mandaCategoria;
  conexion.open("POST","php/pulsado.php",true);
  conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  conexion.send("pulsado="+i);
}
function mandaCategoria(){
  if(conexion.readyState == 4)
    location.href="categoria.html";
}

function cambioContra(){
  location.href="contraseña.html";
}
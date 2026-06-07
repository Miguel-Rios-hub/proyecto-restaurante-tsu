var comida_id=0,cocinero_id=0,largo;
function conexionCateg(){
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaRespCate;
    conexion.open("POST","php/pedirCategoria.php",true);
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    conexion.send();
}
function esperaRespCate(){
    if(conexion.readyState == 4){
        let fragment=document.createDocumentFragment();
        if(conexion.responseText!=0){
            dato = eval(conexion.responseText);
            largo=(dato.length-1);
            for(let i=0;i<largo;i++){
                let div1=document.createElement('div');
                div1.setAttribute("class","col-sm-6");

                let div2=document.createElement('div');
                div2.setAttribute("class","card");

                let div3=document.createElement('div');
                div3.setAttribute("class","card-body");
                div3.setAttribute("id","carta"+i);

                let img=document.createElement('img');
                img.setAttribute("src","fotos/"+dato[i]["NOMBRE"]+".jpg");
                img.setAttribute("class","card-img-top");
                img.setAttribute("alt","...");

                let h5=document.createElement('h5');
                h5.setAttribute("class","card-title");
                h5.textContent=dato[i]["NOMBRE"].replace(/_/g, ' ');

                let p1=document.createElement('p');
                p1.setAttribute("class","card-text");
                p1.textContent=dato[i]["TIPO"];

                let p2=document.createElement('p');
                p2.setAttribute("class","card-text");
                p2.textContent=dato[i]["PRECIO"];
            
                let p3=document.createElement('p');
                p3.setAttribute("class","card-text");
                p3.textContent=dato[i]["DISPONIBILIDAD"];

                let a=document.createElement('a');
                if(dato[i]["DISPONIBILIDAD"]=="DISPONIBLE"){
                    a.setAttribute("class","btn btn-primary");
                    a.setAttribute("onclick","enviarID("+dato[i]['ID']+")");
                    a.textContent="Agregar al carrito";
                }else{
                    a.setAttribute("class","btn btn-primary");
                    
                    a.textContent="NO DISPONBLE";
                }
                div3.appendChild(img);
                div3.appendChild(h5);
                div3.appendChild(p1);
                div3.appendChild(p2);
                div3.appendChild(p3);
            
                div3.appendChild(a);
            
            

                div2.appendChild(div3);
                div1.appendChild(div2);

                fragment.appendChild(div1);
            }
            document.getElementById('comidas').appendChild(fragment);
            LlamaSecction();
        }else{//Codigo de depuracion
            let h5=document.createElement('h5');
            h5.setAttribute("class","card-title");
            h5.textContent="ERROR ENTRASTE SIN SELECCIONAR UNA CATEGORIA";
            let h6=document.createElement('h5');
            h6.setAttribute("class","card-title");
            h6.textContent="Creditos:";
            let h7=document.createElement('h5');
            h7.setAttribute("class","card-title");
            h7.textContent="Miguel Angel Rios Correa (js, php, html y MySQL)";
            let h8=document.createElement('h5');
            h8.setAttribute("class","card-title");
            h8.textContent="Luis Manuel Jimenez Cruz (styles, Boostrap5 y html)";
            fragment.appendChild(h5);
            fragment.appendChild(h6);
            fragment.appendChild(h7);
            fragment.appendChild(h8);
            document.getElementById('comidas').appendChild(fragment);
        }
    }
}

function LlamaSecction(){
    conexion2 = xmlhttprequest();
    conexion2.onreadystatechange = creaSecction;
    conexion2.open("POST","php/seccionCocinero.php",true);
    conexion2.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    conexion2.send();    
}

function creaSecction(){
    if(conexion2.readyState == 4){
        let fragment2=document.createDocumentFragment();
        if(conexion2.responseText!=0){
            let x;
            for(let i=0;i<largo;i++){
                dato2 = eval(conexion2.responseText);
                largo2=(dato2.length-1);
                let elm1=document.createElement('a');
                elm1.setAttribute('class','nav-link dropdown-toggle');
                elm1.setAttribute('role','button');
                elm1.setAttribute('data-bs-toggle','dropdown');
                elm1.setAttribute('aria-expanded','false');
                elm1.setAttribute('id','menuchef'+i);
                elm1.textContent="Seleccionar cocinero";
                let elm2=document.createElement('ul');
                elm2.setAttribute('class','dropdown-menu');
                elm2.setAttribute('aria-labelledby','menuchef'+i);
                for(x=0;x<largo2;x++){
                    let elm3=document.createElement('div');
                    elm3.setAttribute('class','dropdown-item');
                    let elm4=document.createElement('a');
                    elm4.setAttribute('class','nav-link');
                    elm4.setAttribute('onclick','GuardarIDCocinero('+dato2[x]["ID"]+',"'+dato2[x]["NOMBRE"]+'")');
                    elm4.textContent=dato2[x]['NOMBRE']+"   "+dato2[x]['PAGO_EXTRA'];
                    elm3.appendChild(elm4);
                    elm2.appendChild(elm3);
                }
                fragment2.appendChild(elm1);
                fragment2.appendChild(elm2);
                document.getElementById('carta'+i).appendChild(fragment2);
            }
        }else{
            for(let i=0;i<largo;i++){
                let elm1=document.createElement('a');
                elm1.setAttribute('class','nav-link');
                elm1.setAttribute('role','button');
                elm1.setAttribute('aria-expanded','false');
                elm1.setAttribute('id','menuchef'+i);
                elm1.textContent="NO HAY COCINERO DISPONIBLE";
                fragment2.appendChild(elm1);
                document.getElementById('carta'+i).appendChild(fragment2);
            }
        }
    }
}
function enviarID(id) {
    comida_id = id;
    Swal.fire({
        title: '¿Estás seguro de que quieres añadir al carrito?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33'
    }).then((result) => {
        if (result.isConfirmed) {
            confirmarAccion();
        }
    });
}


function GuardarIDCocinero(id,nom){
    cocinero_id=id;
    Swal.fire({
        title: 'Se seleccionó al cocinero '+nom,
        icon: 'success',
        confirmButtonText: 'Confirmar'
    });
}

function confirmarAccion() {
    if (cocinero_id==0){
        Swal.fire({
            title: 'Favor de seleccionar un cocinero',
            icon: 'info',
            confirmButtonText: 'Confirmar'
        });
    }else{
        conexion = xmlhttprequest();
        conexion.open("POST","php/enviarCarrito.php",true);
        conexion.onreadystatechange = esperaEnvio;
        conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        conexion.send("ID_COMIDA="+comida_id+"&ID_COCINERO="+cocinero_id);
    }
}

function esperaEnvio(){
    if(conexion.readyState == 4){
        cocinero_id=0;
        Swal.fire({
            title: conexion.responseText,
            icon: 'success',
            confirmButtonText: 'Confirmar'
        });
    }
}
conexionLogin();
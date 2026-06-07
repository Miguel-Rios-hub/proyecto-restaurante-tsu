function conexionCateg(){
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaRespCate;
    conexion.open("POST","php/pedirBusqueda.php",true);
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

                a.setAttribute("class","btn btn-primary");
                a.setAttribute("data-bs-toggle","modal");
                a.setAttribute("data-bs-target","#confirmModal");
                a.setAttribute("onclick","enviarProducto('"+dato[i]['ID']+"')");
                a.textContent="VER PRODUCTO";

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
        }else{
            let h5=document.createElement('h5');
            h5.textContent="NO SE ENCONTRO NINGUNA COINCIDENCIA";
            fragment.appendChild(h5);
        }
        document.getElementById('buscando').appendChild(fragment);
    }
}
function enviarProducto(T){
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaEnvioProducto;
    conexion.open("POST","php/enviarTipo.php",true);
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    conexion.send("TIPO="+T);
}
function esperaEnvioProducto(){
    if(conexion.readyState == 4)
        location.href="categoria.html";
}
conexionLogin();
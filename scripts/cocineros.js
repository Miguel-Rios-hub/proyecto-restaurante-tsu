function conexionCateg(){
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaCocineros;
    conexion.open("POST","php/pedirCocineros.php",true);
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    conexion.send();
}
function esperaCocineros(){
    if(conexion.readyState == 4){
        dato = eval(conexion.responseText);
        largo=(dato.length-1);
        let fragment=document.createDocumentFragment();
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
            h5.textContent="NOMBRE: "+dato[i]["NOMBRE"]+"  "+dato[i]["APELLIDO"];

            let p1=document.createElement('p');
            p1.setAttribute("class","card-text");
            p1.textContent="EDAD:  "+dato[i]["EDAD"];

            let p2=document.createElement('p');
            p2.setAttribute("class","card-text");
            p2.textContent="PUESTO: "+dato[i]["PUESTO"];
            
            let p3=document.createElement('p');
            p3.setAttribute("class","card-text");
            p3.textContent="ESPECIALIDAD: "+dato[i]["ESPECIALIDAD"];

            let p4=document.createElement('p');
            p4.setAttribute("class","card-text");
            p4.textContent="COSTE EXTRA: "+dato[i]["PAGO_EXTRA"];
            

            div3.appendChild(img);
            div3.appendChild(h5);
            div3.appendChild(p1);
            div3.appendChild(p2);
            div3.appendChild(p3);
            div3.appendChild(p4);

            div2.appendChild(div3);
            div1.appendChild(div2);

            fragment.appendChild(div1);
        }
        document.getElementById('cocineros').appendChild(fragment);
    }
}
conexionLogin();
  
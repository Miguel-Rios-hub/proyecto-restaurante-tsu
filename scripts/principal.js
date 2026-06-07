function conexionCateg(){
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaRespRul;
    conexion.open("POST","php/pedirRuleta.php",true);
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    conexion.send();
}

function esperaRespRul(){
    if(conexion.readyState == 4){
        let fragment=document.createDocumentFragment();
        let fragment2=document.createDocumentFragment();
        dato = eval(conexion.responseText);
        largo=(dato.length);
        for(let i=0;i<largo;i++){
            let div=document.createElement('div');
            div.setAttribute("class","carousel-item");
            let img=document.createElement('img');
            img.setAttribute("class","d-block w-100");
            img.setAttribute("alt","...");
            img.setAttribute("src","fotos/"+dato[i]["NOMBRE"]+".jpg");
            div.appendChild(img);
            fragment.appendChild(div);

            let btn=document.createElement('button');
            btn.setAttribute("type","button");
            btn.setAttribute("data-bs-target","#carouselExampleIndicators");
            btn.setAttribute("data-bs-slide-to",i+1);
            btn.setAttribute("aria-label","Slide "+(i+1));
            fragment2.appendChild(btn);
        }
        document.getElementById('botonCarrusel').appendChild(fragment2);
        document.getElementById('carrusel').appendChild(fragment);
    }
}
conexionLogin();
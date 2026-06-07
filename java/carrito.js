let ids="";
function conexionCateg(){
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaCocineros;
    conexion.open("POST","php/pedirFacturas.php",true);
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    conexion.send();
}
function esperaCocineros(){
    if(conexion.readyState == 4){
        let fragment=document.createDocumentFragment();
        if(conexion.responseText!=0){
            dato = eval(conexion.responseText);
            largo=(dato.length-1);

            let cen=document.createElement('center');
            let h5_0=document.createElement('h5');
            h5_0.setAttribute("class","card-text");
            h5_0.textContent="Cuenta de:  "+dato[0]["NOMBRE"]+"   "+dato[0]["APELLIDO_P"];
            cen.appendChild(h5_0);
            fragment.appendChild(cen);

            for(let i=1;i<largo;i++){

                ids+=dato[i]["ID"]+',';
                
                let div1=document.createElement('div');
                div1.setAttribute("class","col-sm-6");

                let div2=document.createElement('div');
                div2.setAttribute("class","card");

                let div3=document.createElement('div');
                div3.setAttribute("class","card-body");

                let img=document.createElement('img');
                img.setAttribute("src","fotos/"+dato[i]["NOM_COMIDA"]+".jpg");
                img.setAttribute("class","card-img-top");
                img.setAttribute("alt","...");
            
                let h5=document.createElement('h5');
                h5.setAttribute("class","card-title");
                h5.textContent="Comida: "+dato[i]["NOM_COMIDA"].replace(/_/g, ' ');
                
                let p2=document.createElement('p');
                p2.setAttribute("class","card-text");
                p2.textContent="Cocinero: "+dato[i]["NOM_COCINERO"]+"   "+dato[i]["AP_COCINERO"];
            
                let p3=document.createElement('p');
                p3.setAttribute("class","card-text");
                p3.textContent="Coste de la comida: "+dato[i]["PRECIO_COMIDA"];

                let p4=document.createElement('p');
                p4.setAttribute("class","card-text");
                p4.textContent="COSTE EXTRA: "+dato[i]["PAGO_EXTRA"];
            
                let p5=document.createElement('p');
                p5.setAttribute("class","card-text");
                p5.textContent="COSTE TOTAL: "+dato[i]["TOTAL"];

                div3.appendChild(img);
                div3.appendChild(h5);
                div3.appendChild(p2);
                div3.appendChild(p3);
                div3.appendChild(p4);
                div3.appendChild(p5);

                div2.appendChild(div3);
                div1.appendChild(div2);

                fragment.appendChild(div1);
            }
            
            lar=ids.length;
            ids=ids.substring(0, lar-1);
            let a=document.createElement('a');
            a.setAttribute("class","btn btn-primary");
            a.setAttribute("data-bs-target","#confirmModal");
            a.setAttribute("onclick","PagarID('"+ids+"')");
            a.textContent="PAGAR";
            fragment.appendChild(a);
        }else{
            Swal.fire({
                title: "No tienes ningún pago pendiente",
                icon: 'info',
                confirmButtonText: "Confirmar"
            }).then((result) => {
                if (result.isConfirmed) {
                    location.href="principal.html";
                }
            });
        }
        document.getElementById('facturas').appendChild(fragment);
    }
}

function PagarID(num){
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaPago;
    conexion.open("POST","php/pagar.php",true);
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    conexion.send("numeros="+num);
}

function esperaPago(){
    if(conexion.readyState == 4){
        Swal.fire({
            title: conexion.responseText,
            icon: 'success',
            confirmButtonText: "Confirmar"
        }).then((result) => {
            if (result.isConfirmed) {
                location.href="principal.html";
            }
        });
    }
}
conexionLogin();
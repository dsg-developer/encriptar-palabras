var btnCopy = document.getElementById("copy");
var pantalla = document.getElementById("pantalla");
var btnOption = document.getElementById("encrip");
var txtAEncrip = document.getElementById("encriptador");
var notif = document.getElementById("notificacion");
var rEncrip = document.getElementById("encriptar");
var rDesencrip = document.getElementById("desencriptar");

const removeAccents = (str) => {
                                    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                                } 

//eventos del click-------------------------------------------------------
btnOption.addEventListener("click", function(e){
    let txt =  removeAccents(txtAEncrip.value);
    let correcto =  validarTexto(txt);
    if(rEncrip.checked){
        if(txtAEncrip.value != ""){
            if(correcto){
                let txtEncrip = encriptarVocales(txt);
                pantalla.innerHTML = txtEncrip;
            }else{
                alert("No se admiten Letras mayusculas, ni caracteres especiales.");
            }
        }
    }else if(rDesencrip.checked){
        if(txtAEncrip.value != ""){
            if(correcto){
                let txtDesencrip = desencriptarVocales(txt);
                pantalla.innerHTML = txtDesencrip;
                //console.log(txtDesencrip);
            }else{
                alert("No se admiten Letras mayusculas, ni caracteres especiales.");
            }
        }
    }else alert("Para realizar la acción debe seleccionar una de las opciones debajo del campo de texto.");
});

btnCopy.addEventListener("mousedown", function(e){
    var respuesta = copiarAlPortapapeles(pantalla);
    if(respuesta) notif.classList.add("animacion-entrada");
});

notif.addEventListener("click", function(e){
    notif.classList.add("animacion-salida");
    setTimeout(function(){
        notif.classList.remove("animacion-entrada");
        notif.classList.remove("animacion-salida");
    }, 3500);
});

//eliminar las clases de css en caso de que el usuario no de click en la notificacion.
setTimeout(function(){
    notif.classList.remove("animacion-entrada");
    notif.classList.remove("animacion-salida");
}, 21000);

//funciones------------------------------------------------------------------------------
function validarTexto(texto){
    let txt = texto;
    let respuesta = true;
    var letra;
    for(var x=0; x<txt.length; x++){
        letra = txt.charAt(x);
        if(letra == letra.toUpperCase() && letra != " ") respuesta = false;
    }
    return respuesta;
}

function encriptarVocales(texto){
    let nuevoText = "";
    for(var x=0; x<texto.length; x++){
        switch(texto.charAt(x)){
            case "a":
                nuevoText = nuevoText+"ai";
                break;
            case "e":
                nuevoText = nuevoText+"enter";
                break;
            case "i":
                nuevoText = nuevoText+"imes";
                break;
            case "o":
                nuevoText = nuevoText+"ober";
                break;
            case "u":
                nuevoText = nuevoText+"ufat";
                break;
            default:
                nuevoText = nuevoText+texto.charAt(x);
                break;
        }
    }
    return nuevoText;
}

function desencriptarVocales(texto){
    let nuevoText = "";
    console.log("vale");
    for(var x=0; x<texto.length;){
        if(texto.charAt(x) == "a" && texto.charAt(x+1) == "i"){
            nuevoText = nuevoText+"a";
            x+=2;
        } 
        else if(texto.charAt(x) == "e" && texto.charAt(x+1) == "n" && texto.charAt(x+2) == "t" && texto.charAt(x+3) == "e"
            && texto.charAt(x+4) == "r"){
                nuevoText = nuevoText+"e";
                x+=5;
            }
        else if(texto.charAt(x) == "i" && texto.charAt(x+1) == "m" && texto.charAt(x+2) == "e"
            && texto.charAt(x+3) == "s"){
            nuevoText = nuevoText+"i";
            x+=4;
        }
        else if(texto.charAt(x) == "o" && texto.charAt(x+1) == "b" && texto.charAt(x+2) == "e"
            && texto.charAt(x+3) == "r"){
            nuevoText = nuevoText+"o";
            x+=4;
        }
        else if(texto.charAt(x) == "u" && texto.charAt(x+1) == "f" && texto.charAt(x+2) == "a"
            && texto.charAt(x+3) == "t"){
            nuevoText = nuevoText+"u";
            x+=4;
        }
        else{
            nuevoText = nuevoText+texto.charAt(x);
            x++;
            console.log(nuevoText);
        } 
    }
    
    return nuevoText;
}

function copiarAlPortapapeles(elemento) {
    // Crea un campo de texto "oculto"
    var aux = document.createElement("input");
  
    // Asigna el contenido del elemento especificado al valor del campo
    aux.setAttribute("value", elemento.innerHTML);
  
    // Añade el campo a la página
    document.body.appendChild(aux);
  
    // Selecciona el contenido del campo
    aux.select();
  
    // Copia el texto seleccionado
    var ecec = document.execCommand("copy");
  
    // Elimina el campo de la página
    document.body.removeChild(aux);

    return ecec;
  }
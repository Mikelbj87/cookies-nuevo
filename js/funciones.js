
//este es el mensaje que aparece al principio informando de la politica de cookies
let mensajeCookies = "Utilizamos cookies propias persistentes por 5 dias " +
    " no somos el FBI pero si eres un desconfiado y las quieres quitar ." +
    "tambien lo puedes hacer mas tarde en tu navegador, ajustes>>configuracion>>privacidad y seguridad." +
    " Haz click en Cancel si no quieres que almacenemos cookies en tu equipo";
    //funcion de la libreria sweet alert que lanza mensajes a la pantalla
Swal.fire({
    title: 'Este sitio utiliza cookies',
    //esto es cada boton que aparece, el de cancelar y el de aceptar
    showDenyButton: true,
    showCancelButton: true,
    //Aqui es donde colocamos el texto, nosotros previamente lo tenemos escrito arriba
    text: mensajeCookies,
    //la imagen que dibuja
    imageUrl: 'imagenes/Monstruo galletas.jpg',
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: 'Cookies',
    //en este if dependiendo si el usuario aceptaa o cancela las cookies
}).then(function (result) {
    // en el caso de que las acepte
    if (result.isConfirmed) {
        Swal.fire('Cookies Aceptadas', '', 'success')
        //en el caso de que no las acepte, aparte de mostrarselo en un mensaje no podra
        //ver ni grabar cookies
    } else {
        Swal.fire('Cookies rechazadas ', '<a href="../documento cookies/documento.html">Politica de cookies</a>', 'info')
        bGrabar.removeEventListener("click", grabarCookie, false);
        bTabla.removeEventListener("click", generarTabla, false);
        ocultar.removeEventListener("click", ocultarTabla, false);
    }
})

//eventos para los botones de grabar, tabla cookies y ocultar tabla
bTabla.addEventListener("click", generarTabla, false);
bGrabar.addEventListener("click", grabarCookie, false);
ocultar.addEventListener("click", ocultarTabla, false);
//clave cookies es la posicion
let claveCookies = 0;
//registros es el array de las cookies
let registros;

//funcion para grabar una cookie, rellenamos los campos y en caso de grabarse correctamente mandara un 
//mensaje por pantalla//////////////////////////////////////////////////////////////////////////////////////////////
function grabarCookie() {
    //creamos nuevo objeto de tipo date
    let fechaCaducidad = new Date();
    //añadimos 5 dias a la fecha de hoy
    dias = 10 - fechaCaducidad.getDay();
    //modificamos la variable donde introducimos la fecha de hoy y le añadimos 5 dias para fecha de caducidad
    fechaCaducidad.setDate(fechaCaducidad.getDate() + dias);
    //volvemos a crear otra fecha de hoy para la clave de las cookies
    let claveCookies = new Date().getTime();
    //concatenamos en galleta la fecha de hoy para la clave, con los campos rellenados por el usuario más la fecha de caducidad 
    let galleta = claveCookies + "=" + Tarea.value + ", " + TiempoProgramado.value + ", " + TiempoEmpleado.value + 
    ", " + Descripcion.value + ";expires=" + fechaCaducidad;
    //grabamos la galleta como cookie con document.cookie
    document.cookie = galleta;
    //mandamos un mensaje informando de que la cookie se a grabado con exito
    Swal.fire({
        title: 'cookie grabada con exito',
        imageUrl: 'imagenes/ok.png',
        imageWidth: 200,
        imageHeight: 200,
    })
    //borramos los campos despues de crear cada cookie
    borrarCampos();
}

//funcion borrar campos para que despues de crear cada cookie dejen los campos despejados
function borrarCampos() {
    Tarea.value = "";
    TiempoProgramado.value = "";
    TiempoEmpleado.value = "";
    Descripcion.value = "";
}

//funcion para borrar cookies, ala que pasamos una clave de cookie
function borrarCookie(claveCookies) {
    //creamos una nueva fecha para modificar la ya existen y sustituir su fecha de caducidad por una fecha ya caducada
    let fborrar = new Date();
    //la fecha de ayer
    fborrar.setDate(fborrar.getDate() - 1);
    //y se la concatenamos a la galleta 
    galleta = claveCookies + "=;expires=" + fborrar;
    //guardamos la galleta caducade para que el navegador la borre
    document.cookie = galleta;
    //lanzamos un mensaje informando de que la cookie se borró con exito
    Swal.fire({
        title: 'cookie borrada con exito',
        imageUrl: 'imagenes/borrar.png',
        imageWidth: 200,
        imageHeight: 200,
    })
    //volvemos a generar la tabla para que se generere ya sin la cookie borrada
    generarTabla();
}
//funcion para generar una tabla con las cookies que ya tenemos, en caso de no tenerlas
function generarTabla() {
    //si no ponemos esta linea se creara una tabla nueva cada vez que le demos a tabla
    cuerpo.innerHTML = '';
    //en datos guardamos las cookies
    let datos = document.cookie;
    //en cookies separamos cada cookie por ;
    cookies = datos.split(";");
    //guardamos en la variable tabla el elemento de html table
    let tabla = document.createElement('table');
    //si hay cookies guaardadas se mostrara la tabla
    if (datos.length > 0) { 
        //empezamos a crear la parte de la cabecera de la tabla
        //a cuerpo que es el div que tenemos en html para generar la tabla le damos la variable tabla con table
        //para que la genere
        cuerpo.appendChild(tabla);
        //hacemos lo mismo con la parte de la cabecera creamos el thead en la variable thead
        let thead = document.createElement('thead');
        //y se lo pasamos a la tabla para que lo genere
        tabla.appendChild(thead);
        //hacemos lo mismo con el tr donnde van los titulos de los encabezados
        let trEncabezado = document.createElement('tr');
        //y s elo pasamos al thead para que genere el tr, por que es su hijo
        thead.appendChild(trEncabezado);
        //en thColumna, creamos el elemento th
        let thColumna = document.createElement('th');
        //y creamos dentro del th el texto indice
        thColumna.innerText = 'indice';
        //le pasaamos a trEncabezado su hijo tr con el titulo escrito dentro de el
        trEncabezado.appendChild(thColumna)
        //ahora repetimos el mismo metodo con el resto de elementos del titulo
        thColumna = document.createElement('th')
        thColumna.innerText = 'clave'
        trEncabezado.appendChild(thColumna)
        thColumna = document.createElement('th')
        thColumna.innerText = 'Tarea'
        trEncabezado.appendChild(thColumna)
        thColumna = document.createElement('th')
        thColumna.innerText = 'Tiempo\nProgramado'
        trEncabezado.appendChild(thColumna)
        thColumna = document.createElement('th')
        thColumna.innerText = 'Tiempo\nEmpleado'
        trEncabezado.appendChild(thColumna)
        thColumna = document.createElement('th')
        thColumna.innerText = 'Descripcion'
        trEncabezado.appendChild(thColumna)

        //pero si no hay cookies se generara un mensaje informando de ello mediante la funcion swal.fire
    } else {
        Swal.fire({
            title: 'No se ha podido generar la tabla por que no hay cookies todavia',
            imageUrl: 'imagenes/cancelar.webp',
            imageWidth: 200,
            imageHeight: 200,
        })
    }
    //ahora creamos tbody (el cuerpo de la tabla) y se la pasamos a tabla (table) para que empieze a generar
    //las cookies que hay en la tabla
    let tbody = document.createElement('tbody')
    tabla.appendChild(tbody)

    //Recorre todas las cookies.
    for (i = 0; i < cookies.length; i++) {
        //separamos las cookies individualmente
        cookie = cookies[i];
        //separamos la clave de cada cookie
        clave = cookie.split("=")[0];
        //separamos el resto de campos de la clave
        campos = cookie.split("=")[1].split(",");
        //incrementamos la posicion para que escriba en la siguiente linea y no nos sobreescriba la linea en la tabla
        posc = i + 1;
        //Creamos el elemento fila 
        let fila = document.createElement('tr')
        //generamos una fila en el tbody
        tbody.appendChild(fila)
        //creamos el elemento celda con td
        let celda = document.createElement('td')
        //a la celda le damos un indice
        celda.innerText = posc
        //y agregamos a la fila la celda con el indice
        fila.appendChild(celda)
        //de nuevo volvemos a crear una elemento celda
        celda = document.createElement('td')
        //ahora vamos a crear el elemento button, para crear el boton para borrar cada cookie, que sera de tipo button
        let iBorrar = document.createElement('input')
        iBorrar.type = 'button'
        //aqui le damos nombre a la clase para los estilos
        iBorrar.className = 'botonborrar'
        //le pasamos la clave de la cookie al id del boton borrar
        iBorrar.id = clave
        //en el boton pondra borrar
        iBorrar.value = 'BORRAR'
        //creamos el evento para pulsar el boton de borrar de la tabla, y dentro llamamos a la funcion cookie
        //que necesita que le pasemos la clave de la cookie a borrar
        iBorrar.addEventListener('click', () => borrarCookie(iBorrar.id), false);
        //finalmente le pasamos el boton a la celda para que lo genere
        celda.appendChild(iBorrar)
        //y le pasmos la celda a la fila para que la genere
        fila.appendChild(celda)
        //creamos otra celda
        celda = document.createElement('td')
        //le pasamos el primer campo de la cookie
        celda.innerText = campos[0]
        //y generamos la celda con el primer campo
        fila.appendChild(celda)
        //ahora, de la misma manera generamos el resto de celdas con el resto de campos
        celda = document.createElement('td')
        celda.innerText = campos[1]
        fila.appendChild(celda)
        celda = document.createElement('td') 
        celda.innerText = campos[2]
        fila.appendChild(celda)
        celda = document.createElement('td') 
        celda.innerText = campos[3]
        fila.appendChild(celda)
    }
}

//funcion para que se oculte la tabla
function ocultarTabla() {
    cuerpo.innerHTML = '';
}
iBorrar.addEventListener('onmouseover', hover(), false);
function hover(){
    alert("sdfasdfasdfasdfdsfds")
    button.innerHTML = "X";
}








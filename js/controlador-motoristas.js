


function generarOrdenesDisponibles(){
    axios({
        url : "http://localhost:3000/usuarios/pedidos",
        method : "get",
        ResponseType : "json"
    }).then( res =>{
        let x = res.data;
        document.getElementById('ordenesDisponibles').innerHTML = "";
        for(let i = 0; i < x.length; i++){
        for(let j = 0 ; j < x[i].pedidos.length; j++){
            if(x[i].pedidos[j].Estado == "Pendiente"){
                document.getElementById('ordenesDisponibles').innerHTML += 
                `<div class="contenedor-motorista" onclick="mostrarAsignacion(${i},${j})">
                <p class="fuente-motoristas">Orden # ${x[i].pedidos[j].numeroPedido} </p>
                </div>`
            }
        }
    }

    }).catch( err =>{
        console.log(err)
    })
}

generarOrdenesDisponibles();


function mostrarAsignacion(indiceDelUsuario , indiceDelPedido) {
    document.getElementById('contenedor-asignacion').style.display = "block";
    document.getElementById('contenedorOrdenes').style.display = "none";

    axios({
        url : "http://localhost:3000/usuarios",
        method : "get",
        ResponseType : "json"
    }).then( res => {
        var usuario = res.data[indiceDelUsuario];
        var pedido = res.data[indiceDelUsuario].pedidos[indiceDelPedido];
        console.log(usuario);
        console.log(pedido);

        //Generando numero de orden
        document.getElementById('numeroOrden').innerHTML = `<i class="fa-solid fa-arrow-left" style="color: #00234A;"  onclick="quitarAsignacion()"></i>
        <p class="texto-botones-herramientas" style="margin-left: 10px;">Orden - #${pedido.numeroPedido}</p>`

        //Generando Informacion del Usuario
        document.getElementById('informacion').innerHTML =`
        <p class="textoRecibo">correo: ${usuario.correo}</p>
        <p class="textoRecibo">recibe: ${usuario.nombre}</p>
        <p class="textoRecibo">lugar de entrga:</p>
        <p class="textoRecibo">latitud:${usuario.latitud}</p>
        <p class="textoRecibo">longitud:${usuario.longitud}</p>
        <br>
        ` 

        //Generando Informacion del Pedido
        document.getElementById('productos').innerHTML =''
        for (let i = 0; i < pedido.productos.length; i++) {
            document.getElementById('productos').innerHTML += `
            <p class="textoRecibo">${pedido.productos[i].nombreProducto}</p>
            <div class="texto-beetwen">
                <p class="textoRecibo">cantidad: ${pedido.productos[i].cantidad}</p>
                <p class="textoRecibo">$${pedido.productos[i].precio}</p>
            </div>
            <br>
            `
            
        }

        //Generando total
        document.getElementById('recibos').innerHTML = `
        <p class="textoRecibo"> ISV: ${pedido.ISV}</p>
        <div class="texto-beetwen">
        <p class="textoRecibo">Total:</p>
        <p class="textoRecibo">${pedido.precioTotal}</p>`

        //boton
        document.getElementById('botonSelect').innerHTML = `
        <div class="textoCentrar primero">
        <div class="botonAsignar">
        <p  style="font-size: 15px;" class="texto-botones-herramientas blanco" onclick="seleccionarMotorista(${indiceDelUsuario},${indiceDelPedido})">Seleccionar motorista</p>
        </div>
        </div>`



    }).catch( err => {
        console.log(err)
    } )


}

function seleccionarMotorista(indiceDelUsuario , indiceDelPedido) {
    axios({
        url : "http://localhost:3000/usuarios",
        method : "get",
        ResponseType : "json"
    }).then( res => {
        var pedido = res.data[indiceDelUsuario].pedidos[indiceDelPedido];
        sessionStorage.setItem("pedido", JSON.stringify(pedido));
        window.location.href = "../html/seleccionarMotoristas.html";
    }).catch( err => {
        console.log(err)
    })

}

function mostrarAsignacionHecha() {
    document.getElementById('contenedor-asignado').style.display = "block";
    
}

function mostrardatosM() {
    document.getElementById('datos').style.display = "block";
}


function quitarAsignacion() {
    document.getElementById('contenedor-asignacion').style.display = "none";
    document.getElementById('contenedorOrdenes').style.display = "block";

}

function back() {
    document.getElementById('datos').style.display = "none";
}

function mostrarPaginaPrincipal(){
    window.location.href = "../html/webAdministrativa.html"
}




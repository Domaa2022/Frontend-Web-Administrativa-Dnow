var pedidoSolicitado = JSON.parse(sessionStorage.getItem("pedido"));
console.log(pedidoSolicitado)


function generarMotoristas(){

    axios({
        url : "http://localhost:3000/motoristas",
        method : "get",
        ResponseType : "json"
    }).then( res => {
        x= res.data;
        console.log(x);
        for(let i = 0; i < x.length; i++){
            document.getElementById('motoristas').innerHTML += `
            <div class="contenedor-motorista"onclick="mostrarAsignacion(${i})">
                <p class="fuente-motoristas" >${x[i].nombreMotorista}</p>
            </div>`
        }
    })
    .catch( err => {
        console.log(err)
    })


}

generarMotoristas();

function mostrarAsignacion(indiceMotorista){

    axios({
        url : "http://localhost:3000/motoristas",
        method : "get",
        ResponseType : "json"
    }).then( res => {
        var x = res.data[indiceMotorista];

        //obteniendo latitud y logitud de la orden
        axios({
            url : "http://localhost:3000/usuarios",
            method : "get",
            ResponseType : "json"
        }).then( res => {

            for(let i = 0 ; i < res.data.length; i++){
                if(res.data[i].nombre == x.ordenesPendientes[0].recibe){
                    sessionStorage.setItem("latitud", res.data[i].latitud);
                    sessionStorage.setItem("longitud", res.data[i].longitud);
                }
            }

            

        })
        .catch( err => {
            console.log(err)
        })

        var latitud = sessionStorage.getItem("latitud");
        var longitud = sessionStorage.getItem("longitud");



        if(x.estado == "ocupado"){
            document.getElementById('contenedor-asignado').style.display = "block";

            document.getElementById('textoTitulo').innerHTML = 
            `<i class="fa-solid fa-arrow-left" style="color: #00234A;"  onclick="quitarAsignacion()"></i>
            <p class="texto-botones-herramientas" style="margin-left: 10px;">${x.nombreMotorista} - Orden #${x.ordenesPendientes[0].numeroPedido}</p> 
            <img  style="height:70 px; width: 70px; margin-left: 20px; margin-top: 10px;" src="../img/campanita.png" alt="" srcset="">
            <div> 
            <p class="texto-botones-herramientas" style="margin-left: 10px;">Realizando Orden</p>   
            </div>
            `
            

            document.getElementById('informacionMotoristaOcupado').innerHTML = 
            ` <p class="textoRecibo">correo: ${x.ordenesPendientes[0].correo}</p>
            <p class="textoRecibo">recibe: ${x.ordenesPendientes[0].recibe}</p>
            <p class="textoRecibo">lugar de entrga: Coruscant</p>
            <p class="textoRecibo">latitud: ${latitud}</p>
            <p class="textoRecibo">longitud: ${longitud}</p>
            <br>`

            for(let i = 0 ; i < x.ordenesPendientes[0].productos.length; i++){
                document.getElementById('productosMotoristaOcupado').innerHTML += `
                <p class="textoRecibo">${x.ordenesPendientes[0].productos[i].nombreProducto}</p>
                <div class="texto-beetwen">
                    <p class="textoRecibo">cantidad: ${x.ordenesPendientes[0].productos[i].cantidad}</p>
                    <p class="textoRecibo">$ ${x.ordenesPendientes[0].productos[i].precio}</p>
                </div>                    
                <br>
                `  
            }

            document.getElementById('reciboMotoristaOcupado').innerHTML = `
            <div class="texto-beetwen">
                        <p class="textoRecibo">ISV:</p>
                        <p class="textoRecibo">$${x.ordenesPendientes[0].ISV}</</p>
            </div>
                    <div class="texto-beetwen">
                        <p class="textoRecibo">Total:</p>
                        <p class="textoRecibo">$${x.ordenesPendientes[0].total}</</p>
            </div>`

        }else{
            document.getElementById('contenedor-asignacion').style.display = "block"
            document.getElementById('ordenTituloDisponible').innerHTML =`
            <i class="fa-solid fa-arrow-left" style="color: #00234A;"  onclick="quitarAsignacion()"></i>
            <p class="texto-botones-herramientas" style="margin-left: 10px;"> Orden #${pedidoSolicitado.numeroPedido}</p> `

            document.getElementById('informacionMotoristaDisponible').innerHTML = 
            ` <p class="textoRecibo">correo: ${pedidoSolicitado.correo}</p>
            <p class="textoRecibo">recibe: ${pedidoSolicitado.Recibe}</p>
            <p class="textoRecibo">lugar de entrga: Coruscant</p>
            <p class="textoRecibo">latitud: ${latitud}</p>
            <p class="textoRecibo">longitud: ${longitud}</p>
            <br>`

            for(let i = 0 ; i < pedidoSolicitado.productos.length; i++){
                document.getElementById('productosMotoristaDisponible').innerHTML += `
                <p class="textoRecibo">${pedidoSolicitado.productos[i].nombreProducto}</p>
                <div class="texto-beetwen">
                    <p class="textoRecibo">cantidad: ${pedidoSolicitado.productos[i].cantidad}</p>
                    <p class="textoRecibo">$ ${pedidoSolicitado.productos[i].precio}</p>
                </div>                    
                <br>
                `  
            }

            document.getElementById('reciboMotoristaDisponible').innerHTML = `
            <div class="texto-beetwen">
                        <p class="textoRecibo">ISV:</p>
                        <p class="textoRecibo">$${pedidoSolicitado.ISV}</</p>
            </div>
                    <div class="texto-beetwen">
                        <p class="textoRecibo">Total:</p>
                        <p class="textoRecibo">$${pedidoSolicitado.precioTotal}</</p>
            </div>`

            document.getElementById('botonAsignar').innerHTML = `
            <div class="textoCentrar primero">
                        <div class="botonAsignar" onclick >
                        <p class="texto-botones-herramientas blanco" onclick = "ordenAsignar(${indiceMotorista})">Asignar</p>
                        </div>
                    </div>`
    

        }

    }).catch( err => {
        console.log(err)
    })
}

function ordenAsignar(indiceMotorista){
    axios({
        url : 'http://localhost:3000/motoristas',
        method: 'get',
        ResponseType : 'json' 
    }).then( res => {
        let x = res.data[indiceMotorista]
        var disponible = "ocupado"
        var motoristaEntrega = {
            recibe : x.nombreMotorista,
            correo : x.correo,
            correoMotorista: x.correo,
            numeroPedido : pedidoSolicitado.numeroPedido,
            usuario : pedidoSolicitado.usuario,
            productos: pedidoSolicitado.productos,
            isv: pedidoSolicitado.ISV,
            total: pedidoSolicitado.precioTotal,
        }
        axios ( {
            url :'http://localhost:3000/motoristas/' + x._id + '/' + disponible ,
            method : 'put',
            responseType : 'json',
            data : motoristaEntrega

        }).then( res => {
            console.log(res.data)
            alert("Orden asignada")
        }).catch( err => {
            console.log(err)
        })
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
    document.getElementById('contenedor-asignado').style.display = "none";

}

function back() {
    document.getElementById('datos').style.display = "none";
}



function mostrarPaginaPrincipal(){
    window.location.href = "../html/webAdministrativa.html"
}
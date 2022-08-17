
function generarMotoristas(){
axios({
    url : "http://localhost:3000/motoristas",
    method : "get",
    ResponseType : "json"
}).then( res => {
    var x = res.data
    document.getElementById('motoristasContenedor').innerHTML = ''
    for( let i =0 ; i < x.length; i++){

        if(x[i].estado == "pendiente"){
        }else{
            document.getElementById('motoristasContenedor').innerHTML += `
            <div class="contenedor-motorista">
            <p class="fuente-motoristas">${x[i].nombreMotorista}</p>
            </div> 
            `

        }

    }
}).catch( err => {
    console.log(err)
})}

generarMotoristas();


function verSolicitudes(){
    document.getElementById('principal-motoristas').style.display = 'none';
    document.getElementById('Solicitudes').style.display = 'block';

    axios({
        url : "http://localhost:3000/motoristas",
        method : "get",
        ResponseType : "json"

    }).then( res => {
        var x = res.data 
        for(let i = 0 ; i < x.length; i++){
            if(x[i].estado == "pendiente"){
                document.getElementById('empresaTablaSolicitud').innerHTML += `
                <div class="fila ">
                            <div class="col">
                                <p>${1+i}</p>
                            </div>
                            
                            <div class="col">
                                <p>${x[i].nombreMotorista}</p>
                            </div>
        
                            
                            <div class="col">
                                <p>${x[i].matricula}</p>
                            </div>
        
                            <div class="col">
                            <img src="../img/aceptar.png" alt=""  onclick="aceptarSolicitud('${x[i]._id}')" srcset="">
                            <img src="../img/Borrar.png" alt=""  onclick="denegarSolicitud('${x[i]._id}')" srcset=""  >
                        
                        </div>`
            }
        }
    }).catch( err => {
        console.log(err)
    })
}

function aceptarSolicitud(indiceMotorista){
    axios({
        url : 'http://localhost:3000/motoristas/' + indiceMotorista + '/solicitud/' , 
        method : "post",
        ResponseType : "json",
    }).then( res => {
        console.log(res.data)
        alert("Solicitud aceptada")
    }).catch( err => {
        console.log(err)
    })
}

function denegarSolicitud(indiceMotorista){
    axios({
        url : 'http://localhost:3000/motoristas/' + indiceMotorista , 
        method : "delete",
        ResponseType : "json",
    }).then( res => {
        console.log(res.data)
        alert("Solicitud denegada")
        
    }).catch( err => {
        console.log(err)
    })
}

function EditarMotoristas() {
    document.getElementById('principal-motoristas').style.display = 'none';
    document.getElementById('Solicitudes').style.display = 'none';
    document.getElementById('EditarMotoristas').style.display = 'block';

    axios({
        url : "http://localhost:3000/motoristas",
        method : "get",
        ResponseType : "json"

    }).then( res => {
        var x = res.data 
        for(let i = 0 ; i < x.length; i++){
            if(x[i].estado != "pendiente"){
                document.getElementById('empresaTablaEditar').innerHTML += `
                <div class="fila ">
                            <div class="col">
                                <p>${1+i}</p>
                            </div>
                            
                            <div class="col">
                                <p>${x[i].nombreMotorista}</p>
                            </div>
        
                            
                            <div class="col">
                                <p>${x[i].matricula}</p>
                            </div>
        
                            <div class="col">
                            <img src="../img/Borrar.png" alt=""  onclick="denegarSolicitud('${x[i]._id}')" srcset=""  >
                        
                        </div>`
            }
        }
    }).catch( err => {
        console.log(err)
    })

}

function mostrarMotoristasPrincipal(){
    document.getElementById('principal-motoristas').style.display = 'block';
    document.getElementById('Solicitudes').style.display = 'none';
    document.getElementById('EditarMotoristas').style.display = 'none';
}

function mostrarPaginaPrincipal(){
    window.location.href = "../html/webAdministrativa.html"
}
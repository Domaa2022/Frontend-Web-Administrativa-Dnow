
function mostrarAsignacion() {
    document.getElementById('contenedor-asignacion').style.display = "block";
}

function quitarAsignacion() {
    document.getElementById('contenedor-asignacion').style.display = "none";
    document.getElementById('contenedor-asignacion-ocupado').style.display = "none";
}

function mostrarAsignacionOcupado(){
    document.getElementById('contenedor-asignacion-ocupado').style.display = "block";
}

idMotorista = JSON.parse(sessionStorage.getItem('idMotorista'))

function llenarLista(){

    axios({
        url : 'http://localhost:3000/motoristas/' + idMotorista._id,
        method : 'GET',
        ResponseType : 'json'
    })
    .then(res =>{
        let x = res.data
        document.getElementById('motoristasTabla').innerHTML = ''
        for (let i = 0; i < x.motoristas.length; i++) {
            document.getElementById('motoristasTabla').innerHTML += `
            <div class="filaM">
                        <div class="col">
                            <p>${i+1}</p>
                        </div>
                        
                        <div class="col">
                            <p>${x.motoristas[i].nombreMotorista}</p>
                        </div>

                        
                    <div class="col">
                        <img src="../img/Borrar.png" alt="" srcset="" onclick = eliminar(${i})>
                    
                    </div>

            `
        }

    })
    .catch(err =>{
        console.log(err);
    })
    
}

llenarLista();

function asignarMotoristaOrden() {

    axios ( {
        url :'http://localhost:3000/motoristas',
        method : 'get',
        responseType : 'json'
    } ).then( res => {

        let x = res.data;
        console.log(res.data)
        document.getElementById('ordenesDisponibles').innerHTML = '';

        for ( let i = 0 ; i < x.length ; i++ ) {
            
            for(let j = 0 ; j < x[i].motoristas.length ; j++){
           
             x[i].motoristas[j].estado == 'Ocupado'
                         
            }
        }   

    }).catch( err => {
        console.log(err);
    })

    document.getElementById('cbz').innerHTML += `  
     <img src="../img/campanita.png" id="editar" alt="" srcset="">
    `

    document.getElementById('pz').style.display = "none";
    
}

function admitirMotorista() {

    axios ( {
        url :'http://localhost:3000/motoristas',
        method : 'get',
        responseType : 'json'
    } ).then( res => {

        let x = res.data;
        console.log(res.data)
        document.getElementById('ordenesDisponibles').innerHTML = '';

        for ( let i = 0 ; i < x.length ; i++ ) {
            
            for(let j = 0 ; j < x[i].motoristas.length ; j++){
                
            
                  x[i].motoristas[j].estado == 'Disponible'
                     
                    
                
            }
        }   

    }).catch( err => {
        console.log(err);
    })
}








function mostrarAsignacion() {
    document.getElementById('contenedor-asignacion').style.display = "block";
}

function quitarAsignacion() {
    document.getElementById('contenedor-asignacion').style.display = "none";
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




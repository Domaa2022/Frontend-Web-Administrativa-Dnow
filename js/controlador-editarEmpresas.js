var categoria = JSON.parse(sessionStorage.getItem('idCategoria'))
function llenarTabla(){
    axios({
        url : 'http://localhost:3000/categorias/' + categoria._id,
        method : 'GET',
        ResponseType : 'json'
    }).then(res =>{
        let x = res.data
        document.getElementById('empresaTabla').innerHTML = ''
        for (let i = 0; i < x.empresas.length; i++) {
        document.getElementById('empresaTabla').innerHTML += `
        <div class="fila ">
                        <div class="col">
                            <p>${i+1}</p>
                        </div>
                        <div class="col"><img src="${x.empresas[i].logo}" alt=""></div>
    
                        
                        <div class="col">
                            <p>${x.empresas[i].nombreEmpresa}</p>
                        </div>
    
                    <div class="col">
                        <img src="../img/editar.png" alt="" onclick= "moverEditar(${i})" srcset="">
                        <img src="../img/Borrar.png" alt="" srcset="" onclick = eliminarCategoria(${i})>
                    
                    </div>
        `
            
        }
    }).catch(err =>{
        console.log(err);
    })
    
}
llenarTabla();

function moverEditar(indiceEmpresa){
    document.getElementById('editarPrincipal').style.display = 'none';
    document.getElementById('editarEmpresa').style.display = 'block';
    axios({
        url : 'http://localhost:3000/categorias/' + categoria._id,
        method : 'GET',
        ResponseType : 'json'
    }).then(res =>{
        var x = res.data.empresas[indiceEmpresa].nombreEmpresa;
        const form = document.querySelector('#form-editEmpresa');
        // Evento submit del formulario
        form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        axios({
            method: 'put',
            url: 'http://localhost:3000/categorias/' + categoria._id +'/'+ x,
            data: formData,
            ResponseType: 'json'
        }).then(res => {
            console.log(res.data)
            alert('Empresa editada correctamente');
        }
        ).catch(err => {
            console.log(err)
        }
        )
        })

    })
    
    
}

function eliminarCategoria(indiceEmpresa){
    axios({
        url : 'http://localhost:3000/categorias/' + categoria._id +'/'+ indiceEmpresa,
        method : 'delete',
        ResponseType : 'json'
    }).then(res =>{
        console.log(res.data)
        alert('Empresa eliminada correctamente');
        llenarTabla();
    }).catch(err =>{
        console.log(err);
    }
    )
}

function mostrarEditarPrincipal(){
    document.getElementById('editarPrincipal').style.display = 'block';
    document.getElementById('editarEmpresa').style.display = 'none';
    llenarTabla()
}

function mostrarPaginaPrincipal(){
    window.location.href = '../html/administrarEmpresa.html'
}
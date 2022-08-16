idCategoria = JSON.parse(sessionStorage.getItem('idCategoria'))
indiceEmpresa = JSON.parse(sessionStorage.getItem('id'))



function llenarTabla(){

    axios({
        url : 'http://localhost:3000/categorias/' + idCategoria._id + '/' + indiceEmpresa,
        method : 'GET',
        ResponseType : 'json'
    })
    .then(res =>{
        let x = res.data
        document.getElementById('productoTabla').innerHTML = ''
        for (let i = 0; i < x.productos.length; i++) {
            document.getElementById('productoTabla').innerHTML += `
            <div class="fila cabezal blanco">
                        <div class="col">
                            <p>${i+1}</p>
                        </div>
                        <div class="col"><img src="${x.productos[i].imagen}" alt=""></div>
    
                        
                        <div class="col">
                            <p>${x.productos[i].nombreProducto}</p>
                        </div>

                        <div class="col">
                            <p>$ ${x.productos[i].precio}</p>
                        </div>
    
                    <div class="col">
                        <img src="../img/editar.png" alt="" onclick= "moverEditar(${i})" srcset="">
                        <img src="../img/Borrar.png" alt="" srcset="" onclick = eliminar(${i})>
                    
                    </div>

            `
        }

    })
    .catch(err =>{
        console.log(err);
    })
    
}

llenarTabla();

function moverEditar(i){
    document.getElementById('editarEmpresa').style.display = 'block'
    document.getElementById('editarPrincipal').style.display='none'
    const form = document.querySelector('#form-editProducto');
    // Evento submit del formulario
    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
    axios ({
        url : 'http://localhost:3000/administradores/' + idCategoria._id + '/' + indiceEmpresa + '/' + i,
        method : 'put',
        data : formData,
        ResponseType : 'json'
    })
    .then(res =>{
        console.log(res.data)
        alert('Producto editado correctamente');
    })
    .catch(err =>{
        console.log(err);
    }
    )
})
}


function eliminar(indiceProducto){
    axios({
        url : 'http://localhost:3000/administradores/' + idCategoria._id + '/' + indiceEmpresa + '/' + indiceProducto,
        method : 'DELETE',
        ResponseType : 'json'
    }).then(res =>{
        llenarTabla();
    }).catch(err =>{
        console.log(err);
    }
    )
}

function mostrarEditarPrincipal(){
    document.getElementById('editarEmpresa').style.display = 'none'
    document.getElementById('editarPrincipal').style.display = 'block'

}

function mostrarPaginaPrincipal(){
    window.location.href = '../html/administrarEmpresa.html'
}
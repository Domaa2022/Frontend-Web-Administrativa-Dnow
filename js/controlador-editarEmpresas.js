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
                        <img src="../img/editar.png" alt="" srcset="">
                        <img src="../img/Borrar.png" alt="" srcset="">
                    
                    </div>
        `
            
        }
    }).catch(err =>{
        console.log(err);
    })
    
}
llenarTabla();
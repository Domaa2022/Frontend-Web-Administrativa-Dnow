function generarCategorias(){
    axios({
		url : 'http://localhost:3000/categorias',
		method : 'get',
		ResponseType : 'json'
	}).then((res)=>{


        {
            document.getElementById('containerCategorias').innerHTML = ""
        }
        

        (res.data).forEach(e => {
            document.getElementById('containerCategorias').innerHTML += 
            `
            <div class="col-4">
            <div class="cardCategoria" style="margin-bottom: 30px;" onclick="mostrarEmpresas('${e._id}')">
                <img class="imgCategoria" src="${e.imagen}" alt="">
                <p class="textoCategoria">${e.nombreCategoria}</p>
            </div>
            </div>
            `
            
        });

    }).catch(err => {
        console.log(err)
    })
};

generarCategorias();



function mostrarEmpresas(indiceCategoria){

    
    axios({
        url: 'http://localhost:3000/categorias/' + indiceCategoria,
        method: 'get',
        ResponseType: 'json'
    }).then(res => {
        let x = res.data
        {document.getElementById('containerProductos').innerHTML = ''}
        
        for (let i = 0; i < x.empresas.length; i++) {
            document.getElementById('containerProductos').innerHTML +=
            `
            <div class="col-4">
                <div class="cardCategoria" style="margin-bottom: 30px;">
                    <img class="imgCategoria" src="${x.empresas[i].banner}" alt="">
                    <div style="display: flex; align-items: center;">

                        <img style="margin-left: 10px ;" class="logoredondo" src="${x.empresas[i].logo}" alt="">
                        <div>
                            <p class="textoCategoria segundo">${x.empresas[i].nombreEmpresa}</p>
                            <p class="textoCategoriat"> ${x.empresas[i].descripcion}</p>
                        </div>

                    </div>
                    
                </div>
            </div>
            `
            
        }


    }).catch(err => {
        console.log(err)
    })

    


    document.getElementById('Empresa').style.display = "block";
    document.getElementById('categorias').style.display = "none";
    document.getElementById('EditarProducto').style.display = "none";
}


function mostrarCategorias(){
    document.getElementById('Empresa').style.display = "none";
    document.getElementById('categorias').style.display = "block";
    document.getElementById('EditarProducto').style.display = "none";
}

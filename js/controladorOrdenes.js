function mostrarOrdenes () {

    axios ( {
        url :'http://localhost:3000/usuarios/pedidos',
        method : 'get',
        responseType : 'json'
    } ).then( res => {

        let x = res.data;
        console.log(res.data)
        document.getElementById('ordenesDisponibles').innerHTML = '';

        for ( let i = 0 ; i < x.length ; i++ ) {
            
            for(let j = 0 ; j < x[i].pedidos.length ; j++){
                if(x[i].pedidos[j].Estado == 'Pendiente'){
                    document.getElementById('ordenesDisponibles').innerHTML += `
                    <div class="contenedor-motorista">
                            <p class="fuente-motoristas"> Orden #${x[i].pedidos[j].numeroPedido}</p>
                        </div>
                    `
                    
                }
            }
        }   

    }).catch( err => {
        console.log(err);
    })
}

mostrarOrdenes();
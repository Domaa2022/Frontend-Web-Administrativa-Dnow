const categoria = JSON.parse(sessionStorage.getItem('idCategoria'));
const idEmpresa = JSON.parse(sessionStorage.getItem('id'));

console.log(idEmpresa)
const form = document.querySelector('#form-addProducto');

// Evento submit del formulario
form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    axios({
        method: 'POST',
        url: 'http://localhost:3000/administradores/' +categoria._id + '/productos/' + idEmpresa,
        data: formData
    }).then(res => {
        console.log(res.data)
        alert('Producto agregado correctamente');
    }
    ).catch(err => {
        console.log(err)
    })
})

function mostrarPaginaPrincipal(){
    window.location.href = '../html/administrarEmpresa.html'
}


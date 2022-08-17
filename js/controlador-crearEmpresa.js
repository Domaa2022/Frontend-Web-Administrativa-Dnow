const categoria = JSON.parse(sessionStorage.getItem('idCategoria'));

const form = document.querySelector('#form-addEmpresa');

// Evento submit del formulario
form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    axios({
        method: 'POST',
        url: 'http://localhost:3000/administradores/' + categoria._id,
        data: formData
    }).then(res => {
        console.log(res.data)
        alert('Empresa agregada correctamente');
    }).catch(err => {
        console.log(err)
    })
    
})

function mostrarPaginaPrincipal(){
    window.location.href = '../html/administrarEmpresa.html'
}


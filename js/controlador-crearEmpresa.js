const categoria = JSON.parse(sessionStorage.getItem('idCategoria'));

const form = document.querySelector('#form-addEmpresa');

form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    axios({
        method: 'POST',
        url: 'http://localhost:3000/categorias/' + categoria._id,
        data: formData
    }).then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log(err)
    })
    



})
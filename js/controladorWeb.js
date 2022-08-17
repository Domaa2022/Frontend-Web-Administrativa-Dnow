function mostrarEmpresas(){
    document.getElementById('Empresa').style.display = "block";
    document.getElementById('categorias').style.display = "none";
    document.getElementById('EditarProducto').style.display = "none";
}

function mostrarCategorias(){
    document.getElementById('Empresa').style.display = "none";
    document.getElementById('categorias').style.display = "block";
    document.getElementById('EditarProducto').style.display = "none";
}

function mostrarPaginaPrincipal(){
    window.location.href = "webAdministrativa.html";
}

function EditarProducto(){
document.getElementById('EditarProducto').style.display = "block";
document.getElementById('Empresa').style.display = "none";
document.getElementById('categorias').style.display = "none";
}

function dirigirIndex(){
    window.location.href = "index.html";
}

function dirigirIndex(){
    window.location.href = "index.html";
}

function mostrarPaginaPrincipal(){
    window.location.href = "../html/webAdministrativa.html"
}
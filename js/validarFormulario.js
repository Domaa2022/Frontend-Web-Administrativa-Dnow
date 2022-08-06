const formularioInicioSesion = document.getElementById('formularioInicioSesion');
const inputsInicioSesion = document.querySelectorAll('#formularioInicioSesion input');


const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}


const campoInicioSesion ={
	UsuariorRegistrado: false ,
	ContraseñaRegistrada: false,
}

const validarFormularioInicioSesion = (e) => {
	switch (e.target.name) {
		case 'usuario':
			validarCampo(expresiones.usuario, e.target, 'UsuariorRegistrado');
			break;
		case 'contraseña':
			validarCampo(expresiones.password, e.target, 'ContraseñaRegistrada');
		default:
			break;
	}
}

inputsInicioSesion.forEach(input => {

	input.addEventListener('keyup', validarFormularioInicioSesion);
	input.addEventListener('blur', validarFormularioInicioSesion);

})

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo${campo}`).classList.remove('formularioGrupo-incorrecto');
		campoInicioSesion[campo] = true;
	}else{
		document.getElementById(`grupo${campo}`).classList.add('formularioGrupo-incorrecto');
		campoInicioSesion[campo] = false;
	}
}



function enviarPaginaAdmin() {

	let usuario = document.getElementById('usuario').value
	let contraseña = document.getElementById('contraseña').value
	var usuarioIngresado = false

	axios({
		url : 'http://localhost:3000/administradores',
		method : 'get',
		ResponseType : 'json'
	}).then(res => {

		
		
		res.data.forEach( e => {
			
			if( usuario == e.nombre && contraseña == e.contraseña){
				window.location.href = '../html/webAdministrativa.html'
				sessionStorage.setItem('administrador', JSON.stringify(e))
				usuarioIngresado = true
			}

		});
		if(!usuarioIngresado){
			document.getElementById('errorInicio').style.display = "block";
			document.getElementById('errorInicio').innerHTML = '<p class="texto" style="color:red ;"> usuario o contraseña incorrecta  </p>' }
		
		
	}).catch(err => {
		console.log(err)
	})
}


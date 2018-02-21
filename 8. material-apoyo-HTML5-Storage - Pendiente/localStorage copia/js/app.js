var urlSincronizacion = "http://localhost/cursoLocalStorage/sincronizar";

var dbJornalero = localStorage.getItem("dbJornalero");

dbJornalero = JSON.parse(dbJornalero);

if (dbJornalero === null) {
	//Convierto en un array
	dbJornalero = [];
}

listar();

function guardar() {

	//JS Nativo
	var nombreCompleto = document.getElementById("txtNombre").value;
	//mostrar variables o cualquier objeto en la consola
	
	//JS - Jquery
	var correo = $("#txtCorreo").val();
	var fecha = $("#txtFecha").val();
	var peso = $("#txtPeso").val();

	var jornalero = {
		nombre: nombreCompleto,
		correo: correo,
		fecha: fecha,
		peso: peso
	};

	dbJornalero.push(jornalero);
	localStorage.setItem("dbJornalero", JSON.stringify( dbJornalero ) );
	listar();
}

function listar(){

	var tblJornaleros = $("#tblJornaleros tbody");
	var tamanio = dbJornalero.length;
	var etiquetas = "";

	for (var i = 0; i < tamanio; i++) {
		
		var columnaCodigo = "<td>" + i + "</td>";
		var columnaNombres = "<td>" + dbJornalero[i].nombre + "</td>";
		var columnaCorreo = "<td>" + dbJornalero[i].correo + "</td>";
		var columnaFecha = "<td>" + dbJornalero[i].fecha + "</td>";
		var columnaPeso = "<td>" + dbJornalero[i].peso + "</td>";
		var columnaOpciones = "<td> <button class='btn btn-primary btn-modificar' onclick='modificar(" + i + ")'>Modificar</button>";
		columnaOpciones += "<button class='btn btn-danger btn-eliminar' onclick='eliminar(" + i + ")'>Eliminar</button> </td>";

		etiquetas += "<tr>" + columnaCodigo + columnaNombres + columnaCorreo + columnaFecha + columnaPeso + columnaOpciones + "</tr>";

	}

	tblJornaleros.empty();
	tblJornaleros.append(etiquetas);

	$("#cantidadJornalero").text(tamanio);
	verificarSincronizacion();

}


function modificar(idJornalero) {
	var jornalero = dbJornalero[idJornalero];

	$("#txtCodigo").val(idJornalero);
	$("#txtNombre").val(jornalero.nombre);
	$("#txtCorreo").val(jornalero.correo);
	$("#txtFecha").val(jornalero.fecha);
	$("#txtPeso").val(jornalero.peso);

	$("#btnGuardar").css("display", "none");
	$("#btnModificar").css("display", "block");

}

function cancelar(){

	$("#btnGuardar").css("display", "block");
	$("#btnModificar").css("display", "none");
	$("#formJornalero")[0].reset();

}

function eliminar(idJornalero){
	// idJornalero (posición en el array, numero de items a eliminar)
	var respuesta = confirm("¿En verdad deseas eliminar este jornalero?");

	if (respuesta == true) {

		dbJornalero.splice(idJornalero, 1);
		localStorage.setItem("dbJornalero", JSON.stringify(dbJornalero));
		listar();

	}
}

function eliminarSincronizado(idJornalero){
	dbJornalero.splice(idJornalero, 1);
	localStorage.setItem("dbJornalero", JSON.stringify(dbJornalero));
}


function modificarDatos() {
	var idJornalero = $("#txtCodigo").val();
	dbJornalero[idJornalero].nombre = $("#txtNombre").val();

	dbJornalero[idJornalero].correo = $("#txtCorreo").val();
	dbJornalero[idJornalero].fecha = $("#txtFecha").val();
	dbJornalero[idJornalero].peso = $("#txtPeso").val();
	localStorage.setItem("dbJornalero", JSON.stringify( dbJornalero ) );
	listar();
	cancelar();
}

function verificarSincronizacion() {
	if (navigator.onLine) {
		var tamanio = dbJornalero.length;
		if (tamanio > 0) {
			$("#btnSincronizar").prop('disabled', false);
		}else{
			$("#btnSincronizar").prop('disabled', true);
		}
	}else{
		$("#btnSincronizar").prop('disabled', true);
	}
}

function sincronizar() {

	var tamanio = dbJornalero.length;

	if (tamanio > 0) {

		$.ajax({
			url: urlSincronizacion,
			type: 'POST',
			dataType: 'json',
			data: {
				jornaleros:  JSON.stringify(dbJornalero)
			},
		})
		.done(function(resultado) {
			if (resultado.response) {
				dbJornalero = [];
				localStorage.setItem("dbJornalero", JSON.stringify(dbJornalero));
				alert("Todos los jornaleros han sido sincronizados correctamente");
			}else{
				if (resultado.statusCode == "422") {

					var jornalerosSincronizados = resultado.result;

					for (var i = jornalerosSincronizados.length -1; i >= 0; i--){
						dbJornalero.splice(jornalerosSincronizados[i],1);
					}

					localStorage.setItem("dbJornalero", JSON.stringify(dbJornalero));
					alert(resultado.message);

				}else{
					alert(resultado.message);
				}
			}

			listar();
		})
		.fail(function(error) {
			console.log(error);
		});
	}else{

		alert("No tienes jornaleros para sincronizar");

	}
}










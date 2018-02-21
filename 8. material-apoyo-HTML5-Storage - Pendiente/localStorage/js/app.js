var dbJornalero = localStorage.getItem("dbJornalero");

dbJornalero = JSON.parse(dbJornalero);

if (dbJornalero === null) {
	//Convierto en un array
	dbJornalero = [];
}

$(document).ready(function(){

	$("#btnSincronizar").on('click', function() {
		sincronizar();
	});

	cargarTemplates();
});

function cargarTemplates() {
	$( "#templates" ).load( "templates/tmpl-tabla-jornalero.html", function(){
		listar();
	} );
}


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
	cancelar();
}

function listar(){

	var tblJornaleros = $("#tblJornaleros");
	tblJornaleros.empty();
	tblJornaleros.append(tmpl("tmpl-tabla-jornalero", dbJornalero));

	infoSincronizacion();

}


function modificar(idJornalero) {
	var jornalero = dbJornalero[idJornalero];
	// debugger;
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

	var respuesta = confirm("¿En verdad desea eliminar al jornalero?");

	if (respuesta == true) {

		dbJornalero.splice(idJornalero, 1);
		localStorage.setItem("dbJornalero", JSON.stringify( dbJornalero ) );
		listar();
	}

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

function infoSincronizacion(){

	$("#totalJornaleros").text(dbJornalero.length);
	var tamanio = dbJornalero.length;
	var online = navigator.onLine;

	if (tamanio > 0 && online == true) {

		$("#btnSincronizar").text("Sincronizar");
		$("#btnSincronizar").attr('disabled', false);

	}else{
		if (online == false) {
			$("#btnSincronizar").text("Sin Conexión");
		}
		$("#btnSincronizar").attr('disabled', true);
	}

}

function sincronizar() {

	if (navigator.onLine) {

		var url = "http://localhost/cursoLocalStorage/sincronizar";

		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: {
				jornaleros: JSON.stringify( dbJornalero )
			},
		})
		.done(function(respuesta) {

			if (respuesta.response == true) {

				alert("Todos los datos fueron sincronizados correctamente.");
				dbJornalero = [];
				localStorage.setItem("dbJornalero", JSON.stringify( dbJornalero ) );
				listar();

			}else{
				
				if (respuesta.statusCode == "422") {

					var jornalerosSincronizados = respuesta.result;

					for (var i = jornalerosSincronizados.length -1; i >= 0; i--){
						dbJornalero.splice(jornalerosSincronizados[i],1);
					}

					localStorage.setItem("dbJornalero", JSON.stringify(dbJornalero));
					alert(respuesta.message);

				}else{

					alert(respuesta.message);

				}

			}

		})
		.fail(function(error) {
			console.log(error);
		});

	}

}










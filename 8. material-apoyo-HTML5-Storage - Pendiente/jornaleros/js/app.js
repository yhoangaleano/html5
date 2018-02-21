var local = localStorage.getItem("dbJornaleros");
var dbJornaleros = JSON.parse(local);

if (dbJornaleros == null) {
    dbJornaleros = [];
}

$(document).ready(function() {

    $("#btnCancelar").on("click", function() {
        limpiar();
    })

    $(document).on("click", ".btnEliminar", function() {

        var codigo = $(this).data("id");
        alertify.confirm('Eliminando Jornalero', '¿En verdad desea eliminar el jornalero?', function() {
            eliminar(codigo);
        }, function() {
            alertify.error('Cancelado');
        })
    });

    $(document).on("click", ".btnEditar", function() {
        var posicion = $(this).data("id");
        var jornalero = dbJornaleros[posicion];

        $("#txtCodigo").val(jornalero._codigo);
        $("#txtNombre").val(jornalero._nombre);
        $("#txtCorreo").val(jornalero._correo);
        $("#txtFecha").val(jornalero._fecha);
        $("#txtPeso").val(jornalero._peso);

        $("#btnGuardar").removeAttr('class');
        $("#btnGuardar").addClass("btn btn-primary");
        $("#btnGuardar").text("Actualizar Jornalero");

    });

    listar();

    $("#formJornalero").on("submit", function(event) {

        event.preventDefault();

        var _codigo = $("#txtCodigo").val();

        if (_codigo.trim() == "") {
            guardar();
        } else {
            actualizar();
        }

    })

});

function listar() {

    var tabla = $("#tblJornaleros tbody");
    tabla.empty();

    $.each(dbJornaleros, function(index, value) {
        value._codigo = index;
        tabla.append(
            tmpl("tmpl-tbl-jornaleros", value)
        );
    });
}

function limpiar() {
    $("#formJornalero")[0].reset();
    $("#btnGuardar").removeAttr('class');
    $("#btnGuardar").addClass("btn btn-success");
    $("#btnGuardar").text("Guardar Jornalero");
}

function guardar() {
    var nombre = $("#txtNombre").val();
    var correo = $("#txtCorreo").val();
    var fecha = $("#txtFecha").val();
    var peso = $("#txtPeso").val();

    var jornalero = {
        _nombre: nombre,
        _correo: correo,
        _fecha: fecha,
        _peso: peso
    }

    dbJornaleros.push(jornalero);
    console.log(dbJornaleros);

    localStorage.setItem("dbJornaleros", JSON.stringify(dbJornaleros));

    limpiar();

    alertify.success('Jornalero insertado correctamente');

    listar();
}


function actualizar() {

    var codigo = $("#txtCodigo").val();
    var nombre = $("#txtNombre").val();
    var correo = $("#txtCorreo").val();
    var fecha = $("#txtFecha").val();
    var peso = $("#txtPeso").val();

    var jornalero = {
        _codigo: codigo,
        _nombre: nombre,
        _correo: correo,
        _fecha: fecha,
        _peso: peso
    }

    dbJornaleros[codigo] = jornalero;
    localStorage.setItem("dbJornaleros", JSON.stringify(dbJornaleros));

    limpiar();

    alertify.success('Jornalero actualizado correctamente');

    listar();
}


function eliminar(codigo) {

    dbJornaleros.splice(codigo, 1);
    localStorage.setItem("dbJornaleros", JSON.stringify(dbJornaleros));
    alertify.success('Jornalero eliminado correctamente');
    listar();
}
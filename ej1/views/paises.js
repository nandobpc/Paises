let url = "../controllers/paises.controllers.php?op=";

function init() {
  $("#paisForm").on("submit", function (e) {
    inserta_actualizar(e);
  });
}

$().ready(() => {
  todos();
});

var todos = () => {
  var html = "";
  $.get(url + "todos", (paises) => {
    paises = JSON.parse(paises);
    $.each(paises, (index, pais) => {
      html += `<tr>
        <td>${index + 1}</td>
        <td>${pais.Nombre}</td>
        <td>${pais.Poblacion}</td>
        <td>${pais.CodigoPostal}</td>
        <td>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#paisModal" onclick="uno(${
              pais.PaisId
            })">Editar</button>
            <button class="btn btn-danger" onclick="eliminar(${
              pais.PaisId
            })">Eliminar</button>
            <button class="btn btn-success" onclick="verDetalles(${pais.PaisId})">Ver</button>
        </td>
    </tr>`;
    });
    $("#lista").html(html);
  });
};

var inserta_actualizar = (e) => {
  e.preventDefault();
  var formData = new FormData($("#paisForm")[0]);
  var PaisId = $("#PaisId").val();
  var accion = "";

  if (PaisId == "" || PaisId == undefined) {
    accion = url + "insertar";
  } else {
    accion = url + "actualizar";
  }

  $.ajax({
    url: accion,
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    success: (datos) => {
      datos = JSON.parse(datos);
      if (datos) {
        $("#paisForm")[0].reset();
        todos();
        $("#paisModal").modal("hide");
        Swal.fire("Paises", "Se guardó con éxito", "success");
      } else {
        $("#paisForm")[0].reset();
        todos();
        $("#paisModal").modal("hide");
        Swal.fire("Paises", "Error al guardar", "error");
      }
    },
  });
};

var uno = (PaisId) => {
  $.post(url + "uno", { PaisId: PaisId }, (pais) => {
    pais = JSON.parse(pais);
    $("#PaisId").val(pais.Paisid);
    $("#Nombre").val(pais.Nombre);
    $("#Poblacion").val(pais.Poblacion);
    $("#CodigoPostal").val(pais.CodigoPostal);
  });
};

var verDetalles = (PaisId) => {
  $.post(url + "uno", { PaisId: PaisId }, (pais) => {
    pais = JSON.parse(pais);
    $("#labelDetalles").html(`<strong>Nombre:</strong> ${pais.Nombre}<br><strong>Población:</strong> ${pais.Poblacion}<br><strong>Código Postal:</strong> ${pais.CodigoPostal}`);
    $("#detallesModal").modal("show"); // Mostrar el modal de detalles
  });
};

var eliminar = (PaisId) => {
  Swal.fire({
    title: "Paises",
    text: "Está seguro de eliminar al país",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
      $.post(url + "eliminar", { PaisId: PaisId }, (datos) => {
        datos = JSON.parse(datos);
        if (datos) {
          todos();
          $("#paisModal").modal("hide");
          Swal.fire("Paises", "Se eliminó con éxito", "success");
        } else {
          $("#paisModal").modal("hide");
          Swal.fire("Paises", "Error al eliminar", "error");
        }
      });
    }
  });
};

init();

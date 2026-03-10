const radios = document.querySelectorAll('input[name="servicio"]');
const boton = document.getElementById('pedirServicio');
const transporte = document.getElementById("formTransporte");
const encargo = document.getElementById("formEncargo");


//ENVIAR PEDIDOS AL SERVIDOR

boton.addEventListener("click", async () => {

    const tipo = document.querySelector('input[name="servicio"] : checked').value;
    console.log("tipo", tipo)

    if (tipo === "transporte") {
        pedido = {
            Tipo: "transporte",
            Nombre: document.getElementById('nombre').value,
            Telefono: document.getElementById('telefono').value,
            Destino: document.getElementById('destino').value
        };
    };

    if (tipo === "encargo") {
        pedido = {
            Tipo: "encargo",
            Nombre: document.getElementById('nombreE').value,
            Telefono: document.getElementById('telefonoE').value,
            Descripcion: document.getElementById('descripcionE').value,
            Destino: document.getElementById('destinoE').value
        };
    };


    await fetch("/pedidos", {
        method: 'POST',
        headers: {'Content-Type': 'aplication/json'},
        body: JSON.stringify(pedido)
    });

    alert("PEDIDO ENVIADO")
});




//CAMBIO DE FORMULARIO
radios.forEach(radio => {

    radio.addEventListener("change", () => {

    if(radio.value === "transporte"){

        transporte.style.display = "block"
        encargo.style.display = "none"

    }

    if(radio.value === "encargo"){

        encargo.style.display = "block"
        transporte.style.display = "none"

     }
  })
})
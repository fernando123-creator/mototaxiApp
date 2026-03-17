const radioServicios = document.querySelectorAll('input[name="servicio"]');

const formTransporte = document.getElementById("formTransporte");
const formEncargo = document.getElementById("formEncargo");


radioServicios.forEach(radio => {

    radio.addEventListener("change", () => {

        formTransporte.classList.add("hidden");
        formEncargo.classList.add("hidden");

        if(radio.value === "transporte"){
            formTransporte.classList.remove("hidden");
        }

        if(radio.value === "encargo"){
            formEncargo.classList.remove("hidden");
        }

    });

});

async function enviarPedido(form, tipo){

    const datos = Object.fromEntries(new FormData(form));
    console.log(datos)

        if(!datos.nombre || !datos.telefono || !datos.destino){
            alert("Completa los campos");
            return;
        }

        const pedido = {
            tipo,
            ...datos
        };

        await fetch("/guardar",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(pedido)
        });

        alert("PEDIDO ENVIADO");

        form.reset();

}



formTransporte.addEventListener("submit",(e)=>{

    e.preventDefault();

    enviarPedido(formTransporte,"transporte");

});


formEncargo.addEventListener("submit",(e)=>{

    e.preventDefault();

    enviarPedido(formEncargo,"encargo");

});
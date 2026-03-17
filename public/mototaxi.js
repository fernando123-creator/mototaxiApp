function debeMostrarBoton(pedido) {
    return pedido.estado !== "completado";
}

async function cargarDatos() {
    const res = await fetch('/solicitud')
    const datos = await res.json();
    console.log(datos)

    const pedidos = document.getElementById('listPedidos');
    pedidos.innerHTML = "";

    datos.forEach(pedido => {
        const card = document.createElement('article')
        const contentBtn = document.createElement('article')
        
        card.classList.add('cartas')
        contentBtn.classList.add('containBtn')


        if (pedido.tipo === "transporte") {

            card.innerHTML = `
            <h3 class="tipo">Servicio: Transporte</h3>
            <h3 class="nombre">Nombre: ${pedido.nombre}</h3>
            <h3 class="telefono">Telefono: ${pedido.telefono}</h3>
            <h3 class="desttino">Destino: ${pedido.destino}</h3>
            <h3 class="estate">Estado: ${pedido.estado}</h3>
        `;

        } else {

            card.innerHTML = `
            <h3 class="tipo">Servicio: Encargo</h3>
            <h3 class="nombre">Nombre: ${pedido.nombre}</h3>
            <h3 class="descripcion">descripcion: ${pedido.descripcion}</h3>
            <h3 class="telefono">Telefono: ${pedido.telefono}</h3>
            <h3 class="desttino">Destino: ${pedido.destino}</h3>
            <h3 class="estate">Estado: ${pedido.estado}</h3>
        `;
            
        }

        contentBtn.innerHTML = `
            <button class="verMapa">ver mapa</button>
             ${
            debeMostrarBoton(pedido)
                ? `<button class="aceptar">${pedido.estado === "pendiente" ? "aceptar" : "completar" }</button>`
                : ''
             }
        `;
        
        const btn = contentBtn.querySelector(".aceptar");

if (btn) {
    btn.addEventListener("click", async () => {
        let nuevoEstado;

        if (pedido.estado === "pendiente") {
            nuevoEstado = "aceptado"
        } else if (pedido.estado === "aceptado") {
            nuevoEstado = "completado"
        } else{
            return;
        }
            
        await fetch(`/guardar/${pedido.id}`,{
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({estado:nuevoEstado})
        });
        
    });
}
        pedidos.appendChild(card)
        card.appendChild(contentBtn)
    
    });

   
}

cargarDatos()


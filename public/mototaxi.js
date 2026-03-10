console.log('js cargado mototaxi')

async function cargarPedidos() {
    const res = await fetch('/pedidos');
    const pedidos = await res.json();
    console.log(pedidos)
    const lista = document.querySelector(".listaDePedidos")

    pedidos.filter(p => p != null)
        .forEach(pedido => {
        const card = document.createElement('div')
        card.classList.add("solicitud");

        card.innerHTML= `
            <h3>${pedido.tipo}</h3>
            <h3>${pedido.nombre}</h3>
            <h3>${pedido.destino}</h3>
        `;

        lista.appendChild(card)
    });
};
cargarPedidos();
// setInterval(cargarPedidos,2000);


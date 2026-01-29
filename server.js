import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let pedidos = [];
let idActual = 1;

app.post('/pedidos', (req, res) => {
    const { tipo, descripcion, hotel, clienteTelefon } = req.body;

    const nuevoPedido = {
        id: idActual++,
        tipo,
        descripcion,
        hotel,
        clienteTelefon,
        estado: "pediente",
        mototaxi: null
    };

    pedidos.push(nuevoPedido);
    res.status(201).json(nuevoPedido);

});

app.get('/pedidos', (req, res) => {
    res.json(pedidos);
});


app.put('/pedidos/:id/aceptar', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const {nombre, telefono} = req.body;

    const pedido = pedidos.find(p => p.id === id);

    if (!pedido) {
        return res.status(404).json({mensaje: 'PEDIDO NO ENCONTRADO'});
    };

    if (pedido.estado !== 'pendiente') {
        return res.status(400).json({mensaje: 'EL PEDIDO YA FUE TOMADO'});
    };

    pedido.estado = 'aceptado',
    pedido.mototaxi = {
        nombre,
        telefono
    };

    res.status(200).json(pedido);
});

app.listen(PORT, () => {
    console.log('SERVIDOR CORRIENDO...');
});
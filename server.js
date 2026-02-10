import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

let pedidos = [];
let idActual = 1;

app.post('/pedidos', (req, res) => {
    const { tipo, nombreCliente, clienteTelefono, origen, destino, descripcion, lugarRecogida, lugarEntrega  } = req.body;

    const nuevoPedido = {
        id: pedidos.length + 1,
        tipo,
        nombreCliente,
        clienteTelefono,
        estado: "pendiente",
        mototaxi: null
    };

    // SI ES TRANSPORTE AGREGAMOS ORIGEN Y DESTINO.
    if (tipo === 'transporte') {
        nuevoPedido.origen = origen,
        nuevoPedido.destino = destino
    }

    //SI ES ENCARGO AGREGAMOS LUGAR DE RECOGIDA Y LUGAR DE ENTREGA.
    if (tipo === 'encargo') {
        nuevoPedido.descripcion = descripcion
        nuevoPedido.lugarRecogida = lugarRecogida,
        nuevoPedido.lugarEntrega = lugarEntrega
    } 

    pedidos.push(nuevoPedido);
    res.status(201).json(nuevoPedido);

});

app.get('/pedidos', (req, res) => {
    res.json(pedidos);
});

app.get('/pedidos/:id/info', (req, res) => {
    const id = parseInt(req.params.id, 10);

    const index = pedidos.find(pedido => pedido.id === id);

    if (!index) {
        res.status(500).send('NO ENCONTRAMOS NADA EN NUESTRA BASE DE DATOS')
    }

    res.status(200).json(index);
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


app.put('/pedidos/:id/completar', (req, res) => {
    const id = parseInt(req.params.id);
    const pedido = pedidos.find(p => p.id === id);

    if (!pedido) {
        return res.status(404).json({mensaje: 'PEDIDO NO ENCONTRADO'});
    };

    if (pedido.estado !== 'aceptado') {
        return res.status(400).json({mensaje: 'EL PEDIDO NO ESTA EN PROCESO'});
    }

    pedido.estado = 'completado',
    res.status(200).json(pedido)
});

app.listen(PORT, () => {
    console.log('SERVIDOR CORRIENDO...');
});
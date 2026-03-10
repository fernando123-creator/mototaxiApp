const express = require('express');
const app = express();


app.use(express.json())
app.use(express.static("public"))

let pedidos = []

app.post('/pedidos', (req, res) => {
    const pedido = req.body;
    console.log('req.body', req.body)

    if(pedido && typeof pedido.tipo === String && pedido.tipo.trim() !== ""){
        pedidos.push(pedido);
        console.log('pedido guardado:', pedido)
        res.json({mensaje: 'ok'});

    }else{
        console.log('pedido invalido')
    }

    res.json({message: 'pedido invalido'})
    
});

app.get('/pedidos', (req, res) => {
    res.json(pedidos)
});

app.listen(3000, () => {
    console.log('SERVIDOR CORRIENDO...')
});


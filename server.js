const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json())
app.use(express.static("public"))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "panelC.html"))
});


app.get('/solicitud', (req, res) => {
    const datos = fs.readFileSync('dataBase.json');
    const lista = JSON.parse(datos);

    res.json(lista);
});



app.post('/guardar', (req, res) => {
    const {tipo, telefono, nombre, descripcion, destino } = req.body;
    const data = fs.readFileSync('dataBase.json');
    const lista = JSON.parse(data);

    const objeto = {
        "id": lista.length + 1,
        tipo,
        telefono,
        nombre,
        descripcion,
        destino,
        estado: "pendiente"
    }

    lista.push(objeto)

    fs.writeFileSync('dataBase.json', JSON.stringify(lista, null, 2))

    res.status(200).json({message: 'Guardado'});
});

app.put('/guardar/:id', (req, res) => {
    const data = fs.readFileSync('dataBase.json');
    const lista = JSON.parse(data);

    const id = Number(req.params.id);
    const { estado } = req.body;

    const pedido = lista.find(p => p.id === id);

    if (!pedido) {
        return res.status(404).json({ error: 'No encontrado' });
    }

    pedido.estado = estado;

    fs.writeFileSync('dataBase.json', JSON.stringify(lista, null, 2));

    res.json({ mensaje: 'Estado actualizado' });
});


app.listen(3000, () => {
    console.log("SERVIDOR CORRIENDO EN EL PUERTO 3000")
});

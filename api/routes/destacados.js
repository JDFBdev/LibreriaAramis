const express = require('express');
const Productos = require('../models/productos');
const router = express.Router();

router.get('/', async (req, res) => {
    var oficina = [];
    var escolar = [];
    try {
        var productos = await Productos.findAll({
            where: {
                destacado: true
            }
    });
    }
    catch(err) {
        return res.send({message: "Error devolviendo productos", err, success: false})
    }
    productos.forEach(producto => {
        if (producto.categoria == 'Oficina') {
            oficina.push(producto);
        } else {
            escolar.push(producto);
        }
    });
    const resu = {oficina, escolar};
    res.send(resu);
})

module.exports = router;
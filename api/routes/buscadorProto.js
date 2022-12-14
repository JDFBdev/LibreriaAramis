const express = require('express');
const sequelize = require('../db');
const { Op } = require("sequelize");
const Productos = require('../models/productos');
const router = express.Router();

router.get('/:param', async (req, res) => {
    const categorias = ["Escritura", "Oficina", "Mochilas", "Resmas", "Escolar", "Computacion"];
    let {param} = req.params;
    const inputs = param.split(" ");
    var esCategoria = categorias.find(categoria => {
        return param.toLowerCase() === categoria.toLowerCase();
    });
    try {
        if (esCategoria) {
            var productosCategoria = await Productos.findAll({
                where: {
                    "categoria": {
                        [Op.iLike]: param
                    }
                }
            });
        } else {
        var [productosNombre, meta] = await sequelize.query(`SELECT id, nombre, imagen, categoria, destacado FROM productos WHERE vector @@ websearch_to_tsquery('spanish', '${param}');`);
        if (inputs.length > 1){
            let [otrosProductos, meta ] = await sequelize.query(`SELECT id, nombre, imagen, categoria, destacado FROM productos WHERE vector @@ websearch_to_tsquery('spanish', '${inputs[0]}');`);
            productosNombre = productosNombre.concat(otrosProductos);
        }
        }
    }
    catch(err) {
        console.log(err);
        return res.send({message: "Error encontrando producto", err, success: false})
    }
    if (esCategoria) {
        return res.send(productosCategoria);
    } else if (productosNombre[0]) {
        let promesas = await Productos.findAll({
            where: {
                "categoria": {
                    [Op.iLike]: productosNombre[0].categoria
                }
            }
        });
        productosNombre = productosNombre.concat(promesas);
        // filtro
        productosNombre = productosNombre.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.id === value.id
            ))
        )
        return res.send(productosNombre);
    }
    res.send({message: "No se encontraron productos", success: true});
})

module.exports = router;

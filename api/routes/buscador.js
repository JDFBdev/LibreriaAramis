const express = require('express');
const { Op } = require("sequelize");
const Productos = require('../models/productos');
const router = express.Router();

router.get('/:param', async (req, res) => {
    let {param} = req.params
    const categorias = ["Escritura", "Oficina", "Mochilas", "Resmas", "Escolar", "Computacion"];
    const esCategoria = categorias.find(categoria => {
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
            var productosNombre = await Productos.findAll({
                where: {
                    "nombre": {
                        [Op.iLike]: `%${param}%`
                    }
                }
            });
        }
    }
    catch(err) {
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
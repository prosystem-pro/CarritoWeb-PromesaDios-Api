const express = require('express');
const router = express.Router();
const Modelo = 'empresa';
const { Listado, 
    ObtenerPorCodigo,
    Buscar,
    Crear,
    Editar,
    Eliminar
 } = require('../Controladores/EmpresaControlador');


 router.get(`/${Modelo}/listado`, Listado);
 router.get(`/${Modelo}/:codigo`, ObtenerPorCodigo);
 router.get(`/${Modelo}/buscar/:tipoBusqueda/:valorBusqueda`, Buscar);
 router.post(`/${Modelo}/crear`, Crear);
 router.put(`/${Modelo}/editar/:codigo`, Editar);
 router.delete(`/${Modelo}/eliminar/:codigo`, Eliminar);
 router.get('/prueba', (req, res) => {
    res.status(200).json({ message: 'Hola Mundo' });
  });





module.exports = router;
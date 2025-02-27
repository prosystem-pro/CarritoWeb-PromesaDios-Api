const Express = require('express');
const Router = Express.Router();
const Modelo = 'usuario';
const { Listado, ObtenerPorCodigo, Buscar, Crear, Editar, Eliminar } = require('../Controladores/UsuarioControlador');

Router.get(`/${Modelo}/listado`, Listado);
Router.get(`/${Modelo}/:codigo`, ObtenerPorCodigo);
Router.get(`/${Modelo}/buscar/:tipoBusqueda/:valorBusqueda`, Buscar);
Router.post(`/${Modelo}/crear`, Crear);
Router.put(`/${Modelo}/editar/:codigo`, Editar);
Router.delete(`/${Modelo}/eliminar/:codigo`, Eliminar);

module.exports = Router;

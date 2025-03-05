const Express = require('express');
const Router = Express.Router();
const Modelo = 'empresa';
const { Listado, ObtenerPorCodigo, Buscar, Crear, Editar, Eliminar } = require('../Controladores/EmpresaControlador');
const VerificarToken = require('../FuncionIntermedia/VerificarToken');
const VerificarPermisos = require('../FuncionIntermedia/VerificarPermisos'); 

Router.get(`/${Modelo}/listado`,VerificarToken,VerificarPermisos('Listar'), Listado);
Router.get(`/${Modelo}/:codigo`, ObtenerPorCodigo);
Router.get(`/${Modelo}/buscar/:tipoBusqueda/:valorBusqueda`, Buscar);
Router.post(`/${Modelo}/crear`, Crear);
Router.put(`/${Modelo}/editar/:codigo`, Editar);
Router.delete(`/${Modelo}/eliminar/:codigo`, Eliminar);

module.exports = Router;

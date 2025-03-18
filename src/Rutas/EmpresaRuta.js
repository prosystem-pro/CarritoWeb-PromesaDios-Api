const Express = require('express');
const Router = Express.Router();
const Modelo = 'empresa';
const { Listado, ObtenerPorCodigo, Buscar, Crear, Editar, Eliminar } = require('../Controladores/EmpresaControlador');
const VerificarToken = require('../FuncionIntermedia/VerificarToken');
const VerificarPermisos = require('../FuncionIntermedia/VerificarPermisos'); 

Router.get(`/${Modelo}/listado`,VerificarToken,VerificarPermisos('Listar'), Listado);
Router.get(`/${Modelo}/:codigo`,VerificarToken,VerificarPermisos('Ver'), ObtenerPorCodigo);
Router.get(`/${Modelo}/buscar/:tipoBusqueda/:valorBusqueda`,VerificarToken,VerificarPermisos('Buscar'), Buscar);
Router.post(`/${Modelo}/crear`, VerificarToken,VerificarPermisos('Crear'),Crear);
Router.put(`/${Modelo}/editar/:codigo`, VerificarToken,VerificarPermisos('Editar'), Editar);
Router.delete(`/${Modelo}/eliminar/:codigo`, VerificarToken,VerificarPermisos('Eliminar'),  Eliminar);

module.exports = Router;

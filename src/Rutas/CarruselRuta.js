const Express = require('express');
const Router = Express.Router();
const Modelo = 'carrusel';
const Tabla = 'Carrusel'
const { Listado, ObtenerPorCodigo, Buscar, Crear, Editar, Eliminar } = require('../Controladores/CarruselControlador');
const VerificarToken = require('../FuncionIntermedia/VerificarToken');
const VerificarPermisos = require('../FuncionIntermedia/VerificarPermisos'); 

// Router.get(`/${Modelo}/listado`,VerificarToken,VerificarPermisos('Listar',Tabla), Listado);
// Router.get(`/${Modelo}/:Codigo`,VerificarToken,VerificarPermisos('Ver',Tabla), ObtenerPorCodigo);
// Router.get(`/${Modelo}/buscar/:TipoBusqueda/:ValorBusqueda`,VerificarToken,VerificarPermisos('Buscar',Tabla), Buscar);
// Router.post(`/${Modelo}/crear`, VerificarToken,VerificarPermisos('Crear',Tabla),Crear);
// Router.put(`/${Modelo}/editar/:Codigo`, VerificarToken,VerificarPermisos('Editar',Tabla), Editar);
// Router.delete(`/${Modelo}/eliminar/:Codigo`, VerificarToken,VerificarPermisos('Eliminar',Tabla),  Eliminar);

Router.get(`/${Modelo}/listado`, Listado);
Router.get(`/${Modelo}/:Codigo`, ObtenerPorCodigo);
Router.get(`/${Modelo}/buscar/:TipoBusqueda/:ValorBusqueda`, Buscar);
Router.post(`/${Modelo}/crear`, Crear);
Router.put(`/${Modelo}/editar/:Codigo`, Editar);
Router.delete(`/${Modelo}/eliminar/:Codigo`,  Eliminar);

module.exports = Router;
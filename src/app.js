const Express = require('express');
require('dotenv').config();
const App = Express();
const EmpresaRuta = require('./Rutas/EmpresaRuta');
const EmpresaPortadaRuta = require('./Rutas/EmpresaPortadaRuta');
const ModelosTypescriptRuta = require("./Rutas/ModelosTypescriptRuta");
const SubirImagenRuta = require("./Rutas/SubirImagenRuta");
const UsuarioRuta = require("./Rutas/UsuarioRuta");
const Login = require("./Rutas/LoginRuta");
const Ruter = 'api';
const CuerpoJson = require('./FuncionIntermedia/CuerpoJson');
const CuerpoUrlCodificado = require('./FuncionIntermedia/CuerpoUrlCodificado');
const { ConfiguracionCors } = require('./FuncionIntermedia/Cors');

App.use(ConfiguracionCors());
App.use(CuerpoJson);
App.use(CuerpoUrlCodificado);


App.use(`/${Ruter}`, EmpresaRuta);
App.use(`/${Ruter}`, EmpresaPortadaRuta);
App.use(`/${Ruter}`, UsuarioRuta);
App.use(`/${Ruter}`, ModelosTypescriptRuta);
App.use(`/${Ruter}`, SubirImagenRuta);
App.use(`/${Ruter}`, Login);

module.exports = App;

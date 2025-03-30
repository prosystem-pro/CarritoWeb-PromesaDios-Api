const Express = require('express');
require('dotenv').config();
const App = Express();
const EmpresaRuta = require('./Rutas/EmpresaRuta');
const EmpresaPortadaRuta = require('./Rutas/EmpresaPortadaRuta');
const ModelosTypescriptRuta = require("./Rutas/ModelosTypescriptRuta");
const SubirImagenRuta = require("./Rutas/SubirImagenRuta");
const UsuarioRuta = require("./Rutas/UsuarioRuta");
const RolRuta = require("./Rutas/RolRuta");
const PermisoRuta = require("./Rutas/PermisoRuta");
const PermisoRolRecursoRuta = require("./Rutas/PermisoRolRecursoRuta");
const RecursoRuta = require("./Rutas/RecursoRuta");
const NavbarRuta = require("./Rutas/NavbarRuta");
const LogoRuta = require("./Rutas/LogoRuta");
const LogoImagenRuta = require("./Rutas/LogoImagenRuta");
const MenuPortadaRuta = require("./Rutas/MenuPortadaRuta");
const CarruselRuta = require("./Rutas/CarruselRuta");
const CarruselImagenRuta = require("./Rutas/CarruselImagenRuta");
const FooterRuta = require("./Rutas/FooterRuta");
const RedSocialRuta = require("./Rutas/RedSocialRuta");
const RedSocialImagenRuta = require("./Rutas/RedSocialImagenRuta");

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
App.use(`/${Ruter}`, RolRuta);
App.use(`/${Ruter}`, PermisoRuta);
App.use(`/${Ruter}`, PermisoRolRecursoRuta);
App.use(`/${Ruter}`, RecursoRuta);
App.use(`/${Ruter}`, NavbarRuta);
App.use(`/${Ruter}`, LogoRuta);
App.use(`/${Ruter}`, LogoImagenRuta);
App.use(`/${Ruter}`, MenuPortadaRuta);
App.use(`/${Ruter}`, CarruselRuta);
App.use(`/${Ruter}`, CarruselImagenRuta);
App.use(`/${Ruter}`, FooterRuta);
App.use(`/${Ruter}`, RedSocialRuta);
App.use(`/${Ruter}`, RedSocialImagenRuta);

App.use(`/${Ruter}`, ModelosTypescriptRuta);
App.use(`/${Ruter}`, SubirImagenRuta);
App.use(`/${Ruter}`, Login);

module.exports = App;
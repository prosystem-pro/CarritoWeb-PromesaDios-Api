const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const Bd = require('./BaseDatos/ConexionBaseDatos');
const EmpresaRuta = require('./Rutas/EmpresaRuta');
const ModelosTypescriptRuta = require("./Rutas/ModelosTypescriptRuta");
const Ruter = 'api';
const FuncionIntermediaJson = require('./FuncionIntermedia/JsonFuncionIntermedia');
const CuerpoUrlCodificadoFuncionIntermedia = require('./FuncionIntermedia/CuerpoUrlCodificadoFuncionIntermedia');

app.use(FuncionIntermediaJson);
app.use(CuerpoUrlCodificadoFuncionIntermedia);

app.use(`/${Ruter}`, EmpresaRuta);
app.use(`/${Ruter}`, ModelosTypescriptRuta);

module.exports = app;

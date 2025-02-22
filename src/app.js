const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const Bd = require('./BaseDatos/ConexionBaseDatos');
const EmpresaRuta = require('./Rutas/EmpresaRuta');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Rutas
app.use('/api', EmpresaRuta);
module.exports = app;

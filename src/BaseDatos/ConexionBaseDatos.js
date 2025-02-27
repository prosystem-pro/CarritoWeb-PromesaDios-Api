// Importa Sequelize, el ORM para manejar bases de datos
const { Sequelize } = require('sequelize');
// Carga las variables de entorno desde un archivo .env
require('dotenv').config(); 

// Crea una instancia de Sequelize utilizando las credenciales almacenadas en variables de entorno
const Sequelice = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, // Define el host del servidor de base de datos
  dialect: 'mssql', // Especifica que se usará SQL Server
  dialectOptions: {
    options: { encrypt: false } // Desactiva la encriptación en la conexión
  },
  logging: false // Desactiva los logs de consultas SQL en la consola
});

// Intenta autenticar la conexión con la base de datos
Sequelice.authenticate()
  .then(() => console.log('Conectado a SQL Server'))
  .catch(err => console.error('Error al conectar la base de datos:', err));

// Exporta la instancia de Sequelize para ser utilizada en otros archivos
module.exports = Sequelice;

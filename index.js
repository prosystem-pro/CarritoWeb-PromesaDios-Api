const sequelize = require('./src/BaseDatos/ConexionBaseDatos');

const App = require('./src/app');
const PORT = process.env.PORT || 3000;

App.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = App;

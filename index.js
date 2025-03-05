const sequelize = require('./src/BaseDatos/ConexionBaseDatos'); // Asegúrate que tu conexión esté aquí
require('./src/Relaciones/Relaciones'); // Importar las relaciones

const App = require('./src/app');
const PORT = process.env.PORT || 3000;

App.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = App;

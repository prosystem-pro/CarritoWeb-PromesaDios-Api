const ControladorArchivos = require("multer");

const Almacenamiento = ControladorArchivos.memoryStorage();
const SubirImagen = ControladorArchivos({ storage: Almacenamiento });

module.exports = SubirImagen;

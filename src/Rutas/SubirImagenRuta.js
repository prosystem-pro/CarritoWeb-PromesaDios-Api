const { Router } = require("express");
const { SubirImagen } = require("../Controladores/SubirImagenControlador");
const Multer = require("multer");

const Cargar = Multer({ storage: Multer.memoryStorage() }).single("Imagen");

const RutaAlmacenamiento = Router();
RutaAlmacenamiento.post("/subir-imagen", Cargar, SubirImagen);

module.exports = RutaAlmacenamiento;

const { Router } = require("express");
const { SubirImagen } = require("../Controladores/SubirImagenControlador");
const { Subir } = require("../FuncionIntermedia/SubirImagen");

const RutaAlmacenamiento = Router();
RutaAlmacenamiento.post("/subir-imagen", Subir.single("Imagen"), SubirImagen);

module.exports = RutaAlmacenamiento;

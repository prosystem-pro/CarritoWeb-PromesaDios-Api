const express = require("express");
const router = express.Router();
const { GenerarModelosControlador } = require("../Controladores/GenerarModeloTypescriptControlador");

router.get("/generar-modelos", GenerarModelosControlador);

module.exports = router;

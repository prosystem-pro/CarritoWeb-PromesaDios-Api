const express = require("express");
const router = express.Router();
const { GenerarModelos } = require("../Controladores/GenerarModelosTypescript");

router.get("/generar-modelos", GenerarModelos);

module.exports = router;

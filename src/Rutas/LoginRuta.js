const express = require("express");
const router = express.Router();
const { IniciarSesion } = require("../Controladores/LoginControlador");

router.post("/login", IniciarSesion);

module.exports = router;

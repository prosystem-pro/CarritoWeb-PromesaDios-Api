const jwt = require("jsonwebtoken");
require("dotenv").config();

const verificarTokenMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Acceso denegado, token requerido" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Token inválido" });
  }
};

module.exports = verificarTokenMiddleware;

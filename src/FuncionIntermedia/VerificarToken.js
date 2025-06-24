// const Jwt = require("jsonwebtoken");
// require("dotenv").config();
// const ManejarError = require('../Utilidades/ErrorControladores');

// const VerificarToken = (req, res, next) => {
//   const Token = req.header("Authorization");

//   if (!Token) {
//     return res.status(401).json({ error: "Acceso denegado, token requerido" });
//   }

//   try {
//     const Decodificado = Jwt.verify(Token.replace("Bearer ", ""), process.env.JWT_SECRET);
//     req.Datos = Decodificado;

//     if (Decodificado.SuperAdmin === 1) {
//       return next();
//     }

//     next();
//   } catch (error) {
//     ManejarError(error, res, 'Token inválido');
//   }
// };

// module.exports = VerificarToken;


const Jwt = require("jsonwebtoken");
require("dotenv").config();
const ManejarError = require('../Utilidades/ErrorControladores');
const SesionServicio = require('../Servicios/SesionServicio'); // Tus servicios para Sesion

const TIMEOUT_MINUTOS = parseInt(process.env.TIEMPO_INACTIVIDAD || '15');

const VerificarToken = async (req, res, next) => {
  const Token = req.header("Authorization");

  if (!Token) {
    return res.status(401).json({ error: "Acceso denegado, token requerido" });
  }

  try {
    const tokenLimpio = Token.replace("Bearer ", "");
    const Decodificado = Jwt.verify(tokenLimpio, process.env.JWT_SECRET);
    const userId = Decodificado.CodigoUsuario;

    const sesion = await SesionServicio.ObtenerPorUsuario(userId);

    if (!sesion) {
      return res.status(401).json({ error: "Sesión no encontrada, debe autenticarse." });
    }
    const ahora = new Date();
    const ultimaActividad = new Date(sesion.UltimaActividad);
    const minutosInactivos = (ahora - ultimaActividad) / 1000 / 60;

    if (minutosInactivos > TIMEOUT_MINUTOS) {
      await SesionServicio.Eliminar(sesion.CodigoSesion);

      return res.status(401).json({ error: "Sesión expirada por inactividad" });
    }

    await SesionServicio.ActualizarActividad(userId, ahora);

    req.Datos = Decodificado;

    if (Decodificado.SuperAdmin === 1) {
      return next();
    }

    next();

  } catch (error) {
    ManejarError(error, res, 'Token inválido');
  }
};

module.exports = VerificarToken;

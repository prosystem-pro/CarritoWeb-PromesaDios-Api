// Importamos las dependencias necesarias
const Jwt = require("jsonwebtoken"); // Para generar y verificar tokens JWT
const Bcrypt = require("bcryptjs"); // Para encriptar y comparar contraseñas
require("dotenv").config(); // Para cargar variables de entorno desde un archivo .env

/**
 * Genera un token JWT con los datos del usuario.
 * @param {Object} datos - Información del usuario para incluir en el token.
 * @returns {string} Token JWT firmado.
 */
const GenerarToken = (datos) => {
  return Jwt.sign(
    {
      CodigoUsuario: datos.CodigoUsuario, // ID del usuario
      CodigoRol: datos.CodigoRol, // ID del rol del usuario
      NombreUsuario: datos.NombreUsuario, // Nombre del usuario
      NombreRol: datos.NombreRol, // Nombre del rol del usuario
      SuperAdmin: datos.SuperAdmin // Indica si el usuario es un superadministrador
    },
    process.env.JWT_SECRET, // Se firma con una clave secreta almacenada en las variables de entorno
    { expiresIn: process.env.JWT_EXPIRES_IN } // Se define el tiempo de expiración del token
  );
};

/**
 * Encripta una contraseña utilizando bcrypt.
 * @param {string} clave - Contraseña a encriptar.
 * @returns {Object} Objeto con el salt y el hash de la contraseña.
 */
const EncriptarClave = async (clave) => {
  const Salt = await Bcrypt.genSalt(10); // Genera un "salt" para aumentar la seguridad
  const Hash = await Bcrypt.hash(clave, Salt); // Genera el hash de la contraseña
  return { Salt, Hash }; // Retorna el salt y el hash
};

/**
 * Compara una contraseña con su hash para verificar si es correcta.
 * @param {string} clave - Contraseña ingresada por el usuario.
 * @param {string} hash - Hash almacenado de la contraseña original.
 * @returns {boolean} true si coinciden, false en caso contrario.
 */
const CompararClaves = async (clave, hash) => {
  return await Bcrypt.compare(clave, hash); // Compara la contraseña ingresada con su hash
};

// Exportamos las funciones para poder usarlas en otros archivos
module.exports = { GenerarToken, EncriptarClave, CompararClaves };

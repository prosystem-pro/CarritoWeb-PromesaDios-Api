const Sequelize = require('sequelize');
const BaseDatos = require('../BaseDatos/ConexionBaseDatos');
const Modelo = require('../Modelos/Usuario')(BaseDatos, Sequelize.DataTypes);
const { GenerarToken, CompararClaves } = require("../Configuracion/AutorizacionConfiguracion");

const IniciarSesionServicio = async (NombreUsuario, Clave) => {
  const Usuario = await Modelo.findOne({ where: { NombreUsuario } });
  if (!Usuario) throw new Error("Usuario o contraseña incorrectos");
  if (Usuario.Estatus !== 1) throw new Error("Usuario inactivo");

  const Valida = await CompararClaves(Clave, Usuario.ClaveHash);
  if (!Valida) throw new Error("Usuario o contraseña incorrectos");

  const Token = GenerarToken(Usuario);
  return {
    Token,
    usuario: {
      CodigoUsuario: Usuario.CodigoUsuario,
      NombreUsuario: Usuario.NombreUsuario,
      CodigoRol: Usuario.CodigoRol,
      NombreRol: Usuario.NombreRol
    },
  };
};

module.exports = { IniciarSesionServicio };

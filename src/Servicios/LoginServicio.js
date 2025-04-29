const Sequelize = require('sequelize');
const { GenerarToken, CompararClaves } = require("../Configuracion/AutorizacionConfiguracion");
const { UsuarioModelo, RolModelo } = require('../Relaciones/Relaciones'); // Importar desde Relaciones.js

const IniciarSesionServicio = async (NombreUsuario, Clave) => {
  // Buscar al usuario e incluir la información del Rol
  const Usuario = await UsuarioModelo.findOne({
    where: { NombreUsuario },
    include: [{
      model: RolModelo,
      as: 'Rol',
      attributes: ['NombreRol']
    }]
  });

  // Si no se encuentra el usuario, lanzamos un error
  if (!Usuario) throw new Error("Usuario o contraseña incorrectos");

  // Validamos el estatus del usuario, si no es activo (1), lanzamos error
  if (Usuario.Estatus !== 1) throw new Error("Usuario inactivo");

  // Verificamos la contraseña comparándola con el hash almacenado
  const Valida = await CompararClaves(Clave, Usuario.ClaveHash);
  if (!Valida) throw new Error("Usuario o contraseña incorrectos");

  // const Token = GenerarToken(Usuario);
  const Token = GenerarToken({
    CodigoUsuario: Usuario.CodigoUsuario,
    CodigoRol: Usuario.CodigoRol,
    NombreUsuario: Usuario.NombreUsuario,
    NombreRol: Usuario.Rol?.NombreRol || null,  
    SuperAdmin: Usuario.SuperAdmin  
  });
  

  // Retornamos el token y la información del usuario, incluyendo NombreRol
  return {
    Token,
    usuario: {
      CodigoUsuario: Usuario.CodigoUsuario,
      NombreUsuario: Usuario.NombreUsuario,
      CodigoRol: Usuario.CodigoRol,
      NombreRol: Usuario.Rol?.NombreRol || null // Si no tiene rol, lo retornamos como null
    },
  };
};

module.exports = { IniciarSesionServicio };

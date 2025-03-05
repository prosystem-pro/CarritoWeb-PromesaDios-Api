const Path = require('path');
const BaseDatos = require('../BaseDatos/ConexionBaseDatos');
const Sequelize = require('sequelize');

const RutaModelos = Path.join(__dirname, '..', 'Modelos');

const UsuarioModelo = require(Path.join(RutaModelos, 'Usuario.js'))(BaseDatos, Sequelize.DataTypes);
const RolModelo = require(Path.join(RutaModelos, 'Rol.js'))(BaseDatos, Sequelize.DataTypes);
const PermisoRolModelo = require(Path.join(RutaModelos, 'PermisoRol.js'))(BaseDatos, Sequelize.DataTypes);
const PermisoModelo = require(Path.join(RutaModelos, 'Permiso.js'))(BaseDatos, Sequelize.DataTypes);

UsuarioModelo.belongsTo(RolModelo, { foreignKey: 'CodigoRol' });
RolModelo.hasMany(UsuarioModelo, { foreignKey: 'CodigoRol' });

PermisoRolModelo.belongsTo(PermisoModelo, { foreignKey: 'CodigoPermiso' });
PermisoModelo.hasMany(PermisoRolModelo, { foreignKey: 'CodigoPermiso' });

PermisoRolModelo.belongsTo(RolModelo, { foreignKey: 'CodigoRol' });
RolModelo.hasMany(PermisoRolModelo, { foreignKey: 'CodigoRol' });

module.exports = {
  UsuarioModelo,
  RolModelo,
  PermisoRolModelo,
  PermisoModelo,
};

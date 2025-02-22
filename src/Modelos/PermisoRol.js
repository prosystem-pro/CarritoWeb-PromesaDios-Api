const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PermisoRol', {
    CodigoRol: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Rol',
        key: 'CodigoRol'
      }
    },
    CodigoPermiso: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Permiso',
        key: 'CodigoPermiso'
      }
    },
    Estatus: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PermisoRol',
    schema: 'Ad',
    timestamps: false
  });
};

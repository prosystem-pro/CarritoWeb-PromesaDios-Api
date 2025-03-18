const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PermisoRolRecurso', {
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
    CodigoRecurso: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Recurso',
        key: 'CodigoRecurso'
      }
    },
    Estatus: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PermisoRolRecurso',
    schema: 'Ad',
    timestamps: false
  });
};

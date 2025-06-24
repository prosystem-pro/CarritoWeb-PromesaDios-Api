const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Sesion', {
    CodigoSesion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    CodigoUsuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Usuario',
        key: 'CodigoUsuario'
      }
    },
    UltimaActividad: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Sesion',
    schema: 'Ad',
    timestamps: false
  });
};

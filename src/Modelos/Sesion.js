const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Sesion', {
    CodigoSesion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    timestamps: false,
    indexes: [
      {
        name: "Pk_AdSesion_CodigoSesion",
        unique: true,
        fields: [
          { name: "CodigoSesion" },
        ]
      },
    ]
  });
};

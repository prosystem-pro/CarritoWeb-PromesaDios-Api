const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Otro', {
    CodigoOtro: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CodigoEmpresa: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Empresa',
        key: 'CodigoEmpresa'
      },
      unique: "Uq_CaOtro_NombreReceta"
    },
    NombreOtro: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: "Uq_CaOtro_NombreReceta"
    },
    UrlImagen: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    Descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Estatus: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Otro',
    schema: 'Ca',
    timestamps: false,
    indexes: [
      {
        name: "Pk_CaOtro_CodigoOtro",
        unique: true,
        fields: [
          { name: "CodigoOtro" },
        ]
      },
      {
        name: "Uq_CaOtro_NombreReceta",
        unique: true,
        fields: [
          { name: "CodigoEmpresa" },
          { name: "NombreOtro" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PortadaOtro', {
    CodigoPortadaOtro: {
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
      }
    },
    NombrePortadaOtro: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    ColorNombrePortadaOtro: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ColorFondoNombrePortadaOtro: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    Descripcion: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    ColorDescripcion: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ColorDescripcionOtro: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    Estatus: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PortadaOtro',
    schema: 'Ui',
    timestamps: false,
    indexes: [
      {
        name: "Pk_CaPortadaOtro_CodigoPortadaOtro",
        unique: true,
        fields: [
          { name: "CodigoPortadaOtro" },
        ]
      },
    ]
  });
};

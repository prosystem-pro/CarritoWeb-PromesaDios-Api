const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Footer', {
    CodigoFooter: {
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
    TextoInicio: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ColorTextoInicio: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    TextoMenu: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ColorTextoMenu: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    TextoContacto: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ColorTextoContacto: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    TextoOtro: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ColorTextoOtro: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    TextoTelefonoOficina: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ColorTextoTelefonoOficina: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ColorNoCelular: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    TextoSuscripcion: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    ColorTextoSuscripcion: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    TextoRedesSociales: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    ColorTextoRedesSociales: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    TextoCorreo: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    ColorTextoCorreo: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    TextoBotonSuscribirte: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ColorTextoBotonSuscribirte: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ColorBotonSuscribirte: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    DerechoDeAutor: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    ColorDerechosDeAutor: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    ColorFooter: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    Estatus: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Footer',
    schema: 'Ui',
    timestamps: false,
    indexes: [
      {
        name: "Pk_UiFooter_CodigoFooter",
        unique: true,
        fields: [
          { name: "CodigoFooter" },
        ]
      },
    ]
  });
};

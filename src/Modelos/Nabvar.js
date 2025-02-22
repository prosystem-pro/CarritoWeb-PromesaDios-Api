const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Nabvar', {
    CodigoNavbar: {
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
      allowNull: true
    },
    ColortextoOtro: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    ColorFondoOtro: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    TextoBuscador: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    ColorTextoBuscador: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ColorFondoBuscador: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    UrlImagenBuscador: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    UrlImagenCarrito: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    ColorFondoNavbar: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    Estatus: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Nabvar',
    schema: 'Ui',
    timestamps: false,
    indexes: [
      {
        name: "Pk_UiNavbar_CodigoNavbar",
        unique: true,
        fields: [
          { name: "CodigoNavbar" },
        ]
      },
    ]
  });
};

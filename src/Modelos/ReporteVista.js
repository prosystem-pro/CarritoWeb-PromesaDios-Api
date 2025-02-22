const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ReporteVista', {
    CodigoReporteVista: {
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
    Cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    NombreDiagrama: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    Estatus: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ReporteVista',
    schema: 'Re',
    timestamps: false,
    indexes: [
      {
        name: "Pk_ReReporteVista_CodigoReporteVista",
        unique: true,
        fields: [
          { name: "CodigoReporteVista" },
        ]
      },
    ]
  });
};

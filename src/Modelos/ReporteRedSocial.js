const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ReporteRedSocial', {
    CodigoReporteRedSocial: {
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
      unique: "Uq_ReReporteRedSocial_NombreDiagrama"
    },
    CodigoRedSocial: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'RedSocial',
        key: 'CodigoRedSocial'
      }
    },
    Cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    NombreDiagrama: {
      type: DataTypes.STRING(64),
      allowNull: true,
      unique: "Uq_ReReporteRedSocial_NombreDiagrama"
    },
    Estatus: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ReporteRedSocial',
    schema: 'Re',
    timestamps: false,
    indexes: [
      {
        name: "Pk_ReReporteRedSocial_CodigoReporteRedSocial",
        unique: true,
        fields: [
          { name: "CodigoReporteRedSocial" },
        ]
      },
      {
        name: "Uq_ReReporteRedSocial_NombreDiagrama",
        unique: true,
        fields: [
          { name: "CodigoEmpresa" },
          { name: "NombreDiagrama" },
        ]
      },
    ]
  });
};

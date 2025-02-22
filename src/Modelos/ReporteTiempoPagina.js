const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ReporteTiempoPagina', {
    CodigoReporteTiempoPagina: {
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
      unique: "Uq_ReReportetiempoPagina_NombreDiagrama"
    },
    TiempoPromedio: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    NombreDiagrama: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: "Uq_ReReportetiempoPagina_NombreDiagrama"
    },
    Estatus: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ReporteTiempoPagina',
    schema: 'Re',
    timestamps: false,
    indexes: [
      {
        name: "Pk_ReReporteTiempoPagina_CodigoReporteTiempoPagina",
        unique: true,
        fields: [
          { name: "CodigoReporteTiempoPagina" },
        ]
      },
      {
        name: "Uq_ReReportetiempoPagina_NombreDiagrama",
        unique: true,
        fields: [
          { name: "CodigoEmpresa" },
          { name: "NombreDiagrama" },
        ]
      },
    ]
  });
};

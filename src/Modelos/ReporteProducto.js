const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ReporteProducto', {
    CodigoReporteProducto: {
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
    CodigoProducto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Producto',
        key: 'CodigoProducto'
      }
    },
    CantidadVendidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Estatus: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ReporteProducto',
    schema: 'Re',
    timestamps: false,
    indexes: [
      {
        name: "Pk_ReReporteProducto_CodigoReporteProducto",
        unique: true,
        fields: [
          { name: "CodigoReporteProducto" },
        ]
      },
    ]
  });
};

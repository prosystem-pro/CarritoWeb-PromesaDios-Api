const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Producto', {
    CodigoProducto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CodigoClasificacionProducto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ClasificacionProducto',
        key: 'CodigoClasificacionProducto'
      },
      unique: "Uq_CaProducto_NombreProducto"
    },
    NombreProducto: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: "Uq_CaProducto_NombreProducto"
    },
    Moneda: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    Precio: {
      type: DataTypes.DECIMAL(10,1),
      allowNull: false
    },
    UrlImagen: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    Estatus: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Producto',
    schema: 'Ca',
    timestamps: false,
    indexes: [
      {
        name: "Pk_CaProducto_CodigoProducto",
        unique: true,
        fields: [
          { name: "CodigoProducto" },
        ]
      },
      {
        name: "Uq_CaProducto_NombreProducto",
        unique: true,
        fields: [
          { name: "CodigoClasificacionProducto" },
          { name: "NombreProducto" },
        ]
      },
    ]
  });
};

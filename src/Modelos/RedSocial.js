const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RedSocial', {
    CodigoRedSocial: {
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
      unique: "Uq_CaRedSocial_NombreRedSocial"
    },
    NombreRedSocial: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: "Uq_CaRedSocial_NombreRedSocial"
    },
    Estatus: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'RedSocial',
    schema: 'Ca',
    timestamps: false,
    indexes: [
      {
        name: "Pk_CaRedSocial_CodigoRedSocial",
        unique: true,
        fields: [
          { name: "CodigoRedSocial" },
        ]
      },
      {
        name: "Uq_CaRedSocial_NombreRedSocial",
        unique: true,
        fields: [
          { name: "CodigoEmpresa" },
          { name: "NombreRedSocial" },
        ]
      },
    ]
  });
};

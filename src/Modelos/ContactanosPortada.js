const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ContactanosPortada', {
    CodigoContactanosPortada: {
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
      unique: "Uq_UiContactanosPortada_NombreContactanosPortada"
    },
    NombreContactanosPortada: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: "Uq_UiContactanosPortada_NombreContactanosPortada"
    },
    ColorNombreContactanosPortada: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ColorFondoNombreContactanosPortada: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ColorFondoRedSocial: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ColorIconoAgregar: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    TextoComoLlegar: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ColorTextoComoLlegar: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ColorBotonComoLlegar: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    UrlImagenComoLlegar: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    Estatus: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ContactanosPortada',
    schema: 'Ui',
    timestamps: false,
    indexes: [
      {
        name: "Pk_UiContactanosPortada_CodigoContactanosPortada",
        unique: true,
        fields: [
          { name: "CodigoContactanosPortada" },
        ]
      },
      {
        name: "Uq_UiContactanosPortada_NombreContactanosPortada",
        unique: true,
        fields: [
          { name: "CodigoEmpresa" },
          { name: "NombreContactanosPortada" },
        ]
      },
    ]
  });
};

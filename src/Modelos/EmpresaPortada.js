const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EmpresaPortada', {
    CodigoEmpresaPortada: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Empresa',
        key: 'CodigoEmpresa'
      }
    },
    CodigoEmpresa: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ColorNombreEmpresa: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    ColorFondoNombreEmpresa: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    UrlImagenPortada: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    UrlImagenPortadaIzquierdo: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    UrlImagenPortadaDerecho: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    TitutloQuienesSomos: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ColorTituloQuienesSomos: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    DescripcionQuienesSomos: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    ColorDescripcionQuienesSomos: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    TituloMision: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ColorTituloMision: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    DescripcionMision: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    ColorDescripcionMision: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    UrlImagenMision: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    TituloVision: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ColorTituloVision: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    DescripcionVision: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    ColordescripcionVision: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    UrlImagenvision: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    ColorEslogan: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    Urlvideo: {
      type: DataTypes.STRING(128),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'EmpresaPortada',
    schema: 'Ui',
    timestamps: false,
    indexes: [
      {
        name: "Pk_AdEmpresaPortada_CodigoEmpresaPortada",
        unique: true,
        fields: [
          { name: "CodigoEmpresaPortada" },
        ]
      },
    ]
  });
};

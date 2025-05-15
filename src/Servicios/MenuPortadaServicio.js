const Sequelize = require('sequelize');
const BaseDatos = require('../BaseDatos/ConexionBaseDatos');
const Modelo = require('../Modelos/MenuPortada')(BaseDatos, Sequelize.DataTypes);
const { EliminarImagen } = require('../Servicios/EliminarImagenServicio');

const NombreModelo= 'TituloMenu';
const CodigoModelo= 'CodigoMenuPortada'

const Listado = async () => {
  return await Modelo.findAll({ where: { Estatus:  [1,2] } });
};

const ObtenerPorCodigo = async (Codigo) => {
  return await Modelo.findOne({ where: { [CodigoModelo]: Codigo } });
};

const Buscar = async (TipoBusqueda, ValorBusqueda) => {
  switch (parseInt(TipoBusqueda)) {
    case 1:
      return await Modelo.findAll({
        where: { [NombreModelo]: { [Sequelize.Op.like]: `%${ValorBusqueda}%` }, Estatus:  [1,2] }
      });
    case 2:
      return await Modelo.findAll({ where: { Estatus:  [1,2] }, order: [[NombreModelo, 'ASC']] });
    default:
      return null;
  }
};

const Crear = async (Datos) => {
  return await Modelo.create(Datos);
};

const Editar = async (Codigo, Datos) => {
  const Objeto = await Modelo.findOne({ where: { [CodigoModelo]: Codigo } });
  if (!Objeto) return null;
  await Objeto.update(Datos);
  return Objeto;
};

const Eliminar = async (Codigo) => {
  try {
    const Objeto = await Modelo.findOne({ where: { [CodigoModelo]: Codigo } });
    if (!Objeto) return null;

    const CamposImagen = [
      'UrlImagenNavbar',
      'UrlImagenPortadaIzquierdo',
      'UrlImagenPortadaDerecho',
      'UrlImagenMenu',
      'UrlImagenPresentacion'
    ];

    for (const campo of CamposImagen) {
      const url = Objeto[campo];
      if (url) {
        try {
          await EliminarImagen(url);
        } catch (error) {
          console.warn(`No se pudo eliminar la imagen del campo "${campo}": ${error.message}`);
        }
      }
    }

    await Objeto.destroy();
    return Objeto;

  } catch (error) {
    console.error("Error en la función Eliminar:", error.message);
    throw error;
  }
};

module.exports = { Listado, ObtenerPorCodigo, Buscar, Crear, Editar, Eliminar };

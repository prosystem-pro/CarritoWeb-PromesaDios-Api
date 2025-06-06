const Sequelize = require('sequelize');
const BaseDatos = require('../BaseDatos/ConexionBaseDatos');
const Modelo = require('../Modelos/Producto')(BaseDatos, Sequelize.DataTypes);
const ReporteProducto = require('../Modelos/ReporteProducto')(BaseDatos, Sequelize.DataTypes);

const { EliminarImagen } = require('../Servicios/EliminarImagenServicio');

const NombreModelo= 'NombreProducto';
const CodigoModelo= 'CodigoProducto'

const Listado = async (Usuario) => {

  let estatusPermitido = [1];

  if (Usuario && (Usuario.NombreRol === 'Administrador' || Usuario.SuperAdmin === 1)) {
    estatusPermitido = [1, 2];
  }

  return await Modelo.findAll({
    where: { Estatus: estatusPermitido }
  });
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

    await ReporteProducto.destroy({
      where: { CodigoProducto: Codigo }
    });

    const UrlImagen = Objeto.UrlImagen;
    if (UrlImagen) {
      await EliminarImagen(UrlImagen);
    }
    await Objeto.destroy();

    return Objeto;
  } catch (error) {
    console.error('Error en eliminación en cola:', error);
    throw error;
  }
};



const ListadoPorClasificacion = async (Codigo) => {
  return await Modelo.findAll({
    where: {
      CodigoClasificacionProducto: Codigo,
      Estatus: [1, 2]
    }
  });
};

module.exports = { Listado, ObtenerPorCodigo, Buscar, Crear, Editar, Eliminar, ListadoPorClasificacion };

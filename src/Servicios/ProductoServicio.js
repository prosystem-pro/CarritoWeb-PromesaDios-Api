const Sequelize = require('sequelize');
const BaseDatos = require('../BaseDatos/ConexionBaseDatos');
const Modelo = require('../Modelos/Producto')(BaseDatos, Sequelize.DataTypes);
const ReporteProducto = require('../Modelos/ReporteProducto')(BaseDatos, Sequelize.DataTypes);

const { EliminarImagen } = require('../Servicios/EliminarImagenServicio');

const NombreModelo= 'NombreProducto';
const CodigoModelo= 'CodigoProducto'

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
    // 1️⃣ Encuentra el objeto principal
    const Objeto = await Modelo.findOne({ where: { [CodigoModelo]: Codigo } });
    if (!Objeto) return null;

    // 2️⃣ Elimina registros dependientes en ReporteProducto (o cualquier otra tabla relacionada)
    await ReporteProducto.destroy({
      where: { CodigoProducto: Codigo }
    });

    // 3️⃣ Elimina la imagen (si existe)
    const UrlImagen = Objeto.UrlImagen;
    if (UrlImagen) {
      await EliminarImagen(UrlImagen);
    }

    // 4️⃣ Finalmente, elimina el objeto principal
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

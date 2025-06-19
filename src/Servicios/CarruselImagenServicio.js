const Sequelize = require('sequelize');
const BaseDatos = require('../BaseDatos/ConexionBaseDatos');
const Modelo = require('../Modelos/CarruselImagen')(BaseDatos, Sequelize.DataTypes);
const { EliminarImagen } = require('../Servicios/EliminarImagenServicio');
const { ConstruirUrlImagen } = require('../Utilidades/ConstruirUrlImagen');

const NombreModelo= 'Orden';
const CodigoModelo= 'CodigoCarruselImagen'

const Listado = async () => {
  const Registros = await Modelo.findAll({ where: { Estatus: [1, 2] } });

  const Resultado = Registros.map(r => {
    const Dato = r.toJSON();

    Dato.UrlImagen = ConstruirUrlImagen(Dato.UrlImagen);

    return Dato;
  });

  return Resultado;
};

const ObtenerPorCodigo = async (Codigo) => {
  const Registro = await Modelo.findOne({ where: { [CodigoModelo]: Codigo } });

  if (!Registro) return null;

  const Dato = Registro.toJSON();

  Dato.UrlImagen = ConstruirUrlImagen(Dato.UrlImagen);

  return Dato;
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

    const UrlImagen = Objeto.UrlImagen;
    await EliminarImagen(UrlImagen);
    await Objeto.destroy();

    return Objeto;
  } catch (error) {
    throw error;
  }
};

const ListadoPorCarrusel = async (CodigoCarrusel) => {
  const Registros = await Modelo.findAll({
    where: { CodigoCarrusel: CodigoCarrusel, Estatus: [1, 2] }
  });

  const Resultado = Registros.map(r => {
    const Dato = r.toJSON();
    Dato.UrlImagen = ConstruirUrlImagen(Dato.UrlImagen);
    return Dato;
  });

  return Resultado;
};
module.exports = { Listado, ObtenerPorCodigo, Buscar, Crear, Editar, Eliminar, ListadoPorCarrusel };

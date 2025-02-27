const Sequelize = require('sequelize');
const BaseDatos = require('../BaseDatos/ConexionBaseDatos');
const Modelo = require('../Modelos/Usuario')(BaseDatos, Sequelize.DataTypes);
const { EncriptarClave } = require('../Configuracion/AutorizacionConfiguracion');

const NombreModelo= 'NombreUsuario';
const CodigoModelo= 'CodigoUsuario'

const Listado = async () => {
  return await Modelo.findAll({ where: { Estatus: 1 } });
};

const ObtenerPorCodigo = async (codigo) => {
  return await Modelo.findOne({ where: { [CodigoModelo]: codigo } });
};

const Buscar = async (tipoBusqueda, valorBusqueda) => {
  switch (parseInt(tipoBusqueda)) {
    case 1:
      return await Modelo.findAll({
        where: { [NombreModelo]: { [Sequelize.Op.like]: `%${valorBusqueda}%` }, Estatus: 1 }
      });
    case 2:
      return await Modelo.findAll({ where: { Estatus: 1 }, order: [[NombreModelo, 'ASC']] });
    default:
      return null;
  }
};

const Crear = async (datos) => {
  try {
    if (!datos.Clave) {
      throw new Error("La clave es obligatoria");
    }

    const { Salt, Hash } = await EncriptarClave(datos.Clave);

    datos.ClaveHash = Hash;
    datos.ClaveSalt = Salt;
    delete datos.Clave; 

    return await Modelo.create(datos);
  } catch (error) {
    throw error;
  }
};

const Editar = async (codigo, datos) => {
  try {
    const Objeto = await Modelo.findOne({ where: { [CodigoModelo]: codigo } });
    if (!Objeto) return null;

    if (datos.Clave) {
      if (datos.Clave.trim() !== "") {
        const { Salt, Hash } = await EncriptarClave(datos.Clave);
        datos.ClaveHash = Hash;
        datos.ClaveSalt = Salt;
      }
      delete datos.Clave;
    }
    await Objeto.update(datos);
    return Objeto;
  } catch (error) {
    throw error;
  }
};

const Eliminar = async (codigo) => {
  const Objeto = await Modelo.findOne({ where: { [CodigoModelo]: codigo } });
  if (!Objeto) return null;
  await Objeto.destroy();
  return Objeto;
};

module.exports = { Listado, ObtenerPorCodigo, Buscar, Crear, Editar, Eliminar };

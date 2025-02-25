const Sequelize = require('sequelize');
const BaseDatos = require('../BaseDatos/ConexionBaseDatos');
const Empresa = require('../Modelos/Empresa')(BaseDatos, Sequelize.DataTypes);

const Listado = async () => {
  return await Empresa.findAll({ where: { Estatus: 1 } });
};

const ObtenerPorCodigo = async (codigo) => {
  return await Empresa.findOne({ where: { CodigoEmpresa: codigo } });
};

const Buscar = async (tipoBusqueda, valorBusqueda) => {
  switch (parseInt(tipoBusqueda)) {
    case 1:
      return await Empresa.findAll({
        where: { NombreEmpresa: { [Sequelize.Op.like]: `%${valorBusqueda}%` }, Estatus: 1 }
      });
    case 2:
      return await Empresa.findAll({ where: { Estatus: 1 }, order: [['NombreEmpresa', 'ASC']] });
    default:
      return null;
  }
};

const Crear = async (datos) => {
  return await Empresa.create(datos);
};

const Editar = async (codigo, datos) => {
  const Objeto = await Empresa.findOne({ where: { CodigoEmpresa: codigo } });
  if (!Objeto) return null;
  await Objeto.update(datos);
  return Objeto;
};

const Eliminar = async (codigo) => {
  const Objeto = await Empresa.findOne({ where: { CodigoEmpresa: codigo } });
  if (!Objeto) return null;
  await Objeto.destroy();
  return Objeto;
};

module.exports = { Listado, ObtenerPorCodigo, Buscar, Crear, Editar, Eliminar };

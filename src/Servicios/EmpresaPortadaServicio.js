const Sequelize = require('sequelize');
const BaseDatos = require('../BaseDatos/ConexionBaseDatos');
const Modelo = require('../Modelos/EmpresaPortada')(BaseDatos, Sequelize.DataTypes);

const NombreModelo= 'TituloQuienesSomos';
const CodigoModelo= 'CodigoEmpresaPortada'

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



const Crear = async (Datos) => {
  return await Modelo.create(Datos);
};

const Editar = async (codigo, datos) => {
  const Objeto = await Modelo.findOne({ where: { [CodigoModelo]: codigo } });
  if (!Objeto) return null;
  await Objeto.update(datos);
  return Objeto;
};

const Eliminar = async (codigo) => {
  const Objeto = await Modelo.findOne({ where: { [CodigoModelo]: codigo } });
  if (!Objeto) return null;
  await Objeto.destroy();
  return Objeto;
};

module.exports = { Listado, ObtenerPorCodigo, Buscar, Crear, Editar, Eliminar };

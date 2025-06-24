const Sequelize = require('sequelize');
const BaseDatos = require('../BaseDatos/ConexionBaseDatos');
const Modelo = require('../Modelos/Sesion')(BaseDatos, Sequelize.DataTypes);

const CodigoModelo = 'CodigoSesion';

const Crear = async (Datos) => {
  return await Modelo.create(Datos);
};

const Eliminar = async (Codigo) => {
  const Objeto = await Modelo.findOne({ where: { [CodigoModelo]: Codigo } });
  if (!Objeto) return null;
  await Objeto.destroy();
  return Objeto;
};

const ObtenerPorUsuario = async (CodigoUsuario) => {
  return await Modelo.findOne({ where: { CodigoUsuario } });
};

const ActualizarActividad = async (CodigoUsuario, fecha = new Date()) => {
  const sesion = await Modelo.findOne({ where: { CodigoUsuario } });
  if (sesion) {
    sesion.UltimaActividad = fecha;
    await sesion.save();
  } else {
    await Crear({ CodigoUsuario, UltimaActividad: fecha });
  }
};

module.exports = { Crear, Eliminar, ObtenerPorUsuario, ActualizarActividad };

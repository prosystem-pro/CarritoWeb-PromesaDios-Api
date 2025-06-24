const Servicio = require('../Servicios/SesionServicio');
const ManejarError = require('../Utilidades/ErrorControladores');

const Crear = async (req, res) => {
  try {
    await Servicio.Crear(req.body);
    return res.status(201).json({ message: 'Se guardó el registro exitosamente.' });
  } catch (error) {
    return ManejarError(error, res, 'Error al crear el registro');
  }
};


const Eliminar = async (req, res) => {
  try {
    const { Codigo } = req.params;
    const Objeto = await Servicio.Eliminar(Codigo);
    if (!Objeto) return res.status(404).json({ message: 'Registro no encontrado' });
    return res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    return ManejarError(error, res, 'Error al eliminar el registro');
  }
};

module.exports = {  Crear, Eliminar };

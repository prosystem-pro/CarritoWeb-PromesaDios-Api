const { PermisoRolModelo, PermisoModelo } = require('../Relaciones/Relaciones');
const ManejarError = require('../Utilidades/ErrorControladores');

const ObtenerPermisosPorRol = async (CodigoRol, Respuesta) => {
  try {
    const Datos = await PermisoRolModelo.findAll({
      where: { CodigoRol, Estatus: 1 },
      include: [{
        model: PermisoModelo,
        attributes: ['NombrePermiso'],
        where: { Estatus: 1 }
      }],
      attributes: [],
      raw: true,
      nest: true
    });

    return Datos.map(Permiso => Permiso.Permiso.NombrePermiso);
  } catch (Error) {
    ManejarError(Error, Respuesta, 'Error al obtener permisos por rol');
  }
};

module.exports = { ObtenerPermisosPorRol };

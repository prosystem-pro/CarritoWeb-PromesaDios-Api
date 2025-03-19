const { PermisoRolRecursoModelo, PermisoModelo, RecursoModelo } = require('../Relaciones/Relaciones');
const ManejarError = require('../Utilidades/ErrorControladores');

const ObtenerPermisosPorRolYRecurso = async (CodigoRol, Recurso, Respuesta) => {
  try {
    const Datos = await PermisoRolRecursoModelo.findAll({
      where: { CodigoRol, Estatus: 1 },
      include: [
        {
          model: PermisoModelo,
          attributes: ['NombrePermiso'],
          where: { Estatus: 1 }
        },
        {
          model: RecursoModelo,
          attributes: ['NombreRecurso'],
          where: { NombreRecurso: Recurso }
        }
      ],
      attributes: [],
      raw: true,
      nest: true
    });

    return Datos.map(Permiso => Permiso.Permiso.NombrePermiso);
  } catch (Error) {
    ManejarError(Error, Respuesta, 'Error al obtener permisos por rol y recurso');
  }
};

module.exports = { ObtenerPermisosPorRolYRecurso };

const { PermisoRolRecursoModelo, PermisoModelo, RecursoModelo } = require('../Relaciones/Relaciones');
const ManejarError = require('../Utilidades/ErrorControladores');

const ObtenerPermisosPorRolYRecurso = async (CodigoRol, Recurso) => {
  try {
    const Datos = await PermisoRolRecursoModelo.findAll({
      where: { CodigoRol, Estatus: 1 }, 
      include: [
        {
          model: PermisoModelo,
          as: 'Permiso',
          attributes: ['NombrePermiso'],
          where: { Estatus: 1 }
        },
        {
          model: RecursoModelo,
          as: 'Recurso',
          attributes: ['NombreRecurso'],
          where: { NombreRecurso: Recurso, Estatus: 1 } 
        }
      ],
      attributes: [],
      raw: true,
      nest: true
    });

    const datosFiltrados = Datos.filter(Permiso => Permiso.Permiso.Estatus === 1 && Permiso.Recurso.Estatus === 1);
    
    return datosFiltrados.map(Permiso => Permiso.Permiso.NombrePermiso);
  } catch (error) {
    return [];
  }
};

module.exports = { ObtenerPermisosPorRolYRecurso };

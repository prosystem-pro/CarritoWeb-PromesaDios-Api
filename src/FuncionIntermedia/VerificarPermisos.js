const { ObtenerPermisosPorRolYRecurso } = require('../Servicios/PermisoPorRolRecursoServicio');
const ManejarError = require('../Utilidades/ErrorControladores');

const VerificarPermisos = (Permiso, Recurso) => {
  return async (req, res, next) => {
    try {
      console.log(" Verificando permisos...");
      console.log(" Datos del request:", req.Datos);

      const { CodigoRol, SuperAdmin } = req.Datos;

      if (SuperAdmin === 1) {
        console.log(" Usuario es SuperAdmin, acceso permitido.");
        return next();
      }

      if (!CodigoRol) {
        console.log(" ERROR: No se proporcionó CodigoRol en req.Datos");
        return res.status(403).json({ error: 'No autorizado, rol no proporcionado' });
      }

      console.log(` Buscando permisos para Rol: ${CodigoRol}, Recurso: ${Recurso}`);

      const Permisos = await ObtenerPermisosPorRolYRecurso(CodigoRol, Recurso);

      console.log(" Permisos obtenidos:", Permisos);

      if (!Permisos || Permisos.length === 0) {
        console.log(` ERROR: El rol ${CodigoRol} no tiene permisos para el recurso ${Recurso}`);
        return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
      }

      if (!Permisos.includes(Permiso)) {
        console.log(`ERROR: El rol ${CodigoRol} tiene permisos, pero no el necesario: ${Permiso}`);
        return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
      }

      console.log(" Permiso concedido");
      next();
    } catch (error) {
      ManejarError(error, res, 'Error verificando permisos');
    }
  };
};

module.exports = VerificarPermisos;

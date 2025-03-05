const { ObtenerPermisosPorRol } = require('../Servicios/PermisoPorRolServicio');
const ManejarError = require('../Utilidades/ErrorControladores');

const VerificarPermisos = (Permiso) => {
  return async (req, res, next) => {
    try {
      const { CodigoRol } = req.Datos; 
      
      if (!CodigoRol) {
        return res.status(403).json({ error: 'No autorizado, rol no proporcionado' });
      }

      const Permisos = await ObtenerPermisosPorRol(CodigoRol);

      if (!Permisos.includes(Permiso)) {
        return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
      }
      
      next(); 
    } catch (error) {
      ManejarError(error, res, 'Error verificando permisos');
    }
  };
};

module.exports = VerificarPermisos;

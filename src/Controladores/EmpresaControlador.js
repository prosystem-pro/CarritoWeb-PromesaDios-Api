const Sequelize = require('sequelize');
const sequelize = require('../BaseDatos/ConexionBaseDatos');
const Empresa = require('../Modelos/Empresa')(sequelize, Sequelize.DataTypes);


const Listado = async (req, res) => {
  try {
    // Obtenemos todas las empresas
    const Objeto = await Empresa.findAll();
    // Verificamos si hay resultados
    if (Objeto && Objeto.length > 0) {
      return res.json(Objeto);
    } else {
      return res.status(400).json({ message: 'No se encontraron empresas' });
    }
  } catch (error) {
    // Capturamos detalles completos del error
    const ErrorDetails = {
      message: error.message,
      stack: error.stack,
      type: error.name,
      // Si hay un error interno (similar a InnerException en .NET), lo agregamos
      innerError: error.innerError ? error.innerError.message : null,
      innerStack: error.innerError ? error.innerError.stack : null
    };
    console.error('Error al obtener los registros:', ErrorDetails);
    // Devolvemos la información detallada del error
    return res.status(500).json({ 
      message: 'Error al obtener los registros', 
      error: ErrorDetails 
    });
  }
};
const ObtenerPorCodigo = async (req, res) => {
  try {
    // Obtenemos el codigoEmpresa desde los parámetros de la URL
    const { codigo } = req.params;
    // Buscamos la empresa por su codigoEmpresa
    const Objeto = await Empresa.findOne({ where: { CodigoEmpresa: codigo } });
    // Verificamos si se encontró la empresa
    if (Objeto) {
      return res.json(Objeto);
    } else {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
  } catch (error) {
    // Capturamos detalles completos del error
    const ErrorDetails = {
      message: error.message,
      stack: error.stack,
      type: error.name,
      innerError: error.innerError ? error.innerError.message : null,
      innerStack: error.innerError ? error.innerError.stack : null
    };
    console.error('Error al obtener el registro:', ErrorDetails);
    // Devolvemos la información detallada del error
    return res.status(500).json({
      message: 'Error al obtener la empresa',
      error: ErrorDetails
    });
  }
};

const Buscar = async (req, res) => {
  try {
    const { tipoBusqueda, valorBusqueda } = req.params;
    let Objeto;
    // Realizamos la búsqueda según el tipo de búsqueda
    switch (parseInt(tipoBusqueda)) {
      case 1: // Nombre de la empresa
        Objeto = await Empresa.findAll({
          where: {
            NombreEmpresa: {
              [Sequelize.Op.like]: `%${valorBusqueda}%`
            },
            Estatus: 1 // Solo activos
          }
        });
        break;
      case 2: // Empresas activas
        Objeto = await Empresa.findAll({
          where: {
            Estatus: 1
          },
          order: [['NombreEmpresa', 'ASC']] // Ordenar por nombre de empresa
        });
        break;
      default:
        return res.status(404).json({ message: 'Tipo de búsqueda no válido' });
    }

    // Verificamos si se encontraron resultados
    if (Objeto && Objeto.length > 0) {
      return res.json(Objeto);
    } else {
      return res.status(404).json({ message: 'No se encontraron registros' });
    }
  } catch (error) {
    // Capturamos detalles completos del error
    const ErrorDetails = {
      message: error.message,
      stack: error.stack,
      type: error.name,
      innerError: error.innerError ? error.innerError.message : null,
      innerStack: error.innerError ? error.innerError.stack : null
    };
    console.error('Error al realizar la búsqueda:', ErrorDetails);
    // Devolvemos la información detallada del error
    return res.status(500).json({
      message: 'Error al realizar la búsqueda',
      error: ErrorDetails
    });
  }
};

const Crear = async (req, res) => {
  try {
    // Creamos una nueva instancia de la empresa con los datos del cuerpo de la solicitud
    const Objeto = await Empresa.create(req.body);

    // Devolvemos una respuesta exitosa si la creación fue exitosa
    return res.status(201).json({ message: 'Se guardó el registro exitosamente.' });

  } catch (error) {
    // Capturamos detalles completos del error
    const ErrorDetails = {
      message: error.message,
      stack: error.stack,
      type: error.name,
      innerError: error.innerError ? error.innerError.message : null,
      innerStack: error.innerError ? error.innerError.stack : null
    };
    console.error('Error al crear el registro:', ErrorDetails);

    // Devolvemos la información detallada del error
    return res.status(400).json({
      message: 'Error al crear el registro',
      error: ErrorDetails
    });
  }
};

const Editar = async (req, res) => {
  try {
    // Obtenemos el codigoEmpresa desde los parámetros de la URL
    const { codigo } = req.params;

    // Buscamos la empresa por su CodigoEmpresa
    const Objeto = await Empresa.findOne({ where: { CodigoEmpresa: codigo } });

    // Verificamos si la empresa existe
    if (!Objeto) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }

    // Actualizamos los datos de la empresa con los nuevos valores del cuerpo de la solicitud
    await Objeto.update(req.body);

    // Devolvemos una respuesta exitosa si la actualización fue exitosa
    return res.status(200).json({ message: 'Se actualizó el registro exitosamente.' });

  } catch (error) {
    // Capturamos detalles completos del error
    const ErrorDetails = {
      message: error.message,
      stack: error.stack,
      type: error.name,
      innerError: error.innerError ? error.innerError.message : null,
      innerStack: error.innerError ? error.innerError.stack : null
    };
    console.error('Error al actualizar el registro:', ErrorDetails);

    // Devolvemos la información detallada del error
    return res.status(400).json({
      message: 'Error al actualizar el registro',
      error: ErrorDetails
    });
  }
};
const Eliminar = async (req, res) => {
  try {
    // Obtenemos el CodigoEmpresa desde los parámetros de la URL
    const { codigo } = req.params;

    // Buscamos la empresa por su CodigoEmpresa
    const Objeto = await Empresa.findOne({ where: { CodigoEmpresa: codigo } });

    // Verificamos si la empresa existe
    if (!Objeto) {
      return res.status(404).json({ message: 'Registro no encontrada' });
    }

    // Eliminamos la empresa
    await Objeto.destroy();

    // Enviamos una respuesta exitosa
    return res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    // Capturamos detalles completos del error
    const ErrorDetails = {
      message: error.message,
      stack: error.stack,
      type: error.name,
      innerError: error.innerError ? error.innerError.message : null,
      innerStack: error.innerError ? error.innerError.stack : null
    };
    console.error('Error al eliminar el registro:', ErrorDetails);

    // Devolvemos la información detallada del error
    return res.status(400).json({
      message: 'Error al eliminar la empresa',
      error: ErrorDetails
    });
  }
};

module.exports = { Listado, 
  ObtenerPorCodigo,
  Buscar,
  Crear,
  Editar,
  Eliminar };

const ManejarError = (error, mensajeError) => {
    const detallesError = {
      message: error.message,
      stack: error.stack,
      type: error.name,
      innerError: error.innerError ? error.innerError.message : null,
      innerStack: error.innerError ? error.innerError.stack : null
    };
  
    throw { message: mensajeError, error: detallesError };
  };
  
  module.exports = ManejarError;
  
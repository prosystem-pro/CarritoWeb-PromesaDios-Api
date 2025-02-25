const ManejarError = (error, res, MensajeError) => {
    const DetallesError = {
      message: error.message,
      stack: error.stack,
      type: error.name,
      innerError: error.innerError ? error.innerError.message : null,
      innerStack: error.innerError ? error.innerError.stack : null
    };

    return res.status(500).json({
      message: MensajeError,
      error: DetallesError
    });
  };
  
  module.exports = ManejarError;
  
  
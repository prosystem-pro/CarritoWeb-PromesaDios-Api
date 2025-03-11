const Cors = require('cors');

const OpcionesCors = {
  origin: process.env.CORS_ALLOWED_ORIGINS.split(','),
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

const ConfiguracionCors = () => {
  return Cors(OpcionesCors);
};

module.exports = { ConfiguracionCors };

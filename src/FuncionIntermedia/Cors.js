const Cors = require('cors');

const OpcionesCors = {
  origin: process.env.CORS_ALLOWED_ORIGINS.split(','),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

const ConfiguracionCors = () => Cors(OpcionesCors);

module.exports = { ConfiguracionCors };

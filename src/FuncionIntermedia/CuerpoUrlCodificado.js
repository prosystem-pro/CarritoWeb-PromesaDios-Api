// Importa el módulo body-parser para analizar datos de las solicitudes HTTP
const Analizador = require('body-parser');

// Crea un middleware para analizar cuerpos de solicitudes con datos codificados en URL
const CuerpoUrlCodificado = Analizador.urlencoded({ extended: true });

// Exporta el middleware para ser utilizado en otros archivos
module.exports = CuerpoUrlCodificado;

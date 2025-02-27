const { SubirImagenAAlmacenamiento } = require("../Servicios/SubirImagenServicio");

const SubirImagen = async (Solicitud, Respuesta) => {
  try {
    if (!Solicitud.file) {
      return Respuesta.status(400).json({ Error: "No se envió ninguna imagen" });
    }

    const UrlImagen = await SubirImagenAAlmacenamiento(Solicitud.file);
    Respuesta.json({ Mensaje: "Imagen subida con éxito", UrlImagen });
  } catch (Error) {
    console.error(Error);
    Respuesta.status(500).json({ Error: Error.message || "Error al procesar la imagen" });
  }
};

module.exports = { SubirImagen };

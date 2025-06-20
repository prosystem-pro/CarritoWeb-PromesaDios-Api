const ManejarError = require('../Utilidades/ErrorControladores');
const { SubirImagenAlmacenamiento } = require("../Servicios/SubirImagenServicio");
const { EliminarImagen } = require("../Servicios/EliminarImagenServicio");
const { ConstruirUrlImagen } = require('../Utilidades/ConstruirUrlImagen');

const Servicios = {
  EmpresaPortada: require("../Servicios/EmpresaPortadaServicio"),
  Navbar: require("../Servicios/NavbarServicio"),
  Footer: require("../Servicios/FooterServicio"),
  Carrusel: require("../Servicios/CarruselServicio"),
  CarruselImagen: require("../Servicios/CarruselImagenServicio"),
  ClasificacionProducto: require("../Servicios/ClasificacionProductoServicio"),
  RedSocial: require("../Servicios/RedSocialServicio"),
  Otro: require("../Servicios/OtroServicio"),
  ContactanosPortada: require("../Servicios/ContactanosPortadaServicio"),
  Producto: require("../Servicios/ProductoServicio"),
  ProductoPortada: require("../Servicios/ProductoPortadaServicio"),
  CarritoPortada: require("../Servicios/CarritoPortadaServicio"),
  MenuPortada: require("../Servicios/MenuPortadaServicio"),
  LogoImagen: require("../Servicios/LogoImagenServicio"),
  LoginPortada: require("../Servicios/LoginPortadaServicio"),
  RedSocialImagen: require("../Servicios/RedSocialImagenServicio"),
};

const SubirImagen = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ Error: "No se envió ninguna imagen" });
    }

    const {
      CarpetaPrincipal,
      SubCarpeta,
      CodigoVinculado,
      CodigoPropio,
      CampoVinculado,
      CampoPropio,
      NombreCampoImagen,
    } = req.body;

    if (!CarpetaPrincipal || !SubCarpeta) {
      return res.status(400).json({ Error: "Las carpetas son obligatorias" });
    }

    const Servicio = Servicios[SubCarpeta];
    if (!Servicio) {
      return res.status(400).json({ Error: `No hay servicio para la carpeta ${SubCarpeta}` });
    }

    // === VERIFICACIÓN DE LÍMITES ===
    const [archivos] = await Almacenamiento.getFiles({
      prefix: `${CarpetaPrincipal}/${SubCarpeta}/`
    });

    // Limite de cantidad
    if (archivos.length >= 250) {
      return res.status(400).json({ Error: "Límite de 250 imágenes alcanzado" });
    }

    // Límite de tamaño en bytes (500MB)
    let totalBytes = 0;
    for (const archivo of archivos) {
      const [metadata] = await archivo.getMetadata();
      totalBytes += Number(metadata.size || 0);
    }

    if (totalBytes >= 500 * 1024 * 1024) {
      return res.status(400).json({ Error: "Límite de espacio (500MB) alcanzado" });
    }

    // === SUBIDA DE IMAGEN Y ACTUALIZACIÓN ===

    let Entidad = {};
    let Datos = {};

    const RutaRelativa = await SubirImagenAlmacenamiento(req.file, CarpetaPrincipal, SubCarpeta);
    const UrlPublica = `${process.env.URL_PUBLICA_FIREBASE}${RutaRelativa}`;

    if (CodigoVinculado && !CodigoPropio) {
      Datos[CampoVinculado] = CodigoVinculado;
      Datos[NombreCampoImagen] = RutaRelativa;
      Entidad = await Servicio.Crear(Datos);
    } else if (!CodigoVinculado && CodigoPropio) {
      Datos[CampoPropio] = CodigoPropio;
      const EntidadExistente = await Servicio.ObtenerPorCodigo(CodigoPropio);

      if (EntidadExistente && EntidadExistente[NombreCampoImagen]) {
        await EliminarImagen(`${process.env.URL_PUBLICA_FIREBASE}${EntidadExistente[NombreCampoImagen]}`);
      }

      Datos[NombreCampoImagen] = RutaRelativa;
      Entidad = await Servicio.Editar(CodigoPropio, Datos);
    } else if (CodigoVinculado && CodigoPropio) {
      Datos[CampoVinculado] = CodigoVinculado;
      Datos[CampoPropio] = CodigoPropio;

      const EntidadExistente = await Servicio.ObtenerPorCodigo(CodigoPropio);

      if (EntidadExistente && EntidadExistente[NombreCampoImagen]) {
        await EliminarImagen(`${process.env.URL_PUBLICA_FIREBASE}${EntidadExistente[NombreCampoImagen]}`);
      }

      Datos[NombreCampoImagen] = RutaRelativa;
      Entidad = await Servicio.Editar(CodigoPropio, Datos);
    } else {
      Datos[NombreCampoImagen] = RutaRelativa;
      Entidad = await Servicio.Crear(Datos);
    }

    if (Entidad && Entidad[NombreCampoImagen]) {
      Entidad[NombreCampoImagen] = ConstruirUrlImagen(Entidad[NombreCampoImagen]);
    }

    return res.status(201).json({
      Mensaje: `${SubCarpeta} procesado con éxito`,
      Entidad,
      UrlImagenPublica: UrlPublica
    });
  } catch (error) {
    return ManejarError(error, res, "Error al procesar la imagen");
  }
};

module.exports = { SubirImagen };

const ManejarError = require('../Utilidades/ErrorControladores');
const { SubirImagenAlmacenamiento } = require("../Servicios/SubirImagenServicio");
const { EliminarImagen } = require("../Servicios/EliminarImagenServicio");

const Servicios = {
  EmpresaPortada: require("../Servicios/EmpresaPortadaServicio"),
  Navbar: require("../Servicios/NavbarServicio"),
  Footer: require("../Servicios/FooterServicio"),
  EmpresaPortada: require("../Servicios/EmpresaPortadaServicio"),
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
  
};

const SubirImagen = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ Error: "No se envió ninguna imagen" });
    }

    const { CarpetaPrincipal, SubCarpeta, CodigoVinculado, CodigoPropio, CampoVinculado, CampoPropio, NombreCampoImagen } = req.body;

    if (!CarpetaPrincipal || !SubCarpeta) {
      return res.status(400).json({ Error: "Las carpetas son obligatorias" });
    }

    const Servicio = Servicios[SubCarpeta];
    if (!Servicio) {
      return res.status(400).json({ Error: `No hay servicio para la carpeta ${SubCarpeta}` });
    }

    let Entidad = {};
    let Datos = {};

    if (CodigoVinculado && !CodigoPropio) {
      Datos[CampoVinculado] = CodigoVinculado;
      const UrlImagen = await SubirImagenAlmacenamiento(req.file, CarpetaPrincipal, SubCarpeta);
      Datos[NombreCampoImagen] = UrlImagen;
      Entidad = await Servicio.Crear(Datos);
    }

    else if (!CodigoVinculado && CodigoPropio) {
      Datos[CampoPropio] = CodigoPropio;
      const EntidadExistente = await Servicio.ObtenerPorCodigo(CodigoPropio);

      if (EntidadExistente && EntidadExistente[NombreCampoImagen]) {
        await EliminarImagen(EntidadExistente[NombreCampoImagen]);
      }

      const UrlImagen = await SubirImagenAlmacenamiento(req.file, CarpetaPrincipal, SubCarpeta);
      Datos[NombreCampoImagen] = UrlImagen;
      Entidad = await Servicio.Editar(Datos);
    }

    else if (CodigoVinculado && CodigoPropio) {
      Datos[CampoVinculado] = CodigoVinculado;
      Datos[CampoPropio] = CodigoPropio;

      const EntidadExistente = await Servicio.ObtenerPorCodigo(CodigoPropio);

      if (EntidadExistente && EntidadExistente[NombreCampoImagen]) {
        await EliminarImagen(EntidadExistente[NombreCampoImagen]);
      }

      const UrlImagen = await SubirImagenAlmacenamiento(req.file, CarpetaPrincipal, SubCarpeta);
      Datos[NombreCampoImagen] = UrlImagen;
      Entidad = await Servicio.Editar(CodigoPropio, Datos);
    }

    else {
      const UrlImagen = await SubirImagenAlmacenamiento(req.file, CarpetaPrincipal, SubCarpeta);
      Datos[NombreCampoImagen] = UrlImagen;
      Entidad = await Servicio.Crear(Datos);
    }

    return res.status(201).json({ Mensaje: `${SubCarpeta} procesado con éxito`, Entidad });
  } catch (error) {
    return ManejarError(error, res, 'Error al procesar la imagen');
  }
};

module.exports = { SubirImagen };

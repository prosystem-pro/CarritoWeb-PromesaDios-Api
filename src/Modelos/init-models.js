var DataTypes = require("sequelize").DataTypes;
var _AlertaEstilo = require("./AlertaEstilo");
var _AlertaEstiloBoton = require("./AlertaEstiloBoton");
var _CarritoPortada = require("./CarritoPortada");
var _Carrusel = require("./Carrusel");
var _CarruselImagen = require("./CarruselImagen");
var _ClasificacionProducto = require("./ClasificacionProducto");
var _ContactanosPortada = require("./ContactanosPortada");
var _Empresa = require("./Empresa");
var _EmpresaPortada = require("./EmpresaPortada");
var _Footer = require("./Footer");
var _Icono = require("./Icono");
var _Logo = require("./Logo");
var _LogoImagen = require("./LogoImagen");
var _MenuPortada = require("./MenuPortada");
var _Nabvar = require("./Nabvar");
var _Otro = require("./Otro");
var _Permiso = require("./Permiso");
var _PermisoRol = require("./PermisoRol");
var _PortadaOtro = require("./PortadaOtro");
var _Producto = require("./Producto");
var _ProductoPortada = require("./ProductoPortada");
var _RedSocial = require("./RedSocial");
var _RedSocialImagen = require("./RedSocialImagen");
var _ReporteProducto = require("./ReporteProducto");
var _ReporteRedSocial = require("./ReporteRedSocial");
var _ReporteRedSocialPortada = require("./ReporteRedSocialPortada");
var _ReporteTiempoPagina = require("./ReporteTiempoPagina");
var _ReporteTiempoPaginaPortada = require("./ReporteTiempoPaginaPortada");
var _ReporteVista = require("./ReporteVista");
var _ReporteVistaPortada = require("./ReporteVistaPortada");
var _Rol = require("./Rol");
var _Usuario = require("./Usuario");

function initModels(sequelize) {
  var AlertaEstilo = _AlertaEstilo(sequelize, DataTypes);
  var AlertaEstiloBoton = _AlertaEstiloBoton(sequelize, DataTypes);
  var CarritoPortada = _CarritoPortada(sequelize, DataTypes);
  var Carrusel = _Carrusel(sequelize, DataTypes);
  var CarruselImagen = _CarruselImagen(sequelize, DataTypes);
  var ClasificacionProducto = _ClasificacionProducto(sequelize, DataTypes);
  var ContactanosPortada = _ContactanosPortada(sequelize, DataTypes);
  var Empresa = _Empresa(sequelize, DataTypes);
  var EmpresaPortada = _EmpresaPortada(sequelize, DataTypes);
  var Footer = _Footer(sequelize, DataTypes);
  var Icono = _Icono(sequelize, DataTypes);
  var Logo = _Logo(sequelize, DataTypes);
  var LogoImagen = _LogoImagen(sequelize, DataTypes);
  var MenuPortada = _MenuPortada(sequelize, DataTypes);
  var Nabvar = _Nabvar(sequelize, DataTypes);
  var Otro = _Otro(sequelize, DataTypes);
  var Permiso = _Permiso(sequelize, DataTypes);
  var PermisoRol = _PermisoRol(sequelize, DataTypes);
  var PortadaOtro = _PortadaOtro(sequelize, DataTypes);
  var Producto = _Producto(sequelize, DataTypes);
  var ProductoPortada = _ProductoPortada(sequelize, DataTypes);
  var RedSocial = _RedSocial(sequelize, DataTypes);
  var RedSocialImagen = _RedSocialImagen(sequelize, DataTypes);
  var ReporteProducto = _ReporteProducto(sequelize, DataTypes);
  var ReporteRedSocial = _ReporteRedSocial(sequelize, DataTypes);
  var ReporteRedSocialPortada = _ReporteRedSocialPortada(sequelize, DataTypes);
  var ReporteTiempoPagina = _ReporteTiempoPagina(sequelize, DataTypes);
  var ReporteTiempoPaginaPortada = _ReporteTiempoPaginaPortada(sequelize, DataTypes);
  var ReporteVista = _ReporteVista(sequelize, DataTypes);
  var ReporteVistaPortada = _ReporteVistaPortada(sequelize, DataTypes);
  var Rol = _Rol(sequelize, DataTypes);
  var Usuario = _Usuario(sequelize, DataTypes);

  Usuario.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(Usuario, { as: "Usuarios", foreignKey: "CodigoEmpresa"});
  Carrusel.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(Carrusel, { as: "Carrusels", foreignKey: "CodigoEmpresa"});
  ClasificacionProducto.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(ClasificacionProducto, { as: "ClasificacionProductos", foreignKey: "CodigoEmpresa"});
  Icono.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(Icono, { as: "Iconos", foreignKey: "CodigoEmpresa"});
  Logo.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(Logo, { as: "Logos", foreignKey: "CodigoEmpresa"});
  Otro.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(Otro, { as: "Otros", foreignKey: "CodigoEmpresa"});
  RedSocial.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(RedSocial, { as: "RedSocials", foreignKey: "CodigoEmpresa"});
  CarritoPortada.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(CarritoPortada, { as: "CarritoPortadas", foreignKey: "CodigoEmpresa"});
  ReporteProducto.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(ReporteProducto, { as: "ReporteProductos", foreignKey: "CodigoEmpresa"});
  ReporteRedSocial.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(ReporteRedSocial, { as: "ReporteRedSocials", foreignKey: "CodigoEmpresa"});
  ReporteTiempoPagina.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(ReporteTiempoPagina, { as: "ReporteTiempoPaginas", foreignKey: "CodigoEmpresa"});
  ReporteVista.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(ReporteVista, { as: "ReporteVista", foreignKey: "CodigoEmpresa"});
  AlertaEstilo.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(AlertaEstilo, { as: "AlertaEstilos", foreignKey: "CodigoEmpresa"});
  ContactanosPortada.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(ContactanosPortada, { as: "ContactanosPortadas", foreignKey: "CodigoEmpresa"});
  EmpresaPortada.belongsTo(Empresa, { as: "CodigoEmpresaPortada_Empresa", foreignKey: "CodigoEmpresaPortada"});
  Empresa.hasOne(EmpresaPortada, { as: "EmpresaPortada", foreignKey: "CodigoEmpresaPortada"});
  Footer.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(Footer, { as: "Footers", foreignKey: "CodigoEmpresa"});
  MenuPortada.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(MenuPortada, { as: "MenuPortadas", foreignKey: "CodigoEmpresa"});
  Nabvar.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(Nabvar, { as: "Nabvars", foreignKey: "CodigoEmpresa"});
  PortadaOtro.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(PortadaOtro, { as: "PortadaOtros", foreignKey: "CodigoEmpresa"});
  ProductoPortada.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(ProductoPortada, { as: "ProductoPortadas", foreignKey: "CodigoEmpresa"});
  ReporteRedSocialPortada.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(ReporteRedSocialPortada, { as: "ReporteRedSocialPortadas", foreignKey: "CodigoEmpresa"});
  ReporteTiempoPaginaPortada.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(ReporteTiempoPaginaPortada, { as: "ReporteTiempoPaginaPortadas", foreignKey: "CodigoEmpresa"});
  ReporteVistaPortada.belongsTo(Empresa, { as: "CodigoEmpresa_Empresa", foreignKey: "CodigoEmpresa"});
  Empresa.hasMany(ReporteVistaPortada, { as: "ReporteVistaPortadas", foreignKey: "CodigoEmpresa"});
  PermisoRol.belongsTo(Permiso, { as: "CodigoPermiso_Permiso", foreignKey: "CodigoPermiso"});
  Permiso.hasMany(PermisoRol, { as: "PermisoRols", foreignKey: "CodigoPermiso"});
  PermisoRol.belongsTo(Rol, { as: "CodigoRol_Rol", foreignKey: "CodigoRol"});
  Rol.hasMany(PermisoRol, { as: "PermisoRols", foreignKey: "CodigoRol"});
  Usuario.belongsTo(Rol, { as: "CodigoRol_Rol", foreignKey: "CodigoRol"});
  Rol.hasMany(Usuario, { as: "Usuarios", foreignKey: "CodigoRol"});
  CarruselImagen.belongsTo(Carrusel, { as: "CodigoCarrusel_Carrusel", foreignKey: "CodigoCarrusel"});
  Carrusel.hasMany(CarruselImagen, { as: "CarruselImagens", foreignKey: "CodigoCarrusel"});
  Producto.belongsTo(ClasificacionProducto, { as: "CodigoClasificacionProducto_ClasificacionProducto", foreignKey: "CodigoClasificacionProducto"});
  ClasificacionProducto.hasMany(Producto, { as: "Productos", foreignKey: "CodigoClasificacionProducto"});
  LogoImagen.belongsTo(Logo, { as: "CodigoLogo_Logo", foreignKey: "CodigoLogo"});
  Logo.hasMany(LogoImagen, { as: "LogoImagens", foreignKey: "CodigoLogo"});
  ReporteProducto.belongsTo(Producto, { as: "CodigoProducto_Producto", foreignKey: "CodigoProducto"});
  Producto.hasMany(ReporteProducto, { as: "ReporteProductos", foreignKey: "CodigoProducto"});
  ReporteRedSocial.belongsTo(RedSocial, { as: "CodigoRedSocial_RedSocial", foreignKey: "CodigoRedSocial"});
  RedSocial.hasMany(ReporteRedSocial, { as: "ReporteRedSocials", foreignKey: "CodigoRedSocial"});
  RedSocialImagen.belongsTo(RedSocial, { as: "CodigoRedSocial_RedSocial", foreignKey: "CodigoRedSocial"});
  RedSocial.hasMany(RedSocialImagen, { as: "RedSocialImagens", foreignKey: "CodigoRedSocial"});
  AlertaEstiloBoton.belongsTo(AlertaEstilo, { as: "CodigoAlertaEstilo_AlertaEstilo", foreignKey: "CodigoAlertaEstilo"});
  AlertaEstilo.hasMany(AlertaEstiloBoton, { as: "AlertaEstiloBotons", foreignKey: "CodigoAlertaEstilo"});

  return {
    AlertaEstilo,
    AlertaEstiloBoton,
    CarritoPortada,
    Carrusel,
    CarruselImagen,
    ClasificacionProducto,
    ContactanosPortada,
    Empresa,
    EmpresaPortada,
    Footer,
    Icono,
    Logo,
    LogoImagen,
    MenuPortada,
    Nabvar,
    Otro,
    Permiso,
    PermisoRol,
    PortadaOtro,
    Producto,
    ProductoPortada,
    RedSocial,
    RedSocialImagen,
    ReporteProducto,
    ReporteRedSocial,
    ReporteRedSocialPortada,
    ReporteTiempoPagina,
    ReporteTiempoPaginaPortada,
    ReporteVista,
    ReporteVistaPortada,
    Rol,
    Usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

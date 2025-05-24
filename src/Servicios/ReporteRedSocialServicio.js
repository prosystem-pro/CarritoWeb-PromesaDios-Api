const Sequelize = require('sequelize');
const BaseDatos = require('../BaseDatos/ConexionBaseDatos');
const Modelo = require('../Modelos/ReporteRedSocial')(BaseDatos, Sequelize.DataTypes);
const ModeloRedSocial = require('../Modelos/RedSocial')(BaseDatos, Sequelize.DataTypes);
const { DateTime } = require('luxon');

const NombreModelo= 'NombreDiagrama';
const CodigoModelo= 'CodigoReporteRedSocial'

const ObtenerResumen = async (Anio, Mes) => {
  // 1. Obtener todos los registros con Estatus 1 o 2
  const Registros = await Modelo.findAll({ where: { Estatus: [1, 2] } });

  // 2. Convertir las fechas a la zona horaria de Guatemala
  const RegistrosConFechaLocal = Registros.map(Registro => {
    const RegistroPlano = Registro.toJSON();
    if (RegistroPlano.Fecha) {
      RegistroPlano.Fecha = DateTime
        .fromJSDate(RegistroPlano.Fecha)
        .setZone('America/Guatemala');
    }
    return RegistroPlano;
  });
  console.log('Registros con Fecha Local:', RegistrosConFechaLocal);

  // 3. Filtrar registros según el año y mes proporcionados
  const RegistrosFiltrados = (Anio && Mes)
    ? RegistrosConFechaLocal.filter(Registro =>
        Registro.Fecha.year === parseInt(Anio) &&
        Registro.Fecha.month === parseInt(Mes)
      )
    : RegistrosConFechaLocal;

  // 4. Contar cuántos registros hay por cada día del mes filtrado
  const ConteoPorDia = {};
  RegistrosFiltrados.forEach(Registro => {
    const Dia = Registro.Fecha.day;
    ConteoPorDia[Dia] = (ConteoPorDia[Dia] || 0) + 1;
  });

  // 5. Convertir el conteo por día a array ordenado (del día 01 en adelante)
  const ConteoPorDiaOrdenadoArray = Object.entries(ConteoPorDia)
    .map(([Dia, Total]) => ({ dia: Dia.toString().padStart(2, '0'), total: Total }))
    .sort((a, b) => parseInt(a.dia) - parseInt(b.dia));

  // 6. Nombres de los meses para el reporte anual
  const MesesNombres = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // 7. Filtrar registros solo por año para conteo mensual
  const RegistrosDelAnio = Anio
    ? RegistrosConFechaLocal.filter(Registro =>
        Registro.Fecha.year === parseInt(Anio)
      )
    : [];

  // 8. Contar cuántos registros hay por cada mes del año filtrado
  const ConteoPorMes = new Array(12).fill(0);
  RegistrosDelAnio.forEach(Registro => {
    const MesIndex = Registro.Fecha.month - 1;
    ConteoPorMes[MesIndex]++;
  });

  // 9. Formatear conteo mensual con nombres y números de mes
  const ConteoPorMesFormateado = ConteoPorMes.map((Total, Index) => ({
    mes: (Index + 1).toString().padStart(2, '0'),
    nombre: MesesNombres[Index],
    total: Total
  }));

// === 10. NUEVO: Top 3 redes sociales con más solicitudes ===
const ConteoPorRedSocial = {};

RegistrosFiltrados.forEach(Registro => {
  const Codigo = Registro.CodigoRedSocial;
  if (Codigo) {
    ConteoPorRedSocial[Codigo] = (ConteoPorRedSocial[Codigo] || 0) + 1;
  }
});

const TopCodigos = Object.entries(ConteoPorRedSocial)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 3); // Top 3

const TopRedesSociales = [];

for (const [CodigoRed, Total] of TopCodigos) {
  const Red = await ModeloRedSocial.findOne({
    where: { CodigoRedSocial: parseInt(CodigoRed) }
  });

  if (Red) {
    TopRedesSociales.push({
      codigo: CodigoRed,
      nombre: Red.NombreRedSocial, // Nombre de la red
      total: Total,
      urlImagen: Red.UrlImagen       // Agregamos la imagen
    });
  }
}

// === 11. NUEVO: Todas las redes sociales con total del mes ===
  const ResumenRedesSociales = [];

  for (const [CodigoRed, Total] of Object.entries(ConteoPorRedSocial)) {
    const Red = await ModeloRedSocial.findOne({
      where: { CodigoRedSocial: parseInt(CodigoRed) }
    });

    if (Red) {
      ResumenRedesSociales.push({
        codigo: CodigoRed,
        nombre: Red.NombreRedSocial,
        total: Total
      });
    }
  }

  // 11. Retornar objeto con todos los resultados
  return {
    SolicitudTotalMes: RegistrosFiltrados.length,
    SolicitudesDiaMes: ConteoPorDiaOrdenadoArray,
    SolicitudesPorMes: ConteoPorMesFormateado,
    TopRedesSociales,
    ResumenRedesSociales
  };
};


const Listado = async () => {
  return await Modelo.findAll({ where: { Estatus:  [1,2] } });
};

const ObtenerPorCodigo = async (Codigo) => {
  return await Modelo.findOne({ where: { [CodigoModelo]: Codigo } });
};

const Buscar = async (TipoBusqueda, ValorBusqueda) => {
  switch (parseInt(TipoBusqueda)) {
    case 1:
      return await Modelo.findAll({
        where: { [NombreModelo]: { [Sequelize.Op.like]: `%${ValorBusqueda}%` }, Estatus:  [1,2] }
      });
    case 2:
      return await Modelo.findAll({ where: { Estatus:  [1,2] }, order: [[NombreModelo, 'ASC']] });
    default:
      return null;
  }
};

const Crear = async (Datos) => {
  const EsArray = Array.isArray(Datos);
  const ListaDatos = EsArray ? Datos : [Datos];

  const FechaActual = DateTime.now().setZone('America/Guatemala').toISO();
  const DatosConFecha = ListaDatos.map(dato => ({
    ...dato,
    Fecha: FechaActual,
  }));

  return EsArray
    ? await Modelo.bulkCreate(DatosConFecha)
    : await Modelo.create(DatosConFecha[0]);
};

const Editar = async (Codigo, Datos) => {
  const Objeto = await Modelo.findOne({ where: { [CodigoModelo]: Codigo } });
  if (!Objeto) return null;
  await Objeto.update(Datos);
  return Objeto;
};

const Eliminar = async (Codigo) => {
  const Objeto = await Modelo.findOne({ where: { [CodigoModelo]: Codigo } });
  if (!Objeto) return null;
  await Objeto.destroy();
  return Objeto;
};

module.exports = { Listado, ObtenerPorCodigo, Buscar, Crear, Editar, Eliminar, ObtenerResumen };

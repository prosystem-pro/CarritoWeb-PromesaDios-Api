const Sequelize = require('sequelize');
const BaseDatos = require('../BaseDatos/ConexionBaseDatos');
const Modelo = require('../Modelos/ReporteVista')(BaseDatos, Sequelize.DataTypes);
const { DateTime } = require('luxon');

const NombreModelo= 'NombreDiagrama';
const CodigoModelo= 'CodigoReporteVista'

const ObtenerResumen = async (anio, mes) => {
  const registros = await Modelo.findAll({ where: { Estatus: [1, 2] } });

  const registrosConFechaLocal = registros.map(registro => {
    const registroPlano = registro.toJSON();
    if (registroPlano.Fecha) {
      registroPlano.Fecha = DateTime
        .fromISO(registroPlano.Fecha.toISOString())
        .setZone('America/Guatemala');
    }
    return registroPlano;
  });

  const registrosFiltrados = (anio && mes)
    ? registrosConFechaLocal.filter(registro =>
        registro.Fecha.year === parseInt(anio) &&
        registro.Fecha.month === parseInt(mes)
      )
    : registrosConFechaLocal;

  const conteoPorDia = {};
  registrosFiltrados.forEach(registro => {
    const dia = registro.Fecha.day;
    conteoPorDia[dia] = (conteoPorDia[dia] || 0) + 1;
  });

  const conteoPorDiaOrdenadoArray = Object.entries(conteoPorDia)
    .map(([dia, total]) => ({ dia: dia.toString().padStart(2, '0'), total }))
    .sort((a, b) => parseInt(a.dia) - parseInt(b.dia));

  const mesesNombres = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const registrosDelAnio = anio
    ? registrosConFechaLocal.filter(registro =>
        registro.Fecha.year === parseInt(anio)
      )
    : [];

  const conteoPorMes = new Array(12).fill(0);

  registrosDelAnio.forEach(registro => {
    const mesIndex = registro.Fecha.month - 1;
    conteoPorMes[mesIndex]++;
  });

  const conteoPorMesFormateado = conteoPorMes.map((total, index) => ({
    mes: (index + 1).toString().padStart(2, '0'),
    nombre: mesesNombres[index],
    total
  }));

  return {
    SolicitudTotalMes: registrosFiltrados.length,
    SolicitudesDiaMes: conteoPorDiaOrdenadoArray,
    SolicitudesPorMes: conteoPorMesFormateado
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

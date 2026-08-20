/**
 * Datos ficticios para los endpoints de ApiPrepService (avance, combos, grafica,
 * estadistica, mapas, distribucion) usados por mock-api.interceptor.ts cuando
 * environment.useMockApi está activo, ya que environment.api_prep no tiene backend
 * levantado en este entorno. Habilita probar el drill-down de combos (Distrito/Alcaldía
 * → Sección → Casilla) sin depender del servicio real.
 */

const ALCALDIAS = [
  'Álvaro Obregón', 'Azcapotzalco', 'Benito Juárez', 'Coyoacán', 'Cuajimalpa de Morelos',
  'Cuauhtémoc', 'Gustavo A. Madero', 'Iztacalco', 'Iztapalapa', 'La Magdalena Contreras',
  'Miguel Hidalgo', 'Milpa Alta', 'Tláhuac', 'Tlalpan', 'Venustiano Carranza', 'Xochimilco'
];

const CANDIDATURAS = [
  { id_participante: 1, campo_votos: 'votos_part_1', siglas: 'PAN', descripcion: 'PAN' },
  { id_participante: 2, campo_votos: 'votos_part_2', siglas: 'PRI', descripcion: 'PRI' },
  { id_participante: 3, campo_votos: 'votos_part_3', siglas: 'PRD', descripcion: 'PRD' },
  { id_participante: 4, campo_votos: 'votos_part_4', siglas: 'MORENA', descripcion: 'MORENA' },
  { id_participante: 5, campo_votos: 'votos_part_5', siglas: 'MC', descripcion: 'Movimiento Ciudadano' },
];

export function mockAvance() {
  return {
    succes: true,
    avance: {
      actas_capturadas: 4319,
      actas_capturadas_de: 4319,
      actas_cap_porcen: '100.0000',
      participacion_porcen: '51.0063',
      ln: 1234567
    },
    corte: {
      corte_fecha: '19 de Agosto de 2026',
      corte_hora: '20:00',
      dia: '19', mes: 'Agosto', anio: 2026, hora: '20', minuto: '00', segundo: '00'
    }
  };
}

export function mockResumenVotacion() {
  return {
    success: true,
    resumen_votacion: {
      votos_acumulados: 850000,
      candidatos_no_reg: 1200,
      nulos: 15000,
      total: 866200,
      votos_acumulados_por: '98.1234',
      votos_sin_especiales: 840000,
      votos_especiales: 10000,
      suma_esp_s_esp: 850000,
      candidatos_no_reg_por: '0.1385',
      nulos_por: '1.7314',
      total_por: '100.0000',
      porcentaje_votos_acumulados: '98.1234'
    }
  };
}

function votosAleatoriosPorCandidatura(seed: number) {
  const base = CANDIDATURAS.map((c, i) => {
    const total_votos = Math.round(80000 + (i + 1) * (12000 + seed * 137) % 60000);
    return { ...c, total_votos };
  });
  const sumaTotal = base.reduce((acc, c) => acc + c.total_votos, 0);
  const conPorcentaje = base.map(c => ({
    ...c,
    porcentaje: sumaTotal ? Number((c.total_votos * 100 / sumaTotal).toFixed(4)) : 0
  }));
  const ganadorId = conPorcentaje.reduce((max, c) => c.total_votos > max.total_votos ? c : max, conPorcentaje[0]).id_participante;
  return conPorcentaje.map(c => ({ ...c, ganador: c.id_participante === ganadorId }));
}

export function mockGrafica(seed: number) {
  const agrupado = votosAleatoriosPorCandidatura(seed);
  const votos_acumulados = agrupado.reduce((acc, c) => acc + c.total_votos, 0);
  return {
    success: true,
    data: {
      agrupado,
      resumen_votacion: {
        votos_acumulados,
        porcentaje_votos_acumulados: '98.1234',
        votos_candidaturas_no_registradas: 1200,
        porcentaje_votos_candidaturas_no_registradas: '0.1385',
        votos_nulos: 15000,
        porcentaje_votos_nulos: '1.7314',
        total_votos: votos_acumulados + 1200 + 15000,
        porcentaje_total_votos: '100.0000'
      }
    }
  };
}

export function mockPruebaDistribucion(seed: number) {
  const agrupado = votosAleatoriosPorCandidatura(seed);
  const dataExtranjero = agrupado.map(c => ({ ...c, total_votos: Math.round(c.total_votos * 0.01) }));
  return {
    success: true,
    data: { agrupado, dataExtranjero }
  };
}

// sidebar.component.ts lee una clave distinta por cada nivel del combo pese a que los tres
// endpoints comparten la misma interfaz declarada (ResponseSeccionPorDistrito): "categories" en
// combos/primero (inicializarPrimerCombo), "subcategories" en combos/segundo (distOAlcaldia) e
// "items" en combos/tercero (cargarCasillasXSeccion). Se replica esa forma real, no la declarada.
export function mockCombosPrimero(type: number) {
  const categories = type === 4
    ? ALCALDIAS.map((name, i) => ({ id: i + 1, name }))
    : Array.from({ length: 5 }, (_, i) => ({ id: i + 1, name: `Distrito ${i + 1}` }));
  return {
    categories,
    estado: [{ reg_data: categories.length, reg_cat: categories.length, error: 0 }]
  };
}

export function mockCombosSegundo(seleccion: number) {
  const base = Number(seleccion) || 1;
  const subcategories = Array.from({ length: 5 }, (_, i) => ({ id: base * 1000 + i + 1, name: base * 1000 + i + 1 }));
  return {
    subcategories,
    estado: [{ reg_data: subcategories.length, reg_cat: subcategories.length, error: 0 }]
  };
}

export function mockCombosTercero(seccion: number) {
  const tipos = ['B1', 'C1', 'C2', 'S1'];
  const base = Number(seccion) || 1;
  const items = tipos.map((tipo, i) => ({ id: `${base}-${tipo}`, name: `${tipo} - Sección ${base}` }));
  return {
    items,
    estado: [{ reg_data: items.length, reg_cat: items.length, error: 0 }]
  };
}

export function mockEstadistica() {
  return {
    succes: true,
    msg: 'ok',
    data: {
      actas: { esperadas: 4319, computadas: 4319, esperadas_por: '100.0000', computadas_por: '100.0000' },
      cantidades_urbanas: { urbanas: 3900, no_urbanas: 419 },
      lista_nominal: { lista_nominal_oficial: 1700000, actas_contabilizadas: 4319 },
      votos: {
        votos_casillas_normales: 840000,
        votos_casillas_especiales: 10000,
        total_votos: 850000,
        suma_total_votos: 850000,
        total_votos_query: 850000
      }
    }
  };
}

export function mockMapas(type: number) {
  const participantes = CANDIDATURAS.map((c, i) => ({
    id_participante: c.id_participante,
    campo_votos: c.campo_votos,
    siglas: c.siglas,
    descripcion: c.descripcion,
    total_demarcaciones: i === 0 ? (type === 4 ? 6 : 12) : Math.max(0, 3 - i),
    ganador: i === 0
  }));
  const cantidad = type === 4 ? ALCALDIAS.length : 5;
  const result_votos = Array.from({ length: cantidad }, (_, i) => ({
    id_distrito: i + 1,
    total_votos_cc1: 20000 + i * 137,
    total_votos_cc5: 15000 + i * 98,
    votos_part_6: 12000 + i * 54,
    total: 47000 + i * 289
  }));
  return { success: true, msg: 'ok', data: { participantes, result_votos } };
}

export function mockBusquedaSeccion(seccion: number) {
  return {
    encontrada: {
      id_seccion: String(seccion || 1),
      id_delegacion: '1',
      id_distrito: '1',
      cuantos: 1
    }
  };
}

export function mockDistribucion(seleccion: number, seccion: number) {
  const value_fields = CANDIDATURAS.map(c => ({
    id_participante: c.id_participante,
    descripcion: c.descripcion,
    siglas: c.siglas,
    id_delegacion: Number(seleccion) || 1,
    tipo_participante: 1,
    prelacion: c.id_participante,
    integrantes: c.descripcion
  }));
  const columns = [
    { dataIndex: 'num_casilla', title: 'Casilla', key: 'num_casilla', resizable: 'resizable', width: 100, minWidth: 80, maxWidth: 160 },
    { dataIndex: 'votacion_total', title: 'Votación total', key: 'votacion_total', resizable: 'resizable', width: 120, minWidth: 100, maxWidth: 200 }
  ];
  const data = ['B1', 'C1', 'C2'].map((tipo, i) => ({
    id_delegacion: Number(seleccion) || 1,
    id_seccion: Number(seccion) || 1,
    tipo_casilla: tipo,
    id_distrito: Number(seleccion) || 1,
    votos_part_6: 100 + i * 10,
    votos_part_10: 90 + i * 8,
    votos_part_14: 80 + i * 6,
    votos_cand_no_reg: 2,
    votos_nulos: 5,
    votacion_total: 300 + i * 20,
    boletas_sob: 10,
    ciudadanos_votaron: 290 + i * 20,
    representantes_votaron: 6,
    total_votaron: 296 + i * 20,
    lista_nominal: 400 + i * 20
  }));
  const participacion = data.map(d => ({
    id_delegacion: d.id_delegacion,
    id_distrito: d.id_distrito,
    id_seccion: d.id_seccion,
    tipo_casilla: d.tipo_casilla,
    num_casilla: d.tipo_casilla,
    caracter_cas: 'Básica',
    total_votaron: d.total_votaron,
    lista_nominal: d.lista_nominal,
    participacion: ((d.total_votaron * 100) / d.lista_nominal).toFixed(2),
    votacion_total: d.votacion_total
  }));
  const resumen = {
    votos_acumulados: data.reduce((acc, d) => acc + d.votacion_total, 0),
    candidatos_no_reg: data.reduce((acc, d) => acc + d.votos_cand_no_reg, 0),
    nulos: data.reduce((acc, d) => acc + d.votos_nulos, 0),
    total: data.reduce((acc, d) => acc + d.votacion_total, 0),
    votos_acumulados_por: '98.0000',
    candidatos_no_reg_por: '0.6000',
    nulos_por: '1.4000',
    total_por: '100.0000'
  };
  return { success: true, msg: 'ok', itemRecords: { value_fields, columns, data, participacion, resumen } };
}

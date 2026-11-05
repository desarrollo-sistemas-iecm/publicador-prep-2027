import { AporteVotos, DistribucionCandidatura, DistribucionPartido, ResDistribucionVotos } from '../interfaces/distribucion-votos.interface';

/**
 * Datos de muestra para "Distribución de votos por Candidatura / por Partido Político" a
 * nivel distrito (vistas equivalentes del PREP Coahuila 2026). services-prep-2027 todavía
 * no expone un endpoint con los votos por combinación de coalición.
 */
const CANDIDATURAS: DistribucionCandidatura[] = [
  {
    nombre: 'Candidatura Movimiento Ciudadano',
    siglas: 'MC',
    aportes: [{ siglas: 'MC', votos: 1530 }],
    total: 1530,
  },
  {
    nombre: 'Candidatura Coalición PAN-PRI-PRD',
    siglas: 'PAN_PRI_PRD',
    aportes: [
      { siglas: 'PAN', votos: 5200 },
      { siglas: 'PRI', votos: 3100 },
      { siglas: 'PRD', votos: 900 },
      { siglas: 'PAN_PRI_PRD', votos: 420 },
      { siglas: 'PAN_PRI', votos: 180 },
      { siglas: 'PAN_PRD', votos: 90 },
      { siglas: 'PRI_PRD', votos: 60 },
    ],
    total: 9950,
  },
  {
    nombre: 'Candidatura Coalición PVEM-PT-MORENA',
    siglas: 'PVEM_PT_MORENA',
    aportes: [
      { siglas: 'MORENA', votos: 12076 },
      { siglas: 'PVEM', votos: 2293 },
      { siglas: 'PT', votos: 1378 },
      { siglas: 'PVEM_PT_MORENA', votos: 252 },
      { siglas: 'PT_MORENA', votos: 144 },
    ],
    total: 16143,
  },
  {
    nombre: 'Candidatura Independiente',
    siglas: 'CI',
    aportes: [{ siglas: 'CI', votos: 310 }],
    total: 310,
  },
];

const PARTIDOS = ['PAN', 'PRI', 'PRD', 'PVEM', 'PT', 'MC', 'MORENA', 'CI'];

// Reparte cada combinación en partes iguales entre los partidos que la forman.
const repartirPorPartido = (candidaturas: DistribucionCandidatura[]): DistribucionPartido[] => {
  const aportes = candidaturas.flatMap(({ aportes }) => aportes);

  return PARTIDOS.map((partido) => {
    const individual = aportes.find(({ siglas }) => siglas === partido)?.votos ?? 0;
    const coalicion: AporteVotos[] = aportes
      .filter(({ siglas }) => siglas !== partido && siglas.split('_').includes(partido))
      .map(({ siglas, votos }) => ({ siglas, votos: Math.floor(votos / siglas.split('_').length) }));
    const total = individual + coalicion.reduce((suma, { votos }) => suma + votos, 0);

    return { siglas: partido, individual, coalicion, total };
  });
};

export const mockDistribucionVotos = (): ResDistribucionVotos => ({
  candidaturas: CANDIDATURAS,
  partidos: repartirPorPartido(CANDIDATURAS),
});

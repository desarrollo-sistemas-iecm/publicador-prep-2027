export interface AporteVotos {
    siglas: string;
    votos: number;
}

export interface DistribucionCandidatura {
    nombre: string;
    siglas: string;
    aportes: AporteVotos[];
    total: number;
}

export interface DistribucionPartido {
    siglas: string;
    individual: number;
    coalicion: AporteVotos[];
    total: number;
}

export interface ResDistribucionVotos {
    candidaturas: DistribucionCandidatura[];
    partidos: DistribucionPartido[];
}

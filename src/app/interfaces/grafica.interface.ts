export interface ResumenGrafica {
    [campoVotos: string]: number | string | undefined;
    votos_cand_no_reg: number;
    votos_nulos: number;
    votacion_total: number;
}

export interface CandidatoGrafica {
    siglas: string;
    descripcion: string;
    total_votos: number;
    porcentaje: number;
    ganador: boolean;
}

export interface ResGrafica {
    success: boolean;
    resumen: ResumenGrafica;
    agrupado: CandidatoGrafica[];
}

export interface ResPruebaDistribucion {
    success: boolean;
    datosMSSQL: Record<string, unknown>[];
    agrupado: CandidatoGrafica[];
    dataExtranjero: CandidatoGrafica[];
}

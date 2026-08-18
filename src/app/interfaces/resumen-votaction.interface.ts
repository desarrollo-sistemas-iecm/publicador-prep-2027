export interface ResResumenVotacion {
    success:          boolean;
    resumen_votacion: ResumenVotacion;
}

export interface ResumenVotacion {
    votos_acumulados:      number;
    candidatos_no_reg:     number;
    nulos:                 number;
    total:                 number;
    votos_acumulados_por:  string;
    votos_sin_especiales:  number;
    votos_especiales:      number;
    suma_esp_s_esp:        number;
    candidatos_no_reg_por: string;
    nulos_por:             string;
    total_por:             string;
    porcentaje_votos_acumulados: string;
}

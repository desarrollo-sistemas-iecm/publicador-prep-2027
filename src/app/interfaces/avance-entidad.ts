/* 
export interface AvanceEntidad {
    capturadas_jg:   AvanceAlc[];
    capturadas_alc:  AvanceAlc[];
    capturadas_dmr:  AvanceAlc[];
    capturadas_rp:   AvanceAlc[];
    avance_jg:       AvanceAlc[];
    avance_alc:      AvanceAlc[];
    avance_dmr:      AvanceAlc[];
    avance_rp:       AvanceAlc[];
    resumen_jg:      Resumen[];
    resumen_alc:     Resumen[];
    resumen_dmr:     Resumen[];
    resumen_rp:      Resumen[];
    fields_vote_jg:  FieldsVote[];
    fields_vote_mr:  FieldsVote[];
    fields_vote_alc: FieldsVote[];
    rank_dto_jg:     RankD[];
    rank_dto_dmr:    RankD[];
    rank_dto_rp:     null;
    rank_del_alc:    RankD[];
    win_dto_dmr:     Win[];
    win_alc_alc:     Win[];
    votos_del_jg:    { [key: string]: number }[];
    votos_dto_dmr:   { [key: string]: number }[];
    votos_dto_rpe:   { [key: string]: number }[];
    votos_del_alc:   { [key: string]: number }[];
    estado:          Estado[];
}

export interface AvanceAlc {
    actas_capturadas:     number;
    actas_capturadas_de:  number;
    actas_cap_porcen:     string;
    participacion_porcen: string;
    ln:                   number;
}

export interface Estado {
    reg_data: number;
    reg_cat:  number;
    error:    number;
}

export interface FieldsVote {
    id_delegacion?:  number;
    id_participante: number;
    campo_votos:     string;
    siglas:          string;
    descripcion:     string;
    id_distrito?:    number;
}

export interface RankD {
    item:            number;
    number:          number;
    name:            Name;
    rank:            number;
    id_participante: string;
}

export enum Name {
    TotalVotosCc1 = "total_votos_cc1",
    TotalVotosCc4 = "total_votos_cc4",
    TotalVotosCc5 = "total_votos_cc5",
    TotalVotosCc8 = "total_votos_cc8",
    VotosPart1 = "votos_part_1",
    VotosPart6 = "votos_part_6",
    VotosPart9 = "votos_part_9",
}

export interface Resumen {
    votos_acumulados:      number;
    candidatos_no_reg:     number;
    nulos:                 number;
    total:                 number;
    votos_acumulados_por:  string;
    candidatos_no_reg_por: string;
    nulos_por:             string;
    total_por:             string;
}

export interface Win {
    id:         number;
    name:       string;
    color:      string;
    valor:      number;
    porcentaje: number;
    icono:      number;
    ganadas:    number;
}
 */

// Servicios con codeigniter

export interface ResAvance {
    succes: boolean;
    avance: Avance;
    corte:  Corte;
}

export interface Avance {
    actas_capturadas:     number;
    actas_capturadas_de:  number;
    actas_cap_porcen:     string;
    participacion_porcen: string;
    ln:                   number;
}

export interface Corte {
    corte_fecha: string;
    corte_hora:  string;
    dia:         string;
    mes:         string;
    anio:        number;
    hora:        string;
    minuto:      string;
    segundo:     string;
}

export interface DetalleCasillaResponse {
    success:     boolean;
    msg:         string;
    itemRecords: ItemRecords;
}

export interface ItemRecords {
    value_fields:  ValueField[];
    columns:       Column[];
    data:          Datum[];
    participacion: Participacion[];
    resumen:       Resumen;
}

export interface Column {
    dataIndex: string;
    title:     string;
    key:       number | string;
    resizable: Resizable;
    width:     number;
    minWidth:  number;
    maxWidth:  number;
    fixed?:    string;
}

export enum Resizable {
    Resizable = "resizable",
}

export interface Datum {
    id_delegacion:          number;
    id_seccion:             number;
    tipo_casilla:           TipoCasilla;
    id_distrito:            number;
    votos_part_6:           number;
    votos_part_10:          number;
    votos_part_14:          number;
    votos_cand_no_reg:      number;
    votos_nulos:            number;
    votacion_total:         number;
    boletas_sob:            number;
    ciudadanos_votaron:     number;
    representantes_votaron: number;
    total_votaron:          number;
    lista_nominal:          number;
    contabilizar?:          string;
    nombre_img?:            string | null;
    observaciones?:         string | null;
    url_acta?:              string | null;
    origen_acta?:           OrigenActa | null;
}

export type OrigenActa = 'proceso' | 'escaner' | 'movil' | 'urna' | 'movil-catd';

export enum TipoCasilla {
    A1 = "A1",
    B01 = "B01",
    C01 = "C01",
    C02 = "C02",
    C03 = "C03",
    C04 = "C04",
    C05 = "C05",
    C06 = "C06",
    C07 = "C07",
    C08 = "C08",
    C09 = "C09",
    C10 = "C10",
    C11 = "C11",
    C12 = "C12",
    E01 = "E01",
    E1C1 = "E1 C1",
    S01 = "S01",
    S02 = "S02",
}

export interface Participacion {
    id_delegacion:  number;
    id_distrito:    number;
    id_seccion:     number;
    tipo_casilla:   TipoCasilla;
    num_casilla:    string;
    caracter_cas:   CaracterCas;
    total_votaron:  number;
    lista_nominal:  number;
    participacion:  string;
    votacion_total: number;
}

export enum CaracterCas {
    Básica = "Básica",
    Contigua = "Contigua",
    E = "E",
    S = "S",
    VotoEnElExtranjero = "Voto en el extranjero",
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

export interface ValueField {
    id_participante:   number;
    descripcion:       string;
    siglas:            string;
    id_delegacion:     number;
    tipo_participante: number;
    prelacion:         number;
    integrantes:       string;
}

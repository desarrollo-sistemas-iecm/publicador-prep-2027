export interface Estadistica {
    succes: boolean;
    msg:    string;
    data:   Data;
}

export interface Data {
    actas:              Actas;
    cantidades_urbanas: CantidadesUrbanas;
    lista_nominal:      ListaNominal;
    votos:              Votos;
}

export interface Actas {
    esperadas?:      number;
    capturadas?:     number;
    computadas?:     number;
    esperadas_por?:  string;
    capturadas_por?: string;
    computadas_por?: string;
}

export interface CantidadesUrbanas {
    urbanas?:    number;
    no_urbanas?: number;
}

export interface ListaNominal {
    lista_nominal_oficial?: number;
    actas_contabilizadas?:  number;
}

export interface Votos {
    votos_casillas_normales?:   number;
    votos_casillas_especiales?: number;
    total_votos?:               number;
    suma_total_votos?: number;
    total_votos_query?: number;
}

export interface ResponseDataMapas {
    success: boolean;
    msg:     string;
    data:    Data;
}

export interface Data {
    participantes: Participante[];
    result_votos:  ResultVoto[];
}

export interface Participante {
    id_participante:     number;
    campo_votos:         string;
    siglas:              string;
    descripcion:         string;
    total_demarcaciones: number;
    ganador: boolean;
}

export interface ResultVoto {
    id_distrito:     number;
    total_votos_cc1: number;
    total_votos_cc5: number;
    votos_part_6:    number;
    total:           number;
}

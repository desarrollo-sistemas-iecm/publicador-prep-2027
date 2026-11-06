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
    [columnaVotos: string]: number | string | null;
    id_distrito:    number;
    total:          number;
    siglas_ganador: string | null;
}

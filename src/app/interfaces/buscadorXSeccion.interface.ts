
export interface ResponseBusquedaSeccion {
    encontrada: Encontrada;
}

export interface Encontrada {
    id_seccion:    string;
    id_delegacion: string;
    id_distrito:   string;
    cuantos:       number;
}

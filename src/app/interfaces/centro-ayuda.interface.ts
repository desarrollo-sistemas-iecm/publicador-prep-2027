export interface PreguntaAyudaTabla {
  encabezados: string[];
  filas: string[][];
}

export interface PreguntaAyuda {
  id: string;
  pregunta: string;
  respuesta: string[];
  tabla?: PreguntaAyudaTabla;
}

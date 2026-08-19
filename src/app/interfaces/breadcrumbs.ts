
export interface BreadcrumbsConfig {
    tipo_eleccion: string;
    votos_por?: string;
    /** votos_por del nivel 1 (ej. 'votos-por-candidatura'), preservado sin sobrescribir al hacer drill-down a sección/casilla, para poder construir el link real de "regresar a Distrito/Alcaldía" sin depender del historial del navegador. */
    votosPorNivel1?: string;
    alcaldia?: number;
    nombre_alcaldia?: any;
    distrito?: number;
    seccion?: number;
    casilla?: any;
  }
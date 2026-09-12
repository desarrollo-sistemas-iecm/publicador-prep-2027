export const environment = {
    // api_prep: 'http://145.0.40.76/2024/sicodid2024-web/services',
    // api_prep: 'http://localhost/2024/sicodid/guia',
    // ! Producción
    // api_prep: 'https://aplicaciones.iecm.mx/pruebas_sicodid2024/services',
    // Ruta relativa: el backend NestJS sirve este build bajo el mismo origen
    // (deployment-prep-2027/Dockerfile). NOTA: por un bug preexistente, TODOS
    // los imports de `environment` en src/app apuntan a este archivo (nunca a
    // environment.ts), así que `fileReplacements` en angular.json nunca se
    // dispara — este es el único archivo que el bundle usa hoy, tanto en
    // build de desarrollo como de producción. Arreglar esos imports es un
    // cambio más grande, fuera de alcance de esta tarea.
    // `/api/v1` (no `/api`) porque `services-prep-2027` fija `API_PREFIX=api/v1`
    // como prefijo global (ver src/bootstrap.config.ts::configureApp) — todas
    // las rutas nuevas (/avance, /combos/*, etc.) cuelgan de ese prefijo.
    api_prep: '/api/v1',
    // services-prep-2027 ya implementa /avance, /grafica, /combos/*,
    // /estadistica, /mapas, /distribucion, /pruebadistribucion,
    // /resumenvotacion y /api_seccion.php (módulo `resultados-explotacion`).
    // Pendiente documentado como TODO en ese módulo: la agrupación de
    // coalición hardcodeada de Diputación MR y el filtro `id_participante >
    // 11` de la grilla RP no están confirmados contra el proceso vigente.
    useMockApi: false,
    version: 'v0.0.1',
    date_dist: "Thu May 09 2024 18:52:33 GMT-0600 (Central Standard Time)",
    prep: true,
    detalle_sistema_prep: {
        siglas: 'PREP',
        titulo: 'Programa de Resultados <span class="txRosaIne">E</span>lectorales Preliminares 2027',
        subtitulo: 'Elecciones Estatales de la <span class="txRosaIne">Ciudad de México</span>',
        src: './assets/img/adobe-navegable/Grupo-39717.png'
    },
    detalle_sistema_sicodid: {
        siglas: 'SICODID',
        titulo: 'Sistema de Cómputos <span class="txRosaIne">D</span>istritales y de Demarcación 2027',
        subtitulo: '<b>Proceso Electoral Local Ordinario</b> 2027',
        src: './assets/img/sicodid.jpg'
    }
    // api_prep: 'http://145.0.40.76/prep2024' // Desarrollo
};

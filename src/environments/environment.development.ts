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
    api_prep: '/api',
    // useMockApi se mantiene en true a propósito: services-prep-2027 hoy solo
    // implementa /cortes, /health y /version — ninguno de los endpoints que
    // esta UI consume (/avance, /grafica, /combos/*, /estadistica, /mapas,
    // /distribucion, /resumenvotacion) existe todavía en ese backend.
    // Apagar el mock dejaría la UI en blanco (404 contra rutas que no
    // existen). Cuando esos endpoints se implementen en services-prep-2027,
    // cambiar esto a false.
    useMockApi: true,
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

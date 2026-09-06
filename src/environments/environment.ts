export const environment = {
    // api_prep: 'http://145.0.40.76/2027/sicodid2027-web/services',
    api_prep: 'http://localhost/2027/sicodid/guia',
    // ! Producción
    // api_prep: 'https://aplicaciones.iecm.mx/pruebas_sicodid2027/services',
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
    // api_prep: 'http://145.0.40.76/prep2027' // Desarrollo
};

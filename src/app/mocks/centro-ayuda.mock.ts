import { PreguntaAyuda } from 'src/app/interfaces/centro-ayuda.interface';

/**
 * Contenido migrado de static-site/centro-ayuda.html (glosario cargado originalmente
 * vía jQuery .load() dentro del modal #modal_centro_ayuda de cada screenXX.html).
 * Datos de referencia/ejemplo, igual que en la fuente original.
 */
export const CENTRO_AYUDA_MOCK: PreguntaAyuda[] = [
  {
    id: 'que-es-prep',
    pregunta: '¿Qué es el PREP?',
    respuesta: [
      'Es un mecanismo de información que recaba los resultados preliminares y NO DEFINITIVOS de la elección local de alcaldías y diputaciones.',
      'Este programa proporciona resultados preliminares de la elección, conforme se van computando las Actas de Escrutinio y Cómputo de Casilla.'
    ]
  },
  {
    id: 'objetivo-prep',
    pregunta: '¿Cuál es el objetivo del PREP?',
    respuesta: [
      'La publicación de los resultados preliminares de la elección en un tiempo muy breve después de que cierran las casillas es de interés para el ciudadano que busca conocer el resultado del proceso electoral. Asimismo, esto evita cualquier sospecha sobre una posible manipulación de la información.',
      'El PREP garantiza la seguridad, transparencia, confiabilidad, credibilidad e integridad de la información de las elecciones.'
    ]
  },
  {
    id: 'candidatura-comun',
    pregunta: '¿Qué es una candidatura común?',
    respuesta: [
      'En las candidaturas comunes, dos o más partidos políticos podrán postular al mismo candidato/a, lista o fórmula, para las elecciones de Alcaldías y Diputaciones por el principio de mayoría relativa y de representación proporcional; sin embargo, estos partidos NO comparten plataforma electoral.'
    ]
  },
  {
    id: 'candidato-independiente',
    pregunta: '¿Qué es un candidato independiente?',
    respuesta: [
      'Una candidata o candidato independiente es aquel o aquella aspirante a algún cargo de elección popular que no pertenece a un partido político y que tiene permitido, según las disposiciones electorales, participar en las elecciones cubriendo ciertos requisitos, entre los que destaca obtener respaldo de un porcentaje determinado de los electores del ámbito por el que quiera competir, lo cual se hace habitualmente juntando firmas de apoyo.'
    ]
  },
  {
    id: 'candidato-no-registrado',
    pregunta: '¿Qué es un candidato no registrado?',
    respuesta: [
      'Es un apartado en la boleta electoral donde tradicionalmente el elector podía escribir el nombre de la persona real o ficticia que consideraba merecía ser candidato al cargo de elección popular en disputa, siendo contabilizado como voto nulo. Se considera un ejercicio de libertad de expresión y forma de rechazo hacia las opciones registradas.'
    ]
  },
  {
    id: 'inconsistencias-captura',
    pregunta: '¿Qué hacer al momento de la captura de información en el sistema del PREP, cuando se presenta una inconsistencia?',
    respuesta: [],
    tabla: {
      encabezados: ['Caso', 'Procedimiento', 'Se contabilizan los votos del campo'],
      filas: [
        ['Los números de la cantidad de votos no son claros.', 'Tomar cantidad registrada con letra', 'Sí'],
        ['La cantidad registrada con número no coincide con la registrada con letra.', 'Tomar cantidad registrada con letra', 'Sí'],
        ['Aparecen dos cantidades con número y una de éstas se encuentra tachada.', 'Tomar cantidad registrada con letra', 'Sí'],
        ['La cantidad registrada con número tiene una o varias flechas para indicar que se deben invertir las cantidades.', 'Tomar cantidad registrada con letra', 'Sí'],
        ['La cantidad registrada aparece sólo con número y no con letra.', 'Tomar cantidad registrada con número', 'Sí'],
        ['La cantidad anotada con letra es ilegible.', 'Tomar cantidad registrada con número', 'Sí'],
        ['Los espacios para registrar los votos están completamente en blanco.', 'Marcar campo como "Con Incidencia - Sin Dato"', 'No'],
        ['Los datos son ilegibles tanto en la cantidad anotada con número como con letra.', 'Marcar campo como "Con Incidencia - Ilegible"', 'No']
      ]
    }
  },
  {
    id: 'acta-se-contabiliza',
    pregunta: '¿Cómo saber si un Acta se contabiliza o no en el PREP?',
    respuesta: [],
    tabla: {
      encabezados: ['Caso', 'Se contabilizan los votos del Acta'],
      filas: [
        ['Las cantidades correspondientes a boletas sobrantes, personas que votaron, representantes que votaron sin estar en la lista nominal, boletas sacadas de la urna, votos para candidatos no registrados o votos nulos no fueron asentadas o fueron ilegibles.', 'Sí'],
        ['Para un partido o candidatura común, la cantidad de votos asentada en el acta es ilegible, tanto en letra como en número.', 'Sí'],
        ['Para un partido o candidatura común, la cantidad de votos no fue asentada en el acta.', 'Sí'],
        ['Alguno de los datos necesarios para la identificación de la casilla es incorrecto o ilegible en el Acta.', 'No'],
        ['La suma de todos los votos asentados en el acta excede el número total de votantes registrados en la Lista Nominal + 2 votantes por cada Partido Político y Candidatura Independiente por casilla.', 'No']
      ]
    }
  },
  {
    id: 'participacion-ciudadana',
    pregunta: '¿Cómo se calcula la participación ciudadana?',
    respuesta: [
      'El porcentaje de participación ciudadana se obtiene al multiplicar los votos por 100 y dividir el resultado de esta operación entre el número de personas registradas en la Lista Nominal de actas contabilizadas.',
      'Total de votos / Lista Nominal de actas contabilizadas × 100 = % Participación',
      '*Porcentaje calculado sin considerar la votación en casillas especiales.'
    ]
  },
  {
    id: 'lista-nominal',
    pregunta: '¿Qué es la lista nominal?',
    respuesta: [
      'La Lista Nominal es la relación de ciudadanos que contiene el nombre, dirección, distrito y sección de quienes cuentan con su Credencial para Votar vigente y están incluidos en el Padrón Electoral. También cuenta con una fotografía impresa idéntica a la de la Credencial para Votar más reciente.',
      'El día de la votación, los funcionarios de casilla contaron con listas nominales impresas con los nombres de los ciudadanos con derecho a votar, y son los encargados de verificar la identidad del votante.'
    ]
  },
  {
    id: 'lista-nominal-extranjero',
    pregunta: '¿Qué es la lista nominal de electores residentes en el extranjero?',
    respuesta: [
      'Es la relación elaborada por la Dirección Ejecutiva del Registro Federal de Electores del Instituto Nacional Electoral que contiene el nombre de las personas que expresaron su interés en participar en el proceso electoral, que se encuentran incluidas en el padrón electoral, que cuentan con su credencial para votar, que residen en el extranjero o se encuentran fuera del territorio nacional, y que solicitan su inscripción en dicha lista, la cual es de carácter temporal.'
    ]
  }
];

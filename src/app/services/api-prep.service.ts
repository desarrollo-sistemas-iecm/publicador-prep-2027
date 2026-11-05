import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResponseSeccionPorDistrito } from '../interfaces/interfaces.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ResponseBusquedaSeccion } from '../interfaces/buscadorXSeccion.interface';
import { ResAvance } from '../interfaces/avance-entidad';
import { ResResumenVotacion } from '../interfaces/resumen-votaction.interface';
import { Estadistica } from '../interfaces/estadistica.interface';
import { ResponseDataMapas } from '../interfaces/mapas-demarcaciones.interface';
import { DetalleCasillaResponse } from '../interfaces/detalle-casilla.interface';
import { ResGrafica, ResPruebaDistribucion } from '../interfaces/grafica.interface';
import { ResActasModalidad } from '../interfaces/distribucion-rp.interface';
import { ResDistribucionVotos } from '../interfaces/distribucion-votos.interface';
import { mockDistribucionVotos } from '../mocks/distribucion-votos.mock';
import { FiltroGeografico, SIN_FILTRO_GEOGRAFICO } from './filtro-geografico';

@Injectable({
  providedIn: 'root'
})
export class ApiPrepService {

  constructor( private http: HttpClient ) { }

  obtenerAvanceEntidad(tipo_consulta: string | 'jefatura-de-gobierno'|'diputaciones'| 'alcaldias' = 'jefatura-de-gobierno'){
    // TODO: 1 o 2 Cargan distitos y 3 carga alcaldías
    const type = typeQuery( tipo_consulta );

    /* const api = environment.api_prep;
    return this.http.get<ResponseSeccionPorDistrito>(`${api}/api_avance_entidad.php?type=${type}`); */

    
      const api = environment.api_prep;
      return this.http.post<ResAvance>(`${api}/avance`, { type });
    
  }
  
  obtenerResumenVotacion(tipo_consulta: string | 'jefatura-de-gobierno'|'diputaciones'| 'alcaldias' = 'jefatura-de-gobierno', filtro: FiltroGeografico = SIN_FILTRO_GEOGRAFICO){
    // TODO: 1 o 2 Cargan distitos y 3 carga alcaldías
    const type = typeQuery( tipo_consulta );

    // console.log({type});
    

    /* const api = environment.api_prep;
    return this.http.get<ResponseSeccionPorDistrito>(`${api}/api_avance_entidad.php?type=${type}`); */

      const api = environment.api_prep;
      // const api = `http://localhost/2024/sicodid/guia`;
      return this.http.post<ResResumenVotacion>(`${api}/resumenvotacion`, { type, ...filtro });
    
  }
  
  obtenerGraficaJG(tipo_consulta: string | 'jefatura-de-gobierno' | 'diputaciones' | 'alcaldias' = 'jefatura-de-gobierno', dist_o_alcaldia: number | null = 0, seccion: number | null = 0, casilla: string | null = null, mostrar_no_reg_y_nulos: boolean = false, es_distribucion = false) {
    // TODO: 1 o 2 Cargan distitos y 3 carga alcaldías
    const type = typeQuery(tipo_consulta);

    // console.log({type});
    const api = environment.api_prep;
    // const api = `http://localhost/2024/sicodid/guia`;
    return this.http.post<ResGrafica>(`${api}/grafica`, { type, dist_o_alcaldia, seccion, casilla, mostrar_no_reg_y_nulos, es_distribucion });

  }

  busquedaPorSeccion( data: any ){
    console.log(data);

    // TODO: 1 o 2 Cargan distitos y 3 carga alcaldías
    // const type = typeQuery( tipo_consulta );
    const { seccion } = data;
    console.log(seccion);
    

    const api = environment.api_prep;
    return this.http.get<ResponseBusquedaSeccion>(`${api}/api_seccion.php?seccion=${seccion}`);
    
  }

  obtenerPrimerCombo( tipo_consulta: string | 'jefatura-de-gobierno'|'diputaciones'| 'alcaldias' = 'jefatura-de-gobierno' ){
    // TODO: 1 o 2 Cargan distitos y 3 carga alcaldías
    const type = typeQuery( tipo_consulta );

    const api = environment.api_prep;
    return this.http.post<ResponseSeccionPorDistrito>(`${api}/combos/primero`, { type });
    // Whithout codeigniter
    // return this.http.get<ResponseSeccionPorDistrito>(`${api}/api_categories.php?type=${type}`);
  }


  obtenerSeccionesPorDistrito( tipo_consulta: string | 'jefatura-de-gobierno'|'diputaciones'| 'alcaldias' = 'jefatura-de-gobierno', id_distrito: number ): Observable<ResponseSeccionPorDistrito>{
    
    const type = typeQuery( tipo_consulta );
   
    // type = objConsultas.map( el => el.tipo_consulta === tipo_consulta ? el.type : 0 );
    const api = environment.api_prep;
    return this.http.post<ResponseSeccionPorDistrito>(`${api}/combos/segundo`, { type, seleccion: id_distrito});
    // Whithout codeigniter
    // return this.http.get<ResponseSeccionPorDistrito>(`${api}/api_subcategories.php?type=${type}&seleccion=${id_distrito}`);
  }

  obtenerCasillasPorSeccion(tipo_consulta: string | 'jefatura-de-gobierno'|'diputaciones'| 'alcaldias' = 'jefatura-de-gobierno', primerCombo: any, seccion: any){

    const type = typeQuery( tipo_consulta );
   
    const api = environment.api_prep;
    return this.http.post<ResponseSeccionPorDistrito>(`${api}/combos/tercero`, {type, seleccion: primerCombo, seccion: seccion});
    // Whithout codeigniter
    // return this.http.get<ResponseSeccionPorDistrito>(`${api}/api_items.php?type=${type}&seleccion=${primerCombo}&seccion=${seccion}`);

  }
  
  obtenerInformacionEstadistica(tipo_consulta: string | 'jefatura-de-gobierno'|'diputaciones'| 'alcaldias' = 'jefatura-de-gobierno', filtro: FiltroGeografico = SIN_FILTRO_GEOGRAFICO){

    const type = typeQuery( tipo_consulta );

    const api = environment.api_prep;
    return this.http.post<Estadistica>(`${api}/estadistica`, { type, ...filtro });
    // Whithout codeigniter
    // return this.http.get<ResponseSeccionPorDistrito>(`${api}/api_items.php?type=${type}&seleccion=${primerCombo}&seccion=${seccion}`);

  }
  
  obtenerInformacionMapas(tipo_consulta: string | 'jefatura-de-gobierno'|'diputaciones'| 'alcaldias' = 'jefatura-de-gobierno'){

    const type = typeQuery( tipo_consulta );
   
    const api = environment.api_prep;
    return this.http.post<ResponseDataMapas>(`${api}/mapas`, {type});
    // Whithout codeigniter
    // return this.http.get<ResponseSeccionPorDistrito>(`${api}/api_items.php?type=${type}&seleccion=${primerCombo}&seccion=${seccion}`);

  }

  obtenederDetalleVotosCasilla(tipo_consulta: string | 'jefatura-de-gobierno'|'diputaciones'| 'alcaldias' = 'jefatura-de-gobierno', primerCombo: any, seccion: any, casilla: any){

    const type = typeQuery( tipo_consulta );
   
    const api = environment.api_prep;
    return this.http.post<DetalleCasillaResponse>(`${api}/distribucion`, {type, seleccion: primerCombo, seccion});
    // Whithout codeigniter
    // return this.http.get<ResponseSeccionPorDistrito>(`${api}/api_items.php?type=${type}&seleccion=${primerCombo}&seccion=${seccion}`);

  }
  // this.http.get('url')

  // TODO: sustituir por el endpoint de services-prep-2027 cuando exista; por ahora es mock.
  obtenerDistribucionVotos(tipo_consulta: string, dist_o_alcaldia: number): Observable<ResDistribucionVotos> {
    return of(mockDistribucionVotos());
  }

  obtenerDatosDistribucion(tipo_consulta: string | 'jefatura-de-gobierno' | 'diputaciones' | 'alcaldias' = 'jefatura-de-gobierno', dist_o_alcaldia: number | null = 0, seccion: number | null = 0, casilla: string | null = null, mostrar_no_reg_y_nulos: boolean = false, es_distribucion = false) {
    // TODO: 1 o 2 Cargan distitos y 3 carga alcaldías
    const type = typeQuery(tipo_consulta);

    // console.log({type});
    const api = environment.api_prep;
    // const api = `http://localhost/2024/sicodid/guia`;
    return this.http.post<ResPruebaDistribucion>(`${api}/pruebadistribucion`, { type, dist_o_alcaldia, seccion, casilla, mostrar_no_reg_y_nulos, es_distribucion });

  }

  obtenerActasRp(seleccion?: number) {
    const api = environment.api_prep;
    return this.http.post<ResActasModalidad>(`${api}/actas/rp`, seleccion ? { seleccion } : {});
  }

  obtenerActasVotoExtranjero(tipo_consulta: string | 'jefatura-de-gobierno' | 'diputaciones' | 'alcaldias' = 'jefatura-de-gobierno') {
    const type = typeQuery(tipo_consulta);
    const api = environment.api_prep;
    return this.http.post<ResActasModalidad>(`${api}/actas/extranjero`, { type });
  }

  descargarBaseDatos(): Observable<HttpResponse<Blob>> {
    const api = environment.api_prep;
    return this.http.get(`${api}/exportacion-ine`, { observe: 'response', responseType: 'blob' });
  }
}

const typeQuery = ( tipo_consulta: string | 'jefatura-de-gobierno'|'diputaciones'| 'alcaldias' = 'jefatura-de-gobierno' ): number => {

  const objConsultas = [
    {
      tipo_consulta: 'jefatura-de-gobierno',
      type: 1
    },
    {
      tipo_consulta: 'diputaciones',
      type: 2
    },
    {
      tipo_consulta: 'alcaldias',
      type: 4
    },
  ];

  const type = objConsultas.find( el => el.tipo_consulta === tipo_consulta )?.type || 0;

  return type;
}

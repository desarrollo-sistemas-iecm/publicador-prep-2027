import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseSeccionPorDistrito } from '../interfaces/interfaces.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ResponseBusquedaSeccion } from '../interfaces/buscadorXSeccion.interface';
import { ResAvance } from '../interfaces/avance-entidad';
import { ResResumenVotacion } from '../interfaces/resumen-votaction.interface';
import { Estadistica } from '../interfaces/estadistica.interface';
import { ResponseDataMapas } from '../interfaces/mapas-demarcaciones.interface';
import { DetalleCasillaResponse } from '../interfaces/detalle-casilla.interface';

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
      return this.http.post<ResAvance>(`${api}/avance`, { type, item: 10  });
    
  }
  
  obtenerResumenVotacion(tipo_consulta: string | 'jefatura-de-gobierno'|'diputaciones'| 'alcaldias' = 'jefatura-de-gobierno'){
    // TODO: 1 o 2 Cargan distitos y 3 carga alcaldías
    const type = typeQuery( tipo_consulta );

    // console.log({type});
    

    /* const api = environment.api_prep;
    return this.http.get<ResponseSeccionPorDistrito>(`${api}/api_avance_entidad.php?type=${type}`); */

      const api = environment.api_prep;
      // const api = `http://localhost/2024/sicodid/guia`;
      return this.http.post<ResResumenVotacion>(`${api}/resumenvotacion`, { type  });
    
  }
  
  obtenerGraficaJG(tipo_consulta: string | 'jefatura-de-gobierno' | 'diputaciones' | 'alcaldias' = 'jefatura-de-gobierno', dist_o_alcaldia: number | null = 0, seccion: number | null = 0, casilla: string | null = null, mostrar_no_reg_y_nulos: boolean = false) {
    // TODO: 1 o 2 Cargan distitos y 3 carga alcaldías
    const type = typeQuery(tipo_consulta);

    // console.log({type});
    const api = environment.api_prep;
    // const api = `http://localhost/2024/sicodid/guia`;
    return this.http.post<any>(`${api}/grafica`, { type, dist_o_alcaldia, seccion, casilla, mostrar_no_reg_y_nulos });

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
  
  obtenerInformacionEstadistica(tipo_consulta: string | 'jefatura-de-gobierno'|'diputaciones'| 'alcaldias' = 'jefatura-de-gobierno'){

    const type = typeQuery( tipo_consulta );
   
    const api = environment.api_prep;
    return this.http.post<Estadistica>(`${api}/estadistica`, {type});
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

  obtenerDatosDistribucion(tipo_consulta: string | 'jefatura-de-gobierno' | 'diputaciones' | 'alcaldias' = 'jefatura-de-gobierno', dist_o_alcaldia: number | null = 0, seccion: number | null = 0, casilla: string | null = null, mostrar_no_reg_y_nulos: boolean = false, es_distribucion = false) {
    // TODO: 1 o 2 Cargan distitos y 3 carga alcaldías
    const type = typeQuery(tipo_consulta);

    // console.log({type});
    const api = environment.api_prep;
    // const api = `http://localhost/2024/sicodid/guia`;
    return this.http.post<any>(`${api}/pruebadistribucion`, { type, dist_o_alcaldia, seccion, casilla, mostrar_no_reg_y_nulos, es_distribucion });

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

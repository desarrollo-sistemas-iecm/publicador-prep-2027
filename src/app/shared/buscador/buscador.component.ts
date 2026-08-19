import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseBusquedaSeccion } from 'src/app/interfaces/buscadorXSeccion.interface';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TipoCredencialService } from 'src/app/services/tipo-credencial.service';
import { ResourceState } from 'src/app/interfaces/resource-state.interface';
import { TipoCredencial } from 'src/app/interfaces/tipo-credencial.interface';

@Component({
  standalone: false,
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {

  public formBuscadoSeccion: FormGroup = this.fb.group({
    seccion: ['', [ Validators.required, Validators.minLength(1) ]]
  })

  public tipoCredencial$: Observable<ResourceState<TipoCredencial>> = this.tipoCredencialService.obtenerTipoCredencial();

  constructor(
    private fb: FormBuilder,
    private apiPrepService: ApiPrepService,
    private spinnerService: SpinnerService,
    private router: Router,
    private tipoCredencialService: TipoCredencialService
  ){}

  buscadorPorSeccion(){
    
    this.spinnerService.showLoaderUntilCompleted(
      this.apiPrepService.busquedaPorSeccion(this.formBuscadoSeccion.value)
    ).subscribe((res: ResponseBusquedaSeccion) => {
      // console.log(res);
      const { id_seccion, id_distrito, id_delegacion, cuantos } = res.encontrada;

      if(cuantos > 0){
        
        
        const currentUrl = this.router.url; // Obtiene la URL actual
        const segments = currentUrl.split('/'); // Divide la URL en segmentos
        
        // Verifica si la URL tiene al menos dos segmentos y el segundo es un tipo de visualización válido
        if (segments.length >= 2 && ['jefatura-de-gobierno', 'diputaciones', 'alcaldias'].includes(segments[1])) {
          const tipoVisualizacion = segments[1]; // Obtiene el tipo de visualización actual

          let id_alcaldia_o_distrito = id_distrito;
          if(tipoVisualizacion == 'alcaldias'){
            id_alcaldia_o_distrito = id_delegacion;
          }
          
          // Construye la nueva URL con el tipo de visualización y el valor seleccionado
          const newUrl = `/${tipoVisualizacion}/casillas/${id_alcaldia_o_distrito}/${id_seccion}`;
          
          console.log(newUrl);
          
          // Navega a la nueva URL
          this.router.navigateByUrl(newUrl);
        } else {
          console.error('Tipo de visualización no válido o URL incorrecta');
        }
        
      } else{
        alert('No se encontró información de la sección buscada');
        return;
      }
    }, ( err ) => {
      console.log(err);
      alert('No se encontró información de la sección buscada');
    });
    
  }
}

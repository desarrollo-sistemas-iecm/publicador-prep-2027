import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsConfig } from 'src/app/interfaces/breadcrumbs';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { ComboStateService } from 'src/app/services/combo-state.service';
import { LabelTransformerViewFoService } from 'src/app/services/label-transformer-view-fo.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { environment } from 'src/environments/environment.development';

@Component({
  standalone: false,
  selector: 'app-segundo-nivel',
  templateUrl: './segundo-nivel.component.html',
  styles: [
  ]
})
export class SegundoNivelComponent {

  public prep: boolean = environment.prep = false;


  
  configuracionBreadcrumbs: BreadcrumbsConfig = {
    tipo_eleccion: '',
    votos_por: '',
    alcaldia: 0,
    nombre_alcaldia: null,
    distrito: 0,
    seccion: 0,
    casilla: ''
  };

  primerCombo: any;
  segundoCombo: any;
  tercerCombo: any;
  // configuracionBreadcrumbs: any;
  tipoEleccion: any;
  
  
  constructor(private router: Router, private route: ActivatedRoute, private comboStateService: ComboStateService, private apiPrepService: ApiPrepService,
    private spinnerService: SpinnerService,
    private titleService: Title,
    public labelTransformerService: LabelTransformerViewFoService

  ) { }
  ngOnInit(): void {

    this.establecerInformacionEleccion();
  }

  onSelectionChangePrimerCombo(selectedValue: any): void {
    const currentUrl = this.router.url; // Obtiene la URL actual
    const segments = currentUrl.split('/'); // Divide la URL en segmentos

    console.log(segments);
    

    // Verifica si la URL tiene al menos dos segmentos y el segundo es un tipo de visualización válido
    if (segments.length >= 2 && ['jefatura-de-gobierno', 'diputaciones', 'alcaldias'].includes(segments[1])) {
      const tipoVisualizacion = segments[1]; // Obtiene el tipo de visualización actual

      // Construye la nueva URL con el tipo de visualización y el valor seleccionado
      const newUrl = `/${tipoVisualizacion}/${segments[2]}/${selectedValue}`;

      console.log(newUrl);

      // Navega a la nueva URL
      this.router.navigateByUrl(newUrl);

      this.tipoEleccion = tipoVisualizacion;

      this.configuracionBreadcrumbs.votos_por = segments[2];

      this.primerCombo = selectedValue; // Guarda el valor seleccionado del primer combo
    } else {
      console.error('Tipo de visualización no válido o URL incorrecta');
    }
  }

  onSelectionChangeSegundoCombo( seccionSelectedValue: any ): void{
    
    const currentUrl = this.router.url; // Obtiene la URL actual
    const segments = currentUrl.split('/'); // Divide la URL en segmentos

    console.log(segments);

    
// 0: "",
// 1: "jefatura-de-gobierno",
// 2: "votos-por-candidatura",
// 3: "1"
    

    // Verifica si la URL tiene al menos dos segmentos y el segundo es un tipo de visualización válido
    if (segments.length >= 2 && ['jefatura-de-gobierno', 'diputaciones', 'alcaldias'].includes(segments[1])) {
      const tipoVisualizacion = segments[1]; // Obtiene el tipo de visualización actual

      // Construye la nueva URL con el tipo de visualización y el valor seleccionado
      const newUrl = `/${tipoVisualizacion}/casillas/${segments[3]}/${seccionSelectedValue}`;

      console.log(newUrl);

      // Navega a la nueva URL
      this.router.navigateByUrl(newUrl);

      this.tipoEleccion = tipoVisualizacion;

      this.configuracionBreadcrumbs.votos_por = 'casillas';

      this.segundoCombo = seccionSelectedValue; // Guarda el valor seleccionado del primer combo
    } else {
      console.error('Tipo de visualización no válido o URL incorrecta');
    }
    
  }
  
  onSelectionChangeTercerCombo(casillaSelectedValue: any): void {
    
    const currentUrl = this.router.url; // Obtiene la URL actual
    const segments = currentUrl.split('/'); // Divide la URL en segmentos

    console.log(segments);
    //  ['', 'jefatura-de-gobierno', 'votos-por-partido-politico-y-candidatura-independiente', '2', '958']
    
    if (segments.length >= 2 && ['jefatura-de-gobierno', 'diputaciones', 'alcaldias'].includes(segments[1])) {
      const tipoVisualizacion = segments[1]; // Obtiene el tipo de visualización actual

      // Construye la nueva URL con el tipo de visualización y el valor seleccionado
      const newUrl = `/${tipoVisualizacion}/casilla/${segments[3]}/${segments[4]}/${casillaSelectedValue}`;

      console.log(newUrl);

      // Navega a la nueva URL
      this.router.navigateByUrl(newUrl);

      this.tipoEleccion = tipoVisualizacion;

      this.configuracionBreadcrumbs.votos_por = 'casilla';

      this.tercerCombo = casillaSelectedValue; // Guarda el valor seleccionado del tercer combo
    } else {
      console.error('Tipo de visualización no válido o URL incorrecta');
    }
  }

  onConfiguracionBreadcrumbs(configuracion: BreadcrumbsConfig): void {
    this.configuracionBreadcrumbs = configuracion;
  
    const { tipo_eleccion, votos_por } = this.configuracionBreadcrumbs;
    let proyecto = '';
    if(environment.prep){

      proyecto = environment.detalle_sistema_prep.siglas;
    } else{
      proyecto = environment.detalle_sistema_sicodid.siglas;
    }
    const originalTitle = `${proyecto} IECM 2024 `;
    let vistaPor = '';
  
    // Transforma el label de votos_por a mayúsculas si existe
    if (votos_por) {
      vistaPor = this.labelTransformerService.transformaLabelVistaPor(votos_por).toUpperCase();
    }
  
    // Genera el título dinámico utilizando plantillas de cadena de texto
    const titulo = `${originalTitle} - ${tipo_eleccion.toUpperCase()} - ${vistaPor}`;
  
    // Establece el título dinámicamente
    this.titleService.setTitle(titulo);
  }

  establecerInformacionEleccion(){

    const currentUrl = this.router.url; // Obtiene la URL actual
    const segments = currentUrl.split('/'); // Divide la URL en segmentos
const tipoVisualizacion = segments[1]; // Obtiene el tipo de visualización actual

      this.tipoEleccion = tipoVisualizacion;

    // 
    this.spinnerService.showLoaderUntilCompleted(
      this.apiPrepService.obtenerAvanceEntidad()
    ).subscribe((res: any) => {
      // console.log(res);
    });
    // 

  }



}

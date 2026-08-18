import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BreadcrumbsConfig } from 'src/app/interfaces/breadcrumbs';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LabelTransformerViewFoService } from 'src/app/services/label-transformer-view-fo.service';
import { NavigationService } from '../../services/navigation-breadcrumbs.service';

@Component({
  standalone: false,
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent {

  public lblDetale = 'Entidad';
  
  

  // breadcrumbsConfig?: BreadcrumbsConfig;
  // breadcrumbConfig: BreadcrumbsConfig | null = null;
  @Input() configuracionBreadcrumbs: BreadcrumbsConfig = {
    tipo_eleccion: '',
    votos_por: '',
    alcaldia: 0,
    nombre_alcaldia: null,
    distrito: 0,
    seccion: 0,
    casilla: ''
  }
  // @Input() configuracionBreadcrumbs: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public labelTransformerService: LabelTransformerViewFoService,
    private navigationService: NavigationService

  ) { }

  // Método para manejar los datos de configuración de los breadcrumbs emitidos desde SidebarComponent
  onConfiguracionBreadcrumbs(configuracion: any): void {
    // Aquí tomar las acciones necesarias para actualizar y mostrar los breadcrumbs
    // console.log('Configuración de breadcrumbs recibida:', configuracion);
    // Por ejemplo, puedes almacenar la configuración en una propiedad de la clase para usarla en el template
    this.actualizarBreadcrumbs(configuracion);
  }

  // Método para actualizar y mostrar los breadcrumbs en función de la configuración recibida
  actualizarBreadcrumbs(configuracion: any): void {
    // Aquí implementar la lógica para actualizar y mostrar los breadcrumbs en función de la configuración recibida
    // Por ejemplo, manipular un arreglo de objetos que represente cada elemento del breadcrumb y renderizarlo en el template
    // this.breadcrumbs = tuLogicaParaGenerarBreadcrumbs(configuracion);
  }

  back(n = 0){
    console.log('Aqui!', n);
    this.navigationService.goBack(n);
  }


  // configuracionBreadcrumbs: any;
  // private subscription: Subscription;

}

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

  back(n = 0){
    this.navigationService.goBack(n);
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPrepService } from '../../services/api-prep.service';
import { ResponseSeccionPorDistrito } from 'src/app/interfaces/interfaces.interface';
import { ComboStateService } from '../../services/combo-state.service';
import { BreadcrumbsConfig } from 'src/app/interfaces/breadcrumbs';
import { Location } from '@angular/common';
import { SpinnerService } from 'src/app/services/spinner.service';

interface OptSelect{
  value: number | string | null;
  label: string | number;
}

@Component({
  standalone: false,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  
  public tipo_consulta: 'jefatura-de-gobierno' | 'diputaciones' | 'alcaldias' = 'jefatura-de-gobierno';
  public lbl_first_select: string = 'Distrito';
  public optSelect: OptSelect[] = [];
  public optSecciones: OptSelect[] = [{ label: 'Selecciona', value: null }];
  public optCasillas: OptSelect[] = [{ label: 'Selecciona', value: null }];
  public lblBtnVotosPorDinamic: string = 'Votos por Candidatura';
  public routeBtnVotosPorDinamic: string = 'votos-por-candidatura';
  public firstSelected: any = null;
  public seccionSelected: any = null;
  public casillaSelected: any = null;
  public votosPor = 'votos-por-candidatura';
  @Output() primerCombo = new EventEmitter<any>();
  @Output() seccionCombo = new EventEmitter<any>();
  @Output() casillaCombo = new EventEmitter<any>();
  @Output() emitirConfiguracionBreadcrumbs = new EventEmitter<BreadcrumbsConfig>();
  @Input() mostrarBuscador: boolean = true;
  breadcrumbsConfig: BreadcrumbsConfig = {
    tipo_eleccion: '',
    votos_por: '',
    alcaldia: 0,
    nombre_alcaldia: null,
    distrito: 0,
    seccion: 0,
    casilla: null
  };

  constructor(
    private route: ActivatedRoute,
    private apiPrepService: ApiPrepService,
    private router: Router,
    public comboStateService: ComboStateService,
    private location: Location,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.comboStateService.primerCombo = null
    this.comboStateService.segundoCombo = null;
    this.comboStateService.tercerCombo = null;
    if (this.mostrarBuscador) {
      this.initializeSidebar();
    }
  }

  initializeSidebar(): void {
    this.obtenerTipoDeVista();
    this.inicializarPrimerCombo();
    this.initializeCombo();
  }

  obtenerTipoDeVista(): void {
    const segments = this.router.url.split('/');
    this.breadcrumbsConfig.votos_por = segments[2];
    this.breadcrumbsConfig.votosPorNivel1 = segments[2];
    this.breadcrumbsConfig.tipo_eleccion = segments[1];
    this.tipo_consulta = segments[1] as 'jefatura-de-gobierno' | 'diputaciones' | 'alcaldias';
    this.emitirConfiguracionBreadcrumbs.emit(this.breadcrumbsConfig);
    this.cargarOpcionesSidebar(this.tipo_consulta);
  }

  cargarOpcionesSidebar(tipoElección: string): void {
    switch (tipoElección) {
      case 'jefatura-de-gobierno':
      case 'diputaciones':
        this.cargaDistritos(tipoElección);
        break;
      case 'alcaldias':
        this.cargaAlcaldias();
        break;
    }
  }

  cargaDistritos( type: 'jefatura-de-gobierno' | 'diputaciones' ): void {
    this.lblBtnVotosPorDinamic = 'Votos por Candidatura';
    this.routeBtnVotosPorDinamic = 'votos-por-candidatura';
    if(type === 'diputaciones'){
      this.lblBtnVotosPorDinamic = 'Votos Por Distritos';
      this.routeBtnVotosPorDinamic = 'votos-por-distritos';
    }
    this.lbl_first_select = 'Distrito';
  }

  cargaAlcaldias(): void {
    this.lbl_first_select = 'Alcaldía';
    this.lblBtnVotosPorDinamic = 'Votos Por Alcaldía';
    this.routeBtnVotosPorDinamic = 'votos-por-alcaldia';
  }

  distOAlcaldia(idDistrito: any): void {
    this.breadcrumbsConfig.tipo_eleccion = this.tipo_consulta;
    this.primerCombo.emit(idDistrito);
    this.firstSelected = idDistrito;
    this.breadcrumbsConfig.alcaldia = 0;
    this.breadcrumbsConfig.distrito = 0;
    // console.log('distOAlcaldia');
    
    if (this.tipo_consulta === 'alcaldias') {
      // this.inicializarPrimerCombo();
      this.breadcrumbsConfig.alcaldia = idDistrito;
      // const nombre_alcaldia = this.optSelect.find(el => el.value == idDistrito)?.label || '';
      // this.breadcrumbsConfig.nombre_alcaldia = nombre_alcaldia;
    } else {
      this.breadcrumbsConfig.nombre_alcaldia = '';
      this.breadcrumbsConfig.distrito = idDistrito;
    }
    this.emitirConfiguracionBreadcrumbs.emit(this.breadcrumbsConfig);
    this.apiPrepService.obtenerSeccionesPorDistrito(this.tipo_consulta, idDistrito)
      .subscribe((res: ResponseSeccionPorDistrito) => {
        res.subcategories.forEach(ele => {
          this.optSecciones.push({ label: ele.name, value: ele.id });
        });
      });
  }

  cargarCasillasXSeccion(seccion: any): void {
    this.breadcrumbsConfig.seccion = seccion;
    this.emitirConfiguracionBreadcrumbs.emit(this.breadcrumbsConfig);
    this.comboStateService.updateSelectedSeccionValue(seccion);
    this.apiPrepService.obtenerCasillasPorSeccion(this.tipo_consulta, this.firstSelected, seccion)
      .subscribe((res: any) => {
        res.items.forEach((element: any) => {
          this.optCasillas.push({ label: element.name, value: element.id });
        });
      });
    this.seccionCombo.emit(seccion);
  }

  initializeCombo(): void {
    // console.log('initializeCombo');
    
    let selectedValue = '';
    this.comboStateService.updateSelectedValue(selectedValue);
    const segments = this.router.url.split('/');
    // this.tipo_consulta = segments[1];
    this.tipo_consulta = segments[1] as 'jefatura-de-gobierno' | 'diputaciones' | 'alcaldias';

    if (segments.length >= 2) {
      const distAlc = segments[3];
      const seccion = segments[4];
      const casilla = segments[5];
      if (distAlc) {
        this.comboStateService.updateSelectedValue(distAlc);
        this.firstSelected = distAlc;
        this.distOAlcaldia(this.firstSelected);
      }
      if (seccion) {
        this.comboStateService.updateSelectedSeccionValue(seccion);
        this.seccionSelected = seccion;
        this.cargarCasillasXSeccion(seccion);
      }
      if (casilla) {
        this.comboStateService.updateSelectedCasillaValue(casilla);
        this.casillaSelected = casilla;
        this.seleccionCasilla(casilla);
      }
    } else {
      console.error('Tipo de visualización no válido o URL incorrecta');
    }
    this.comboStateService.updateSelectedValue(this.firstSelected);
  }

  inicializarPrimerCombo() {
    this.spinnerService.showLoaderUntilCompleted(
      this.apiPrepService.obtenerPrimerCombo(this.tipo_consulta)
    ).subscribe((res: any) => {
      // console.log(res);
      
      this.optSelect = [{ label: 'Seleccione', value: null }];
      res.categories.forEach((element: any) => {
        this.optSelect.push({ label: element.name, value: element.id });
      });

      // console.log(this.optSelect);
      if(this.firstSelected){
        const nombre_alcaldia = this.optSelect.find(el => el.value == this.firstSelected)?.label || '';
        this.breadcrumbsConfig.nombre_alcaldia = nombre_alcaldia;
      }
    // this.emitirConfiguracionBreadcrumbs.emit(this.breadcrumbsConfig);

      
    });
  }

  seleccionCasilla(casilla: string): void {
    this.breadcrumbsConfig.casilla = casilla;
    this.comboStateService.updateSelectedCasillaValue(casilla);
    this.casillaCombo.emit(casilla);
    this.emitirConfiguracionBreadcrumbs.emit(this.breadcrumbsConfig);
  }

  previousPage(): void {
    this.location.back();
  }

}

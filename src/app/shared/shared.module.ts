import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { AvanceEntidadComponent } from './avance-entidad/avance-entidad.component';
import { CompartirComponent } from './compartir/compartir.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterAvisoPrivacidadComponent } from './footer-aviso-privacidad/footer-aviso-privacidad.component';
import { AvanceEntidadMovilComponent } from './avance-entidad-movil/avance-entidad-movil.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { ModalidadVotosComponent } from './modalidad-votos/modalidad-votos.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ResumenVotacionComponent } from './resumen-votacion/resumen-votacion.component';
import { ContenedorResultadosDinamicoComponent } from './contenedor-resultados-dinamico/contenedor-resultados-dinamico.component';
import { LeyendaResultadosInformativosComponent } from './leyenda-resultados-informativos/leyenda-resultados-informativos.component';
import { TablaActasComponent } from './tabla-actas/tabla-actas.component';



@NgModule({
  declarations: [
    SidebarComponent,
    AvanceEntidadComponent,
    CompartirComponent,
    BuscadorComponent,
    EncabezadoComponent,
    FooterAvisoPrivacidadComponent,
    AvanceEntidadMovilComponent,
    EstadisticaComponent,
    ModalidadVotosComponent,
    BreadcrumbsComponent,
    ResumenVotacionComponent,
    ContenedorResultadosDinamicoComponent,
    LeyendaResultadosInformativosComponent,
    TablaActasComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SidebarComponent,
    AvanceEntidadComponent,
    AvanceEntidadMovilComponent,
    CompartirComponent,
    BuscadorComponent,
    EncabezadoComponent,
    FooterAvisoPrivacidadComponent,
    EstadisticaComponent,
    ModalidadVotosComponent,
    BreadcrumbsComponent,
    ResumenVotacionComponent,
    ContenedorResultadosDinamicoComponent,
    LeyendaResultadosInformativosComponent,
    TablaActasComponent
  ]
})
export class SharedModule { }

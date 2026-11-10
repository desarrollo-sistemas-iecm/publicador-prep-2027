import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { SharedModule } from './shared/shared.module';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { PaginaNoEncontradaComponent } from './pages/pagina-no-encontrada/pagina-no-encontrada.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MockApiInterceptor } from './interceptors/mock-api.interceptor';
import { RouteReuseStrategy } from '@angular/router';
import { RecargaPorParametrosStrategy } from './services/recarga-por-parametros.strategy';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { GraficaComponent } from './components/grafica/grafica.component';
import { DetalleVotosCasillaComponent } from './components/detalle-votos-casilla/detalle-votos-casilla.component';
import { ObservacionesEnActaComponent } from './components/observaciones-en-acta/observaciones-en-acta.component';
import { MovingCardsComponent } from './components/moving-cards/moving-cards.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { TercerNivelComponent } from './components/tercer-nivel/tercer-nivel.component';
import { SegundoNivelComponent } from './components/segundo-nivel/segundo-nivel.component';
import { DistribucionVotosComponent } from './components/distribucion-votos/distribucion-votos.component';
import { PrimerNivelComponent } from './components/primer-nivel/primer-nivel.component';
import { ListadoParticipacionCiudadanaLNComponent } from './components/listado-participacion-ciudadana-ln/listado-participacion-ciudadana-ln.component';
import { EstadisticaCasillasComponent } from './components/estadistica-casillas/estadistica-casillas.component';
import { VotacionPorCasillaComponent } from './components/votacion-por-casilla/votacion-por-casilla.component';
import { RepresentacionProporcionalComponent } from './components/representacion-proporcional/representacion-proporcional.component';
import { VotosActasContabilizadasComponent } from './components/votos-actas-contabilizadas/votos-actas-contabilizadas.component';
import { InformacionActaComponent } from './components/informacion-acta/informacion-acta.component';
import { ObservacionesCasillaComponent } from './components/observaciones-casilla/observaciones-casilla.component';
import { IconosOrigenActaComponent } from './components/iconos-origen-acta/iconos-origen-acta.component';
import { LeyendaOrigenActaComponent } from './components/leyenda-origen-acta/leyenda-origen-acta.component';
import { VisorActaComponent } from './components/visor-acta/visor-acta.component';
import { PlantillaNivelComponent } from './components/plantilla-nivel/plantilla-nivel.component';
import { ResultadosNivelComponent } from './components/resultados-nivel/resultados-nivel.component';
import { DirectivesModule } from './directives/directives.module';
// import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    BienvenidaComponent,
    PaginaNoEncontradaComponent,
    SpinnerComponent,
    GraficaComponent,
    DetalleVotosCasillaComponent,
    ObservacionesEnActaComponent,
    MovingCardsComponent,
    MapaComponent,
    TercerNivelComponent,
    SegundoNivelComponent,
    DistribucionVotosComponent,
    PrimerNivelComponent,
    ListadoParticipacionCiudadanaLNComponent,
    EstadisticaCasillasComponent,
    VotacionPorCasillaComponent,
    RepresentacionProporcionalComponent,
    VotosActasContabilizadasComponent,
    InformacionActaComponent,
    ObservacionesCasillaComponent,
    IconosOrigenActaComponent,
    LeyendaOrigenActaComponent,
    VisorActaComponent,
    PlantillaNivelComponent,
    ResultadosNivelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    DirectivesModule
    // HighchartsChartModule
  ],
  exports: [
    MovingCardsComponent
  ],
  providers: [
    // BootstrapOptions.ngZone (segundo argumento de bootstrapModule) quedó deprecado e
    // ignorado; sin este provider explícito, Angular arranca con NoopNgZone (zoneless) y
    // las respuestas HTTP asíncronas nunca disparan detección de cambios automática.
    provideZoneChangeDetection(),
    { provide: HTTP_INTERCEPTORS, useClass: MockApiInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: RecargaPorParametrosStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

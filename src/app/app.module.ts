import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { SharedModule } from './shared/shared.module';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { HttpClientModule } from '@angular/common/http';
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
import { EstadisticaCasillaComponent } from './components/estadistica-casilla/estadistica-casilla.component';
import { ListadoParticipacionCiudadanaLNComponent } from './components/listado-participacion-ciudadana-ln/listado-participacion-ciudadana-ln.component';
import { VotacionPorCasillaComponent } from './components/votacion-por-casilla/votacion-por-casilla.component';
import { PipesModule } from './pipes/pipes.module';
// import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    BienvenidaComponent,
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
    EstadisticaCasillaComponent,
    ListadoParticipacionCiudadanaLNComponent,
    VotacionPorCasillaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    PipesModule
    // HighchartsChartModule
  ],
  exports: [
    MovingCardsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

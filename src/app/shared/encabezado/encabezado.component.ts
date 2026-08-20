import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CentroAyudaService } from 'src/app/services/centro-ayuda.service';
import { ResourceState } from 'src/app/interfaces/resource-state.interface';
import { PreguntaAyuda } from 'src/app/interfaces/centro-ayuda.interface';
import { Observable } from 'rxjs';
import {
  AccesibilidadService,
  ESCALA_FUENTE_MAXIMA,
  ESCALA_FUENTE_MINIMA,
  ESCALA_FUENTE_PASO
} from 'src/app/services/accesibilidad.service';

@Component({
  standalone: false,
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  public prep: boolean = environment.prep;
  public titulo: string = '';
  public subtitulo: string = '';
  public srcImg: string = '';
  public centroAyuda$: Observable<ResourceState<PreguntaAyuda[]>> = this.centroAyudaService.obtenerPreguntas();

  public readonly escalaFuenteMinima = ESCALA_FUENTE_MINIMA;
  public readonly escalaFuenteMaxima = ESCALA_FUENTE_MAXIMA;
  public readonly escalaFuentePaso = ESCALA_FUENTE_PASO;
  public readonly escalaFuente$ = this.accesibilidadService.escalaFuente$;
  public readonly modoOscuro$ = this.accesibilidadService.modoOscuro$;

  constructor(
    private centroAyudaService: CentroAyudaService,
    public accesibilidadService: AccesibilidadService
  ) { }

  public onCambioEscalaFuente(evento: Event): void {
    const valor = Number((evento.target as HTMLInputElement).value);
    this.accesibilidadService.establecerEscalaFuente(valor);
  }

  ngOnInit(): void {
    if(this.prep){
      this.titulo = environment.detalle_sistema_prep.titulo;
      this.subtitulo = environment.detalle_sistema_prep.subtitulo;
      this.srcImg = environment.detalle_sistema_prep.src;
    } else{
      this.titulo = environment.detalle_sistema_sicodid.titulo;
      this.subtitulo = environment.detalle_sistema_sicodid.subtitulo;
      this.srcImg = environment.detalle_sistema_sicodid.src;
    }
  }


}

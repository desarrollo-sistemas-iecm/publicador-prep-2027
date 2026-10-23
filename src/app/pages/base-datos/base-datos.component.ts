import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AVANCE_BASE_DATOS_MOCK } from 'src/app/mocks/base-datos.mock';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { SpinnerService } from 'src/app/services/spinner.service';

const NOMBRE_ARCHIVO_POR_DEFECTO = 'PREP_CDMX.zip';

@Component({
  standalone: false,
  selector: 'app-base-datos',
  templateUrl: './base-datos.component.html',
  styleUrls: ['./base-datos.component.css']
})
export class BaseDatosComponent implements OnInit {

  public avance = AVANCE_BASE_DATOS_MOCK;
  public descargando = false;

  constructor(
    private apiPrepService: ApiPrepService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {

  }

  async descargarBaseDatos(): Promise<void> {
    if (this.descargando) {
      return;
    }

    this.descargando = true;
    try {
      const respuesta = await firstValueFrom(
        this.spinnerService.showLoaderUntilCompleted(this.apiPrepService.descargarBaseDatos())
      );
      if (!respuesta.body) {
        throw new Error('Respuesta de descarga vacía');
      }

      const nombreArchivo = obtenerNombreArchivo(respuesta.headers.get('Content-Disposition'));
      guardarArchivo(respuesta.body, nombreArchivo);
    } catch (error) {
      const sinCorte = error instanceof HttpErrorResponse && error.status === 404;
      alert(sinCorte
        ? 'La base de datos aún no está disponible. Intenta de nuevo cuando se publique el primer corte.'
        : 'No fue posible descargar la base de datos. Intenta de nuevo más tarde.');
    } finally {
      this.descargando = false;
    }
  }

}

const obtenerNombreArchivo = (contentDisposition: string | null): string => {
  const coincidencia = contentDisposition?.match(/filename="?([^";]+)"?/i);
  return coincidencia?.[1] ?? NOMBRE_ARCHIVO_POR_DEFECTO;
}

const guardarArchivo = (contenido: Blob, nombreArchivo: string): void => {
  const url = URL.createObjectURL(contenido);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = nombreArchivo;
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  URL.revokeObjectURL(url);
}

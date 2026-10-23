import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DistribucionRpService } from './distribucion-rp.service';
import { ResourceState } from 'src/app/interfaces/resource-state.interface';
import { DistribucionRp, ResActasModalidad } from 'src/app/interfaces/distribucion-rp.interface';
import { environment } from 'src/environments/environment.development';

const respuesta = (data: ResActasModalidad['itemRecords']['data']): ResActasModalidad => ({
  success: true,
  msg: 'La información se obtuvo correctamente.',
  itemRecords: {
    columns: [
      { dataIndex: 'id_seccion', title: 'Sección', key: 1, resizable: 'resizable' as never, width: 90, minWidth: 70, maxWidth: 120 },
      { dataIndex: 'votos_part_1', title: 'PAN', key: 100, resizable: 'resizable' as never, width: 110, minWidth: 80, maxWidth: 160 },
      { dataIndex: 'votos_part_2', title: 'PRI', key: 101, resizable: 'resizable' as never, width: 110, minWidth: 80, maxWidth: 160 }
    ],
    data
  }
});

describe('DistribucionRpService', () => {
  let service: DistribucionRpService;
  let http: HttpTestingController;
  let estados: ResourceState<DistribucionRp>[];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(DistribucionRpService);
    http = TestBed.inject(HttpTestingController);
    estados = [];
  });

  afterEach(() => http.verify());

  it('debe enviar el distrito y mapear columnas de votos a partidos', () => {
    service.obtenerActasRp('5').subscribe((estado) => estados.push(estado));

    const peticion = http.expectOne(`${environment.api_prep}/actas/rp`);
    expect(peticion.request.body).toEqual({ seleccion: 5 });
    peticion.flush(respuesta([{
      id_seccion: 342, tipo_casilla: 'S01', votos_part_1: 45, votos_part_2: null,
      votos_cand_no_reg: 1, votos_nulos: 4, votacion_total: 50, nombre_img: 'a.jpg', observaciones: '--'
    }]));

    expect(estados.map(({ status }) => status)).toEqual(['loading', 'success']);
    expect(estados[1].data).toEqual({
      partidos: ['PAN', 'PRI'],
      actas: [{
        seccion: '342', casilla: 'S01', votosPorPartido: { PAN: 45, PRI: 0 },
        noRegistrados: 1, nulos: 4, total: 50, observacion: '--', disponible: true
      }]
    });
  });

  it('debe enviar body vacío sin distrito y marcar como no disponible el acta sin imagen', () => {
    service.obtenerActasRp().subscribe((estado) => estados.push(estado));

    const peticion = http.expectOne(`${environment.api_prep}/actas/rp`);
    expect(peticion.request.body).toEqual({});
    peticion.flush(respuesta([{
      id_seccion: 486, tipo_casilla: 'S01', votos_cand_no_reg: 0, votos_nulos: 0, votacion_total: 0,
      nombre_img: null, observaciones: 'SIN ACTA'
    }]));

    expect(estados[1].data?.actas[0].disponible).toBeFalse();
  });

  it('debe emitir empty cuando no hay actas', () => {
    service.obtenerActasRp().subscribe((estado) => estados.push(estado));

    http.expectOne(`${environment.api_prep}/actas/rp`).flush(respuesta([]));

    expect(estados[1].status).toBe('empty');
  });

  it('debe emitir error cuando falla la petición', () => {
    service.obtenerActasRp().subscribe((estado) => estados.push(estado));

    http.expectOne(`${environment.api_prep}/actas/rp`).flush(null, { status: 500, statusText: 'Error' });

    expect(estados[1].status).toBe('error');
  });
});

import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AccesibilidadService } from 'src/app/services/accesibilidad.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Jornada 2027';

  constructor(private router: Router, private accesibilidadService: AccesibilidadService) { }

  ngOnInit(): void {
    this.accesibilidadService.inicializar();

    // Los modales (Bootstrap vía jQuery, ej. #modalCentroAyuda, #avisoPrivacidad) no se
    // cierran automáticamente al navegar con el router; sin esto el backdrop se queda
    // tapando la página siguiente.
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const jquery = (window as any).$;
        if (jquery) {
          jquery('.modal').modal('hide');
        }
        document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());
        document.body.classList.remove('modal-open');
      }
    });
  }
}

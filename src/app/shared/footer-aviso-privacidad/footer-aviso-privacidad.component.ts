import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AVISO_PRIVACIDAD_TEXTO } from 'src/app/mocks/legal-content.mock';

@Component({
  standalone: false,
  selector: 'app-footer-aviso-privacidad',
  templateUrl: './footer-aviso-privacidad.component.html',
  styleUrls: ['./footer-aviso-privacidad.component.css']
})
export class FooterAvisoPrivacidadComponent {

  public version = environment.version;
  public date_dist = environment.date_dist;
  public avisoPrivacidadTexto = AVISO_PRIVACIDAD_TEXTO;

}

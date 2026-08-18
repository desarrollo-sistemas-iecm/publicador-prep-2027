import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-footer-aviso-privacidad',
  templateUrl: './footer-aviso-privacidad.component.html',
  styleUrls: ['./footer-aviso-privacidad.component.css']
})
export class FooterAvisoPrivacidadComponent {


  public version = environment.version;
  public date_dist = environment.date_dist;

}

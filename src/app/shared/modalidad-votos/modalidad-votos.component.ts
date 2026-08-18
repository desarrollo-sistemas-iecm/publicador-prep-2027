import { Component, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-modadlidad-votos',
  templateUrl: './modalidad-votos.component.html',
  styleUrls: ['./modalidad-votos.component.css'
  ]
})
export class ModalidadVotosComponent {

  @Input() mostrarCardVotoExtranjero: boolean = false;

}

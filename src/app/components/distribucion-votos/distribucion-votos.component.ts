import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-distribucion-votos',
  templateUrl: './distribucion-votos.component.html',
  styles: [
    `
    i.fa-equals.far:before {
    content: '=';
}
    `
  ]
})
export class DistribucionVotosComponent {

}

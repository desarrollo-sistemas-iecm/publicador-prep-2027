import { Component, ElementRef, ViewChild } from '@angular/core';
// import { debounce } from 'rxjs';
// import { debounce } from 'lodash';
// import { debounce as _debounce } from 'lodash';


@Component({
  standalone: false,
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrls: ['./preguntas-frecuentes.component.css']

})
export class PreguntasFrecuentesComponent {
  @ViewChild('faqBuscador') faqBuscador?: ElementRef;

  searchText: string = '';
  debounceTimeout: any;

  constructor() {}

  search() {
    const searchTerm = this.searchText.trim();
    if (!searchTerm) return;

    const regex = new RegExp(searchTerm, 'gi');
    const container = document.querySelector('.container-fluid.bgAzul.txBlanco.p-5');
    if (!container) return;

    const paragraphs = container.querySelectorAll('p');
    paragraphs.forEach(paragraph => {
      const textContent = paragraph.textContent;
      if (textContent) {
        console.log('Entra textContent');
        
        paragraph.innerHTML = textContent.replace(regex, match => `<span class="highlight">${match}</span>`);
      }
    });

    // Scroll to first occurrence
    const firstMatch = container.querySelector('.highlight');
    if (firstMatch) {
      firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  onSearchInput() {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      this.search();
    }, 2000);
  }

}

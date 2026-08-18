import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-compartir',
  templateUrl: './compartir.component.html',
  styleUrls: ['./compartir.component.css']
})
export class CompartirComponent {

  constructor(private location: Location) {}

  shareOnWhatsApp() {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(this.getFullUrl())}`;
    window.open(url, '_blank');
  }

  shareOnFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.getFullUrl())}`;
    window.open(url, '_blank');
  }

  shareOnTwitter() {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.getFullUrl())}`;
    window.open(url, '_blank');
  }

  getFullUrl(): string {
    return window.location.origin + this.location.prepareExternalUrl(this.location.path());
  }

}

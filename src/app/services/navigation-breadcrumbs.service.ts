import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor() { }

  goBack(n: number = 1): void {
    window.history.go(-n);
  }

  goForward(n: number = 1): void {
    window.history.go(n);
  }
}
